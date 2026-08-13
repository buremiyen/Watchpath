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
const box={minWidth:58,padding:'8px 7px',textAlign:'center' as const,border:'1px solid rgba(255,255,255,.1)',borderRadius:12,background:'rgba(255,255,255,.04)'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>
 <Script id="adsense" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}/>
 <Script id="doomsday-countdown" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`(()=>{const target=new Date('2026-12-18T00:00:00+03:00').getTime();const tick=()=>{const d=Math.max(0,target-Date.now()),v=[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60];document.querySelectorAll('[data-dd]').forEach((e,i)=>e.textContent=String(v[i]).padStart(i?2:1,'0'))};tick();setInterval(tick,1000)})()`}}/>
 <RegisterSW/><AmbientEffects/><ClientTools/><AdSlots/><RoadmapExperience/>
 <section style={{width:'min(820px,calc(100% - 36px))',margin:'0 auto 18px',padding:'12px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,border:'1px solid rgba(255,255,255,.14)',borderRadius:18,background:'linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.025))',backdropFilter:'blur(24px) saturate(160%)',boxShadow:'inset 0 1px rgba(255,255,255,.15),0 14px 42px rgba(0,0,0,.24)',position:'relative',zIndex:10}}><div><small style={{display:'block',color:'#ff7484',fontSize:7,letterSpacing:'.18em',fontWeight:900}}>AVENGERS: DOOMSDAY</small><b style={{display:'block',marginTop:3,fontSize:11}}>18 Aralık 2026'ya geri sayım</b></div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}><span style={box}><strong data-dd style={{display:'block',fontSize:17}}>0</strong><em style={{display:'block',marginTop:4,fontSize:6,letterSpacing:'.12em',color:'#81858e',fontStyle:'normal'}}>GÜN</em></span><span style={box}><strong data-dd style={{display:'block',fontSize:17}}>00</strong><em style={{display:'block',marginTop:4,fontSize:6,letterSpacing:'.12em',color:'#81858e',fontStyle:'normal'}}>SAAT</em></span><span style={box}><strong data-dd style={{display:'block',fontSize:17}}>00</strong><em style={{display:'block',marginTop:4,fontSize:6,letterSpacing:'.12em',color:'#81858e',fontStyle:'normal'}}>DAKİKA</em></span><span style={box}><strong data-dd style={{display:'block',fontSize:17}}>00</strong><em style={{display:'block',marginTop:4,fontSize:6,letterSpacing:'.12em',color:'#81858e',fontStyle:'normal'}}>SANİYE</em></span></div></section>
 {children}
 <div id="doomsday-finale" style={{position:'relative',zIndex:2,clear:'both'}}><DoomsdayFinale/></div>
 <SiteFooter/>
 </body></html>}
