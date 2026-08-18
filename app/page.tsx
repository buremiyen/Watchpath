"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Film,
  Home,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";
import AmbientEffects from "./ambient-effects";
import ClientTools from "./client-tools";
import Countdown from "./countdown";
import DoomsdayFinale from "./doomsday-finale";
import { Lang, languages, localeFor, tx } from "./i18n";
import {
  allTitles,
  DOOMSDAY_DATE,
  routeTitles,
  titleUnits,
  type Title,
  type Track,
  type Unit,
} from "./marvel-data";
import PresenceBadge from "./presence-badge";
import RoadmapExperience from "./roadmap-experience";

type Filter = "all" | "movie" | "series" | "watched" | "unwatched";
type Scope = "all" | Track;
type RouteMode = "quick" | "balanced" | "complete";
type OrderMode = "chronological" | "release";
type Tab = "home" | "titles" | "calendar";

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const chronologicalIds = [
  "cap1","captain-marvel","iron-man","iron-man-2","hulk","thor","avengers","iron-man-3","thor2","winter",
  "gotg","gotg2","ultron","antman","civil","black-widow","black-panther","homecoming","strange","ragnarok",
  "antman-wasp","infinity","endgame","loki","wandavision","falcon","shangchi","eternals","far-from-home","no-way-home",
  "hawkeye","moon-knight","strange2","ms-marvel","thor-love","she-hulk","wakanda","guardians-holiday","quantumania","gotg3",
  "secret-invasion","marvels","echo","agatha","brave-new-world","born-again-1","thunderbolts","ironheart","fantastic-four",
  "xmen","x2","x3","wolverine-origins","firstclass","the-wolverine","dofp","apocalypse","logan","dark-phoenix","new-mutants","xmen97",
  "deadpool-wolverine","brand-new-day","wonder-man","born-again-2","one-last-kill","visionquest",
];
const chronologyIndex = new Map(chronologicalIds.map((id, index) => [id, index]));
const orderTitles = (titles: Title[], order: OrderMode) => {
  if (order === "release") return titles;
  return [...titles].sort((a, b) => {
    const ai = chronologyIndex.get(a.id) ?? 10_000 + a.year;
    const bi = chronologyIndex.get(b.id) ?? 10_000 + b.year;
    return ai - bi;
  });
};

