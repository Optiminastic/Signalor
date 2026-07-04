import type { DashStatData } from '@/features/catalyst/components/dash/DashStat'

export type Trend = 'up' | 'down' | 'flat'

export interface TrackedPrompt {
  id: number
  prompt: string
  score: number
  cited: boolean
  engines: string[]
  runs: number
  trend: Trend
}

export const PROMPTS: TrackedPrompt[] = [
  {
    id: 1,
    prompt: 'What is the best GEO analytics tool for agencies?',
    score: 82,
    cited: true,
    engines: ['ChatGPT', 'Perplexity', 'Gemini'],
    runs: 42,
    trend: 'up',
  },
  {
    id: 2,
    prompt: 'How do I improve my brand visibility in AI search?',
    score: 74,
    cited: true,
    engines: ['ChatGPT', 'Claude'],
    runs: 38,
    trend: 'up',
  },
  {
    id: 3,
    prompt: 'Signalor vs traditional SEO tools',
    score: 61,
    cited: true,
    engines: ['Perplexity'],
    runs: 27,
    trend: 'flat',
  },
  {
    id: 4,
    prompt: 'Best alternatives to Semrush for AI visibility',
    score: 44,
    cited: false,
    engines: [],
    runs: 19,
    trend: 'down',
  },
  {
    id: 5,
    prompt: 'How much does an AEO platform cost?',
    score: 38,
    cited: false,
    engines: [],
    runs: 15,
    trend: 'down',
  },
  {
    id: 6,
    prompt: 'Tools to track ChatGPT brand mentions',
    score: 69,
    cited: true,
    engines: ['ChatGPT', 'Gemini'],
    runs: 31,
    trend: 'up',
  },
  {
    id: 7,
    prompt: 'What is generative engine optimization?',
    score: 88,
    cited: true,
    engines: ['ChatGPT', 'Perplexity', 'Gemini', 'Claude'],
    runs: 54,
    trend: 'up',
  },
  {
    id: 8,
    prompt: 'Agency GEO reporting software',
    score: 52,
    cited: true,
    engines: ['Claude'],
    runs: 22,
    trend: 'flat',
  },
]

export const TRACKER_STATS: DashStatData[] = [
  { label: 'Avg score', value: '63', delta: '+4', positive: true },
  { label: 'Visibility', value: '62%', delta: '+6%', positive: true },
  { label: 'Strong prompts', value: '5 / 8' },
  { label: 'Runs this month', value: '248' },
]
