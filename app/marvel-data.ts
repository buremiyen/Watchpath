export type Track = "main" | "xmen" | "optional";

export type Episode = {
  id: string;
  name: string;
  runtime: number;
};

export type Title = {
  id: string;
  name: string;
  year: number;
  type: "movie" | "series";
  runtime?: number;
  poster: string;
  platform: string;
  seasons?: Episode[][];
  track: Track;
};

export type Unit = {
  id: string;
  title: Title;
  runtime: number;
  season?: number;
  episode?: number;
};

const tmdb = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;
const placeholder = (name: string) =>
  `https://placehold.co/500x750/15161c/eeeeee?text=${encodeURIComponent(name)}`;

const episodes = (key: string, counts: number[], runtime = 45) =>
  counts.map((count, seasonIndex) =>
    Array.from({ length: count }, (_, episodeIndex) => ({
      id: `${key}-${seasonIndex + 1}-${episodeIndex + 1}`,
      name: `Episode ${episodeIndex + 1}`,
      runtime,
    })),
  );

const movie = (
  id: string,
  name: string,
  year: number,
  runtime = 120,
  posterPath = "",
  track: Track = "main",
): Title => ({
  id,
  name,
  year,
  type: "movie",
  runtime,
  poster: posterPath ? tmdb(posterPath) : placeholder(name),
  platform: "Disney+",
  track,
});

const series = (
  id: string,
  name: string,
  year: number,
  counts: number[],
  runtime = 45,
  posterPath = "",
  track: Track = "main",
): Title => ({
  id,
  name,
  year,
  type: "series",
  poster: posterPath ? tmdb(posterPath) : placeholder(name),
  platform: "Disney+",
  seasons: episodes(id, counts, runtime),
  track,
});

