export interface FaqItem {
  question: string
  answer: string
}

export const HELP_FAQ: FaqItem[] = [
  {
    question: 'How do I get started with SignalorAI?',
    answer:
      'Paste any public URL into the free analyzer at signalor.ai for an instant GEO score and prioritized fix list, no signup needed. Create an account when you want to save runs and track changes over time.',
  },
  {
    question: 'What are your support hours and response times?',
    answer:
      'We reply to support email the same working day in most cases. There is no phone queue, you reach the actual team building the product.',
  },
  {
    question: 'How do I manage billing, upgrades, or cancellations?',
    answer:
      'Everything lives in your account settings, upgrade, downgrade, or cancel anytime. Changes take effect at the start of your next billing cycle and are prorated where applicable.',
  },
  {
    question: 'Which integrations do you support?',
    answer:
      'Shopify, a self-hosted WordPress plugin, GitHub, and Google Analytics. Connection guides and fixes for the most common issues are covered in our help guides.',
  },
  {
    question: 'Do you offer onboarding for teams and agencies?',
    answer:
      'Yes. For multi-brand rollouts and agency workspaces, contact sales and we will walk your team through setup and the best practices we have learned.',
  },
]
