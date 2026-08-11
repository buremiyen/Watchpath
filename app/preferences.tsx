'use client'
import {useState} from 'react'
import {Languages,QrCode,ChevronDown} from 'lucide-react'
import {Lang,languages,tx} from './i18n'
export default function Preferences({lang,setLang,onSync}:{lang:Lang;setLang:(v:Lang)=>void;onSync:()=>void}){const[open,setOpen]=useState(false);const cur=languages.find(x=>x.id===lang)!;return <div className="prefs"><div className="langWrap"><button className="prefBtn" onClick={()=>setOpen(!open)}><Languages/><span>{cur.flag} {cur.label}</span><ChevronDown className="chev"/></button>{open&&<div className="langMenu">{languages.map(l=><button key={l.id} className={l.id===lang?'selected':''} onClick={()=>{setLang(l.id);setOpen(false)}}><span>{l.flag}</span><b>{l.label}</b>{l.id===lang&&<i>✓</i>}</button>)}</div>}</div><button className="prefBtn syncBtn" onClick={onSync}><QrCode/><span>{tx(lang,'transfer')}</span></button></div>}
