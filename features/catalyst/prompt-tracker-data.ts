/** One engine's answer, adapted for the expandable result panel. */
export interface PromptEngineResult {
  id: number
  /** Raw engine key (chatgpt, gemini, …) — feeds the logo lookup. */
  engine: string
  engineLabel: string
  mentioned: boolean
  /** positive | neutral | negative | '' when unknown. */
  sentiment: string
  position: number | null
  snippet: string
  checkedAt: string
}

/** UI shape a PromptRow renders — adapted from the API by `usePrompts`. */
export interface TrackedPrompt {
  id: number
  prompt: string
  /** True when the user added it (vs auto-generated during onboarding). */
  isCustom: boolean
  intent: string
  promptType: string
  score: number
  /** Share of runs that mentioned the brand, 0-100. */
  visibility: number
  avgPosition: number | null
  cited: boolean
  mentions: number
  runs: number
  results: PromptEngineResult[]
}
