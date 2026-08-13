'use client'
import {useEffect} from 'react'

export default function RegisterSW(){
 useEffect(()=>{
  const reset=async()=>{
   try{
    if('serviceWorker' in navigator){
     const regs=await navigator.serviceWorker.getRegistrations()
     await Promise.all(regs.map(r=>r.unregister()))
    }
    if('caches' in window){
     const keys=await caches.keys()
     await Promise.all(keys.map(k=>caches.delete(k)))
    }
    const flag='watchpath-clean-reload-v1'
    if(!sessionStorage.getItem(flag)){
     sessionStorage.setItem(flag,'1')
     window.location.reload()
    }
   }catch{}
  }
  reset()
 },[])
 return null
}
