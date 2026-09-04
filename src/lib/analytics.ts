type AnalyticsProperties = Record<string, string | number | boolean | undefined>;
type PostHogClient = (typeof import("posthog-js"))["default"];

const ATTRIBUTION_STORAGE_KEY = "paus_attribution";
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "article",
  "fbclid",
  "ttclid",
] as const;

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
let clientPromise: Promise<PostHogClient | null> | undefined;

const compact = (properties: AnalyticsProperties) =>
  Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== undefined));

const getAttribution = (): AnalyticsProperties => {
  if (typeof window === "undefined") return {};

  let stored: AnalyticsProperties = {};

  try {
    stored = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(
    ATTRIBUTION_KEYS.flatMap((key) => {
      const value = params.get(key);
      return value ? [[key, value]] : [];
    }),
  );
  const attribution = {
    landing_path: stored.landing_path || window.location.pathname,
    ...stored,
    ...current,
  };

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Analytics must not interrupt the conversion path when storage is unavailable.
  }

  return attribution;
};

const getClient = (): Promise<PostHogClient | null> => {
  if (!posthogKey || typeof window === "undefined") return Promise.resolve(null);
  if (clientPromise) return clientPromise;

  clientPromise = import("posthog-js").then(({ default: posthog }) => {
    posthog.init(posthogKey, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      persistence: "localStorage",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
    });
    return posthog;
  });

  return clientPromise;
};

export const initAnalytics = () => {
  void getClient();
};

export const captureEvent = (event: string, properties: AnalyticsProperties = {}) => {
  if (!posthogKey) return;

  const eventProperties = compact({ ...getAttribution(), ...properties });
  void getClient().then((posthog) => posthog?.capture(event, eventProperties));
};

export const capturePageView = () => {
  const path = typeof window === "undefined" ? undefined : window.location.pathname;
  captureEvent("$pageview", {
    $current_url: typeof window === "undefined" ? undefined : window.location.href,
    funnel: path === "/" ? "landing" : path === "/quiz/impulse-spending" ? "survey" : undefined,
  });
};
