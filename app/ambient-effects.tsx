"use client";

import { useEffect, useRef, useState } from "react";
import { DOOMSDAY_TICKETS, DOOMSDAY_TRAILER } from "./marvel-data";

type PosterFrame = {
  current: string;
  previous: string;
};

const toBackdropSize = (source: string) =>
  source
    .replace(/\/t\/p\/w\d+\//, "/t/p/w1280/")
    .replace("/w185/", "/w1280/")
    .replace("/w342/", "/w1280/")
    .replace("/w500/", "/w1280/")
    .replace("/w780/", "/w1280/");

export default function AmbientEffects() {
  const [frame, setFrame] = useState<PosterFrame>({ current: "", previous: "" });
  const clearPreviousTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let animationFrame = 0;
    let posterIntentTimer: ReturnType<typeof setTimeout> | null = null;
    let pointerX = -200;
    let pointerY = -200;

    const applyPointerDepth = () => {
      animationFrame = 0;
      const horizontal = pointerX / Math.max(1, window.innerWidth) - 0.5;
      const vertical = pointerY / Math.max(1, window.innerHeight) - 0.5;
      root.style.setProperty("--mx", `${pointerX}px`);
      root.style.setProperty("--my", `${pointerY}px`);
      root.style.setProperty("--depth-x", `${horizontal * -22}px`);
      root.style.setProperty("--depth-y", `${vertical * -16}px`);
      root.style.setProperty("--tilt-x", `${vertical * -1.15}deg`);
      root.style.setProperty("--tilt-y", `${horizontal * 1.15}deg`);
    };

    const move = (event: PointerEvent) => {
      if (reduceMotion.matches || !finePointer.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = requestAnimationFrame(applyPointerDepth);
    };

    const resetDepth = () => {
      root.style.setProperty("--depth-x", "0px");
      root.style.setProperty("--depth-y", "0px");
      root.style.setProperty("--tilt-x", "0deg");
      root.style.setProperty("--tilt-y", "0deg");
    };

    const showPoster = (source: string) => {
      const nextPoster = source ? toBackdropSize(source) : "";
      setFrame((currentFrame) => {
        if (currentFrame.current === nextPoster) return currentFrame;
        return { current: nextPoster, previous: currentFrame.current };
      });

      if (clearPreviousTimer.current) clearTimeout(clearPreviousTimer.current);
      clearPreviousTimer.current = setTimeout(() => {
        setFrame((currentFrame) => ({ ...currentFrame, previous: "" }));
      }, 760);
    };

    const next = (event: Event) => {
      const source = (event as CustomEvent<string>).detail || "";
      if (posterIntentTimer) clearTimeout(posterIntentTimer);
      posterIntentTimer = setTimeout(() => showPoster(source), 70);
    };
    const fallback = () => {
      const image = document.querySelector<HTMLImageElement>(
        ".unit img, .card:not(.finished) > img",
      );
      showPoster(image?.src || "");
    };
    const trailer = () => window.open(DOOMSDAY_TRAILER, "_blank", "noopener,noreferrer");
    const ticket = () => window.open(DOOMSDAY_TICKETS, "_blank", "noopener,noreferrer");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", resetDepth);
    window.addEventListener("watchpath-next-poster", next);
    window.addEventListener("watchpath-doomsday-trailer", trailer);
    window.addEventListener("watchpath-doomsday-ticket", ticket);
    const fallbackTimer = setTimeout(fallback, 350);

    return () => {
      clearTimeout(fallbackTimer);
      if (posterIntentTimer) clearTimeout(posterIntentTimer);
      if (clearPreviousTimer.current) clearTimeout(clearPreviousTimer.current);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", resetDepth);
      window.removeEventListener("watchpath-next-poster", next);
      window.removeEventListener("watchpath-doomsday-trailer", trailer);
      window.removeEventListener("watchpath-doomsday-ticket", ticket);
    };
  }, []);

  return (
    <>
      <div className={`posterBackdrop ${frame.current ? "active" : ""}`} aria-hidden="true">
        {frame.previous ? (
          <img className="posterLayer previous" src={frame.previous} alt="" decoding="async" />
        ) : null}
        {frame.current ? (
          <img
            className="posterLayer current"
            key={frame.current}
            src={frame.current}
            alt=""
            decoding="async"
          />
        ) : null}
        <span className="posterVeil" />
        <span className="posterGrain" />
      </div>
      <div className="cursorGlow" aria-hidden="true" />
    </>
  );
}
