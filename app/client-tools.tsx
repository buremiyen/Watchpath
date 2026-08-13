'use client'
import {useEffect,useMemo,useState} from 'react'
import {ArrowRight,Check,Copy,Download,Languages,Monitor,QrCode,Smartphone,X} from 'lucide-react'
import {Lang,languages,tx} from './i18n'

export default function ClientTools(){
 const[lang,setLangState]=useState<Lang>('tr')
 const[menu,setMenu]=useState(false)
 const[sync,setSync]=useState(false)
 const[msg,setMsg]=useState('')
 const[code,setCode]=useState('')
 const cur=languages.find(x=>x.id===lang)||languages[0]

 useEffect(()=>{
  const saved=(localStorage.getItem('watchpath-lang')||'tr') as Lang
  const valid=languages.some(x=>x.id===saved)?saved:'tr'
  setLangState(valid)
  window.dispatchEvent(new CustomEvent('watchpath-language',{detail:valid}))
  const q=new URLSearchParams(location.search).get('sync')
  if(q){try{const d=JSON.parse(decodeURIComponent(escape(atob(q))));localStorage.setItem('watchpath-progress',JSON.stringify(d.done||{}));if(languages.some(x=>x.id===d.lang))localStorage.setItem('watchpath-lang',d.lang);history.replaceState({},'',location.pathname);location.reload()}catch{}}
 },[])

 const setLang=(v:Lang)=>{localStorage.setItem('watchpath-lang',v);document.documentElement.lang=v;setLangState(v);setMenu(false);window.dispatchEvent(new CustomEvent('watchpath-language',{detail:v}))}
 const payload=useMemo(()=>{if(typeof window==='undefined')return'';let done={};try{done=JSON.parse(localStorage.getItem('watchpath-progress')||'{}')}catch{}return btoa(unescape(encodeURIComponent(JSON.stringify({v:1,done,lang}))))},[lang,sync])
 const link=typeof window==='undefined'?'':`${location.origin}${location.pathname}?sync=${payload}`
 const qr=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`
 const copy=async()=>{await navigator.clipboard.writeText(link);setMsg(tx(lang,'copied'))}
 const imp=()=>{try{const q=code.includes('sync=')?new URL(code).searchParams.get('sync')||'':code;const d=JSON.parse(decodeURIComponent(escape(atob(q.trim()))));localStorage.setItem('watchpath-progress',JSON.stringify(d.done||{}));if(languages.some(x=>x.id===d.lang))localStorage.setItem('watchpath-lang',d.lang);location.reload()}catch{setMsg(tx(lang,'invalid'))}}

 return <>
  <div className="clientTools">
   <div className="langPicker">
    <button className="toolMain" onClick={()=>setMenu(!menu)}><Languages/><span>{cur.flag} {cur.label}</span></button>
    {menu&&<div className="langDropdown">{languages.map(l=><button key={l.id} className={l.id===lang?'selected':''} onClick={()=>setLang(l.id)}><span>{l.flag}</span><b>{l.label}</b>{l.id===lang&&<Check/>}</button>)}</div>}
   </div>
   <button className="toolMain" onClick={()=>setSync(true)}><QrCode/><span>{tx(lang,'transfer')}</span></button>
  </div>

  {sync&&<div className="modalBack" onMouseDown={e=>{if(e.target===e.currentTarget)setSync(false)}}><section className="syncPanel">
   <button className="close" onClick={()=>setSync(false)}><X/></button>
   <div className="syncTitle"><QrCode/><div><small>WATCHPATH SYNC</small><h2>{tx(lang,'device')}</h2></div></div>
   <div className="deviceFlow"><Monitor/><ArrowRight/><Smartphone/></div>
   <p>{tx(lang,'deviceDesc')}</p>
   <div className="qrFrame"><img className="qr" src={qr} alt="Watchpath QR"/><b>SCAN TO TRANSFER</b></div>
   <button className="primary" onClick={copy}><Copy/>{tx(lang,'copyLink')}</button>
   <details className="manual"><summary>{tx(lang,'manualImport')}</summary><textarea value={code} onChange={e=>setCode(e.target.value)} placeholder="Watchpath transfer link / code"/><button className="secondary" onClick={imp}><Download/>{tx(lang,'import')}</button></details>
   {msg&&<b className="syncMsg">{msg}</b>}<small className="privacy">{tx(lang,'syncNote')}</small>
  </section></div>}
 </>
}
