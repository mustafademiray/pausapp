import { describe, expect, it } from "vitest";
import {
  getSupportRecommendation,
  scoreSurvey,
  type ProfileId,
  type SurveyResponses,
} from "./impulseSpendingSurvey";

const profileResponses: Record<ProfileId, SurveyResponses> = {
  mood_shift: {
    recent_trigger: "stress",
    easy_yes: "feel_better",
    vulnerable_moment: "difficult_day",
    after_checkout: "lift_fades",
  },
  autopilot: {
    recent_trigger: "browsing",
    easy_yes: "does_not_count",
    vulnerable_moment: "idle_scroll",
    after_checkout: "forget_order",
  },
  urgency: {
    recent_trigger: "deadline",
    easy_yes: "miss_chance",
    vulnerable_moment: "offer",
    after_checkout: "urgency_fades",
  },
  earned_reward: {
    recent_trigger: "reward",
    easy_yes: "deserve_it",
    vulnerable_moment: "payday",
    after_checkout: "reward_guilt",
  },
  future_self: {
    recent_trigger: "improvement",
    easy_yes: "better_self",
    vulnerable_moment: "reinvention",
    after_checkout: "change_missing",
  },
};

describe("scoreSurvey", () => {
  it.each(Object.entries(profileResponses))("returns the %s profile", (profile, responses) => {
    expect(scoreSurvey(responses).id).toBe(profile);
  });

  it("uses the recent purchase trigger to break a tie", () => {
    expect(
      scoreSurvey({
        recent_trigger: "deadline",
        easy_yes: "feel_better",
        vulnerable_moment: "difficult_day",
        after_checkout: "urgency_fades",
      }).id,
    ).toBe("urgency");
  });
});

describe("getSupportRecommendation", () => {
  it("personalizes the recommendation from the support answer", () => {
    expect(getSupportRecommendation({ preferred_support: "work_hours" })).toContain("work hours");
  });

  it("falls back to a time-based recommendation", () => {
    expect(getSupportRecommendation({})).toContain("Put the item on paus");
  });
});
