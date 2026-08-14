'use client'

import {useEffect,useState} from 'react'

export default function AmbientEffects(){
 const[poster,setPoster]=useState('')
 useEffect(()=>{
  const root=document.documentElement
  const move=(e:MouseEvent)=>{root.style.setProperty('--mx',`${e.clientX}px`);root.style.setProperty('--my',`${e.clientY}px`)}
  const next=(e:Event)=>{const src=(e as CustomEvent<string>).detail;if(src)setPoster(src.replace('/w185/','/w780/').replace('/w342/','/w780/'))}
  const fallback=()=>{const img=document.querySelector<HTMLImageElement>('.unit img,.card:not(.finished) img');if(img?.src)setPoster(img.src.replace('/w185/','/w780/').replace('/w342/','/w780/'))}
  const trailer=()=>window.open('https://www.youtube.com/watch?v=fxNh27fRdYA','_blank','noopener,noreferrer')
  const ticket=()=>window.open('https://www.paribucineverse.com/filmler','_blank','noopener,noreferrer')
  addEventListener('mousemove',move);window.addEventListener('watchpath-next-poster',next);window.addEventListener('watchpath-doomsday-trailer',trailer);window.addEventListener('watchpath-doomsday-ticket',ticket);const t=setTimeout(fallback,500)
  return()=>{clearTimeout(t);removeEventListener('mousemove',move);window.removeEventListener('watchpath-next-poster',next);window.removeEventListener('watchpath-doomsday-trailer',trailer);window.removeEventListener('watchpath-doomsday-ticket',ticket)}
 },[])
 return <><div className="posterBackdrop" style={{backgroundImage:poster?`url(${poster})`:'none'}}/><div className="cursorGlow"/><style jsx global>{`
  .posterBackdrop{position:fixed;inset:0;z-index:-3;background-position:center;background-size:cover;opacity:.14;filter:blur(24px) saturate(.8);transform:scale(1.08);transition:background-image .45s ease,opacity .35s ease;pointer-events:none}.posterBackdrop:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,9,13,.68),rgba(8,9,13,.88) 56%,#08090d)}
  .cursorGlow{position:fixed;left:var(--mx,-200px);top:var(--my,-200px);width:260px;height:260px;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,rgba(255,255,255,.055),rgba(239,70,85,.025) 34%,transparent 70%);filter:blur(5px);mix-blend-mode:screen}
  a,button,.card,.unit,.movieNode{cursor:pointer}
  @media(pointer:coarse){.cursorGlow{display:none}.posterBackdrop{opacity:.09}}
 `}</style></>
}
