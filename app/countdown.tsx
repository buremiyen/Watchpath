"use client";

import { useEffect, useState } from "react";
import type { Lang } from "./i18n";
import { DOOMSDAY_DATE } from "./marvel-data";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(): Remaining {
  const difference = Math.max(0, DOOMSDAY_DATE.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor(difference / 3_600_000) % 24,
    minutes: Math.floor(difference / 60_000) % 60,
    seconds: Math.floor(difference / 1_000) % 60,
  };
}

const labels = {
  tr: { date: "18 Aralık 2026", cinema: "Sinemalarda", day: "Gün", hour: "Saat", minute: "Dakika", second: "Saniye" },
  en: { date: "December 18, 2026", cinema: "In theaters", day: "Days", hour: "Hours", minute: "Minutes", second: "Seconds" },
  de: { date: "18. Dezember 2026", cinema: "Im Kino", day: "Tage", hour: "Stunden", minute: "Minuten", second: "Sekunden" },
  es: { date: "18 de diciembre de 2026", cinema: "En cines", day: "Días", hour: "Horas", minute: "Minutos", second: "Segundos" },
  fr: { date: "18 décembre 2026", cinema: "Au cinéma", day: "Jours", hour: "Heures", minute: "Minutes", second: "Secondes" },
  ja: { date: "2026年12月18日", cinema: "劇場公開", day: "日", hour: "時間", minute: "分", second: "秒" },
} as const;

export default function Countdown({ lang }: { lang: Lang }) {
  const [remaining, setRemaining] = useState<Remaining>(getRemaining);
  const copy = labels[lang];

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const cells = [
    [remaining.days, copy.day],
    [remaining.hours, copy.hour],
    [remaining.minutes, copy.minute],
    [remaining.seconds, copy.second],
  ] as const;

  return (
    <section className="countdownPanel" aria-label="Avengers Doomsday geri sayımı">
      <div className="countdownCopy">
        <small>AVENGERS: DOOMSDAY</small>
        <strong>{copy.date}</strong>
        <span>{copy.cinema}</span>
      </div>
      <div className="countdownGrid">
        {cells.map(([value, label], index) => (
          <div className="countdownCell" key={label}>
            <b>{String(value).padStart(index === 0 ? 1 : 2, "0")}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
