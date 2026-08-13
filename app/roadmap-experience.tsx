'use client'

import {useEffect,useMemo,useState} from 'react'
import {Clock3,Flame,Layers3,Route,Sparkles,CheckCircle2} from 'lucide-react'

type Mode='quick'|'balanced'|'complete'
const modes:{id:Mode;name:string;kicker:string;count:string;time:string;desc:string;icon:any}[]=[
 {id:'quick',name:'Hızlı Rota',kicker:'DOOMSDAY ESSENTIALS',count:'18 yapım',time:'~37 saat',desc:'Doomsday öncesi ana karakterleri ve Multiverse omurgasını en kısa yoldan yakala.',icon:Flame},
 {id:'balanced',name:'Dengeli Rota',kicker:'ÖNERİLEN',count:'38 yapım',time:'~76 saat',desc:'Ana MCU hikâyesi, Multiverse ve Doomsday için en önemli bağlantılar. Çoğu kişi için ideal.',icon:Route},
 {id:'complete',name:'Tam Maraton',kicker:'HER ŞEY',count:'80+ yapım',time:'145+ saat',desc:'Filmler, diziler, sokak seviyesi kahramanlar ve X-Men dahil mümkün olan en geniş yol.',icon:Layers3}
]
const paths=[
 {name:'Avengers',items:['The Avengers','Age of Ultron','Infinity War','Endgame']},
 {name:'Multiverse',items:['Loki','No Way Home','Multiverse of Madness','Deadpool & Wolverine']},
 {name:'Doom & Fantastic Four',items:['Fantastic Four: First Steps','Thunderbolts*','Brand New Day','VisionQuest']},
 {name:'X-Men',items:['X-Men','Days of Future Past','Logan',"X-Men '97"]}
]

