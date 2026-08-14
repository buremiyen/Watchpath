import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diğer Film Maratonları — Watchpath",
  description: "Spider-Man, Batman, X-Men, Star Wars ve Harry Potter için izleme sıraları ve ilerleme takibi.",
};

export default function MarathonsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
