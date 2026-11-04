// Generate crawler-readable HTML for the two public routes after Vite builds.
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement, Suspense } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { default: Index } = await server.ssrLoadModule('/src/pages/Index.tsx');
  const { default: Survey } = await server.ssrLoadModule('/src/pages/ImpulseSpendingSurvey.tsx');
  const { AppShell } = await server.ssrLoadModule('/src/App.tsx');
  const { default: AnalyticsPageView } = await server.ssrLoadModule('/src/components/AnalyticsPageView.tsx');
  const shell = await readFile('dist/index.html', 'utf8');
  const routes = [
    { path: 'dist/index.html', component: Index, title: 'paus — Think before you spend', description: "Impulse buys quietly drain your paycheck. paus helps you pause before spending and decide what is worth it.", canonical: 'https://paus.one/' },
    { path: 'dist/quiz/impulse-spending/index.html', component: Survey, title: 'Your impulse spending pattern | paus', description: 'Answer six quick questions to discover your most common spending pattern and get a practical pause plan. No email. No judgment.', canonical: 'https://paus.one/quiz/impulse-spending/' },
  ];
  for (const route of routes) {
    const body = renderToString(createElement(AppShell, null,
      createElement(MemoryRouter, { initialEntries: [new URL(route.canonical).pathname] },
        createElement(AnalyticsPageView),
        createElement(Suspense, { fallback: createElement('div', { className: 'min-h-screen bg-background' }) },
          createElement(Routes, null,
            createElement(Route, { path: new URL(route.canonical).pathname, element: createElement(route.component) }))))));
    let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${route.canonical}" />`)
      .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${route.title}" />`)
      .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${route.description}" />`)
      .replace('</head>', `<link rel="canonical" href="${route.canonical}" />\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    await mkdir(route.path.substring(0, route.path.lastIndexOf('/')), { recursive: true });
    await writeFile(route.path, html);
    console.log(`${route.path}: ${html.length} bytes`);
  }
} finally {
  await server.close();
}
