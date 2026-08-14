import type { Metadata } from "next";
import { ArrowLeft, MessageCircle } from "lucide-react";
import FeedbackForm from "../feedback-form";

export const metadata: Metadata = {
  title: "Geri Bildirim — Watchpath",
  description: "Watchpath için öneri, hata bildirimi veya yeni maraton fikri gönder.",
};

export default function FeedbackPage() {
  return (
    <main className="subPage">
      <a className="back" href="/"><ArrowLeft /> Watchpath&apos;e dön</a>
      <section className="subPageGlass">
        <div className="subPageIcon"><MessageCircle /></div>
        <small>WATCHPATH</small>
        <h1>Geri bildirim gönder</h1>
        <p>Adını, konuyu ve mesajını yaz. Mesajın kaydedilir ve e-posta uygulaman gönderime hazır şekilde açılır.</p>
        <FeedbackForm />
      </section>
    </main>
  );
}
