/**
 * Project-card content rendered by the portfolio Work section.
 * Entries are derived from the maintained project descriptions knowledge base.
 */
export interface PortfolioProject {
  title: string;
  description: string;
  tags: readonly string[];
  link: string;
}

export const projects: readonly PortfolioProject[] = [
  {
    title: "Portfolio Website + Ask Shadow AI",
    description:
      "A responsive Next.js portfolio with an embedded AI assistant in a right-side drawer. Uses a non-blocking 5:2 split layout so visitors can browse sections while asking context-aware questions.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI Chatbot"],
    link: "#",
  },
  {
    title: "Surface Defect Detection Ensemble",
    description:
      "A computer vision pipeline using Faster R-CNN with a generalist + specialist routing strategy for defect localization. Improved detection quality over a single-model baseline with reproducible artifact-driven evaluation.",
    tags: ["Python", "PyTorch", "TorchVision", "Faster R-CNN", "MLOps"],
    link: "#",
  },
  {
    title: "MUSES (GuitarBud)",
    description:
      "A role-based guitar learning and live performance platform for students and teachers. Includes lesson authoring, premium content workflows, guided practice tools, and synchronized live session control.",
    tags: ["React", "Vite", "Express.js", "MongoDB", "WebSockets"],
    link: "#",
  },
  {
    title: "Cortana Personal AI Agent",
    description:
      "An offline-first desktop AI agent for Windows with an Electron + Python architecture, local Ollama inference, reminders, scheduled autonomous tasks, and privacy-first local memory workflows.",
    tags: ["Electron", "React", "Python", "Ollama", "SQLite"],
    link: "#",
  },
  {
    title: "Cortex Enterprise RAG",
    description:
      "A container-shippable enterprise RAG platform for dedicated client deployments, with authorization-scoped hybrid retrieval, citation-backed answers, durable ingestion, and graph-first operations tooling.",
    tags: ["FastAPI", "React", "PostgreSQL", "pgvector", "Docker"],
    link: "#",
  },
  {
    title: "Qrypt Secure Messaging",
    description:
      "A full-stack realtime messaging app with BB84-inspired quantum key simulation. Combines friend graph, persistent chats, live presence, and socket-driven updates with a security-focused architecture.",
    tags: ["React", "Flask", "Socket.IO", "MongoDB", "Qiskit"],
    link: "#",
  },
  {
    title: "Meridian AI Workflow Control Room",
    description:
      "A deployed-first SaaS control room for monitoring AI workflow automations through editable endpoint graphs, metric polling, alerts, team workspaces, and operational reporting.",
    tags: ["Next.js", "React Flow", "Neon Postgres", "Prisma", "Vercel"],
    link: "#",
  },
];
