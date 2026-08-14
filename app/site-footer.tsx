"use client";

import { useEffect, useState } from "react";
import {
  Clapperboard,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  UserRound,
  X,
} from "lucide-react";
import FeedbackForm from "./feedback-form";
import type { Lang } from "./i18n";

const labels = {
  tr: { tagline: "Kişisel film maratonlarını planla, takip et ve bitir.", about: "Hakkımda", feedback: "Geri bildirim", marathons: "Diğer maratonlar", open: "Açık kaynak", title: "Geri bildirim gönder", intro: "Fikrini, hatayı ya da görmek istediğin özelliği yaz." },
  en: { tagline: "Plan, track and finish personal movie marathons.", about: "About", feedback: "Feedback", marathons: "Other marathons", open: "Open source", title: "Send feedback", intro: "Share an idea, a bug or a feature you would like to see." },
  de: { tagline: "Plane, verfolge und beende persönliche Film-Marathons.", about: "Über mich", feedback: "Feedback", marathons: "Weitere Marathons", open: "Open Source", title: "Feedback senden", intro: "Teile eine Idee, einen Fehler oder einen Funktionswunsch." },
  es: { tagline: "Planifica, sigue y termina maratones de cine personales.", about: "Acerca de", feedback: "Comentarios", marathons: "Otros maratones", open: "Código abierto", title: "Enviar comentarios", intro: "Comparte una idea, un error o una función que quieras ver." },
  fr: { tagline: "Planifie, suis et termine tes marathons personnels.", about: "À propos", feedback: "Avis", marathons: "Autres marathons", open: "Open source", title: "Envoyer un avis", intro: "Partage une idée, un bug ou une fonctionnalité souhaitée." },
  ja: { tagline: "自分だけの映画マラソンを計画・記録・完走。", about: "このサイトについて", feedback: "フィードバック", marathons: "ほかのマラソン", open: "オープンソース", title: "フィードバックを送る", intro: "アイデア、不具合、追加してほしい機能を送ってください。" },
} as const;

export default function SiteFooter() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("tr");
  const copy = labels[lang];

  useEffect(() => {
    const saved = (localStorage.getItem("watchpath-lang") || "tr") as Lang;
    if (saved in labels) setLang(saved);
    const handler = (event: Event) => setLang((event as CustomEvent<Lang>).detail);
    window.addEventListener("watchpath-language", handler);
    return () => window.removeEventListener("watchpath-language", handler);
  }, []);

  return (
    <>
      <footer className="siteFooterNew">
        <div className="footerTop">
          <div className="footerBrand">
            <b>WATCHPATH</b>
            <span>{copy.tagline}</span>
          </div>
          <div className="footerMenu">
            <a href="/about"><UserRound />{copy.about}</a>
            <button type="button" onClick={() => setFeedbackOpen(true)}><MessageCircle />{copy.feedback}</button>
            <a href="/marathons" className="marathonLink"><Clapperboard />{copy.marathons}</a>
          </div>
          <div className="socials" aria-label="Sosyal medya hesapları">
            <a href="https://github.com/buremiyen" target="_blank" rel="noreferrer" title="GitHub"><Github /></a>
            <a href="https://instagram.com/byenier.art" target="_blank" rel="noreferrer" title="Instagram"><Instagram /></a>
            <a href="https://www.behance.net/burhanyenier" target="_blank" rel="noreferrer" title="Behance"><b>Bē</b></a>
            <a href="https://www.linkedin.com/in/buremiyen" target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin /></a>
          </div>
        </div>
        <div className="footerBottom">
          <span>© 2026 Watchpath · Buremiye</span>
          <a href="https://github.com/buremiyen/Watchpath" target="_blank" rel="noreferrer">{copy.open} <ExternalLink /></a>
        </div>
      </footer>

      {feedbackOpen && (
        <div className="feedbackBack" onMouseDown={(event) => event.target === event.currentTarget && setFeedbackOpen(false)}>
          <section className="feedbackGlass" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
            <button type="button" className="close" onClick={() => setFeedbackOpen(false)} aria-label="Geri bildirim penceresini kapat"><X /></button>
            <small>WATCHPATH</small>
            <h2 id="feedback-title">{copy.title}</h2>
            <p>{copy.intro}</p>
            <FeedbackForm compact lang={lang} />
          </section>
        </div>
      )}
    </>
  );
}
