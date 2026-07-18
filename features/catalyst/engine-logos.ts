/** Maps an AI engine name/key to its logo in /public/logos. Returns null when
 * there's no bundled logo (caller falls back to the text label). */
const ENGINE_LOGOS: Record<string, string> = {
  chatgpt: '/logos/chatgpt.svg',
  claude: '/logos/claude.svg',
  copilot: '/logos/copilot.svg',
  gemini: '/logos/gemini.svg',
  google: '/logos/google.svg',
  perplexity: '/logos/perplexity.svg',
}

export function engineLogo(name: string): string | null {
  return ENGINE_LOGOS[name.trim().toLowerCase()] ?? null
}

const ENGINE_LABELS: Record<string, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  copilot: 'Copilot',
  gemini: 'Gemini',
  google: 'Google',
  perplexity: 'Perplexity',
  bing: 'Bing',
  deepseek: 'DeepSeek',
  grok: 'Grok',
  llama: 'Meta Llama',
}

/** Display name for an engine key ("chatgpt" → "ChatGPT"). */
export function engineLabel(engine: string): string {
  const key = engine.trim().toLowerCase()
  return ENGINE_LABELS[key] ?? (engine ? engine.charAt(0).toUpperCase() + engine.slice(1) : engine)
}