export const mainTitles: Title[] = [
  movie("iron-man", "Iron Man", 2008, 126, "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"),
  movie("hulk", "The Incredible Hulk", 2008, 112, "/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg"),
  movie("iron-man-2", "Iron Man 2", 2010, 124, "/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg"),
  movie("thor", "Thor", 2011, 115, "/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg"),
  movie("cap1", "Captain America: The First Avenger", 2011, 124, "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg"),
  movie("avengers", "The Avengers", 2012, 143, "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"),
  movie("iron-man-3", "Iron Man 3", 2013, 130, "/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg"),
  movie("thor2", "Thor: The Dark World", 2013, 112, "/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg"),
  movie("winter", "Captain America: The Winter Soldier", 2014, 136, "/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg"),
  movie("gotg", "Guardians of the Galaxy", 2014, 121, "/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"),
  movie("ultron", "Avengers: Age of Ultron", 2015, 141, "/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg"),
  movie("antman", "Ant-Man", 2015, 117, "/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg"),
  movie("civil", "Captain America: Civil War", 2016, 147, "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg"),
  movie("strange", "Doctor Strange", 2016, 115, "/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg"),
  movie("gotg2", "Guardians of the Galaxy Vol. 2", 2017, 137, "/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg"),
  movie("homecoming", "Spider-Man: Homecoming", 2017, 133, "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg"),
  movie("ragnarok", "Thor: Ragnarok", 2017, 130, "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"),
  movie("black-panther", "Black Panther", 2018, 134, "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"),
  movie("infinity", "Avengers: Infinity War", 2018, 149, "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"),
  movie("antman-wasp", "Ant-Man and the Wasp", 2018, 118, "/cFQEO687n1K6umXbInzocxcnAQz.jpg"),
  movie("captain-marvel", "Captain Marvel", 2019, 124, "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg"),
  movie("endgame", "Avengers: Endgame", 2019, 181, "/or06FN3Dka5tukK1e9sl16pB3iy.jpg"),
  movie("far-from-home", "Spider-Man: Far From Home", 2019, 129, "/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg"),
  movie("black-widow", "Black Widow", 2021, 134, "/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg"),
  movie("shangchi", "Shang-Chi and the Legend of the Ten Rings", 2021, 132, "/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg"),
  movie("eternals", "Eternals", 2021, 156, "/lFByFSLV5WDJEv3KabbdAF959F2.jpg"),
  movie("no-way-home", "Spider-Man: No Way Home", 2021, 148, "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"),
  movie("strange2", "Doctor Strange in the Multiverse of Madness", 2022, 126, "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"),
  movie("thor-love", "Thor: Love and Thunder", 2022, 119, "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"),
  movie("wakanda", "Black Panther: Wakanda Forever", 2022, 162, "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg"),
  movie("quantumania", "Ant-Man and the Wasp: Quantumania", 2023, 125, "/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg"),
  movie("gotg3", "Guardians of the Galaxy Vol. 3", 2023, 150, "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"),
  movie("marvels", "The Marvels", 2023, 105, "/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg"),
  movie("deadpool-wolverine", "Deadpool & Wolverine", 2024, 128, "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"),
  movie("brave-new-world", "Captain America: Brave New World", 2025, 118, "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg"),
  movie("thunderbolts", "Thunderbolts* / The New Avengers", 2025, 127, "/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg"),
  movie("fantastic-four", "The Fantastic Four: First Steps", 2025, 115, "/x26MtUlwtWD26d0G0FXcppxCJio.jpg"),
  movie("brand-new-day", "Spider-Man: Brand New Day", 2026, 130),
  series("daredevil", "Daredevil", 2015, [13, 13, 13], 52),
  series("jessica-jones", "Jessica Jones", 2015, [13, 13, 13], 52),
  series("luke-cage", "Luke Cage", 2016, [13, 13], 52),
  series("iron-fist", "Iron Fist", 2017, [13, 10], 52),
  series("punisher", "The Punisher", 2017, [13, 13], 52),
  series("wandavision", "WandaVision", 2021, [9], 38, "/glKDfE6btIRcVB5zrjspRIs4r52.jpg"),
  series("falcon", "The Falcon and the Winter Soldier", 2021, [6], 52, "/6kbAMLteGO8yyewYau6bJ683sw7.jpg"),
  series("loki", "Loki", 2021, [6, 6], 50, "/voHUmluYmKyleFkTu3lOXQG702u.jpg"),
  series("hawkeye", "Hawkeye", 2021, [6], 48, "/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg"),
  series("moon-knight", "Moon Knight", 2022, [6], 50, "/vKDUmKO6F9bSKKyHhg7YGbgcEeF.jpg"),
  series("ms-marvel", "Ms. Marvel", 2022, [6], 45, "/cdkyMYdu8ao26XOBvilNzLneUg1.jpg"),
  series("she-hulk", "She-Hulk: Attorney at Law", 2022, [9], 35),
  series("echo", "Echo", 2024, [5], 45),
  series("agatha", "Agatha All Along", 2024, [9], 42),
  series("born-again-1", "Daredevil: Born Again — Season 1", 2025, [9], 50),
  series("ironheart", "Ironheart", 2025, [6], 45),
  series("wonder-man", "Wonder Man", 2026, [8], 35),
  series("born-again-2", "Daredevil: Born Again — Season 2", 2026, [8], 50),
  movie("one-last-kill", "The Punisher: One Last Kill", 2026, 50),
  series("visionquest", "VisionQuest", 2026, [8], 45),
];

