/**
 * Server-only bridge for the custom Shadow interface. It keeps the Dify app
 * key private and identifies local navigation mode when no chat key is set.
 */

import { NextResponse } from "next/server";
import {
  getLocalShadowReply,
  normalizeShadowQuery,
} from "@/lib/shadow-chat";

interface ShadowRequestBody {
  conversationId?: unknown;
  message?: unknown;
  userId?: unknown;
}

interface DifyChatResponse {
  answer?: unknown;
  conversation_id?: unknown;
}

function normalizeOptionalIdentifier(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 128) : "";
}

async function parseDifyError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { message?: unknown };
    if (typeof payload.message === "string" && payload.message.trim()) {
      return payload.message;
    }
  } catch {
    return `Dify returned status ${response.status}.`;
  }

  return `Dify returned status ${response.status}.`;
}

/** Sends one user message to Shadow and returns the assistant response. */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const requestBody = (await request.json()) as ShadowRequestBody;
    const query = normalizeShadowQuery(requestBody.message);
    const conversationId = normalizeOptionalIdentifier(
      requestBody.conversationId,
    );
    const userId = normalizeOptionalIdentifier(requestBody.userId);
    const apiKey = process.env.DIFY_CHAT_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({
        answer: getLocalShadowReply(query),
        conversationId: null,
        mode: "local",
      });
    }

    if (!userId) {
      return NextResponse.json(
        { error: "A valid chat session is required." },
        { status: 400 },
      );
    }

    const apiBaseUrl = (
      process.env.DIFY_CHAT_API_BASE_URL ?? "https://api.dify.ai/v1"
    ).replace(/\/+$/, "");
    const difyResponse = await fetch(`${apiBaseUrl}/chat-messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        query,
        response_mode: "blocking",
        conversation_id: conversationId,
        user: userId,
      }),
      cache: "no-store",
    });

    if (!difyResponse.ok) {
      return NextResponse.json(
        { error: await parseDifyError(difyResponse) },
        { status: 502 },
      );
    }

    const difyPayload = (await difyResponse.json()) as DifyChatResponse;
    if (typeof difyPayload.answer !== "string" || !difyPayload.answer.trim()) {
      return NextResponse.json(
        { error: "Shadow returned an empty transmission." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      answer: difyPayload.answer,
      conversationId:
        typeof difyPayload.conversation_id === "string"
          ? difyPayload.conversation_id
          : null,
      mode: "dify",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process transmission.";
    const status = /required|1,000 characters/i.test(message) ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
