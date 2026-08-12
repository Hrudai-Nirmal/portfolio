"use client";

/**
 * Scroll-driven work showcase. Desktop scrolling pins a horizontal narrative;
 * smaller screens receive the same ordered projects as a vertical sequence.
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StrokeText from "@/components/StrokeText";
import {
  orderedWorkTitles,
  workMotionConfig,
} from "@/content/portfolio-experience";
import { projects } from "@/content/projects";

gsap.registerPlugin(ScrollTrigger);

const projectsByTitle = new Map(
  projects.map((project) => [project.title, project] as const),
);

const orderedProjects = orderedWorkTitles.map((projectTitle) => {
  const project = projectsByTitle.get(projectTitle);
  if (!project) {
    throw new Error(`Missing portfolio project: ${projectTitle}`);
  }

  return project;
});

/** Renders the scroll-scrubbed portfolio project sequence. */
export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) {
      return undefined;
    }

    const mediaContext = gsap.matchMedia();

    mediaContext.add("(min-width: 768px)", () => {
      const scrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const totalScrollDistance = () =>
        scrollDistance() + window.innerWidth * 0.35;
      const workTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollDistance()}`,
          pin: true,
          scrub: workMotionConfig.desktopScrub,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      workTimeline.to(
        track,
        {
          x: () => -scrollDistance(),
          duration: () => totalScrollDistance(),
          ease: "none",
          force3D: true,
        },
        0,
      );

      const workCards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-work-card]"),
      );
      workCards.forEach((workCard) => {
        const cardSurface = workCard.querySelector<HTMLElement>(
          "[data-work-card-surface]",
        );
        if (!cardSurface) {
          return;
        }

        const revealStart = Math.max(
          0,
          workCard.offsetLeft - window.innerWidth * 0.88,
        );
        const revealDistance =
          window.innerWidth * workMotionConfig.cardRevealViewportRatio;

        workTimeline.fromTo(
          cardSurface,
          { opacity: 0.2, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: revealDistance,
            ease: "none",
            force3D: true,
          },
          revealStart,
        );
      });

      return () => workTimeline.kill();
    });

    mediaContext.add("(max-width: 767px)", () => {
      const cardSurfaces = Array.from(
        track.querySelectorAll<HTMLElement>("[data-work-card-surface]"),
      );
      cardSurfaces.forEach((cardSurface) => {
        gsap.fromTo(
          cardSurface,
          { opacity: 0.35, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: cardSurface,
              start: "top 90%",
              end: "top 62%",
              scrub: true,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => mediaContext.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-black text-white"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:h-screen md:w-max md:flex-row"
      >
        <div className="flex min-h-[88svh] w-full shrink-0 items-center justify-center px-6 py-24 md:h-screen md:w-screen md:px-16 md:py-0">
          <div className="w-full max-w-[min(88vw,96rem)]">
            <p className="mb-5 font-mono text-[clamp(0.7rem,0.62vw,0.95rem)] uppercase tracking-[0.28em] text-[#A78BFA]">
              Selected projects · 2024—2026
            </p>
            <StrokeText
              text="My Work"
              strokeColor="#A78BFA"
              fillColor="#F8FAFC"
              strokeWidth={1.4}
              drawDuration={workMotionConfig.strokeDrawDuration}
              scrollDistanceVh={workMotionConfig.strokeScrollDistanceVh}
              fillDelay={0.2}
              stagger={0.05}
              ease="power2.out"
              trigger="scroll"
              fillMode="wipe"
              fontSize={128}
              fontWeight={800}
              letterSpacing={-4}
              reverse={false}
              className="max-w-[min(82vw,82rem)]"
            />
            <p className="mt-8 max-w-[42rem] text-[clamp(1rem,1vw,1.4rem)] leading-[1.65] text-white/55">
              Product-minded engineering across AI systems, developer tools, and
              full-stack experiences. Keep scrolling to move through the work.
            </p>
          </div>
        </div>

        {orderedProjects.map((project, projectIndex) => (
          <article
            key={project.title}
            data-work-card
            className="flex min-h-[78svh] w-full shrink-0 items-center px-6 py-12 md:h-screen md:w-[min(78vw,76rem)] md:px-[clamp(2.5rem,3vw,5rem)] md:py-[clamp(5rem,8vh,9rem)]"
          >
            <div
              data-work-card-surface
              className="relative flex min-h-[34rem] w-full transform-gpu flex-col justify-between overflow-hidden rounded-[clamp(2rem,2vw,3rem)] border border-white/12 bg-[#101012] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] will-change-[transform,opacity] md:min-h-[70vh] md:p-[clamp(3rem,3.5vw,5.5rem)]"
            >
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#5227FF]/18 blur-[90px]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#A78BFA]">
                    Project {String(projectIndex + 1).padStart(2, "0")}
                  </p>
                  <span className="font-mono text-xs text-white/35">
                    {String(orderedProjects.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-[clamp(4rem,8vh,8rem)] max-w-[13ch] text-[clamp(2.6rem,4.7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                  {project.title}
                </h2>
              </div>

              <div className="relative mt-14 grid gap-8 border-t border-white/10 pt-7 md:grid-cols-[1.35fr_1fr]">
                <p className="max-w-3xl text-[clamp(1rem,1vw,1.4rem)] leading-[1.65] text-white/62">
                  {project.description}
                </p>
                <ul className="flex flex-wrap content-start gap-2" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/58"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}

        <div className="hidden h-screen w-[12vw] shrink-0 md:block" aria-hidden="true" />
      </div>
    </section>
  );
}