const pageLabels = {
  tr: { routes: { quick: "Hızlı rota", balanced: "Dengeli rota", complete: "Tam maraton" }, orders: { chronological: "Kronolojik · Doomsday odaklı", release: "Çıkış sırası · klasik" }, scopes: { all: "Tüm evrenler", main: "Ana hikâye", xmen: "X-Men & Multiverse", optional: "Opsiyonel" }, personal: "KİŞİSEL DOOMSDAY PLANI", headline: ["İzleme yolun,", "bugün yeniden hesaplandı."], title: "yapım", next: "sırada", today: "BUGÜNÜN ROTASI", nextStops: "SONRAKİ DURAKLAR", left: "gün kaldı", library: "YAPIMLIK KÜTÜPHANE", result: "sonuç", seriesDone: "Diziyi tamamladın", markSeries: "Tüm bölümleri işaretle", calendar: "KALAN ZAMANA GÖRE", day: "gün kaldı", task: "görev", hour: "saat" },
  en: { routes: { quick: "Quick route", balanced: "Balanced route", complete: "Complete marathon" }, orders: { chronological: "Chronological · Doomsday focused", release: "Release order · classic" }, scopes: { all: "All universes", main: "Main story", xmen: "X-Men & Multiverse", optional: "Optional" }, personal: "YOUR DOOMSDAY PLAN", headline: ["Your watch path", "was recalculated today."], title: "titles", next: "next", today: "TODAY'S ROUTE", nextStops: "NEXT STOPS", left: "days left", library: "TITLE LIBRARY", result: "results", seriesDone: "Series completed", markSeries: "Mark all episodes", calendar: "BASED ON TIME LEFT", day: "days left", task: "tasks", hour: "hours" },
  de: { routes: { quick: "Schnelle Route", balanced: "Ausgewogene Route", complete: "Kompletter Marathon" }, orders: { chronological: "Chronologisch · Doomsday", release: "Veröffentlichung · klassisch" }, scopes: { all: "Alle Universen", main: "Haupthandlung", xmen: "X-Men & Multiversum", optional: "Optional" }, personal: "DEIN DOOMSDAY-PLAN", headline: ["Dein Filmplan wurde", "heute neu berechnet."], title: "Titel", next: "als Nächstes", today: "HEUTIGE ROUTE", nextStops: "NÄCHSTE STATIONEN", left: "Tage übrig", library: "TITEL-BIBLIOTHEK", result: "Ergebnisse", seriesDone: "Serie abgeschlossen", markSeries: "Alle Folgen markieren", calendar: "NACH VERBLEIBENDER ZEIT", day: "Tage übrig", task: "Aufgaben", hour: "Stunden" },
  es: { routes: { quick: "Ruta rápida", balanced: "Ruta equilibrada", complete: "Maratón completo" }, orders: { chronological: "Cronológico · Doomsday", release: "Estreno · clásico" }, scopes: { all: "Todos los universos", main: "Historia principal", xmen: "X-Men y Multiverso", optional: "Opcional" }, personal: "TU PLAN DOOMSDAY", headline: ["Tu ruta de visionado", "se recalculó hoy."], title: "títulos", next: "siguiente", today: "RUTA DE HOY", nextStops: "PRÓXIMAS PARADAS", left: "días restantes", library: "BIBLIOTECA DE TÍTULOS", result: "resultados", seriesDone: "Serie completada", markSeries: "Marcar todos los episodios", calendar: "SEGÚN EL TIEMPO RESTANTE", day: "días restantes", task: "tareas", hour: "horas" },
  fr: { routes: { quick: "Parcours rapide", balanced: "Parcours équilibré", complete: "Marathon complet" }, orders: { chronological: "Chronologique · Doomsday", release: "Sortie · classique" }, scopes: { all: "Tous les univers", main: "Histoire principale", xmen: "X-Men et Multivers", optional: "Optionnel" }, personal: "TON PLAN DOOMSDAY", headline: ["Ton parcours a été", "recalculé aujourd’hui."], title: "titres", next: "ensuite", today: "PARCOURS DU JOUR", nextStops: "PROCHAINES ÉTAPES", left: "jours restants", library: "BIBLIOTHÈQUE DE TITRES", result: "résultats", seriesDone: "Série terminée", markSeries: "Cocher tous les épisodes", calendar: "SELON LE TEMPS RESTANT", day: "jours restants", task: "tâches", hour: "heures" },
  ja: { routes: { quick: "クイックルート", balanced: "バランスルート", complete: "完全マラソン" }, orders: { chronological: "時系列 · Doomsday", release: "公開順 · クラシック" }, scopes: { all: "すべての世界", main: "メインストーリー", xmen: "X-MENとマルチバース", optional: "オプション" }, personal: "あなたのDOOMSDAYプラン", headline: ["視聴ルートを本日", "再計算しました。"], title: "作品", next: "次は", today: "今日のルート", nextStops: "次の予定", left: "日", library: "作品ライブラリ", result: "件", seriesDone: "シリーズ完了", markSeries: "全話をチェック", calendar: "残り時間に合わせて", day: "日", task: "タスク", hour: "時間" },
} as const;

