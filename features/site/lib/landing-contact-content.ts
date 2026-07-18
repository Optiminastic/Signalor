// Copy for the /contact-sales page. The FAQ powers both the visible accordion
// and the FAQPage JSON-LD in the route layout - keep them in sync by editing here.

export const CONTACT_SALES_FAQ = [
  {
    question: 'When do I need an enterprise plan instead of self-serve?',
    answer:
      'Self-serve plans on the pricing page cover one brand with a fixed prompt allowance. Talk to sales when you need higher prompt volumes, multiple brands or domains, agency workspaces, or a dedicated support setup.',
  },
  {
    question: 'Can agencies manage multiple client brands?',
    answer:
      'Yes. Agency plans run every client brand from one workspace with per-brand GEO scores, prompt tracking, and roster-wide reporting, so you can see all clients side by side.',
  },
  {
    question: 'Which AI engines can enterprise plans track?',
    answer:
      'All tracked engines: ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot, and Google AI Overviews. Tell us in the form which ones matter most and we will size the plan around them.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      'The team reviews your prompt volumes, brand count, and support needs, then comes back with a concrete plan and a walkthrough of the platform on your own domain - not a generic demo.',
  },
  {
    question: 'Do you support different billing currencies?',
    answer:
      'Yes - GBP, USD, EUR, and INR today. Pick your preferred currency in the form and the proposal will be priced in it.',
  },
] as const
