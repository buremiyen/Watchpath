"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { Lang } from "./i18n";

const labels = {
  tr: { name: "Adın", nameHint: "Adın", subject: "Konu", subjectHint: "Örn. Yeni maraton önerisi", message: "Mesajın", messageHint: "Ne ekleyelim veya neyi düzeltelim?", preparing: "Hazırlanıyor…", saved: "Kaydedildi", send: "E-posta ile gönder", note: "Mesajın Watchpath'te güvenle kaydedilir; e-posta uygulaman açılırsa son gönderimi oradan onaylarsın." },
  en: { name: "Name", nameHint: "Your name", subject: "Subject", subjectHint: "e.g. New marathon idea", message: "Message", messageHint: "What should we add or fix?", preparing: "Preparing…", saved: "Saved", send: "Send by email", note: "Your message is saved in Watchpath; if your email app opens, confirm the final send there." },
  de: { name: "Name", nameHint: "Dein Name", subject: "Betreff", subjectHint: "z. B. Neue Marathon-Idee", message: "Nachricht", messageHint: "Was sollen wir ergänzen oder verbessern?", preparing: "Wird vorbereitet…", saved: "Gespeichert", send: "Per E-Mail senden", note: "Deine Nachricht wird in Watchpath gespeichert; bestätige den Versand in deiner E-Mail-App." },
  es: { name: "Nombre", nameHint: "Tu nombre", subject: "Asunto", subjectHint: "Ej. Nuevo maratón", message: "Mensaje", messageHint: "¿Qué añadimos o corregimos?", preparing: "Preparando…", saved: "Guardado", send: "Enviar por correo", note: "Tu mensaje se guarda en Watchpath; confirma el envío final en tu aplicación de correo." },
  fr: { name: "Nom", nameHint: "Ton nom", subject: "Objet", subjectHint: "Ex. Nouveau marathon", message: "Message", messageHint: "Que faut-il ajouter ou corriger ?", preparing: "Préparation…", saved: "Enregistré", send: "Envoyer par e-mail", note: "Ton message est enregistré dans Watchpath ; confirme l’envoi dans ton application e-mail." },
  ja: { name: "名前", nameHint: "お名前", subject: "件名", subjectHint: "例：新しいマラソン案", message: "メッセージ", messageHint: "追加・修正したい内容", preparing: "準備中…", saved: "保存済み", send: "メールで送信", note: "メッセージはWatchpathに保存されます。メールアプリが開いたら送信を確定してください。" },
} as const;

export default function FeedbackForm({ compact = false, lang = "tr" }: { compact?: boolean; lang?: Lang }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "saved">("idle");
  const copy = labels[lang];

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, subject, message }),
      });
      if (response.ok) setStatus("saved");
    } catch {
      // The email handoff below is still available if storage is temporarily unavailable.
    }

    const body = `Gönderen: ${name}\n\n${message}`;
    window.location.href = `mailto:buremiyen@gmail.com?subject=${encodeURIComponent(
      `[Watchpath] ${subject}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={`feedbackForm ${compact ? "compact" : ""}`} onSubmit={submit}>
      <label>
        {copy.name}
        <input required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder={copy.nameHint} />
      </label>
      <label>
        {copy.subject}
        <input required maxLength={140} value={subject} onChange={(event) => setSubject(event.target.value)} placeholder={copy.subjectHint} />
      </label>
      <label>
        {copy.message}
        <textarea required maxLength={4000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={copy.messageHint} />
      </label>
      <button className="send" disabled={status === "sending"}>
        {status === "saved" ? <CheckCircle2 /> : <Send />}
        {status === "sending" ? copy.preparing : status === "saved" ? copy.saved : copy.send}
      </button>
      <small className="feedbackNote">
        {copy.note}
      </small>
    </form>
  );
}
