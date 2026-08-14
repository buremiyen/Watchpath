'use client'

import {useEffect,useState} from 'react'
import {DOOMSDAY_TICKETS,DOOMSDAY_TRAILER} from './marvel-data'

export default function AmbientEffects(){
 const[poster,setPoster]=useState('')
 useEffect(()=>{
  const root=document.documentElement
  const move=(e:MouseEvent)=>{root.style.setProperty('--mx',`${e.clientX}px`);root.style.setProperty('--my',`${e.clientY}px`)}
  const next=(e:Event)=>{const src=(e as CustomEvent<string>).detail;if(src)setPoster(src.replace('/w185/','/w780/').replace('/w342/','/w780/'))}
  const fallback=()=>{const img=document.querySelector<HTMLImageElement>('.unit img,.card:not(.finished) img');if(img?.src)setPoster(img.src.replace('/w185/','/w780/').replace('/w342/','/w780/'))}
  const trailer=()=>window.open(DOOMSDAY_TRAILER,'_blank','noopener,noreferrer')
  const ticket=()=>window.open(DOOMSDAY_TICKETS,'_blank','noopener,noreferrer')
  addEventListener('mousemove',move);window.addEventListener('watchpath-next-poster',next);window.addEventListener('watchpath-doomsday-trailer',trailer);window.addEventListener('watchpath-doomsday-ticket',ticket);const t=setTimeout(fallback,500)
  return()=>{clearTimeout(t);removeEventListener('mousemove',move);window.removeEventListener('watchpath-next-poster',next);window.removeEventListener('watchpath-doomsday-trailer',trailer);window.removeEventListener('watchpath-doomsday-ticket',ticket)}
 },[])
 return <><div className="posterBackdrop" style={{backgroundImage:poster?`url(${poster})`:'none'}}/><div className="cursorGlow"/></>
}
