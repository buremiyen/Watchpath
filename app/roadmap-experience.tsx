'use client'

import {useEffect,useState} from 'react'
import {Flame,Route,Layers3,RotateCcw} from 'lucide-react'

type Mode='quick'|'balanced'|'complete'
const options:[Mode,string,string,any][]=[['quick','Hızlı','18 yapım',Flame],['balanced','Dengeli','38 yapım',Route],['complete','Tam','80+ yapım',Layers3]]

export default function RoadmapExperience(){
 const[mode,setMode]=useState<Mode>('balanced')
 useEffect(()=>{const saved=localStorage.getItem('watchpath-route') as Mode|null;if(saved&&['quick','balanced','complete'].includes(saved))setMode(saved)},[])
 const choose=(id:Mode)=>{setMode(id);localStorage.setItem('watchpath-route',id);window.dispatchEvent(new CustomEvent('watchpath-route',{detail:id}))}
 const reset=()=>{if(!confirm('İzleme ilerlemesini sıfırlamak istediğine emin misin?'))return;localStorage.setItem('watchpath-progress','{}');localStorage.setItem('watchpath-route','balanced');location.reload()}
 return <section className="routeDockWrap" aria-label="Doomsday rota seçimi"><div className="routeDock">
  <div className="routeTitle"><span>DOOMSDAY ROTASI</span><b>Nasıl hazırlanmak istiyorsun?</b></div>
  <div className="routeOptions">{options.map(([id,name,count,Icon])=><button key={id} className={mode===id?'active':''} onClick={()=>choose(id)}><Icon/><span><b>{name}</b><small>{count}</small></span></button>)}</div>
  <button className="reset" onClick={reset} title="İlerlemeyi sıfırla"><RotateCcw/><span>Sıfırla</span></button>
 </div><style jsx>{`
 .routeDockWrap{width:min(820px,calc(100% - 36px));margin:4px auto 18px;position:relative;z-index:20}.routeDock{display:grid;grid-template-columns:minmax(180px,1fr) auto auto;align-items:center;gap:12px;padding:10px 12px;border:1px solid rgba(255,255,255,.13);border-radius:19px;background:linear-gradient(135deg,rgba(255,255,255,.085),rgba(255,255,255,.025));backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);box-shadow:inset 0 1px rgba(255,255,255,.15),0 14px 42px rgba(0,0,0,.25)}.routeTitle span{display:block;font-size:7px;letter-spacing:.18em;color:#ff6f7e;font-weight:900}.routeTitle b{display:block;margin-top:3px;font-size:12px}.routeOptions{display:flex;gap:6px}.routeOptions button,.reset{height:42px;border-radius:13px;border:1px solid rgba(255,255,255,.09);background:rgba(9,10,14,.38);color:#d9dae0;display:flex;align-items:center;gap:7px;padding:0 10px;transition:.18s}.routeOptions button:hover,.reset:hover{transform:translateY(-1px);border-color:rgba(255,104,122,.34)}.routeOptions button.active{background:rgba(116,25,40,.32);border-color:rgba(255,93,112,.46);color:#ff8592}.routeOptions :global(svg),.reset :global(svg){width:15px;height:15px}.routeOptions span{display:grid;text-align:left}.routeOptions b{font-size:9px}.routeOptions small{font-size:7px;color:#858995}.reset{color:#9da0a9}.reset span{font-size:9px}@media(max-width:720px){.routeDock{grid-template-columns:1fr;gap:9px}.routeOptions{display:grid;grid-template-columns:repeat(3,1fr)}.routeOptions button{justify-content:center;padding:0 7px}.reset{position:absolute;right:10px;top:9px;height:32px}.reset span{display:none}.routeTitle{padding-right:42px}}
 `}</style></section>
}
