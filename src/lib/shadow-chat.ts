/**
 * Validates Shadow chat input and provides an explicit local navigation mode
 * when the server-side Dify application key has not been configured.
 */

const MAX_SHADOW_QUERY_LENGTH = 1_000;

/** Validates and trims a value submitted to the Shadow chat endpoint. */
export function normalizeShadowQuery(input: unknown): string {
  if (typeof input !== "string") {
    throw new Error("A message is required.");
  }

  const query = input.trim();
  if (!query) {
    throw new Error("A message is required.");
  }
  if (query.length > MAX_SHADOW_QUERY_LENGTH) {
    throw new Error("Messages must be 1,000 characters or fewer.");
  }

  return query;
}

/** Answers common portfolio questions in clearly identified local mode. */
export function getLocalShadowReply(input: unknown): string {
  const query = normalizeShadowQuery(input).toLowerCase();

  if (/project|mission|meridian|cortex|cortana|work/.test(query)) {
    return "Mission archive located. Start with Meridian, the AI workflow control room; Cortex, the enterprise RAG platform; and Cortana, the personal AI agent. The Work section has the full flight log.";
  }

  if (/skill|stack|technology|technologies|build/.test(query)) {
    return "Hrudai works across agentic AI, retrieval systems, TypeScript, React, Next.js, Python, and full-stack product engineering—with design kept in the loop.";
  }

  if (/contact|hire|email|reach|available/.test(query)) {
    return "Open the Contact section to send a transmission. For the fastest route, use the portfolio contact form or the LinkedIn link in the menu.";
  }

  if (/who|about|hrudai|bangalore/.test(query)) {
    return "Hrudai Nirmal is a Bangalore-based agentic AI engineer and full-stack developer who blends engineering, design, and rapid experimentation.";
  }

  return "Local navigation mode is active. Ask me about Hrudai’s projects, technical stack, background, or how to get in touch.";
}
