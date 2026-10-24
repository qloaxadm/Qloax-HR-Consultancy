import type { Article } from "@/lib/types";

/**
 * Editorial drafts pending approval. No authorship, publication date, or
 * research citation is implied — these are placeholder perspectives to
 * demonstrate the Insights template, not published claims.
 */
export const ARTICLES: Article[] = [
  {
    slug: "improving-candidate-experience",
    title: "How to improve the candidate experience",
    dek: "Small moments of friction add up. Here's where most hiring processes lose good candidates — and how to fix it.",
    topic: "Candidate Experience",
    status: "draft",
    body: [
      "Candidates notice far more than most hiring teams realise — how long it takes to hear back, whether feedback is specific or generic, and whether the process feels organised or improvised.",
      "A strong candidate experience starts before the first interview. Clear job descriptions, realistic expectations about process length, and a single point of contact all reduce drop-off before it happens.",
      "The interview process itself should be designed, not improvised. Each stage should test something distinct, and candidates should understand why each step exists.",
      "Feedback matters more than most companies budget time for. Even a brief, specific note on why a candidate wasn't progressed protects your employer brand far more than silence does.",
    ],
  },
  {
    slug: "before-hiring-for-a-critical-role",
    title: "What to consider before hiring for a critical role",
    dek: "Before opening a critical role, a short planning step can save months of mis-hire risk.",
    topic: "Hiring Strategy",
    status: "draft",
    body: [
      "Critical roles — the ones where a mis-hire is expensive and visible — deserve more planning than a standard job description and a posting.",
      "Start by separating what the role needs now from what it will need in twelve months. Many critical hires fail not because the person was wrong, but because the role changed underneath them.",
      "Define what 'good' looks like in concrete terms before you start interviewing. Vague criteria lead to inconsistent panel opinions and slow, indecisive processes.",
      "Finally, decide who owns the decision. Critical hires often stall when too many stakeholders have a veto and no one has final accountability.",
    ],
  },
  {
    slug: "building-a-more-effective-recruitment-process",
    title: "Building a more effective recruitment process",
    dek: "Most recruitment bottlenecks are process problems, not talent-market problems.",
    topic: "Recruitment Process",
    status: "draft",
    body: [
      "When a role stays open too long, the instinct is to blame the market. Often, the real bottleneck is internal: slow feedback loops, unclear ownership, or too many approval steps.",
      "Mapping your process end to end — from requisition approval to offer — usually reveals two or three steps responsible for most of the delay.",
      "Structured interviews and shared scorecards reduce both bias and back-and-forth, letting panels reach a decision faster and more fairly.",
      "A recruitment process is a product used by candidates, hiring managers, and recruiters alike. Treating it that way — and iterating on it — compounds over time.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
