import type { Article } from "@/lib/types";

/**
 * Editorial drafts pending client approval. No author, publication date,
 * or research finding is implied. Draft articles are labeled in the UI,
 * marked noindex, excluded from the sitemap, and emit no Article schema.
 */
export const ARTICLES: Article[] = [
  {
    slug: "improving-candidate-experience",
    title: "How to improve the candidate experience",
    dek: "Small moments of friction add up. Where hiring processes lose good candidates — and what to do about it.",
    topic: "Candidate experience",
    status: "draft",
    sections: [
      {
        paragraphs: [
          "Candidates notice far more than most hiring teams realize: how long it takes to hear back, whether feedback is specific or generic, and whether the process feels organized or improvised.",
        ],
      },
      {
        heading: "Start before the first interview",
        paragraphs: [
          "A clear job description, realistic expectations about the length of the process, and a single point of contact all reduce drop-off before it starts.",
          "If a candidate has to chase for the next step, the process is already costing you goodwill.",
        ],
      },
      {
        heading: "Design the interview, don't improvise it",
        paragraphs: [
          "Each stage should test something distinct, and candidates should understand why each step exists. Repetitive interviews signal internal misalignment.",
        ],
      },
      {
        heading: "Close the loop",
        paragraphs: [
          "Even a short, specific note on why someone wasn't progressed protects your reputation far more than silence. The people you turn down today talk to the people you want to hire tomorrow.",
        ],
      },
    ],
  },
  {
    slug: "before-hiring-for-a-critical-role",
    title: "What to consider before hiring for a critical role",
    dek: "Before opening a critical role, a short planning step can save months of mis-hire risk.",
    topic: "Hiring strategy",
    status: "draft",
    sections: [
      {
        paragraphs: [
          "Critical roles — the ones where a mis-hire is expensive and visible — deserve more planning than a job description and a posting.",
        ],
      },
      {
        heading: "Separate today from twelve months out",
        paragraphs: [
          "Many critical hires fail not because the person was wrong, but because the role changed underneath them. Write down what the role needs now, and what it will need in a year.",
        ],
      },
      {
        heading: "Define what good looks like",
        paragraphs: [
          "Vague criteria lead to inconsistent panel opinions and slow, indecisive processes. Agree on concrete outcomes before the first conversation.",
        ],
      },
      {
        heading: "Decide who decides",
        paragraphs: [
          "Critical hires often stall when too many stakeholders hold a veto and no one holds final accountability. Name the decision-maker at the start.",
        ],
      },
    ],
  },
  {
    slug: "building-a-more-effective-recruitment-process",
    title: "Building a more effective recruitment process",
    dek: "Most recruitment bottlenecks are process problems, not talent-market problems.",
    topic: "Recruitment process",
    status: "draft",
    sections: [
      {
        paragraphs: [
          "When a role stays open too long, the instinct is to blame the market. Often the real bottleneck is internal: slow feedback loops, unclear ownership, or too many approval steps.",
        ],
      },
      {
        heading: "Map the process end to end",
        paragraphs: [
          "Following a role from requisition approval to signed offer usually reveals two or three steps responsible for most of the delay.",
        ],
      },
      {
        heading: "Structure reduces friction",
        paragraphs: [
          "Structured interviews and shared scorecards reduce both bias and back-and-forth, so panels reach better decisions faster.",
        ],
      },
      {
        heading: "Treat it like a product",
        paragraphs: [
          "Candidates, hiring managers, and recruiters all use your process. Measure where it slows down, change one thing at a time, and keep what works.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
