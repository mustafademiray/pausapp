/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
  readonly VITE_APP_STORE_URL?: string;
  readonly VITE_APP_STORE_SURVEY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
