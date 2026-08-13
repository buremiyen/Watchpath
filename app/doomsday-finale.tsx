'use client'

import {useEffect,useState} from 'react'
import {createPortal} from 'react-dom'
import {CalendarDays,Sparkles,Trophy} from 'lucide-react'

const branches=[
 ['Iron Man','Iron Man 2','Iron Man 3'],
 ['Captain America: The First Avenger','The Winter Soldier','Civil War'],
 ['Thor','The Dark World','Ragnarok','Love and Thunder'],
 ['The Avengers','Age of Ultron','Infinity War','Endgame'],
 ['Doctor Strange','Multiverse of Madness'],
 ['Guardians of the Galaxy','Guardians Vol. 2','Guardians Vol. 3'],
 ['Black Panther','Wakanda Forever'],
 ['Ant-Man','Ant-Man and the Wasp','Quantumania'],
 ['Spider-Man: Homecoming','Far From Home','No Way Home','Brand New Day'],
 ['WandaVision','Loki','Daredevil','Fantastic Four','Thunderbolts*']
]

export default function DoomsdayFinale(){
 const[target,setTarget]=useState<Element|null>(null)
 const[complete,setComplete]=useState(false)
 useEffect(()=>{
  const findTarget=()=>{const list=document.querySelector('.list');setTarget(current=>current===list?current:list)}
  findTarget();const observer=new MutationObserver(findTarget);observer.observe(document.body,{childList:true,subtree:true});return()=>observer.disconnect()
 },[])
 useEffect(()=>{const check=()=>{try{const p=JSON.parse(localStorage.getItem('watchpath-progress')||'{}');const trueCount=Object.values(p).filter(Boolean).length;setComplete(trueCount>=299)}catch{setComplete(false)}};check();window.addEventListener('storage',check);const t=setInterval(check,1000);return()=>{window.removeEventListener('storage',check);clearInterval(t)}},[])
 if(!target)return null
 const content=<section className="finale">
  <div className="treeGlass">
   <div className="eyebrow">MARVEL YOL HARİTASI</div><h2>Doomsday'e giden yollar</h2><p className="sub">İzlediğin hikâyelerin büyük finalde nasıl birleştiğini tek bakışta gör.</p>
   <div className="tree">{branches.map((b,i)=><div className="branch" key={i}><div className="line"/><div className="nodes">{b.map((x,j)=><div className="node" key={x}><span>{j+1}</span><b>{x}</b></div>)}</div></div>)}</div>
   <div className="merge"><i/><span>∞</span><i/></div><strong className="mergeText">TÜM YOLLAR BURADA BİRLEŞİYOR</strong>
  </div>

  <article className="doomsdayGlass">
   <div className="poster"><img src="https://image.tmdb.org/t/p/original/6eB2oh1SplddsZYCdayrIdrIGLd.jpg" alt="Avengers: Doomsday poster"/><div className="posterGlow"/></div>
   <div className="copy"><div className="badge"><Sparkles/> MARATON FİNALİ</div><small>MARVEL STUDIOS</small><h3>AVENGERS</h3><h1>DOOMSDAY</h1><div className="date"><CalendarDays/><div><em>SİNEMA ÇIKIŞ TARİHİ</em><b>18 ARALIK 2026</b></div></div><p>Watchpath maratonunun son durağı. Tüm filmleri ve dizileri tamamla, ardından Doomsday'e hazır ol.</p></div>
  </article>

  {complete&&<div className="celebrate"><Trophy/><small>MARATON TAMAMLANDI</small><h2>🎉 Tebrikler, bitirdin!</h2><p>Doomsday için hazırsın. Marvel yolculuğunun bütün yollarını tamamladın.</p><div>✦ ⚡ 🏆 ⚡ ✦</div></div>}
  <style jsx>{`
   .finale{width:100%;margin:42px 0 120px;display:grid;gap:24px}.treeGlass,.doomsdayGlass,.celebrate{border:1px solid rgba(255,255,255,.15);background:linear-gradient(135deg,rgba(255,255,255,.095),rgba(255,255,255,.025));backdrop-filter:blur(28px) saturate(150%);-webkit-backdrop-filter:blur(28px) saturate(150%);box-shadow:inset 0 1px rgba(255,255,255,.16),0 28px 80px rgba(0,0,0,.42);border-radius:34px}.treeGlass{padding:30px;overflow:hidden}.eyebrow{color:#ff7281;font-size:9px;font-weight:900;letter-spacing:.25em}.treeGlass h2{font-size:27px;margin:8px 0 5px}.sub{margin:0 0 28px;color:#9a9ca5;font-size:12px}.tree{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px}.branch{position:relative;padding-left:14px}.line{position:absolute;left:4px;top:13px;bottom:13px;width:1px;background:linear-gradient(#ff5266,#65303a)}.nodes{display:flex;flex-direction:column;gap:7px}.node{position:relative;display:flex;align-items:center;gap:9px;min-height:34px;padding:6px 10px;background:rgba(10,10,15,.38);border:1px solid rgba(255,255,255,.07);border-radius:12px}.node:before{content:'';position:absolute;left:-14px;width:14px;height:1px;background:#6f3340}.node span{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:rgba(238,61,82,.18);color:#ff7c8b;font-size:8px}.node b{font-size:10px;color:#d7d8dc}.merge{display:flex;align-items:center;gap:12px;margin:25px auto 7px;max-width:520px}.merge i{height:1px;flex:1;background:linear-gradient(90deg,transparent,#e54459)}.merge i:last-child{background:linear-gradient(90deg,#e54459,transparent)}.merge span{display:grid;place-items:center;width:38px;height:38px;border:1px solid #a23c4b;border-radius:50%;color:#ff6878;box-shadow:0 0 30px #e5385033}.mergeText{display:block;text-align:center;color:#a4a5ac;font-size:8px;letter-spacing:.22em}.doomsdayGlass{position:relative;display:grid;grid-template-columns:minmax(280px,44%) 1fr;gap:34px;padding:24px;overflow:hidden;background:radial-gradient(circle at 72% 35%,rgba(217,34,60,.19),transparent 34%),linear-gradient(135deg,rgba(255,255,255,.09),rgba(35,4,11,.2))}.doomsdayGlass:before{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 25%,rgba(255,255,255,.07) 42%,transparent 57%);pointer-events:none}.poster{position:relative;min-height:560px;border-radius:26px;overflow:hidden;box-shadow:0 25px 55px #0009}.poster img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover}.posterGlow{position:absolute;inset:auto 8% -20px;height:80px;background:#55d46d;filter:blur(35px);opacity:.24}.copy{align-self:center;position:relative;z-index:2;padding:20px 18px 20px 0}.badge{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:999px;padding:8px 12px;font-size:9px;color:#9ee8aa;letter-spacing:.14em}.badge :global(svg){width:13px}.copy small{display:block;margin-top:32px;color:#aaa;letter-spacing:.35em;font-size:9px}.copy h3{font-size:25px;letter-spacing:.3em;margin:8px 0 0}.copy h1{font-size:clamp(48px,8vw,80px);line-height:.9;margin:2px 0 27px;letter-spacing:.02em;text-shadow:0 8px 40px #47c96633}.date{display:flex;align-items:center;gap:12px;width:max-content;max-width:100%;padding:12px 15px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12)}.date :global(svg){width:20px;color:#87dd95}.date em{display:block;font-style:normal;font-size:7px;color:#898b94;letter-spacing:.15em}.date b{display:block;margin-top:3px;color:#fff;font-size:14px}.copy p{max-width:430px;color:#a4a5ad;font-size:13px;line-height:1.7;margin-top:22px}.celebrate{text-align:center;padding:50px 22px;background:radial-gradient(circle at 50% 0,rgba(239,66,88,.24),transparent 48%),rgba(255,255,255,.05)}.celebrate :global(svg){width:50px;height:50px;color:#ff7483}.celebrate small{display:block;margin-top:12px;color:#ff7786;letter-spacing:.22em}.celebrate h2{font-size:36px;margin:8px}.celebrate p{color:#aaa}.celebrate>div{font-size:24px;margin-top:20px}@media(max-width:700px){.tree{grid-template-columns:1fr}.treeGlass{padding:22px 16px}.doomsdayGlass{grid-template-columns:1fr;padding:14px}.poster{min-height:560px}.copy{padding:14px 10px 24px}.copy small{margin-top:15px}.copy h1{font-size:52px}.copy h3{font-size:19px}.finale{margin-top:28px}}
  `}</style>
 </section>
 return createPortal(content,target)
}
