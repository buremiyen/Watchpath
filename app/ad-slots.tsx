'use client'
import {useEffect} from 'react'

const client=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||''
const leftSlot=process.env.NEXT_PUBLIC_ADSENSE_LEFT_SLOT||''
const rightSlot=process.env.NEXT_PUBLIC_ADSENSE_RIGHT_SLOT||''

declare global{interface Window{adsbygoogle:unknown[]}}

function Ad({slot,label}:{slot:string;label:string}){
 useEffect(()=>{if(!client||!slot)return;try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{}},[slot])
 if(!client||!slot)return null
 return <ins className="adsbygoogle" style={{display:'block'}} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true"/>
}

export default function AdSlots(){if(!client||(!leftSlot&&!rightSlot))return null;return <aside className="sideAds" aria-label="Advertisements">{leftSlot&&<div className="sideAd sideAdLeft"><Ad slot={leftSlot} label="LEFT AD"/></div>}{rightSlot&&<div className="sideAd sideAdRight"><Ad slot={rightSlot} label="RIGHT AD"/></div>}</aside>}
