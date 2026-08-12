/**
 * Guards the portfolio project catalog against omissions when the source
 * project-description document is updated.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { projects } from "../src/content/projects.ts";

const SOURCE_PROJECT_TITLES = [
  "MUSES (GuitarBud)",
  "Cortana Personal AI Agent",
  "Cortex Enterprise RAG",
  "Surface Defect Detection Ensemble",
  "Qrypt Secure Messaging",
  "Meridian AI Workflow Control Room",
];

test("project catalog includes every project from the source description", () => {
  const portfolioProjectTitles = new Set(
    projects.map((project) => project.title),
  );

  for (const sourceProjectTitle of SOURCE_PROJECT_TITLES) {
    assert.equal(
      portfolioProjectTitles.has(sourceProjectTitle),
      true,
      `Missing project: ${sourceProjectTitle}`,
    );
  }
});

test("project catalog uses unique titles and complete card content", () => {
  const projectTitles = projects.map((project) => project.title);

  assert.equal(new Set(projectTitles).size, projectTitles.length);
  for (const project of projects) {
    assert.notEqual(project.description.trim(), "");
    assert.ok(project.tags.length > 0);
  }
});
