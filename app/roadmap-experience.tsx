"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarClock, Clapperboard, Flame, History, Layers3, RotateCcw, Route } from "lucide-react";
import type { Lang } from "./i18n";

type Mode = "quick" | "balanced" | "complete";
type OrderMode = "chronological" | "release";

const labels = {
  tr: { more: "DAHA FAZLA WATCHPATH", discover: "Diğer film maratonlarını keşfet", route: "DOOMSDAY ROTASI", prompt: "Nasıl hazırlanmak istiyorsun?", quick: "Hızlı", balanced: "Dengeli", complete: "Tam", item: "yapım", reset: "Sıfırla", confirm: "İzleme ilerlemesini sıfırlamak istediğine emin misin?", order: "İZLEME SIRASI", chronological: "Kronolojik", recommended: "Önerilen", release: "Çıkış sırası" },
  en: { more: "MORE WATCHPATH", discover: "Explore other movie marathons", route: "DOOMSDAY ROUTE", prompt: "How do you want to prepare?", quick: "Quick", balanced: "Balanced", complete: "Complete", item: "titles", reset: "Reset", confirm: "Are you sure you want to reset your progress?", order: "WATCH ORDER", chronological: "Chronological", recommended: "Recommended", release: "Release order" },
  de: { more: "MEHR WATCHPATH", discover: "Weitere Film-Marathons entdecken", route: "DOOMSDAY-ROUTE", prompt: "Wie möchtest du dich vorbereiten?", quick: "Schnell", balanced: "Ausgewogen", complete: "Komplett", item: "Titel", reset: "Zurücksetzen", confirm: "Möchtest du deinen Fortschritt wirklich zurücksetzen?", order: "REIHENFOLGE", chronological: "Chronologisch", recommended: "Empfohlen", release: "Veröffentlichung" },
  es: { more: "MÁS WATCHPATH", discover: "Explora otros maratones de cine", route: "RUTA DOOMSDAY", prompt: "¿Cómo quieres prepararte?", quick: "Rápida", balanced: "Equilibrada", complete: "Completa", item: "títulos", reset: "Reiniciar", confirm: "¿Seguro que quieres reiniciar tu progreso?", order: "ORDEN", chronological: "Cronológico", recommended: "Recomendado", release: "Estreno" },
  fr: { more: "PLUS DE WATCHPATH", discover: "Découvrir d’autres marathons", route: "PARCOURS DOOMSDAY", prompt: "Comment veux-tu te préparer ?", quick: "Rapide", balanced: "Équilibré", complete: "Complet", item: "titres", reset: "Réinitialiser", confirm: "Veux-tu vraiment réinitialiser ta progression ?", order: "ORDRE", chronological: "Chronologique", recommended: "Recommandé", release: "Sortie" },
  ja: { more: "WATCHPATHをもっと", discover: "ほかの映画マラソンを見る", route: "DOOMSDAY ルート", prompt: "どのペースで準備しますか？", quick: "クイック", balanced: "バランス", complete: "完全版", item: "作品", reset: "リセット", confirm: "視聴進捗をリセットしますか？", order: "視聴順", chronological: "時系列", recommended: "おすすめ", release: "公開順" },
} as const;

const options = [
  ["quick", 18, Flame],
  ["balanced", 38, Route],
  ["complete", 80, Layers3],
] as const;

