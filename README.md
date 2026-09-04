## paus

An addiction-prevention app that helps users make conscious purchasing decisions by visualizing work hours required for items.

### Purpose

paus helps people who struggle with unnecessary purchases by:

- Converting item prices into work hours
- Tracking spending and saving decisions
- Providing reminders for uncertain purchases
- Supporting multiple currencies and languages
- Personalizing the experience based on financial goals

### Impulse-spending reflection

The reflection is available at `/quiz/impulse-spending`.

It asks six questions and gives the visitor a spending pattern and a pause plan. The result links to the iOS app.

### Analytics configuration

Copy `.env.example` to `.env.local`. Then add the PostHog project key.

```env
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://eu.i.posthog.com
VITE_APP_STORE_URL=https://apps.apple.com/tr/app/paus-stop-impulse-buying/id6757305070
VITE_APP_STORE_SURVEY_URL=
```

The app sends these PostHog events:

- `$pageview`
- `survey_started`
- `survey_question_answered`
- `survey_completed`
- `app_store_clicked`

The analytics client does not load when `VITE_POSTHOG_KEY` is empty.
