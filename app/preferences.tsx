'use client'
import {Languages,QrCode} from 'lucide-react'
export default function Preferences({lang,setLang,onSync}:{lang:'tr'|'en';setLang:(v:'tr'|'en')=>void;onSync:()=>void}){return <div className="prefs"><button onClick={()=>setLang(lang==='tr'?'en':'tr')}><Languages/><b>{lang==='tr'?'TR':'EN'}</b></button><button onClick={onSync}><QrCode/><span>{lang==='tr'?'Aktar':'Transfer'}</span></button></div>}
