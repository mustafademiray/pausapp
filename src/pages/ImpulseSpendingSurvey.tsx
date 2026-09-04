import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AppStoreLink from "@/components/AppStoreLink";
import { Progress } from "@/components/ui/progress";
import pausLogo from "@/assets/paus-logo.png";
import mascotHappy from "@/assets/paus-mascot-happy.png";
import { captureEvent } from "@/lib/analytics";
import {
  getSupportRecommendation,
  scoreSurvey,
  SURVEY_ID,
  SURVEY_VERSION,
  surveyQuestions,
  type SurveyAnswer,
  type SurveyProfile,
  type SurveyResponses,
} from "@/features/survey/impulseSpendingSurvey";

type SurveyPhase = "intro" | "questions" | "processing" | "result";

const answerLetters = ["A", "B", "C", "D", "E"];

const ImpulseSpendingSurvey = () => {
  const [phase, setPhase] = useState<SurveyPhase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [result, setResult] = useState<SurveyProfile | null>(null);
  const processingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);

  const question = surveyQuestions[questionIndex];
  const progress = ((questionIndex + 1) / surveyQuestions.length) * 100;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Your impulse spending pattern | paus";
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      if (processingTimer.current) clearTimeout(processingTimer.current);
    };
  }, []);

  useEffect(() => {
    if (phase === "questions") questionHeading.current?.focus();
  }, [phase, questionIndex]);

  const startSurvey = () => {
    setPhase("questions");
    captureEvent("survey_started", {
      survey_id: SURVEY_ID,
      survey_version: SURVEY_VERSION,
      funnel: "survey",
    });
  };

  const answerQuestion = (answer: SurveyAnswer) => {
    const updatedResponses = { ...responses, [question.id]: answer.id };
    setResponses(updatedResponses);
    captureEvent("survey_question_answered", {
      survey_id: SURVEY_ID,
      survey_version: SURVEY_VERSION,
      question_id: question.id,
      answer_id: answer.id,
      question_number: questionIndex + 1,
      funnel: "survey",
    });

    if (questionIndex < surveyQuestions.length - 1) {
      setQuestionIndex((current) => current + 1);
      return;
    }

    const surveyResult = scoreSurvey(updatedResponses);
    setResult(surveyResult);
    setPhase("processing");
    captureEvent("survey_completed", {
      survey_id: SURVEY_ID,
      survey_version: SURVEY_VERSION,
      result_profile: surveyResult.id,
      funnel: "survey",
    });
    processingTimer.current = setTimeout(() => setPhase("result"), 700);
  };

  const restartSurvey = () => {
    setResponses({});
    setQuestionIndex(0);
    setResult(null);
    setPhase("intro");
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#24382e] text-foreground">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, hsl(31 36% 35% / 0.34), transparent 25rem), radial-gradient(circle at 88% 82%, hsl(142 17% 35% / 0.42), transparent 28rem)",
        }}
      />
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-foreground/5" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-foreground/5" />
      <div aria-hidden="true" className="absolute -bottom-52 -left-52 h-[38rem] w-[38rem] rounded-full border border-foreground/5" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-5 py-5 sm:px-8 sm:py-7">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <img src={pausLogo} alt="" className="h-10 w-10 rounded-xl shadow-lg" />
            <span className="font-display text-2xl font-semibold">paus</span>
          </Link>
          <span className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            60-second reflection
          </span>
        </header>

        <div className="flex flex-1 items-center justify-center py-8 sm:py-12">
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.section
                key="intro"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.72fr]"
              >
                <div className="max-w-2xl">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-sm text-primary">
                    <Sparkles className="h-4 w-4" />
                    A calmer look at your spending
                  </div>
                  <h1 className="max-w-3xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                    What makes a purchase hard to <span className="text-primary">pause?</span>
                  </h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    Answer six quick questions to discover your most common spending pattern and get a practical pause plan.
                  </p>
                  <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={startSurvey}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-7 py-4 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:w-auto"
                    >
                      Find my pattern
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-sm text-muted-foreground">No email. No judgment.</span>
                  </div>
                </div>

                <div className="relative mx-auto hidden w-full max-w-sm lg:block">
                  <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" />
                  <div className="relative rotate-2 rounded-[2rem] border border-foreground/10 bg-foreground/[0.07] p-8 shadow-2xl backdrop-blur-sm">
                    <p className="font-display text-3xl leading-tight">A useful pause starts by noticing what came before the urge.</p>
                    <div className="mt-8 flex items-end justify-between">
                      <span className="max-w-[11rem] text-sm leading-relaxed text-muted-foreground">Not a diagnosis. Just a clearer moment before checkout.</span>
                      <img src={mascotHappy} alt="paus mascot" className="w-24 drop-shadow-xl" />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {phase === "questions" && (
              <motion.section
                key={`question-${question.id}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="w-full max-w-3xl"
              >
                <div className="mb-8">
                  <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Question {questionIndex + 1} of {surveyQuestions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} aria-label={`Question ${questionIndex + 1} of ${surveyQuestions.length}`} className="h-2 bg-foreground/10 [&>div]:bg-primary" />
                </div>

                <fieldset>
                  <legend className="sr-only">{question.prompt}</legend>
                  <h2 ref={questionHeading} tabIndex={-1} className="mb-8 text-3xl leading-tight outline-none sm:text-5xl">
                    {question.prompt}
                  </h2>
                  <div className="space-y-3">
                    {question.answers.map((answer, index) => (
                      <button
                        key={answer.id}
                        type="button"
                        onClick={() => answerQuestion(answer)}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.055] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-5"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-foreground/15 bg-background/30 text-sm font-bold text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                          {answerLetters[index]}
                        </span>
                        <span className="flex-1 text-base font-medium leading-snug sm:text-lg">{answer.label}</span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-foreground/20 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7 h-10">
                  {questionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setQuestionIndex((current) => current - 1)}
                      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous question
                    </button>
                  )}
                </div>
              </motion.section>
            )}

            {phase === "processing" && (
              <motion.section
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
                aria-live="polite"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <Sparkles className="h-7 w-7 animate-pulse text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl">Finding your pattern...</h2>
              </motion.section>
            )}

            {phase === "result" && result && (
              <motion.section
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
              >
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  <Check className="h-4 w-4" />
                  Your main pattern
                </div>
                <div className="grid overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/[0.07] shadow-2xl backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative border-b border-foreground/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                    <div aria-hidden="true" className="absolute right-4 top-4 font-display text-8xl text-foreground/[0.035]">01</div>
                    <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">Your pattern is</p>
                    <h1 className="text-5xl leading-none text-primary sm:text-6xl">{result.name}</h1>
                    <p className="mt-6 text-lg leading-relaxed text-foreground/85">{result.summary}</p>
                    <div className="mt-8 rounded-2xl border border-foreground/10 bg-background/25 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Recommended pause</p>
                      <p className="mt-1 font-display text-3xl">{result.delay}</p>
                    </div>
                  </div>

                  <div className="p-7 sm:p-10">
                    <div className="space-y-7">
                      <div>
                        <h2 className="mb-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">What tends to happen</h2>
                        <p className="leading-relaxed text-foreground/80">{result.pattern}</p>
                      </div>
                      <div>
                        <h2 className="mb-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">Your pause plan</h2>
                        <p className="leading-relaxed text-foreground/80">{result.action}</p>
                      </div>
                      <div>
                        <h2 className="mb-2 font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">How paus can help</h2>
                        <p className="leading-relaxed text-foreground/80">{getSupportRecommendation(responses)}</p>
                      </div>
                    </div>

                    <AppStoreLink
                      label="Set up my pause plan"
                      funnel="survey"
                      ctaPlacement="survey_result"
                      resultProfile={result.id}
                      className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    />
                    <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">Free to download on iOS. This reflection is not a financial or psychological diagnosis.</p>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={restartSurvey}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Retake the reflection
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default ImpulseSpendingSurvey;