export default function RoadmapExperience(){
 const[mode,setMode]=useState<Mode>('balanced')
 useEffect(()=>{const saved=localStorage.getItem('watchpath-route') as Mode|null;if(saved&&['quick','balanced','complete'].includes(saved))setMode(saved)},[])
 const choose=(id:Mode)=>{setMode(id);localStorage.setItem('watchpath-route',id);window.dispatchEvent(new CustomEvent('watchpath-route',{detail:id}))}
 const current=useMemo(()=>modes.find(x=>x.id===mode)!,[mode])
 return <section className="roadmapShell" aria-label="Watchpath route selector">
  <div className="roadmapHero glassPanel">
   <div className="orb orbA"/><div className="orb orbB"/>
   <div className="eyebrow"><Sparkles/> WATCHPATH ROADMAP</div>
   <h2>Doomsday'e nasıl hazırlanmak istiyorsun?</h2>
   <p>Tek bir dev liste yerine sana uygun yoğunluğu seç. Watchpath ilerlemeni korur; rota tercihin cihazında kaydedilir.</p>
   <div className="modeGrid">
    {modes.map(m=>{const Icon=m.icon;const active=mode===m.id;return <button key={m.id} className={'modeCard '+(active?'active':'')} onClick={()=>choose(m.id)}>
      <div className="modeTop"><span className="modeIcon"><Icon/></span><span className="modeKicker">{m.kicker}</span>{active&&<CheckCircle2 className="selected"/>}</div>
      <strong>{m.name}</strong><p>{m.desc}</p><div className="stats"><span>{m.count}</span><span><Clock3/> {m.time}</span></div>
     </button>})}
   </div>
   <div className="activeRoute"><span>AKTİF ROTA</span><b>{current.name}</b><em>{current.count} · {current.time}</em></div>
  </div>

  <div className="pathPanel glassPanel">
   <div className="sectionHead"><div><span>HİKÂYE YOLLARI</span><h3>Doomsday'e bağlanan ana damarlar</h3></div><div className="mergeBadge">∞ DOOMSDAY</div></div>
   <div className="paths">
    {paths.map((p,pi)=><div className="path" key={p.name}><div className="pathLabel"><span>{String(pi+1).padStart(2,'0')}</span><b>{p.name}</b></div><div className="rail">{p.items.map((x,i)=><div className="storyNode" key={x}><i/>{x}</div>)}</div></div>)}
   </div>
   <div className="mergeLine"><span/><b>TÜM YOLLAR 18 ARALIK 2026'DA BİRLEŞİYOR</b><span/></div>
  </div>
  <style jsx>{`
   .roadmapShell{width:min(1040px,calc(100% - 32px));margin:34px auto 20px;display:grid;gap:18px;position:relative;z-index:3}.glassPanel{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.14);background:linear-gradient(135deg,rgba(255,255,255,.095),rgba(255,255,255,.025));backdrop-filter:blur(30px) saturate(165%);-webkit-backdrop-filter:blur(30px) saturate(165%);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 26px 70px rgba(0,0,0,.35);border-radius:30px}.roadmapHero{padding:30px}.orb{position:absolute;border-radius:50%;filter:blur(18px);pointer-events:none}.orbA{width:280px;height:280px;right:-80px;top:-120px;background:rgba(235,50,80,.16)}.orbB{width:220px;height:220px;left:-90px;bottom:-130px;background:rgba(104,66,255,.12)}.eyebrow{display:flex;align-items:center;gap:8px;font-size:10px;font-weight:900;letter-spacing:.2em;color:#ff697a}.eyebrow :global(svg){width:14px}.roadmapHero h2{font-size:clamp(28px,4vw,46px);margin:10px 0 8px;max-width:700px;line-height:1.04}.roadmapHero>p{color:#9ca0aa;max-width:680px;line-height:1.6;margin:0 0 24px}.modeGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.modeCard{text-align:left;border:1px solid rgba(255,255,255,.09);background:rgba(8,9,14,.38);border-radius:22px;padding:18px;color:inherit;cursor:pointer;transition:.24s ease;min-height:210px}.modeCard:hover{transform:translateY(-3px);border-color:rgba(255,108,126,.28);background:rgba(255,255,255,.055)}.modeCard.active{border-color:rgba(255,93,114,.52);background:linear-gradient(145deg,rgba(112,20,37,.32),rgba(255,255,255,.05));box-shadow:inset 0 1px rgba(255,255,255,.12),0 14px 40px rgba(126,18,36,.18)}.modeTop{display:flex;align-items:center;gap:8px}.modeIcon{display:grid;place-items:center;width:35px;height:35px;border-radius:12px;background:rgba(255,255,255,.07)}.modeIcon :global(svg){width:17px}.modeKicker{font-size:8px;letter-spacing:.16em;color:#92959f;font-weight:900}.selected{margin-left:auto!important;width:18px!important;color:#ff6c7d}.modeCard strong{display:block;font-size:20px;margin:18px 0 7px}.modeCard p{font-size:11px;color:#92959e;line-height:1.55;min-height:54px}.stats{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}.stats span{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.07);padding:7px 9px;border-radius:999px;font-size:9px;color:#d7d8dc}.stats :global(svg){width:11px}.activeRoute{margin-top:18px;border-top:1px solid rgba(255,255,255,.08);padding-top:17px;display:flex;align-items:center;gap:10px}.activeRoute span{font-size:8px;color:#747782;letter-spacing:.16em}.activeRoute b{font-size:12px;color:#ff7787}.activeRoute em{font-size:10px;color:#858893;font-style:normal;margin-left:auto}.pathPanel{padding:26px 30px}.sectionHead{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:25px}.sectionHead span{font-size:8px;font-weight:900;letter-spacing:.2em;color:#ff697a}.sectionHead h3{font-size:25px;margin:6px 0 0}.mergeBadge{padding:10px 14px;border-radius:999px;border:1px solid rgba(255,98,118,.3);background:rgba(144,24,43,.16);font-size:10px;color:#ff8290;letter-spacing:.12em}.paths{display:grid;grid-template-columns:1fr 1fr;gap:14px}.path{padding:14px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(7,8,12,.32)}.pathLabel{display:flex;align-items:center;gap:8px;margin-bottom:13px}.pathLabel span{display:grid;place-items:center;width:25px;height:25px;border-radius:8px;background:rgba(255,90,110,.12);color:#ff7484;font-size:8px}.pathLabel b{font-size:12px}.rail{position:relative;margin-left:11px;padding-left:18px;display:grid;gap:8px}.rail:before{content:'';position:absolute;left:2px;top:9px;bottom:9px;width:1px;background:linear-gradient(#ef5366,#4d2630)}.storyNode{position:relative;font-size:10px;color:#aaaeb7;padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.035)}.storyNode i{position:absolute;width:7px;height:7px;border-radius:50%;left:-19px;top:50%;transform:translateY(-50%);background:#ff6275;box-shadow:0 0 14px rgba(255,75,98,.5)}.storyNode:before{content:'';position:absolute;width:14px;height:1px;background:#70313d;left:-14px;top:50%}.mergeLine{display:flex;align-items:center;gap:12px;margin:25px 0 2px}.mergeLine span{height:1px;flex:1;background:linear-gradient(90deg,transparent,rgba(255,96,116,.5))}.mergeLine span:last-child{background:linear-gradient(90deg,rgba(255,96,116,.5),transparent)}.mergeLine b{font-size:8px;letter-spacing:.18em;color:#868994;text-align:center}@media(max-width:760px){.modeGrid,.paths{grid-template-columns:1fr}.roadmapHero,.pathPanel{padding:22px 16px}.modeCard{min-height:auto}.sectionHead{align-items:flex-start;flex-direction:column}.activeRoute{align-items:flex-start;flex-wrap:wrap}.activeRoute em{width:100%;margin-left:0}}
  `}</style>
 </section>
}
