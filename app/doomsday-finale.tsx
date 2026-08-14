"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, Play, Sparkles, Trophy } from "lucide-react";
import type { Lang } from "./i18n";

const poster = (path: string) => `https://image.tmdb.org/t/p/w185${path}`;

const branches = [
  {
    name: "Avengers",
    items: [
      ["The Avengers", "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"],
      ["Age of Ultron", "/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg"],
      ["Infinity War", "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"],
      ["Endgame", "/or06FN3Dka5tukK1e9sl16pB3iy.jpg"],
    ],
  },
  {
    name: "Steve Rogers",
    items: [
      ["The First Avenger", "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg"],
      ["The Winter Soldier", "/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg"],
      ["Civil War", "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg"],
    ],
  },
  {
    name: "Multiverse",
    items: [
      ["Loki", "/voHUmluYmKyleFkTu3lOXQG702u.jpg"],
      ["No Way Home", "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"],
      ["Multiverse of Madness", "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"],
    ],
  },
  {
    name: "X-Men",
    items: [
      ["X-Men", "/bRDAc4GogyS9ci3ow7UnInOcriN.jpg"],
      ["Days of Future Past", "/tYfijzolzgoMOtegh1Y7j2Enorg.jpg"],
      ["Deadpool & Wolverine", "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"],
    ],
  },
  {
    name: "Yeni Avengers",
    items: [
      ["Brave New World", "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg"],
      ["Thunderbolts*", "/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg"],
    ],
  },
  {
    name: "Fantastic Four",
    items: [["First Steps", "/x26MtUlwtWD26d0G0FXcppxCJio.jpg"]],
  },
] as const;

const requiredMovies = [
  "iron-man", "hulk", "iron-man-2", "thor", "cap1", "avengers", "iron-man-3", "thor2",
  "winter", "gotg", "ultron", "antman", "civil", "strange", "gotg2", "homecoming",
  "ragnarok", "black-panther", "infinity", "antman-wasp", "captain-marvel", "endgame",
  "far-from-home", "black-widow", "shangchi", "eternals", "no-way-home", "strange2",
  "thor-love", "wakanda", "quantumania", "gotg3", "marvels", "deadpool-wolverine",
  "brave-new-world", "thunderbolts", "fantastic-four", "brand-new-day",
];

const labels = {
  tr: { tree: "MARVEL YOL AĞACI", roads: "Doomsday'e giden yollar", treeDesc: "Altı hikâye damarı, tek bir finalde birleşiyor.", finale: "MARATON FİNALİ", date: "SİNEMA ÇIKIŞ TARİHİ", dateValue: "18 ARALIK 2026", description: "Üç ayrı evrenden kahramanların yolları kesişiyor. Watchpath, seçtiğin rotayı bu tarihe kadar kalan zamana göre her işaretlemede yeniden dağıtır.", trailer: "Resmî fragmanı izle", ticket: "Paribu'da kontrol et", ticketNote: "Türkiye bilet satışı henüz doğrulanmadı; bağlantı yaklaşan filmler sayfasını açar.", complete: "TÜM ANA FİLMLER TAMAMLANDI", congrats: "🎉 Tebrikler, başardın!", ready: "Doomsday için hazırsın." },
  en: { tree: "MARVEL STORY TREE", roads: "Roads to Doomsday", treeDesc: "Six story lines converge in one finale.", finale: "MARATHON FINALE", date: "THEATRICAL RELEASE", dateValue: "DECEMBER 18, 2026", description: "Heroes from three universes are on a collision course. Watchpath redistributes your route toward this date after every check-in.", trailer: "Watch official trailer", ticket: "Check Paribu", ticketNote: "Turkey ticket sales are not confirmed; this opens the upcoming movies page.", complete: "ALL CORE MOVIES COMPLETE", congrats: "🎉 Congratulations!", ready: "You are ready for Doomsday." },
  de: { tree: "MARVEL-STORYBAUM", roads: "Wege zu Doomsday", treeDesc: "Sechs Handlungsstränge führen zu einem Finale.", finale: "MARATHON-FINALE", date: "KINOSTART", dateValue: "18. DEZEMBER 2026", description: "Helden aus drei Universen treffen aufeinander. Watchpath verteilt deine Route nach jedem Haken bis zu diesem Datum neu.", trailer: "Offiziellen Trailer ansehen", ticket: "Bei Paribu prüfen", ticketNote: "Der Ticketverkauf in der Türkei ist nicht bestätigt; der Link öffnet kommende Filme.", complete: "ALLE HAUPTFILME ABGESCHLOSSEN", congrats: "🎉 Glückwunsch!", ready: "Du bist bereit für Doomsday." },
  es: { tree: "ÁRBOL MARVEL", roads: "Caminos hacia Doomsday", treeDesc: "Seis líneas narrativas convergen en un final.", finale: "FINAL DEL MARATÓN", date: "ESTRENO EN CINES", dateValue: "18 DE DICIEMBRE DE 2026", description: "Héroes de tres universos están a punto de encontrarse. Watchpath redistribuye tu ruta hasta esta fecha con cada marca.", trailer: "Ver tráiler oficial", ticket: "Consultar Paribu", ticketNote: "La venta en Turquía no está confirmada; el enlace abre próximos estrenos.", complete: "PELÍCULAS PRINCIPALES COMPLETADAS", congrats: "🎉 ¡Enhorabuena!", ready: "Estás listo para Doomsday." },
  fr: { tree: "ARBRE MARVEL", roads: "Les chemins vers Doomsday", treeDesc: "Six fils narratifs convergent vers une finale.", finale: "FIN DU MARATHON", date: "SORTIE AU CINÉMA", dateValue: "18 DÉCEMBRE 2026", description: "Les héros de trois univers vont se rencontrer. Watchpath redistribue ton parcours jusqu’à cette date après chaque validation.", trailer: "Voir la bande-annonce", ticket: "Vérifier sur Paribu", ticketNote: "La billetterie en Turquie n’est pas confirmée ; le lien ouvre les prochaines sorties.", complete: "TOUS LES FILMS PRINCIPAUX TERMINÉS", congrats: "🎉 Félicitations !", ready: "Tu es prêt pour Doomsday." },
  ja: { tree: "MARVEL ストーリーツリー", roads: "Doomsdayへの道", treeDesc: "6つの物語がひとつのフィナーレへ集結します。", finale: "マラソン・フィナーレ", date: "劇場公開日", dateValue: "2026年12月18日", description: "3つの世界のヒーローが交差します。チェックするたびに、この日までのルートを再配分します。", trailer: "公式予告を見る", ticket: "Paribuで確認", ticketNote: "トルコでの販売は未確認です。公開予定作品ページを開きます。", complete: "主要映画をすべて完了", congrats: "🎉 おめでとうございます！", ready: "Doomsdayの準備は完了です。" },
} as const;

