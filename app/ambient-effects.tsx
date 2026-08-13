'use client'

import {useEffect,useState} from 'react'

export default function AmbientEffects(){
 const[poster,setPoster]=useState('')
 useEffect(()=>{
  const root=document.documentElement
  const move=(e:MouseEvent)=>{root.style.setProperty('--mx',`${e.clientX}px`);root.style.setProperty('--my',`${e.clientY}px`)}
  const pick=()=>{
   const cards=[...document.querySelectorAll<HTMLElement>('.card,.unit,.movieNode')]
   if(!cards.length)return
   const mid=innerHeight*.5
   let best:HTMLElement|null=null,dist=Infinity
   for(const el of cards){const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)continue;const d=Math.abs((r.top+r.bottom)/2-mid);if(d<dist){dist=d;best=el}}
   const img=best?.querySelector<HTMLImageElement>('img');if(img?.src)setPoster(img.src.replace('/w185/','/w780/').replace('/w342/','/w780/'))
  }
  const over=(e:MouseEvent)=>{const el=(e.target as HTMLElement).closest('.card,.unit,.movieNode');const img=el?.querySelector<HTMLImageElement>('img');if(img?.src)setPoster(img.src.replace('/w185/','/w780/').replace('/w342/','/w780/'))}
  addEventListener('mousemove',move);addEventListener('scroll',pick,{passive:true});document.addEventListener('mouseover',over);pick()
  return()=>{removeEventListener('mousemove',move);removeEventListener('scroll',pick);document.removeEventListener('mouseover',over)}
 },[])
 return <><div className="posterBackdrop" style={{backgroundImage:poster?`url(${poster})`:'none'}}/><div className="cursorGlow"/><style jsx global>{`
  .posterBackdrop{position:fixed;inset:0;z-index:-3;background-position:center;background-size:cover;opacity:.105;filter:blur(28px) saturate(.72);transform:scale(1.08);transition:background-image .35s ease,opacity .35s ease;pointer-events:none}.posterBackdrop:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,9,13,.72),rgba(8,9,13,.9) 56%,#08090d)}
  .cursorGlow{position:fixed;left:var(--mx,-200px);top:var(--my,-200px);width:260px;height:260px;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,rgba(255,255,255,.055),rgba(239,70,85,.025) 34%,transparent 70%);filter:blur(5px);mix-blend-mode:screen}
  a,button,.card,.unit,.movieNode{cursor:pointer}a:hover,button:hover{--hoverGlow:1}
  @media(pointer:coarse){.cursorGlow{display:none}.posterBackdrop{opacity:.07}}
 `}</style></>
}
