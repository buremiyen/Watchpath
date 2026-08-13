import './globals.css'
import './liquid-glass.css'
import type {Metadata,Viewport} from 'next'
import Script from 'next/script'
import RegisterSW from './register-sw'
import ClientTools from './client-tools'
import AdSlots from './ad-slots'
import DoomsdayFinale from './doomsday-finale'

const adsenseClient=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||'ca-pub-5750786390629221'
export const metadata:Metadata={title:'Watchpath',description:'Adaptive movie and TV marathon planner',manifest:'/manifest.webmanifest',applicationName:'Watchpath',appleWebApp:{capable:true,title:'Watchpath',statusBarStyle:'black-translucent'},other:{'google-adsense-account':adsenseClient}}
export const viewport:Viewport={themeColor:'#08090d',width:'device-width',initialScale:1,viewportFit:'cover'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body><Script id="adsense" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}/><RegisterSW/><ClientTools/><AdSlots/>{children}<div id="doomsday-finale" style={{position:'relative',zIndex:2,clear:'both'}}><DoomsdayFinale/></div></body></html>}
