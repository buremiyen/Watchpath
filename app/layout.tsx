import './globals.css'
import './liquid-glass.css'
import type {Metadata,Viewport} from 'next'
import Script from 'next/script'
import {Github,Instagram,Linkedin,MessageCircle,UserRound,ExternalLink} from 'lucide-react'
import RegisterSW from './register-sw'
import ClientTools from './client-tools'
import AdSlots from './ad-slots'
import RoadmapExperience from './roadmap-experience'
import DoomsdayFinale from './doomsday-finale'

const adsenseClient=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||'ca-pub-5750786390629221'
export const metadata:Metadata={title:'Watchpath',description:'Adaptive movie and TV marathon planner',manifest:'/manifest.webmanifest',applicationName:'Watchpath',appleWebApp:{capable:true,title:'Watchpath',statusBarStyle:'black-translucent'},other:{'google-adsense-account':adsenseClient}}
export const viewport:Viewport={themeColor:'#08090d',width:'device-width',initialScale:1,viewportFit:'cover'}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>
 <Script id="adsense" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}/>
 <RegisterSW/><ClientTools/><AdSlots/>
 <RoadmapExperience/>
 {children}
 <div id="doomsday-finale" style={{position:'relative',zIndex:2,clear:'both'}}><DoomsdayFinale/></div>
 <footer className="siteFooter">
  <div className="footerBrand"><b>WATCHPATH</b><span>Doomsday'e giden kişisel Marvel yolculuğun.</span></div>
  <div className="footerLinks"><a href="https://www.behance.net/burhanyenier" target="_blank" rel="noopener noreferrer"><UserRound/>Hakkımda</a><a href="https://github.com/buremiyen/Watchpath/issues/new" target="_blank" rel="noopener noreferrer"><MessageCircle/>Geri bildirim</a></div>
  <div className="socials" aria-label="Sosyal medya"><a href="https://github.com/buremiyen" target="_blank" rel="noopener noreferrer" title="GitHub"><Github/></a><a href="https://instagram.com/byenier.art" target="_blank" rel="noopener noreferrer" title="Instagram"><Instagram/></a><a href="https://www.behance.net/burhanyenier" target="_blank" rel="noopener noreferrer" title="Behance"><span className="behanceIcon">Bē</span></a><a href="https://www.linkedin.com/in/buremiyen" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin/></a></div>
  <div className="footerBottom"><span>© 2026 Watchpath · Buremiye</span><a href="https://github.com/buremiyen/Watchpath" target="_blank" rel="noopener noreferrer">Açık kaynak <ExternalLink/></a></div>
 </footer>
 </body></html>}
