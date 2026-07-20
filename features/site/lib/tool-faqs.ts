// Per-tool FAQ content, rendered visibly on each tool page (via HomeFaq) and
// emitted as FAQPage JSON-LD in the matching layout. Keeping both in one place
// guarantees the structured data always matches the on-page content, which
// Google requires for FAQ rich results.

export interface ToolFaqItem {
  question: string
  answer: string
}

export const URL_ANALYZER_FAQ: ToolFaqItem[] = [
  {
    question: 'What does the GEO score measure?',
    answer:
      'The GEO score is a 0-100 composite that covers six pillars: Structure, Schema, Trust, Content, Citations, and Crawlability. Higher scores correlate with more frequent brand citations across ChatGPT, Claude, Gemini, and Perplexity.',
  },
  {
    question: 'Which AI engines does the URL analyzer check?',
    answer:
      'The free summary checks schema, llms.txt, robots.txt AI-bot directives, and on-page trust signals. Upgrading adds live probes across ChatGPT, Claude, Gemini, and Perplexity so you see actual AI-generated summaries of your page.',
  },
  {
    question: 'Is the URL analyzer really free?',
    answer:
      'Yes, you can run unlimited GEO audits on public URLs without creating an account. The free report shows the headline score, pillar breakdown, and top three fixes. Signing up unlocks the full fix queue, per-engine AI probes, and scheduled monitoring.',
  },
  {
    question: 'How is a GEO audit different from a traditional SEO audit?',
    answer:
      'Traditional SEO audits optimize for Google rankings using crawlability, backlinks, and page speed. A GEO audit focuses on why AI engines like ChatGPT and Gemini choose to cite, or skip, a page: schema completeness, entity clarity, trust signals, and structured content that language models can extract and attribute.',
  },
]

export const LLMS_CHECK_FAQ: ToolFaqItem[] = [
  {
    question: 'What is llms.txt and why does it matter?',
    answer:
      'llms.txt is a plain-text manifest that tells AI models which pages contain your most important content, similar to how robots.txt guides search crawlers. Publishing a well-structured llms.txt helps ChatGPT, Claude, and other language models locate your best content faster and increases the chance of accurate citations.',
  },
  {
    question: 'Which AI crawlers are checked in robots.txt?',
    answer:
      'The checker parses robots.txt for GPTBot (ChatGPT), ClaudeBot (Claude / Anthropic), PerplexityBot (Perplexity), Google-Extended (Google AI Overviews / Gemini), OAI-SearchBot, and other known LLM user-agent strings. Blocked crawlers can silently prevent AI citations even when your content is excellent.',
  },
  {
    question: 'What on-page signals does the LLM checker verify?',
    answer:
      'The checker scans for Organization schema, Article schema, canonical tags, Open Graph metadata, title and meta description presence, sitemap reachability, and HTTPS enforcement, the signals AI systems rely on to establish trust before citing a page.',
  },
  {
    question: 'Does passing the LLM check guarantee AI citations?',
    answer:
      "It removes the technical blockers that silently prevent AI engines from reading and citing your content. Earning citations also requires strong content quality, topical authority, and clear entity definitions, all areas SignalorAI's full GEO audit covers.",
  },
]

export const COMPETITORS_FAQ: ToolFaqItem[] = [
  {
    question: 'How are competitors identified?',
    answer:
      "Competitors are discovered from live Google autocomplete queries, the 'vs', 'alternatives to', and 'compared to' phrases real buyers type when evaluating your category. This gives you the rivals that matter in active purchase decisions, not a static CRM list.",
  },
  {
    question: 'What is co-mention frequency?',
    answer:
      "Co-mention frequency is how often a competitor appears alongside your brand in buyer comparison searches. A rival that appears in 60% of your brand's comparison queries is a higher-priority target than one appearing in 10%.",
  },
  {
    question: 'How is AI competitor analysis different from traditional SEO competitor tracking?',
    answer:
      'Traditional tools track keyword rankings and backlinks. AI competitor analysis tracks which brands generative engines like ChatGPT, Gemini, Perplexity, and Claude actually cite, recommend, and compare when buyers ask category questions, a fundamentally different signal set.',
  },
  {
    question: 'Can I see per-engine AI citation breakdowns?',
    answer:
      'The free tool shows search-autocomplete co-mentions. Signing up or upgrading adds per-engine AI citation benchmarks, revealing which rivals win on ChatGPT vs. Gemini vs. Perplexity, since the engines frequently disagree on category leaders.',
  },
]

export const SCHEMA_VALIDATOR_FAQ: ToolFaqItem[] = [
  {
    question: 'Which Schema.org types are validated?',
    answer:
      'The validator checks 18 types including Organization, Product, Article, FAQPage, HowTo, BreadcrumbList, Event, Review, AggregateRating, LocalBusiness, Person, WebPage, WebSite, SoftwareApplication, Course, JobPosting, Recipe, and VideoObject, covering the schema types most relevant to AI citation eligibility.',
  },
  {
    question: 'What counts as a partial or malformed schema?',
    answer:
      "A partial schema is missing required fields that AI engines expect, for example, an Organization block without a 'url' or 'name', or a Product without 'offers'. Malformed schemas have syntax errors or conflicting duplicate blocks that cause language models to ignore or mis-parse the structured data.",
  },
  {
    question: 'Why does JSON-LD matter for AI citations?',
    answer:
      'Generative engines like ChatGPT, Gemini, and Perplexity use structured data to understand entities, verify facts, and establish authority before citing a page. Complete, valid JSON-LD helps language models identify who you are, what you offer, and why you are credible, all inputs that influence citation decisions.',
  },
  {
    question: 'Can I validate multiple pages at once?',
    answer:
      'The free tool scans one URL at a time. Signing up or upgrading unlocks site-wide coverage roll-ups that show schema consistency across every template, plus ready-to-paste JSON-LD fix snippets ranked by GEO score impact.',
  },
]

export const DOMAIN_RATING_FAQ: ToolFaqItem[] = [
  {
    question: 'What is Domain Rating (DR)?',
    answer:
      "Domain Rating is a 0-100 score that reflects the strength of a website's backlink profile, the quantity and quality of other sites linking to it. A higher DR generally means more authoritative inbound links, which search engines and AI engines weigh when deciding which sources to trust and cite.",
  },
  {
    question: 'How is the Domain Rating calculated?',
    answer:
      'The checker sources open backlink data (built on Common Crawl, the same basis as popular DR-style metrics) and normalizes it to a familiar 0-100 Domain Rating. It reflects how many authoritative sites link to the domain.',
  },
  {
    question: 'What is the global rank?',
    answer:
      "Global rank is the domain's worldwide position by authority, where #1 is the strongest. It's a quick way to gauge how a domain compares against the rest of the web, lower numbers mean more authority.",
  },
  {
    question: 'Does a high Domain Rating guarantee AI citations?',
    answer:
      "No. Backlink authority is one off-page trust signal among many. Earning AI citations also requires strong content quality, clear entity definitions, schema, and topical authority, all areas SignalorAI's full GEO audit covers.",
  },
]
