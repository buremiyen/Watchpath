'use client'
import {useMemo,useState} from 'react'
import {Download,Upload,X} from 'lucide-react'

type Props={done:Record<string,boolean>;lang:'tr'|'en';onImport:(done:Record<string,boolean>,lang:'tr'|'en')=>void;onClose:()=>void}
export default function SyncPanel({done,lang,onImport,onClose}:Props){
 const [raw,setRaw]=useState('');const [msg,setMsg]=useState('')
 const payload=useMemo(()=>{try{return btoa(unescape(encodeURIComponent(JSON.stringify({v:1,done,lang}))))}catch{return''}},[done,lang])
 const qr=`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(location.origin+'/?sync='+payload)}`
 const copy=async()=>{await navigator.clipboard.writeText(location.origin+'/?sync='+payload);setMsg(lang==='tr'?'Bağlantı kopyalandı ✓':'Link copied ✓')}
 const importCode=()=>{try{const data=JSON.parse(decodeURIComponent(escape(atob(raw.trim().replace(/^.*[?&]sync=/,'')))));onImport(data.done||{},data.lang==='en'?'en':'tr');setMsg(lang==='tr'?'İlerleme aktarıldı ✓':'Progress imported ✓')}catch{setMsg(lang==='tr'?'Geçersiz aktarım kodu':'Invalid transfer code')}}
 return <div className="modalBack"><section className="syncPanel"><button className="close" onClick={onClose}><X/></button><h2>{lang==='tr'?'Cihazlar Arası Aktarım':'Device Transfer'}</h2><p>{lang==='tr'?'PC’deki ilerlemeni telefona taşımak için QR kodunu telefon kameranla okut. Hesap gerekmez.':'Scan this QR with your phone to move your progress. No account required.'}</p><img className="qr" src={qr} alt="QR"/><button className="primary" onClick={copy}><Upload/>{lang==='tr'?'Aktarım bağlantısını kopyala':'Copy transfer link'}</button><div className="divider"><span>{lang==='tr'?'veya':'or'}</span></div><textarea value={raw} onChange={e=>setRaw(e.target.value)} placeholder={lang==='tr'?'Aktarım kodunu / bağlantısını buraya yapıştır':'Paste transfer code / link here'}/><button className="secondary" onClick={importCode}><Download/>{lang==='tr'?'İlerlemeyi içe aktar':'Import progress'}</button>{msg&&<small className="syncMsg">{msg}</small>}<small>{lang==='tr'?'Not: Bu yöntem otomatik senkronizasyon değildir; yeni değişiklikleri diğer cihaza tekrar aktarman gerekir.':'Note: This is not automatic sync; transfer again after new changes.'}</small></section></div>
}