export default function RoadmapExperience({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<Mode>("balanced");
  const [order, setOrder] = useState<OrderMode>("chronological");
  const copy = labels[lang];

  useEffect(() => {
    const saved = localStorage.getItem("watchpath-route") as Mode | null;
    if (saved && ["quick", "balanced", "complete"].includes(saved)) setMode(saved);
    const savedOrder = localStorage.getItem("watchpath-order") as OrderMode | null;
    if (savedOrder && ["chronological", "release"].includes(savedOrder)) setOrder(savedOrder);
    else localStorage.setItem("watchpath-order", "chronological");
  }, []);

  const choose = (id: Mode) => {
    setMode(id);
    localStorage.setItem("watchpath-route", id);
    window.dispatchEvent(new CustomEvent("watchpath-route", { detail: id }));
  };

  const chooseOrder = (id: OrderMode) => {
    setOrder(id);
    localStorage.setItem("watchpath-order", id);
    window.dispatchEvent(new CustomEvent("watchpath-order", { detail: id }));
  };

  const reset = () => {
    if (!window.confirm(copy.confirm)) return;
    localStorage.setItem("watchpath-progress", "{}");
    localStorage.setItem("watchpath-route", "balanced");
    localStorage.setItem("watchpath-order", "chronological");
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
      <div className="orderDock">
        <span className="orderLabel">{copy.order}</span>
        <div className="orderOptions">
          <button type="button" className={order === "chronological" ? "active" : ""} onClick={() => chooseOrder("chronological")}>
            <CalendarClock/><span><b>{copy.chronological}</b><small>{copy.recommended}</small></span>
          </button>
          <button type="button" className={order === "release" ? "active" : ""} onClick={() => chooseOrder("release")}>
            <History/><span><b>{copy.release}</b><small>Classic</small></span>
          </button>
        </div>
      </div>
      <style jsx>{`
        .routeDockWrap{width:min(900px,calc(100% - 32px));margin:8px auto 22px;display:grid;gap:9px;position:relative;z-index:20}.marathonHub,.routeDock,.orderDock{border:1px solid rgba(255,255,255,.13);background:linear-gradient(135deg,rgba(255,255,255,.085),rgba(255,255,255,.025));backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);box-shadow:inset 0 1px rgba(255,255,255,.14),0 14px 42px rgba(0,0,0,.24)}.marathonHub{display:grid;grid-template-columns:36px 1fr 20px;gap:10px;align-items:center;padding:11px 14px;border-radius:18px;text-decoration:none;color:#fff}.marathonHub>svg{width:19px}.marathonHub span{display:grid;min-width:0}.marathonHub small,.routeTitle span,.orderLabel{font-size:7px;letter-spacing:.17em;color:#ff7484;font-weight:900}.marathonHub b{font-size:12px}.marathonHub em{font-size:8px;color:#858995;font-style:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.routeDock{display:grid;grid-template-columns:minmax(170px,1fr) auto auto;align-items:center;gap:10px;padding:10px 12px;border-radius:18px}.routeTitle b{display:block;margin-top:3px;font-size:12px}.routeOptions{display:flex;gap:6px}.routeOptions button,.reset,.orderOptions button{min-height:42px;border-radius:13px;border:1px solid rgba(255,255,255,.09);background:rgba(9,10,14,.38);color:#d9dae0;display:flex;align-items:center;gap:7px;padding:0 10px;transition:.18s}.routeOptions button:hover,.reset:hover,.orderOptions button:hover{transform:translateY(-1px);border-color:rgba(255,104,122,.34)}.routeOptions button.active,.orderOptions button.active{background:rgba(116,25,40,.32);border-color:rgba(255,93,112,.46);color:#ff8592}.routeOptions :global(svg),.reset :global(svg),.orderOptions :global(svg){width:15px;height:15px;flex:0 0 auto}.routeOptions span,.orderOptions span{display:grid;text-align:left}.routeOptions b,.orderOptions b{font-size:9px}.routeOptions small,.orderOptions small{font-size:7px;color:#858995}.reset{color:#9da0a9}.reset span{font-size:9px}.orderDock{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 10px 8px 13px;border-radius:16px}.orderOptions{display:flex;gap:6px}.orderOptions button{min-height:38px;padding:0 12px}
        @media(max-width:720px){.routeDockWrap{width:calc(100% - 18px);margin:8px auto 16px}.marathonHub{grid-template-columns:30px minmax(0,1fr) 18px;padding:10px 11px}.marathonHub b{font-size:11px}.marathonHub em{font-size:7px}.routeDock{grid-template-columns:1fr;padding:10px;gap:8px}.routeTitle{padding-right:40px}.routeOptions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:100%;gap:5px}.routeOptions button{min-width:0;padding:0 6px;justify-content:center}.routeOptions button>span{min-width:0}.routeOptions b{font-size:8px}.routeOptions small{font-size:6px;white-space:nowrap}.reset{position:absolute;right:10px;top:67px;width:34px;height:34px;min-height:34px;padding:0;justify-content:center}.reset span{display:none}.orderDock{align-items:stretch;flex-direction:column;gap:6px;padding:9px}.orderLabel{padding-left:3px}.orderOptions{display:grid;grid-template-columns:1fr 1fr;width:100%}.orderOptions button{justify-content:center;min-width:0;padding:0 8px}.orderOptions b{font-size:8px}.orderOptions small{font-size:6px}}
        @media(max-width:390px){.routeDockWrap{width:calc(100% - 12px)}.routeOptions button{gap:4px}.routeOptions :global(svg){width:13px}.routeOptions small{display:none}.orderOptions button{gap:5px}.marathonHub em{display:none}}
      `}</style>
    </section>
  );
}