export default function Page() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [tab, setTab] = useState<Tab>("home");
  const [lang, setLang] = useState<Lang>("tr");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [scope, setScope] = useState<Scope>("all");
  const [route, setRoute] = useState<RouteMode>("balanced");
  const [order, setOrder] = useState<OrderMode>("chronological");
  const deferredQuery = useDeferredValue(query);
  const labels = pageLabels[lang];

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem("watchpath-progress") || "{}"));
    } catch {
      setDone({});
    }

    const savedLanguage = (localStorage.getItem("watchpath-lang") || "tr") as Lang;
    if (languages.some((language) => language.id === savedLanguage)) setLang(savedLanguage);

    const savedRoute = localStorage.getItem("watchpath-route") as RouteMode | null;
    if (savedRoute && ["quick", "balanced", "complete"].includes(savedRoute)) setRoute(savedRoute);

    const savedOrder = localStorage.getItem("watchpath-order") as OrderMode | null;
    if (savedOrder && ["chronological", "release"].includes(savedOrder)) setOrder(savedOrder);
    else localStorage.setItem("watchpath-order", "chronological");

    const languageHandler = (event: Event) => setLang((event as CustomEvent<Lang>).detail);
    const routeHandler = (event: Event) => setRoute((event as CustomEvent<RouteMode>).detail);
    const orderHandler = (event: Event) => setOrder((event as CustomEvent<OrderMode>).detail);
    window.addEventListener("watchpath-language", languageHandler);
    window.addEventListener("watchpath-route", routeHandler);
    window.addEventListener("watchpath-order", orderHandler);
    return () => {
      window.removeEventListener("watchpath-language", languageHandler);
      window.removeEventListener("watchpath-route", routeHandler);
      window.removeEventListener("watchpath-order", orderHandler);
    };
  }, []);

  const saveProgress = (next: Record<string, boolean>) => {
    localStorage.setItem("watchpath-progress", JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("watchpath-progress"));
    return next;
  };

  const toggle = (id: string) =>
    setDone((current) => saveProgress({ ...current, [id]: !current[id] }));

  const selectedTitles = useMemo(() => orderTitles(routeTitles(route), order), [route, order]);
  const units = useMemo(() => titleUnits(selectedTitles), [selectedTitles]);
  const pending = useMemo(() => units.filter((unit) => !done[unit.id]), [done, units]);
  const completed = units.length - pending.length;
  const percentage = Math.round((completed / Math.max(1, units.length)) * 100);
  const remainingMinutes = pending.reduce((sum, unit) => sum + unit.runtime, 0);
  const nextTitle = pending[0]?.title;

  const now = new Date();
  const daysLeft = Math.max(0, Math.floor((DOOMSDAY_DATE.getTime() - Date.now()) / 86_400_000));
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("watchpath-next-poster", { detail: nextTitle?.poster || "" }));
  }, [nextTitle?.poster]);

  const schedule = useMemo(() => {
    const map = new Map<string, Unit[]>();
    if (!pending.length) return map;
    const calendarSlots = Math.max(1, Math.ceil((DOOMSDAY_DATE.getTime() - startOfToday.getTime()) / 86_400_000));
    const totalRuntime = pending.reduce((sum, unit) => sum + unit.runtime, 0);
    let elapsedRuntime = 0;
    pending.forEach((unit) => {
      const offset = Math.min(calendarSlots - 1, Math.floor((elapsedRuntime / Math.max(1, totalRuntime)) * calendarSlots));
      const date = new Date(startOfToday);
      date.setDate(date.getDate() + offset);
      const key = dateKey(date);
      map.set(key, [...(map.get(key) ?? []), unit]);
      elapsedRuntime += unit.runtime;
    });
    return map;
  }, [pending, startOfToday.getTime()]);

  const titleWatched = (title: Title) =>
    title.type === "movie" ? Boolean(done[title.id]) : (title.seasons ?? []).flat().every((episode) => Boolean(done[episode.id]));

  const toggleSeries = (title: Title) => {
    const episodeIds = (title.seasons ?? []).flat().map((episode) => episode.id);
    const markDone = !episodeIds.every((id) => done[id]);
    setDone((current) => {
      const next = { ...current };
      episodeIds.forEach((id) => { next[id] = markDone; });
      return saveProgress(next);
    });
  };

  const filteredTitles = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase(localeFor(lang));
    const orderedLibrary = orderTitles(allTitles, order);
    return orderedLibrary.filter((title) => {
      const watched = titleWatched(title);
      const matchesQuery = title.name.toLocaleLowerCase(localeFor(lang)).includes(normalizedQuery);
      const matchesScope = scope === "all" || title.track === scope;
      const matchesFilter = filter === "all" || filter === title.type || (filter === "watched" && watched) || (filter === "unwatched" && !watched);
      return matchesQuery && matchesScope && matchesFilter;
    });
  }, [deferredQuery, done, filter, lang, scope, order]);

  const runtime = (minutes: number) => `${Math.floor(minutes / 60)}${tx(lang, "hourShort")} ${minutes % 60}${tx(lang, "minuteShort")}`;
  const formatDate = (date: Date) => new Intl.DateTimeFormat(localeFor(lang), { day: "numeric", month: "long", weekday: "long" }).format(date);

  const todayUnits = schedule.get(dateKey(startOfToday)) ?? [];
  const upcoming = [...schedule.entries()].filter(([key]) => key > dateKey(startOfToday)).slice(0, 5);

  const previewPoster = (poster: string) => window.dispatchEvent(new CustomEvent("watchpath-next-poster", { detail: poster }));
  const restorePoster = () => previewPoster(nextTitle?.poster || "");

  const renderUnit = (unit: Unit) => (
    <article className="unit" key={unit.id} onPointerEnter={() => previewPoster(unit.title.poster)} onPointerLeave={restorePoster} onFocus={() => previewPoster(unit.title.poster)}>
      <img src={unit.title.poster} alt="" loading="lazy" decoding="async" />
      <div><b>{unit.title.name}</b><span>{unit.season ? `${tx(lang, "season")} ${unit.season} · ${tx(lang, "episode")} ${unit.episode}` : runtime(unit.runtime)}</span></div>
      <button type="button" onClick={() => toggle(unit.id)} aria-label={`${unit.title.name} tamamlandı`}><Check aria-hidden="true" /></button>
    </article>
  );

  const renderTitle = (title: Title) => {
    const watched = titleWatched(title);
    return (
      <article className={`card ${watched ? "finished" : ""}`} key={title.id} onPointerEnter={() => previewPoster(title.poster)} onPointerLeave={restorePoster} onFocus={() => previewPoster(title.poster)}>
        <img src={title.poster} alt={`${title.name} afişi`} loading="lazy" decoding="async" />
        <div className="info">
          <div className="titleRow">
            <div><div className={`trackTag track-${title.track}`}>{labels.scopes[title.track]}</div><h3>{title.name}</h3><p>{title.year} · {title.type === "series" ? tx(lang, "series") : runtime(title.runtime ?? 120)} · {title.platform}</p></div>
            {title.type === "series" && <button type="button" className="icon" onClick={() => setOpen((current) => ({ ...current, [title.id]: !current[title.id] }))} aria-expanded={Boolean(open[title.id])} aria-label={`${title.name} bölümlerini aç`}>{open[title.id] ? <ChevronDown /> : <ChevronRight />}</button>}
          </div>
          {title.type === "movie" ? <button type="button" className={`watch ${done[title.id] ? "on" : ""}`} onClick={() => toggle(title.id)}><Check aria-hidden="true" />{done[title.id] ? tx(lang, "watched") : tx(lang, "markWatched")}</button> : <button type="button" className={`watch ${watched ? "on" : ""}`} onClick={() => toggleSeries(title)}><Check aria-hidden="true" />{watched ? labels.seriesDone : labels.markSeries}</button>}
          {title.type === "series" && open[title.id] && <div className="episodes">{(title.seasons ?? []).map((season, seasonIndex) => <section key={`${title.id}-${seasonIndex + 1}`}><b>{tx(lang, "season")} {seasonIndex + 1}</b>{season.map((episode, episodeIndex) => <button type="button" key={episode.id} className={done[episode.id] ? "epDone" : ""} onClick={() => toggle(episode.id)}><span>{tx(lang, "episode")} {episodeIndex + 1}</span><Check aria-hidden="true" /></button>)}</section>)}</div>}
        </div>
      </article>
    );
  };

  return (
    <>
      <AmbientEffects />
      <ClientTools />
      <main className="watchpathApp">
        <header className="topbar">
          <a className="brandLockup" href="#top" aria-label="Watchpath ana sayfa"><img className="brandMark" src="/favicon.svg" width="42" height="42" alt="" aria-hidden="true" /><span><b>WATCHPATH</b><small>{tx(lang, "subtitle")}</small></span></a>
          <PresenceBadge lang={lang} />
        </header>

        <section className="hero" id="top">
          <div className="heroCopy"><div className="eyebrow"><Sparkles /> {labels.personal}</div><h1>{labels.headline[0]}<br /> {labels.headline[1]}</h1><p>{labels.routes[route]} · {labels.orders[order]} · {selectedTitles.length} {labels.title} · {labels.next} {nextTitle?.name ?? "Doomsday"}</p></div>
          <div className="progressOrb" aria-label={`Yüzde ${percentage} tamamlandı`} style={{ background: `radial-gradient(circle at center, rgba(17, 18, 24, 0.95) 57%, transparent 59%), conic-gradient(var(--red) 0 ${percentage}%, rgba(255, 255, 255, 0.09) ${percentage}% 100%)` }}><strong>{percentage}%</strong><span>{tx(lang, "complete")}</span></div>
          <div className="heroProgress"><div className="bar"><i style={{ width: `${percentage}%` }} /></div><div className="stats"><span>{completed} / {units.length} {tx(lang, "tasks")}</span><span>{Math.round(remainingMinutes / 60)} {tx(lang, "hours")}</span></div></div>
        </section>

        <Countdown lang={lang} />
        <RoadmapExperience lang={lang} />

        {tab === "home" && <section className="tabSection" aria-label="Bugünün izleme planı"><div className="sectionHeading"><div><small>{labels.today}</small><h2>{tx(lang, "today")}</h2></div><span>{formatDate(startOfToday)}</span></div><p className="muted">{tx(lang, "todayHint")}</p>{todayUnits.length ? <div className="units">{todayUnits.map(renderUnit)}</div> : <div className="calendarBox compact"><CirclePlay /><h3>{tx(lang, "free")}</h3><p>{tx(lang, "freeHint")}</p></div>}<div className="sectionHeading nextHeading"><div><small>{labels.nextStops}</small><h2>{tx(lang, "upcoming")}</h2></div><span>{daysLeft} {labels.left}</span></div>{upcoming.map(([key, scheduledUnits]) => <section className="day" key={key}><b>{formatDate(new Date(`${key}T12:00:00`))}</b><div className="units">{scheduledUnits.map(renderUnit)}</div></section>)}</section>}

        {tab === "titles" && <section className="tabSection" aria-label="Yapım kütüphanesi"><div className="sectionHeading"><div><small>{allTitles.length} {labels.library}</small><h2>{tx(lang, "allTitles")}</h2></div><span>{filteredTitles.length} {labels.result}</span></div><p className="muted">{tx(lang, "allTitlesHint")}</p><div className="libraryTools"><label className="searchBox"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx(lang, "search")} /></label><div className="scopeChips" aria-label="Hikâye grubu filtresi">{(Object.keys(labels.scopes) as Scope[]).map((value) => <button type="button" className={scope === value ? "active" : ""} key={value} onClick={() => setScope(value)}>{labels.scopes[value]}</button>)}</div><div className="filterChips" aria-label="Yapım türü filtresi">{(["all", "movie", "series", "watched", "unwatched"] as Filter[]).map((value) => <button type="button" className={filter === value ? "active" : ""} key={value} onClick={() => setFilter(value)}>{tx(lang, value === "all" ? "filterAll" : value === "movie" ? "filterMovies" : value === "series" ? "filterSeries" : value === "watched" ? "filterWatched" : "filterUnwatched")}</button>)}</div></div>{filteredTitles.length ? <div className="list">{filteredTitles.map(renderTitle)}</div> : <div className="calendarBox compact"><Search /><h3>{tx(lang, "noResults")}</h3></div>}<DoomsdayFinale lang={lang} /></section>}

        {tab === "calendar" && <section className="tabSection" aria-label="Akıllı izleme takvimi"><div className="sectionHeading"><div><small>{labels.calendar}</small><h2>{tx(lang, "smartCalendar")}</h2></div><span>{labels.routes[route]} · {labels.orders[order]}</span></div><p className="muted">{tx(lang, "smartCalendarHint")}</p><div className="calendarSummary"><div><CalendarDays /><span><b>{daysLeft}</b><small>{labels.day}</small></span></div><div><Film /><span><b>{pending.length}</b><small>{labels.task}</small></span></div><div><Layers3 /><span><b>{Math.round(remainingMinutes / 60)}</b><small>{labels.hour}</small></span></div></div>{[...schedule.entries()].slice(0, 40).map(([key, scheduledUnits]) => <section className="day" key={key}><b>{formatDate(new Date(`${key}T12:00:00`))}</b><div className="units">{scheduledUnits.map(renderUnit)}</div></section>)}</section>}

        <nav className="bottomNav" aria-label="Ana bölümler"><button type="button" className={tab === "home" ? "active" : ""} onClick={() => setTab("home")}><Home />{tx(lang, "today")}</button><button type="button" className={tab === "titles" ? "active" : ""} onClick={() => setTab("titles")}><Film />{tx(lang, "titles")}</button><button type="button" className={tab === "calendar" ? "active" : ""} onClick={() => setTab("calendar")}><CalendarDays />{tx(lang, "calendar")}</button></nav>
      </main>
    </>
  );
}
