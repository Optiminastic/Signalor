import Image from 'next/image'

type EngineLogo = {
  name: string
  src: string
}

const ENGINE_LOGOS: EngineLogo[] = [
  { name: 'ChatGPT', src: '/logos/chatgpt.svg' },
  { name: 'Claude', src: '/logos/claude.svg' },
  { name: 'Gemini', src: '/logos/gemini.svg' },
  { name: 'Perplexity', src: '/logos/perplexity.svg' },
  { name: 'Copilot', src: '/logos/copilot.svg' },
  { name: 'Google AI', src: '/logos/google.svg' },
]

export function HomeLogoCloud(): JSX.Element {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:py-14" aria-label="Supported AI engines">
      <p className="text-center text-[13px] font-medium text-muted-foreground">
        Tracking your brand across every major AI engine
      </p>
      <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
        {ENGINE_LOGOS.map((logo) => (
          <li
            key={logo.name}
            className="flex items-center gap-2 opacity-65 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span className="text-sm font-semibold text-foreground/80">{logo.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
