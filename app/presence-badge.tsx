"use client";

import { useEffect, useState } from "react";
import { UsersRound } from "lucide-react";
import type { Lang } from "./i18n";

const PRESENCE_KEY = "watchpath-presence-id";

function getPresenceId() {
  const existing = localStorage.getItem(PRESENCE_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(PRESENCE_KEY, id);
  return id;
}

const labels = {
  tr: { loading: "Canlı sayaç", online: "kişi çevrimiçi" },
  en: { loading: "Live count", online: "people online" },
  de: { loading: "Live-Zähler", online: "Personen online" },
  es: { loading: "Contador en vivo", online: "personas en línea" },
  fr: { loading: "Compteur en direct", online: "personnes en ligne" },
  ja: { loading: "ライブ人数", online: "人がオンライン" },
} as const;

export default function PresenceBadge({ lang }: { lang: Lang }) {
  const [count, setCount] = useState<number | null>(null);
  const copy = labels[lang];

  useEffect(() => {
    const presenceId = getPresenceId();
    let active = true;

    const heartbeat = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/presence", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ presenceId }),
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as { online: number };
        if (active) setCount(data.online);
      } catch {
        // The badge stays unobtrusive if the presence service is temporarily unavailable.
      }
    };

    void heartbeat();
    const timer = window.setInterval(heartbeat, 25_000);
    const onVisibility = () => void heartbeat();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="presenceBadge" aria-live="polite" title="Son 90 saniyede aktif olan ziyaretçiler">
      <i aria-hidden="true" />
      <UsersRound aria-hidden="true" />
      <span>{count === null ? copy.loading : `${count} ${copy.online}`}</span>
    </div>
  );
}
