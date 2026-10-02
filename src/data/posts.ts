export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Architecting Real-Time LLM Interfaces: Streaming, State & Sub-Second Latency",
    slug: "architecting-real-time-llm-interfaces",
    date: "October 12, 2026",
    readTime: "5 min read",
    excerpt:
      "How we engineered The Curious Fox to achieve a P95 latency of 1.58s using WebSocket token streaming, optimistic UI updates, and intelligent edge caching.",
    tags: ["GenAI", "System Design", "WebSockets", "Performance"],
    content: `
Building generative AI interfaces that feel snappy and conversational is fundamentally a challenge of **latency mitigation** and **streaming ergonomics**. When users interact with Large Language Models, waiting 4 to 8 seconds for a complete generation feels broken.

In this deep dive, I share the architectural decisions behind **The Curious Fox** — our real-time AI research agent that shaved P95 generation latency down to **1.58 seconds**.

---

### The Anatomy of Latency in LLM Pipelines

A typical LLM request-response cycle is bottlenecked at three distinct choke points:

1. **Time-to-First-Token (TTFT):** The duration required for the foundation model to ingest context, run initial attention passes, and emit token $0$.
2. **Inter-Token Latency (ITL):** The speed at which subsequent tokens stream through the decode phase (typically 20–50ms per token).
3. **Transport & Client Hydration:** Serialization overhead, round-trip network hops, and DOM re-renders during rapid state changes.

\`\`\`typescript
interface StreamChunk {
  id: string;
  delta: string;
  tokensGenerated: number;
  timestamp: number;
  confidenceScore?: number;
}

// Edge WebSocket buffer pipeline
export async function handleLLMStream(
  socket: WebSocket,
  tokenStream: AsyncIterable<string>
) {
  let chunkCount = 0;
  for await (const token of tokenStream) {
    socket.send(JSON.stringify({
      id: crypto.randomUUID(),
      delta: token,
      tokensGenerated: ++chunkCount,
      timestamp: performance.now(),
    }));
  }
}
\`\`\`

### 1. Server-Sent Events vs. WebSockets: Why We Chose WebSockets

While Server-Sent Events (SSE) over HTTP/2 are the industry default for uni-directional streaming, our architecture required bidirectional cancellation, user interruption prompts, and dynamic temperature adjustment mid-flight.

> **Key Takeaway:** WebSockets eliminated TCP handshake overhead for repeated iterations, saving **140ms** on follow-up prompts within the same research session.

### 2. Virtualized Token Buffering in React

Rendering 60 tokens per second directly into React state can easily trigger 60 component re-renders every 1000ms. On lower-end mobile devices, this drops frame rates to single digits.

To resolve this, we implemented a **RAF (requestAnimationFrame) throttled buffer**:

* Accumulate arriving deltas into a mutable ref.
* Flush deltas to the React state tree once per screen refresh tick (16.6ms).
* Use CSS \`contain: layout size\` on streaming text blocks to isolate repaint boundaries.

\`\`\`tsx
import { useEffect, useRef } from "react";

export function useBufferedStream(rawChunk: string | null) {
  const bufferRef = useRef("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!rawChunk) return;
    bufferRef.current += rawChunk;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        // Commit buffered content in a single consolidated paint
        rafRef.current = null;
      });
    }
  }, [rawChunk]);
}
\`\`\`

### 3. Edge-Cached Semantic Deduplication

We observed that **28% of researcher queries** shared overlapping foundational contexts. By introducing an edge semantic cache using vector embeddings on Cloudflare Workers:

- Common preamble prompts return within **120ms**.
- GPU inference costs dropped by **34%**.
- P95 latency dropped from **3.42s** to **1.58s**.

### Conclusion

Creating high-grade GenAI experiences requires treating latency as a top-tier design metric. By optimizing transport, buffering DOM updates, and deploying aggressive edge caching, generative interfaces can feel like instantaneous extensions of human thought.
    `,
  },
  {
    title: "Lessons from Building 'The AI Graveyard': Tracking 400+ Deprecated Models",
    slug: "lessons-from-building-the-ai-graveyard",
    date: "September 28, 2026",
    readTime: "7 min read",
    excerpt:
      "What happens when the hype cycle ends? Exploring post-mortem telemetry, rapid deprecation cycles in foundation models, and how to build resilient AI pipelines.",
    tags: ["Open Source", "MLOps", "Model Lifecycle", "Next.js"],
    content: `
Over the past 24 months, the open-source and proprietary AI ecosystems have moved at a dizzying pace. To document this historic churn, I created **The AI Graveyard** — a public post-mortem registry and telemetry dashboard tracking over **400+ deprecated, superseded, or abandoned AI projects and checkpoints**.

Here are the critical engineering and product lessons learned from curating the graveyard.

---

### The Velocity of Model Obsolescence

When we analyzed the lifespan of checkpoints released between Q1 2024 and Q3 2026, the data revealed startling truths:

- **Median checkpoint half-life:** Just **87 days** before being superseded by a distilled or quantized successor.
- **API deprecation runway:** Commercial vendors average only **180 days** before hard-sunsetting older model weights.
- **Breaking API contract changes:** Over 64% of model sunset events broke downstream client schemas without backward compatibility.

\`\`\`json
{
  "entity": "Foundation-Model-v1-Legacy",
  "first_release": "2024-03-15",
  "deprecation_announced": "2024-07-20",
  "api_hard_shutdown": "2024-09-30",
  "reason": "Superseded by MoE architecture with 4x cost efficiency",
  "downstream_impact_tier": "High"
}
\`\`\`

### Architecture of The AI Graveyard Dashboard

To handle daily scrapers, user community submissions, and uptime verifiers without incurring exorbitant hosting overhead, we built the application with:

1. **Next.js App Router with ISR (Incremental Static Regeneration):** Static HTML generation at build time with 60-minute background cache revalidation.
2. **PostgreSQL + pgvector:** For semantic clustering of related models and deprecation reason taxonomy.
3. **Automated Endpoint Probing:** Nightly cron workers querying public provider endpoints to detect silently failing APIs.

> *"If your AI software stack depends directly on proprietary model version strings, you are building on shifting sands. Always introduce an abstraction layer."*

### Key Rules for Resilient AI Architectures

1. **Decouple Providers with Gateway Adapters:** Never bind your production backend directly to raw vendor SDKs. Use unified router abstractions like LiteLLM or custom middleware.
2. **Schema Invariant Evals:** Test your output parsers against version drift using synthetic regression test sets.
3. **Automated Fallback Cascades:** When an upstream endpoint throws a 404 or 410 Gone, failover gracefully to self-hosted open weights or fallback endpoints.

Building The AI Graveyard reminded me that while individual models are transient, resilient architectural patterns endure.
    `,
  },
  {
    title: "Algorithmic Intuition: Competing in the WorldQuant Quant Challenge",
    slug: "algorithmic-intuition-worldquant-challenge",
    date: "August 15, 2026",
    readTime: "6 min read",
    excerpt:
      "Breaking down the alpha generation process that placed our pipeline in the top 8% of 70,000+ quantitative researchers worldwide.",
    tags: ["Quantitative Finance", "Alpha Generation", "Python", "Data Science"],
    content: `
Earlier this year, I competed in the **WorldQuant International Quant Challenge (IQC)**, a grueling multi-stage competition evaluating mathematical modeling, statistical arbitrage hypotheses, and automated alpha construction among **70,000+ competitors globally**.

Our team placed in the **Top 8%**, generating consistent Sharpe ratios exceeding $1.85$ across out-of-sample backtests. Here is how we approached the challenge through disciplined feature engineering and risk management.

---

### Understanding the Alpha Engine

In quantitative trading, an *Alpha* is a mathematical formula that maps historical market data (prices, volumes, fundamentals, alternative data) to cross-sectional predictions of future asset returns.

\`\`\`python
# Example: Mean-reverting intraday volume-weighted alpha
def alpha_reversion_vwap(close, volume, vwap, lookback=10):
    """
    Measures short-term divergence between price and VWAP,
    penalizing assets with surging unconfirmed volume.
    """
    price_divergence = close / vwap - 1.0
    volume_zscore = (volume - volume.rolling(lookback).mean()) / volume.rolling(lookback).std()
    
    raw_signal = -1.0 * price_divergence * (1.0 + np.maximum(0, volume_zscore))
    # Rank cross-sectionally and market-neutralize
    return rank(raw_signal) - 0.5
\`\`\`

### 1. Avoiding the Overfitting Trap (The P-Hacking Curse)

With tens of thousands of participants running millions of simulated simulations, many alphas appear brilliant purely through survivorship bias and data mining.

To combat this, we enforced strict hypothesis-first criteria:

* **Economic Rationale Requirement:** No formula was committed to backtesting without a prior written theoretical justification (e.g., liquidity provider inventory pressure, post-earnings announcement drift, institutional rebalancing friction).
* **Cross-Universe Stability:** Alphas had to maintain positive information coefficients across distinct equity universes (US Large Caps, European Mid Caps, Emerging Markets).
* **Sub-Period Invariance:** We sliced historical data into volatile regimes (2020 crash, 2022 rate hikes) to test for structural stability.

### 2. Neutralization and Turnover Optimization

High-performing signals can be rendered completely unviable once slippage, bid-ask spreads, and transaction costs are applied.

> **Crucial Rule:** Raw signal power is useless if your daily turnover exceeds 60%. Smoothing decay parameters via exponential moving averages was essential to preserve profitability.

\`\`\`python
# Vectorized exponential smoothing to reduce execution friction
alpha_smoothed = alpha_signal.ewm(span=3, adjust=False).mean()
portfolio_weights = cross_sectional_neutralize(alpha_smoothed, sector_groups)
\`\`\`

### Summary Insights

Competing at this scale demystified algorithmic research. The differentiator isn't raw computing power or over-engineered complexity; it is **methodological discipline**, rigorous out-of-sample validation, and deep domain respect for market microstructure.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}
