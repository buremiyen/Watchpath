import './globals.css'
import './liquid-glass.css'
import type {Metadata,Viewport} from 'next'
import Script from 'next/script'
import RegisterSW from './register-sw'
import ClientTools from './client-tools'
import AdSlots from './ad-slots'
import RoadmapExperience from './roadmap-experience'
import DoomsdayFinale from './doomsday-finale'
import AmbientEffects from './ambient-effects'
import SiteFooter from './site-footer'

const adsenseClient=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||'ca-pub-5750786390629221'
export const metadata:Metadata={title:'Watchpath',description:'Adaptive movie and TV marathon planner',manifest:'/manifest.webmanifest',applicationName:'Watchpath',appleWebApp:{capable:true,title:'Watchpath',statusBarStyle:'black-translucent'},other:{'google-adsense-account':adsenseClient}}
export const viewport:Viewport={themeColor:'#08090d',width:'device-width',initialScale:1,viewportFit:'cover'}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>
 <Script id="adsense" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}/>
 <Script id="doomsday-countdown" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`(()=>{const target=new Date('2026-12-18T00:00:00+03:00').getTime();const tick=()=>{const d=Math.max(0,target-Date.now()),v=[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60];document.querySelectorAll('[data-dd]').forEach((e,i)=>e.textContent=String(v[i]).padStart(i?2:1,'0'))};tick();setInterval(tick,1000)})()`}}/>
 <RegisterSW/><AmbientEffects/><ClientTools/><AdSlots/><RoadmapExperience/>
 <section className="globalCountdown"><div><small>AVENGERS: DOOMSDAY</small><b>18 Aralık 2026'ya geri sayım</b></div><div className="globalCountdownNums"><span><strong data-dd>0</strong><em>GÜN</em></span><span><strong data-dd>00</strong><em>SAAT</em></span><span><strong data-dd>00</strong><em>DAKİKA</em></span><span><strong data-dd>00</strong><em>SANİYE</em></span></div></section>
 {children}
 <div id="doomsday-finale" style={{position:'relative',zIndex:2,clear:'both'}}><DoomsdayFinale/></div>
 <SiteFooter/>
 </body></html>}
