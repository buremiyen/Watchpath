"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Clapperboard } from "lucide-react";

const groups = [
  {
    name: "Spider-Man",
    accent: "#e64b5f",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    items: ["Spider-Man (2002)", "Spider-Man 2", "Spider-Man 3", "The Amazing Spider-Man", "The Amazing Spider-Man 2", "Spider-Man: Homecoming", "Spider-Man: Far From Home", "Spider-Man: No Way Home", "Spider-Man: Brand New Day"],
  },
  {
    name: "Batman",
    accent: "#e9c76c",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    items: ["Batman Begins", "The Dark Knight", "The Dark Knight Rises", "Batman v Superman: Dawn of Justice", "Zack Snyder’s Justice League", "The Batman"],
  },
  {
    name: "X-Men",
    accent: "#8a78ff",
    poster: "https://image.tmdb.org/t/p/w500/tYfijzolzgoMOtegh1Y7j2Enorg.jpg",
    items: ["X-Men", "X2: X-Men United", "X-Men: The Last Stand", "X-Men Origins: Wolverine", "X-Men: First Class", "The Wolverine", "X-Men: Days of Future Past", "X-Men: Apocalypse", "Logan", "Dark Phoenix", "The New Mutants", "Deadpool & Wolverine"],
  },
  {
    name: "Star Wars",
    accent: "#72a9ff",
    poster: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    items: ["Episode I – The Phantom Menace", "Episode II – Attack of the Clones", "Episode III – Revenge of the Sith", "Solo: A Star Wars Story", "Rogue One: A Star Wars Story", "Episode IV – A New Hope", "Episode V – The Empire Strikes Back", "Episode VI – Return of the Jedi", "Episode VII – The Force Awakens", "Episode VIII – The Last Jedi", "Episode IX – The Rise of Skywalker"],
  },
  {
    name: "Harry Potter",
    accent: "#60c7a3",
    poster: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    items: ["Harry Potter and the Philosopher's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Goblet of Fire", "Harry Potter and the Order of the Phoenix", "Harry Potter and the Half-Blood Prince", "Harry Potter and the Deathly Hallows – Part 1", "Harry Potter and the Deathly Hallows – Part 2"],
  },
] as const;

const STORAGE_KEY = "watchpath-other-progress";

export default function MarathonsPage() {
  const [open, setOpen] = useState("Spider-Man");
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")); } catch { setDone({}); }
  }, []);

  const toggle = (key: string) => setDone((current) => {
    const next = { ...current, [key]: !current[key] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  });

  return (
    <main className="marathonsPage">
      <a className="back" href="/"><ArrowLeft /> Watchpath&apos;e dön</a>
      <section className="marathonsHero">
        <div><small>WATCHPATH KOLEKSİYONLARI</small><h1>Bir sonraki evrenini seç.</h1><p>Doomsday dışında popüler seriler için gerçek izleme sıraları. İşaretlediklerin bu cihazda saklanır.</p></div>
        <Clapperboard />
      </section>
      <section className="marathonGrid">
        {groups.map((group) => {
          const completed = group.items.filter((_, index) => done[`${group.name}-${index}`]).length;
          const isOpen = open === group.name;
          return (
            <article className={`marathonCard ${isOpen ? "open" : ""}`} key={group.name} style={{ "--accent": group.accent } as React.CSSProperties}>
              <button className="marathonSummary" type="button" onClick={() => setOpen(isOpen ? "" : group.name)} aria-expanded={isOpen}>
                <img src={group.poster} alt="" />
                <span><small>{group.items.length} YAPIM</small><b>{group.name}</b><em>{completed} / {group.items.length} tamamlandı</em></span>
                <i><strong>{Math.round((completed / group.items.length) * 100)}%</strong><ChevronDown /></i>
              </button>
              {isOpen && (
                <div className="marathonItems">
                  {group.items.map((item, index) => {
                    const key = `${group.name}-${index}`;
                    return (
                      <button type="button" className={done[key] ? "done" : ""} key={item} onClick={() => toggle(key)}>
                        <span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b><Check />
                      </button>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
