export interface FaqItem {
  question: string
  answer: string
}

export const TOOLS_FAQ: FaqItem[] = [
  {
    question: 'Are these tools really free?',
    answer:
      'Yes. Every tool on this page runs free with no sign-up for the summary result. Create an account only when you want to save runs, unlock the full fix queue, or monitor scores over time.',
  },
  {
    question: 'Do I need an account to use them?',
    answer:
      'No. Paste a URL or domain and get instant results. An account unlocks saved history, per-engine AI probes, competitor benchmarks, and scheduled re-checks.',
  },
  {
    question: 'How accurate are the results?',
    answer:
      'Each tool runs on the same engine that powers the full SignalorAI platform, the same scoring, schema parsing, and AI-bot checks, so the free summary reflects the real audit.',
  },
  {
    question: "What's the difference between the free tools and the full platform?",
    answer:
      'The free tools give you a headline score and the top fix. The platform adds the complete prioritized fix queue, one-click auto-fix on Shopify and WordPress, live per-engine probes, competitor share, and monitoring.',
  },
  {
    question: 'Which AI engines do the tools check?',
    answer:
      'Coverage spans ChatGPT, Claude, Gemini, Perplexity, and Google AI Overviews, plus schema.org, llms.txt, and robots.txt directives for AI crawlers like GPTBot, ClaudeBot, and PerplexityBot.',
  },
]
