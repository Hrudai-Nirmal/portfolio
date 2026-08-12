"use client";

/**
 * Cycles through the hero's professional roles with a type-and-delete rhythm.
 * Motion is disabled when the visitor has requested reduced motion.
 */

import { useEffect, useState } from "react";

interface TypingHeadlineProps {
  phrases: readonly string[];
}

/** Renders a continuously looping typewriter headline. */
export default function TypingHeadline({ phrases }: TypingHeadlineProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotionQuery.matches) {
      const reducedMotionTimer = window.setTimeout(
        () => setVisibleCharacterCount(phrases[0].length),
        0,
      );
      return () => window.clearTimeout(reducedMotionTimer);
    }

    const currentPhrase = phrases[phraseIndex] ?? phrases[0];
    const isPhraseComplete = visibleCharacterCount === currentPhrase.length;
    const isPhraseEmpty = visibleCharacterCount === 0;
    const delay = isPhraseComplete && !isDeleting ? 1450 : isDeleting ? 45 : 80;

    const typingTimer = window.setTimeout(() => {
      if (isPhraseComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isPhraseEmpty && isDeleting) {
        setIsDeleting(false);
        setPhraseIndex((currentIndex) => (currentIndex + 1) % phrases.length);
        return;
      }

      setVisibleCharacterCount((currentCount) =>
        currentCount + (isDeleting ? -1 : 1),
      );
    }, delay);

    return () => window.clearTimeout(typingTimer);
  }, [isDeleting, phraseIndex, phrases, visibleCharacterCount]);

  if (phrases.length === 0) {
    return null;
  }

  const visiblePhrase = (phrases[phraseIndex] ?? phrases[0]).slice(
    0,
    visibleCharacterCount,
  );

  return (
    <span
      className="inline-flex min-h-[1.08em] items-end"
      aria-label={phrases.join(", then ")}
    >
      <span aria-hidden="true">{visiblePhrase}</span>
      <span
        className="ml-[0.08em] inline-block h-[0.84em] w-[0.055em] animate-pulse bg-current"
        aria-hidden="true"
      />
    </span>
  );
}