export const xmenTitles: Title[] = [
  movie("xmen", "X-Men", 2000, 104, "/bRDAc4GogyS9ci3ow7UnInOcriN.jpg", "xmen"),
  movie("x2", "X2: X-Men United", 2003, 133, "/bWMw0FMsY8DICgrQnrTSWbzEgtr.jpg", "xmen"),
  movie("x3", "X-Men: The Last Stand", 2006, 104, "/a2xicU8DpKtRizOHjQLC1JyCSRS.jpg", "xmen"),
  movie("wolverine-origins", "X-Men Origins: Wolverine", 2009, 107, "/yN7UFO6b0BbqPNbRz2tXW9O7q7.jpg", "xmen"),
  movie("firstclass", "X-Men: First Class", 2011, 132, "/hNEokmUke0dazoBhttFN0o3L7Xv.jpg", "xmen"),
  movie("the-wolverine", "The Wolverine", 2013, 126, "/8lzmovtARDXnE7kTDOum02i6fXv.jpg", "xmen"),
  movie("dofp", "X-Men: Days of Future Past", 2014, 132, "/tYfijzolzgoMOtegh1Y7j2Enorg.jpg", "xmen"),
  movie("apocalypse", "X-Men: Apocalypse", 2016, 144, "/ikA8UhYdTGpqBatFa93nIf6noSr.jpg", "xmen"),
  movie("logan", "Logan", 2017, 137, "/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg", "xmen"),
  movie("dark-phoenix", "Dark Phoenix", 2019, 114, "/cCTJPelKGLhALq3r51A9uMonxKj.jpg", "xmen"),
  movie("new-mutants", "The New Mutants", 2020, 94, "/xiDGcXJTvu1lazFRYip6g1eLt9c.jpg", "xmen"),
  series("xmen97", "X-Men '97", 2024, [10, 10], 32, "/9Ycz7yYRf9V4jk3YXwcZhFtbNcF.jpg", "xmen"),
];

export const optionalTitles: Title[] = [
  series("agents-shield", "Agents of S.H.I.E.L.D.", 2013, [22, 22, 22, 22, 22, 13, 13], 43, "", "optional"),
  series("agent-carter", "Agent Carter", 2015, [8, 10], 43, "", "optional"),
  series("defenders", "The Defenders", 2017, [8], 50, "", "optional"),
  series("runaways", "Runaways", 2017, [10, 13, 10], 48, "", "optional"),
  series("cloak-dagger", "Cloak & Dagger", 2018, [10, 10], 44, "", "optional"),
  series("what-if", "What If...?", 2021, [9, 9, 8], 32, "", "optional"),
  movie("werewolf-by-night", "Werewolf by Night", 2022, 54, "", "optional"),
  movie("guardians-holiday", "The Guardians of the Galaxy Holiday Special", 2022, 45, "", "optional"),
  series("i-am-groot", "I Am Groot", 2022, [5, 5], 5, "", "optional"),
  series("secret-invasion", "Secret Invasion", 2023, [6], 50, "", "optional"),
];

export const allTitles = [...mainTitles, ...xmenTitles, ...optionalTitles];

export const quickIds = new Set([
  "iron-man",
  "avengers",
  "winter",
  "ultron",
  "civil",
  "strange",
  "ragnarok",
  "black-panther",
  "infinity",
  "endgame",
  "wandavision",
  "loki",
  "no-way-home",
  "strange2",
  "deadpool-wolverine",
  "thunderbolts",
  "fantastic-four",
  "brand-new-day",
]);

export const routeTitles = (route: "quick" | "balanced" | "complete") => {
  if (route === "quick") return mainTitles.filter((title) => quickIds.has(title.id));
  if (route === "balanced") {
    return mainTitles.filter((title) => title.type === "movie" && title.id !== "one-last-kill");
  }
  return allTitles;
};

export const titleUnits = (titles: Title[]): Unit[] =>
  titles.flatMap((title) =>
    title.type === "movie"
      ? [{ id: title.id, title, runtime: title.runtime ?? 120 }]
      : (title.seasons ?? []).flatMap((season, seasonIndex) =>
          season.map((episode, episodeIndex) => ({
            id: episode.id,
            title,
            runtime: episode.runtime,
            season: seasonIndex + 1,
            episode: episodeIndex + 1,
          })),
        ),
  );

export const DOOMSDAY_DATE = new Date("2026-12-18T00:00:00+03:00");
export const DOOMSDAY_TRAILER =
  "https://www.disney.com.tr/izle/avengers-doomsday-yeni-resmi-fragman-6570cdece14041fd76dc6bc1";
export const DOOMSDAY_TICKETS = "https://www.paribucineverse.com/gelecek-filmler";
