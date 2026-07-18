import { HomeSectionHeader } from '@/features/site/components/landing/home-section-header'
import { HOME_CARD } from '@/features/site/components/landing/home-styles'
import { TESTIMONIALS, type Testimonial } from '@/features/site/lib/landing-testimonials-content'

function TestimonialCard({ testimonial }: { testimonial: Testimonial }): JSX.Element {
  return (
    <figure className={`${HOME_CARD} flex flex-col gap-5 p-6 sm:p-7`}>
      <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-foreground sm:text-[15px]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-[13px] font-semibold text-foreground ring-1 ring-border"
          aria-hidden
        >
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-foreground">
            <cite className="not-italic">{testimonial.name}</cite>
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function HomeTestimonials(): JSX.Element {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
      aria-labelledby="home-testimonials-heading"
    >
      <HomeSectionHeader
        eyebrow="In their words"
        headingId="home-testimonials-heading"
        title="Teams running weekly GEO sprints"
        description="Real outcomes from growth, content, and DTC teams shipping Signalor into their existing workflow."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </section>
  )
}
