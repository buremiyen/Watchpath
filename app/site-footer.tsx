"use client";

import { useEffect, useState } from "react";
import FeedbackForm from "./feedback-form";
import type { Lang } from "./i18n";

const labels = {
  tr: { tagline: "Kişisel film maratonlarını planla, takip et ve bitir.", about: "Hakkımda", feedback: "Geri bildirim", marathons: "Diğer maratonlar", open: "Açık kaynak", terms: "Şartlar", privacy: "Gizlilik", title: "Geri bildirim gönder", intro: "Fikrini, hatayı ya da görmek istediğin özelliği yaz." },
  en: { tagline: "Plan, track and finish personal movie marathons.", about: "About", feedback: "Feedback", marathons: "Other marathons", open: "Open source", terms: "Terms", privacy: "Privacy", title: "Send feedback", intro: "Share an idea, a bug or a feature you would like to see." },
  de: { tagline: "Plane, verfolge und beende persönliche Film-Marathons.", about: "Über mich", feedback: "Feedback", marathons: "Weitere Marathons", open: "Open Source", terms: "Bedingungen", privacy: "Datenschutz", title: "Feedback senden", intro: "Teile eine Idee, einen Fehler oder einen Funktionswunsch." },
  es: { tagline: "Planifica, sigue y termina maratones de cine personales.", about: "Acerca de", feedback: "Comentarios", marathons: "Otros maratones", open: "Código abierto", terms: "Términos", privacy: "Privacidad", title: "Enviar comentarios", intro: "Comparte una idea, un error o una función que quieras ver." },
  fr: { tagline: "Planifie, suis et termine tes marathons personnels.", about: "À propos", feedback: "Avis", marathons: "Autres marathons", open: "Open source", terms: "Conditions", privacy: "Confidentialité", title: "Envoyer un avis", intro: "Partage une idée, un bug ou une fonctionnalité souhaitée." },
  ja: { tagline: "自分だけの映画マラソンを計画・記録・完走。", about: "このサイトについて", feedback: "フィードバック", marathons: "ほかのマラソン", open: "オープンソース", terms: "利用規約", privacy: "プライバシー", title: "フィードバックを送る", intro: "アイデア、不具合、追加してほしい機能を送ってください。" },
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
            <a href="/about">{copy.about}</a>
            <button type="button" onClick={() => setFeedbackOpen(true)}>{copy.feedback}</button>
            <a href="/marathons" className="marathonLink">{copy.marathons}</a>
            <a href="/terms">{copy.terms}</a>
            <a href="/privacy">{copy.privacy}</a>
          </div>
          <div className="socials" aria-label="Sosyal medya hesapları">
            <a href="https://github.com/buremiyen" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://instagram.com/byenier.art" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.behance.net/burhanyenier" target="_blank" rel="noreferrer">Behance</a>
            <a href="https://www.linkedin.com/in/buremiyen" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footerBottom">
          <span>© 2026 Watchpath · Buremiye</span>
          <a href="https://github.com/buremiyen/Watchpath" target="_blank" rel="noreferrer">{copy.open}</a>
        </div>
      </footer>

      {feedbackOpen && (
        <div className="feedbackBack" onMouseDown={(event) => event.target === event.currentTarget && setFeedbackOpen(false)}>
          <section className="feedbackGlass" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
            <button type="button" className="close" onClick={() => setFeedbackOpen(false)} aria-label="Geri bildirim penceresini kapat">Kapat</button>
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
