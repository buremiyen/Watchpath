import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Watchpath',
  description: 'Adaptive movie and TV marathon planner',
  manifest: '/manifest.webmanifest'
}

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="tr"><body>{children}</body></html>
}