export default function DoomsdayFinale({ lang }: { lang: Lang }) {
  const [complete, setComplete] = useState(false);
  const copy = labels[lang];

  useEffect(() => {
    const check = () => {
      try {
        const progress = JSON.parse(localStorage.getItem("watchpath-progress") || "{}") as Record<string, boolean>;
        setComplete(requiredMovies.every((id) => progress[id]));
      } catch {
        setComplete(false);
      }
    };
    check();
    window.addEventListener("watchpath-progress", check);
    return () => window.removeEventListener("watchpath-progress", check);
  }, []);

  return (
    <section className="finale">
      <div className="treeGlass">
        <div className="eyebrow">{copy.tree}</div>
        <h2>{copy.roads}</h2>
        <p>{copy.treeDesc}</p>
        <div className="tree">
          {branches.map((branch) => (
            <article className="branch" key={branch.name}>
              <b>{branch.name}</b>
              {branch.items.map(([title, image]) => (
                <div className="movieNode" key={title}>
                  <img src={poster(image)} alt="" />
                  <span>{title}</span>
                </div>
              ))}
            </article>
          ))}
        </div>
        <div className="treeMerge"><i /><span>AVENGERS: DOOMSDAY</span><i /></div>
      </div>

      <article className="doomsdayGlass">
        <div className="poster">
          <img
            src="https://image.tmdb.org/t/p/original/6eB2oh1SplddsZYCdayrIdrIGLd.jpg"
            alt="Avengers: Doomsday afişi"
          />
        </div>
        <div className="copy">
          <div className="badge"><Sparkles /> {copy.finale}</div>
          <small>MARVEL STUDIOS</small>
          <h3>AVENGERS</h3>
          <h1>DOOMSDAY</h1>
          <div className="date">
            <CalendarDays />
            <div><em>{copy.date}</em><b>{copy.dateValue}</b></div>
          </div>
          <p>
            {copy.description}
          </p>
          <div className="actions">
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("watchpath-doomsday-trailer"))}>
              <Play /> {copy.trailer}
            </button>
            <button type="button" className="secondary" onClick={() => window.dispatchEvent(new CustomEvent("watchpath-doomsday-ticket"))}>
              <ExternalLink /> {copy.ticket}
            </button>
          </div>
          <small className="ticketNote">{copy.ticketNote}</small>
        </div>
      </article>

      {complete && (
        <div className="celebrate" role="status">
          <Trophy />
          <small>{copy.complete}</small>
          <h2>{copy.congrats}</h2>
          <p>{copy.ready}</p>
        </div>
      )}
    </section>
  );
}
