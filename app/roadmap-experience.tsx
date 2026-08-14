"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clapperboard, Flame, Layers3, RotateCcw, Route } from "lucide-react";
import type { Lang } from "./i18n";

type Mode = "quick" | "balanced" | "complete";

const labels = {
  tr: { more: "DAHA FAZLA WATCHPATH", discover: "Diğer film maratonlarını keşfet", route: "DOOMSDAY ROTASI", prompt: "Nasıl hazırlanmak istiyorsun?", quick: "Hızlı", balanced: "Dengeli", complete: "Tam", item: "yapım", reset: "Sıfırla", confirm: "İzleme ilerlemesini sıfırlamak istediğine emin misin?" },
  en: { more: "MORE WATCHPATH", discover: "Explore other movie marathons", route: "DOOMSDAY ROUTE", prompt: "How do you want to prepare?", quick: "Quick", balanced: "Balanced", complete: "Complete", item: "titles", reset: "Reset", confirm: "Are you sure you want to reset your progress?" },
  de: { more: "MEHR WATCHPATH", discover: "Weitere Film-Marathons entdecken", route: "DOOMSDAY-ROUTE", prompt: "Wie möchtest du dich vorbereiten?", quick: "Schnell", balanced: "Ausgewogen", complete: "Komplett", item: "Titel", reset: "Zurücksetzen", confirm: "Möchtest du deinen Fortschritt wirklich zurücksetzen?" },
  es: { more: "MÁS WATCHPATH", discover: "Explora otros maratones de cine", route: "RUTA DOOMSDAY", prompt: "¿Cómo quieres prepararte?", quick: "Rápida", balanced: "Equilibrada", complete: "Completa", item: "títulos", reset: "Reiniciar", confirm: "¿Seguro que quieres reiniciar tu progreso?" },
  fr: { more: "PLUS DE WATCHPATH", discover: "Découvrir d’autres marathons", route: "PARCOURS DOOMSDAY", prompt: "Comment veux-tu te préparer ?", quick: "Rapide", balanced: "Équilibré", complete: "Complet", item: "titres", reset: "Réinitialiser", confirm: "Veux-tu vraiment réinitialiser ta progression ?" },
  ja: { more: "WATCHPATHをもっと", discover: "ほかの映画マラソンを見る", route: "DOOMSDAY ルート", prompt: "どのペースで準備しますか？", quick: "クイック", balanced: "バランス", complete: "完全版", item: "作品", reset: "リセット", confirm: "視聴進捗をリセットしますか？" },
} as const;

const options = [
  ["quick", 18, Flame],
  ["balanced", 38, Route],
  ["complete", 80, Layers3],
] as const;

export default function RoadmapExperience({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<Mode>("balanced");
  const copy = labels[lang];

  useEffect(() => {
    const saved = localStorage.getItem("watchpath-route") as Mode | null;
    if (saved && ["quick", "balanced", "complete"].includes(saved)) setMode(saved);
  }, []);

  const choose = (id: Mode) => {
    setMode(id);
    localStorage.setItem("watchpath-route", id);
    window.dispatchEvent(new CustomEvent("watchpath-route", { detail: id }));
  };

  const reset = () => {
    if (!window.confirm(copy.confirm)) return;
    localStorage.setItem("watchpath-progress", "{}");
    localStorage.setItem("watchpath-route", "balanced");
    localStorage.removeItem("watchpath-rest-days");
    window.location.reload();
  };

  const optionLabel = (id: Mode) =>
    id === "quick" ? copy.quick : id === "balanced" ? copy.balanced : copy.complete;

  return (
    <section className="routeDockWrap" aria-label={copy.prompt}>
      <a className="marathonHub" href="/marathons">
        <Clapperboard />
        <span><small>{copy.more}</small><b>{copy.discover}</b><em>Spider-Man · Batman · X-Men · Star Wars · Harry Potter</em></span>
        <ArrowRight />
      </a>
      <div className="routeDock">
        <div className="routeTitle"><span>{copy.route}</span><b>{copy.prompt}</b></div>
        <div className="routeOptions">
          {options.map(([id, count, Icon]) => (
            <button type="button" key={id} className={mode === id ? "active" : ""} onClick={() => choose(id)}>
              <Icon /><span><b>{optionLabel(id)}</b><small>{count} {copy.item}</small></span>
            </button>
          ))}
        </div>
        <button type="button" className="reset" onClick={reset} title={copy.reset}><RotateCcw /><span>{copy.reset}</span></button>
      </div>
    </section>
  );
}
