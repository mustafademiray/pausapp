export const SURVEY_ID = "impulse_spending";
export const SURVEY_VERSION = "impulse_spending_v1";

export type ProfileId = "mood_shift" | "autopilot" | "urgency" | "earned_reward" | "future_self";

export type SurveyAnswer = {
  id: string;
  label: string;
  profile?: ProfileId;
  weight?: number;
};

export type SurveyQuestion = {
  id: string;
  prompt: string;
  answers: SurveyAnswer[];
};

export type SurveyResponses = Record<string, string>;

export type SurveyProfile = {
  id: ProfileId;
  name: string;
  summary: string;
  pattern: string;
  action: string;
  delay: string;
};

const profileAnswers = (
  answers: Array<[id: string, label: string, profile: ProfileId]>,
  weight: number,
): SurveyAnswer[] => answers.map(([id, label, profile]) => ({ id, label, profile, weight }));

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "recent_trigger",
    prompt: "Think of your last unplanned purchase. What was happening just before it?",
    answers: profileAnswers(
      [
        ["stress", "I was stressed, low, or overwhelmed", "mood_shift"],
        ["browsing", "I was bored and browsing", "autopilot"],
        ["deadline", "A sale or deadline made it feel urgent", "urgency"],
        ["reward", "I felt I had earned a reward", "earned_reward"],
        ["improvement", "It seemed like a step toward a better version of me", "future_self"],
      ],
      2,
    ),
  },
  {
    id: "easy_yes",
    prompt: "What thought usually makes it easier to say yes?",
    answers: profileAnswers(
      [
        ["feel_better", "This will make me feel better", "mood_shift"],
        ["does_not_count", "It is small enough that it does not really count", "autopilot"],
        ["miss_chance", "I might miss my chance", "urgency"],
        ["deserve_it", "I deserve this", "earned_reward"],
        ["better_self", "This will help me become more organized, confident, or productive", "future_self"],
      ],
      2,
    ),
  },
  {
    id: "vulnerable_moment",
    prompt: "When are unplanned purchases most likely to happen?",
    answers: profileAnswers(
      [
        ["difficult_day", "After a difficult or emotional day", "mood_shift"],
        ["idle_scroll", "While scrolling or shopping without a specific goal", "autopilot"],
        ["offer", "During a sale, countdown, or free-shipping offer", "urgency"],
        ["payday", "After payday or completing something difficult", "earned_reward"],
        ["reinvention", "While trying to improve or reinvent part of my life", "future_self"],
      ],
      1,
    ),
  },
  {
    id: "after_checkout",
    prompt: "What usually happens after the purchase?",
    answers: profileAnswers(
      [
        ["lift_fades", "The emotional lift disappears quickly", "mood_shift"],
        ["forget_order", "I sometimes forget what I ordered", "autopilot"],
        ["urgency_fades", "I realize the urgency was not actually important", "urgency"],
        ["reward_guilt", "The reward turns into guilt", "earned_reward"],
        ["change_missing", "The purchase does not create the change I imagined", "future_self"],
      ],
      1,
    ),
  },
  {
    id: "frequency",
    prompt: "How often do you make purchases you did not originally plan?",
    answers: [
      { id: "less_than_monthly", label: "Less than once a month" },
      { id: "few_monthly", label: "A few times a month" },
      { id: "weekly", label: "About once a week" },
      { id: "several_weekly", label: "Several times a week" },
      { id: "unsure", label: "I am not sure" },
    ],
  },
  {
    id: "preferred_support",
    prompt: "What would help you most before checkout?",
    answers: [
      { id: "work_hours", label: "Seeing the price in work hours" },
      { id: "more_time", label: "Giving the purchase time before deciding" },
      { id: "reminder", label: "Receiving a reminder after the urge has passed" },
      { id: "trigger", label: "Recognizing what triggered the purchase" },
      { id: "patterns", label: "Seeing how repeated purchases add up" },
    ],
  },
];

export const surveyProfiles: Record<ProfileId, SurveyProfile> = {
  mood_shift: {
    id: "mood_shift",
    name: "Mood Shift",
    summary: "A purchase can look like a fast way to change how a difficult moment feels.",
    pattern: "The item promises relief first. Once the feeling settles, the purchase often matters less.",
    action: "Name the feeling before deciding, then let the item wait until your state has changed.",
    delay: "24 hours",
  },
  autopilot: {
    id: "autopilot",
    name: "Autopilot",
    summary: "Browsing, novelty, and easy checkout can turn a quiet moment into an unplanned purchase.",
    pattern: "The decision happens with so little friction that your real preference arrives after checkout.",
    action: "Move the item out of the shopping session and decide when you are no longer scrolling.",
    delay: "until tomorrow",
  },
  urgency: {
    id: "urgency",
    name: "Urgency",
    summary: "Sales and deadlines can make waiting feel more expensive than buying.",
    pattern: "Pressure changes the question from “Do I want this?” to “Will I miss my chance?”",
    action: "Let the countdown pressure pass, then reconsider the item on its own merits.",
    delay: "24 hours",
  },
  earned_reward: {
    id: "earned_reward",
    name: "Earned Reward",
    summary: "Effort, payday, or a hard week can make spending feel like well-earned permission.",
    pattern: "The reward is valid, but the first purchase that appears may not be the reward you actually want.",
    action: "Keep the reward, pause the item, and choose again when the achievement is less immediate.",
    delay: "48 hours",
  },
  future_self: {
    id: "future_self",
    name: "Future Self",
    summary: "Some purchases carry a promise of becoming more organized, confident, or complete.",
    pattern: "The item is asked to create a life change that usually needs more than an object.",
    action: "Write down the exact problem the item solves and see whether that reason still feels concrete later.",
    delay: "72 hours",
  },
};

export const supportRecommendations: Record<string, string> = {
  work_hours: "Turn the price into work hours before you make the final decision.",
  more_time: "Put the item on paus and decide again after your recommended delay.",
  reminder: "Set a reminder for after your recommended delay, when the urge has had time to settle.",
  trigger: "Record what was happening when the urge appeared, then compare it with your decision later.",
  patterns: "Keep unplanned purchases in one place so repeated decisions become easier to notice.",
};

const getSelectedAnswer = (question: SurveyQuestion, responses: SurveyResponses) =>
  question.answers.find((answer) => answer.id === responses[question.id]);

export const scoreSurvey = (responses: SurveyResponses): SurveyProfile => {
  const scores: Record<ProfileId, number> = {
    mood_shift: 0,
    autopilot: 0,
    urgency: 0,
    earned_reward: 0,
    future_self: 0,
  };

  surveyQuestions.forEach((question) => {
    const answer = getSelectedAnswer(question, responses);
    if (answer?.profile) scores[answer.profile] += answer.weight || 1;
  });

  const highestScore = Math.max(...Object.values(scores));
  const tiedProfiles = (Object.keys(scores) as ProfileId[]).filter(
    (profile) => scores[profile] === highestScore,
  );
  const primaryTrigger = getSelectedAnswer(surveyQuestions[0], responses)?.profile;
  const profile = primaryTrigger && tiedProfiles.includes(primaryTrigger) ? primaryTrigger : tiedProfiles[0];

  return surveyProfiles[profile || "mood_shift"];
};

export const getSupportRecommendation = (responses: SurveyResponses) =>
  supportRecommendations[responses.preferred_support] || supportRecommendations.more_time;
