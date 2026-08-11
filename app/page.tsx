'use client'
import {useEffect,useMemo,useState} from 'react'
import {Check,ChevronDown,ChevronRight,CalendarDays,Film,Home,Search} from 'lucide-react'
import {Lang,languages,localeFor,tx} from './i18n'

type Episode={id:string;name:string;runtime?:number}
type Title={id:string;name:string;year:number;type:'movie'|'series';runtime?:number;poster:string;platform:string;seasons?:Episode[][]}
type Unit={id:string;title:Title;runtime:number;season?:number;episode?:number}
type Filter='all'|'movie'|'series'|'watched'|'unwatched'

const p=(path:string)=>`https://image.tmdb.org/t/p/w342${path}`
const eps=(key:string,count:number,runtime=45)=>Array.from({length:count},(_,i)=>({id:`${key}-${i+1}`,name:`Episode ${i+1}`,runtime}))
const titles:Title[]=[
{id:'iron-man',name:'Iron Man',year:2008,type:'movie',runtime:126,poster:p('/78lPtwv72eTNqFW9COBYI0dWDJa.jpg'),platform:'Disney+'},{id:'hulk',name:'The Incredible Hulk',year:2008,type:'movie',runtime:112,poster:p('/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg'),platform:'Disney+'},{id:'iron-man-2',name:'Iron Man 2',year:2010,type:'movie',runtime:124,poster:p('/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg'),platform:'Disney+'},{id:'thor',name:'Thor',year:2011,type:'movie',runtime:115,poster:p('/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg'),platform:'Disney+'},{id:'cap1',name:'Captain America: The First Avenger',year:2011,type:'movie',runtime:124,poster:p('/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg'),platform:'Disney+'},{id:'avengers',name:'The Avengers',year:2012,type:'movie',runtime:143,poster:p('/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'),platform:'Disney+'},{id:'iron-man-3',name:'Iron Man 3',year:2013,type:'movie',runtime:130,poster:p('/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg'),platform:'Disney+'},{id:'thor2',name:'Thor: The Dark World',year:2013,type:'movie',runtime:112,poster:p('/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg'),platform:'Disney+'},{id:'winter',name:'Captain America: The Winter Soldier',year:2014,type:'movie',runtime:136,poster:p('/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg'),platform:'Disney+'},{id:'gotg',name:'Guardians of the Galaxy',year:2014,type:'movie',runtime:121,poster:p('/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'),platform:'Disney+'},{id:'ultron',name:'Avengers: Age of Ultron',year:2015,type:'movie',runtime:141,poster:p('/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg'),platform:'Disney+'},{id:'antman',name:'Ant-Man',year:2015,type:'movie',runtime:117,poster:p('/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg'),platform:'Disney+'},{id:'civil',name:'Captain America: Civil War',year:2016,type:'movie',runtime:147,poster:p('/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg'),platform:'Disney+'},{id:'strange',name:'Doctor Strange',year:2016,type:'movie',runtime:115,poster:p('/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg'),platform:'Disney+'},{id:'gotg2',name:'Guardians of the Galaxy Vol. 2',year:2017,type:'movie',runtime:137,poster:p('/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg'),platform:'Disney+'},{id:'ragnarok',name:'Thor: Ragnarok',year:2017,type:'movie',runtime:130,poster:p('/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg'),platform:'Disney+'},{id:'black-panther',name:'Black Panther',year:2018,type:'movie',runtime:134,poster:p('/uxzzxijgPIY7slzFvMotPv8wjKA.jpg'),platform:'Disney+'},{id:'infinity',name:'Avengers: Infinity War',year:2018,type:'movie',runtime:149,poster:p('/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'),platform:'Disney+'},{id:'antman-wasp',name:'Ant-Man and the Wasp',year:2018,type:'movie',runtime:118,poster:p('/cFQEO687n1K6umXbInzocxcnAQz.jpg'),platform:'Disney+'},{id:'captain-marvel',name:'Captain Marvel',year:2019,type:'movie',runtime:124,poster:p('/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg'),platform:'Disney+'},{id:'endgame',name:'Avengers: Endgame',year:2019,type:'movie',runtime:181,poster:p('/or06FN3Dka5tukK1e9sl16pB3iy.jpg'),platform:'Disney+'},
{id:'wandavision',name:'WandaVision',year:2021,type:'series',poster:p('/glKDfE6btIRcVB5zrjspRIs4r52.jpg'),platform:'Disney+',seasons:[eps('wv',9,38)]},{id:'falcon',name:'The Falcon and the Winter Soldier',year:2021,type:'series',poster:p('/6kbAMLteGO8yyewYau6bJ683sw7.jpg'),platform:'Disney+',seasons:[eps('falcon',6,52)]},{id:'loki',name:'Loki',year:2021,type:'series',poster:p('/voHUmluYmKyleFkTu3lOXQG702u.jpg'),platform:'Disney+',seasons:[eps('loki-1',6,50),eps('loki-2',6,50)]},{id:'black-widow',name:'Black Widow',year:2021,type:'movie',runtime:134,poster:p('/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg'),platform:'Disney+'},{id:'shangchi',name:'Shang-Chi and the Legend of the Ten Rings',year:2021,type:'movie',runtime:132,poster:p('/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg'),platform:'Disney+'},{id:'eternals',name:'Eternals',year:2021,type:'movie',runtime:156,poster:p('/lFByFSLV5WDJEv3KabbdAF959F2.jpg'),platform:'Disney+'},{id:'hawkeye',name:'Hawkeye',year:2021,type:'series',poster:p('/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg'),platform:'Disney+',seasons:[eps('hawkeye',6,48)]},{id:'moon-knight',name:'Moon Knight',year:2022,type:'series',poster:p('/vKDUmKO6F9bSKKyHhg7YGbgcEeF.jpg'),platform:'Disney+',seasons:[eps('moon',6,50)]},{id:'strange2',name:'Doctor Strange in the Multiverse of Madness',year:2022,type:'movie',runtime:126,poster:p('/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg'),platform:'Disney+'},{id:'ms-marvel',name:'Ms. Marvel',year:2022,type:'series',poster:p('/cdkyMYdu8ao26XOBvilNzLneUg1.jpg'),platform:'Disney+',seasons:[eps('msmarvel',6,45)]},{id:'thor-love',name:'Thor: Love and Thunder',year:2022,type:'movie',runtime:119,poster:p('/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg'),platform:'Disney+'},{id:'wakanda',name:'Black Panther: Wakanda Forever',year:2022,type:'movie',runtime:162,poster:p('/sv1xJUazXeYqALzczSZ3O6nkH75.jpg'),platform:'Disney+'},{id:'quantumania',name:'Ant-Man and the Wasp: Quantumania',year:2023,type:'movie',runtime:125,poster:p('/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg'),platform:'Disney+'},{id:'gotg3',name:'Guardians of the Galaxy Vol. 3',year:2023,type:'movie',runtime:150,poster:p('/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg'),platform:'Disney+'},{id:'marvels',name:'The Marvels',year:2023,type:'movie',runtime:105,poster:p('/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg'),platform:'Disney+'},
{id:'xmen',name:'X-Men',year:2000,type:'movie',runtime:104,poster:p('/bRDAc4GogyS9ci3ow7UnInOcriN.jpg'),platform:'Disney+'},{id:'x2',name:'X2: X-Men United',year:2003,type:'movie',runtime:133,poster:p('/bWMw0FMsY8DICgrQnrTSWbzEgtr.jpg'),platform:'Disney+'},{id:'x3',name:'X-Men: The Last Stand',year:2006,type:'movie',runtime:104,poster:p('/a2xicU8DpKtRizOHjQLC1JyCSRS.jpg'),platform:'Disney+'},{id:'wolverine-origins',name:'X-Men Origins: Wolverine',year:2009,type:'movie',runtime:107,poster:p('/yN7UFO6b0BbqPNbRz2tXW9O7q7.jpg'),platform:'Disney+'},{id:'firstclass',name:'X-Men: First Class',year:2011,type:'movie',runtime:132,poster:p('/hNEokmUke0dazoBhttFN0o3L7Xv.jpg'),platform:'Disney+'},{id:'the-wolverine',name:'The Wolverine',year:2013,type:'movie',runtime:126,poster:p('/8lzmovtARDXnE7kTDOum02i6fXv.jpg'),platform:'Disney+'},{id:'dofp',name:'X-Men: Days of Future Past',year:2014,type:'movie',runtime:132,poster:p('/tYfijzolzgoMOtegh1Y7j2Enorg.jpg'),platform:'Disney+'},{id:'apocalypse',name:'X-Men: Apocalypse',year:2016,type:'movie',runtime:144,poster:p('/ikA8UhYdTGpqBatFa93nIf6noSr.jpg'),platform:'Disney+'},{id:'logan',name:'Logan',year:2017,type:'movie',runtime:137,poster:p('/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg'),platform:'Disney+'},{id:'dark-phoenix',name:'Dark Phoenix',year:2019,type:'movie',runtime:114,poster:p('/cCTJPelKGLhALq3r51A9uMonxKj.jpg'),platform:'Disney+'},{id:'new-mutants',name:'The New Mutants',year:2020,type:'movie',runtime:94,poster:p('/xiDGcXJTvu1lazFRYip6g1eLt9c.jpg'),platform:'Disney+'},{id:'xmen97',name:"X-Men '97",year:2024,type:'series',poster:p('/9Ycz7yYRf9V4jk3YXwcZhFtbNcF.jpg'),platform:'Disney+',seasons:[eps('xmen97',10,32)]},
{id:'brave-new-world',name:'Captain America: Brave New World',year:2025,type:'movie',runtime:118,poster:p('/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg'),platform:'Disney+'},{id:'thunderbolts',name:'Thunderbolts*',year:2025,type:'movie',runtime:127,poster:p('/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg'),platform:'Disney+'},{id:'fantastic-four',name:'The Fantastic Four: First Steps',year:2025,type:'movie',runtime:115,poster:p('/x26MtUlwtWD26d0G0FXcppxCJio.jpg'),platform:'Disney+'}
]

const TARGET=new Date('2026-12-18T00:00:00')
const dateKey=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`

export default function Page(){
 const[done,setDone]=useState<Record<string,boolean>>({})
 const[open,setOpen]=useState<Record<string,boolean>>({})
 const[tab,setTab]=useState<'home'|'titles'|'calendar'>('home')
 const[lang,setLang]=useState<Lang>('tr')
 const[query,setQuery]=useState('')
 const[filter,setFilter]=useState<Filter>('all')

 useEffect(()=>{
  try{setDone(JSON.parse(localStorage.getItem('watchpath-progress')||'{}'))}catch{}
  const saved=(localStorage.getItem('watchpath-lang')||'tr') as Lang
  if(languages.some(x=>x.id===saved))setLang(saved)
  const onLang=(e:Event)=>setLang((e as CustomEvent<Lang>).detail)
  window.addEventListener('watchpath-language',onLang)
  return()=>window.removeEventListener('watchpath-language',onLang)
 },[])

 const toggle=(id:string)=>setDone(d=>{const n={...d,[id]:!d[id]};localStorage.setItem('watchpath-progress',JSON.stringify(n));return n})
 const units=useMemo<Unit[]>(()=>titles.flatMap(t=>t.type==='movie'?[{id:t.id,title:t,runtime:t.runtime||120}]:(t.seasons||[]).flatMap((s,si)=>s.map((e,ei)=>({id:e.id,title:t,runtime:e.runtime||45,season:si+1,episode:ei+1})))),[])
 const pending=units.filter(u=>!done[u.id])
 const completed=units.length-pending.length
 const pct=Math.round(completed/units.length*100)
 const now=new Date();now.setHours(0,0,0,0)
 const days=Math.max(0,Math.ceil((TARGET.getTime()-now.getTime())/86400000))
 const fmt=(d:Date)=>new Intl.DateTimeFormat(localeFor(lang),{day:'numeric',month:'long',weekday:'short'}).format(d)
 const runtime=(mins:number)=>`${Math.floor(mins/60)}${tx(lang,'hourShort')} ${mins%60}${tx(lang,'minuteShort')}`

 const schedule=useMemo(()=>{const map=new Map<string,Unit[]>();if(!pending.length)return map;const slots=Math.max(1,Math.ceil((TARGET.getTime()-now.getTime())/86400000));pending.forEach((u,i)=>{const offset=Math.min(slots-1,Math.floor(i*slots/pending.length));const d=new Date(now);d.setDate(d.getDate()+offset);const k=dateKey(d);map.set(k,[...(map.get(k)||[]),u])});return map},[done])
 const today=schedule.get(dateKey(now))||[]
 const upcoming=[...schedule.entries()].filter(([k])=>k>dateKey(now)).slice(0,5)
 const isTitleWatched=(t:Title)=>t.type==='movie'?!!done[t.id]:(t.seasons||[]).flat().every(e=>!!done[e.id])
 const filteredTitles=useMemo(()=>titles.filter(t=>{const matches=t.name.toLowerCase().includes(query.trim().toLowerCase());const watched=isTitleWatched(t);const type=filter==='all'||(filter==='movie'&&t.type==='movie')||(filter==='series'&&t.type==='series')||(filter==='watched'&&watched)||(filter==='unwatched'&&!watched);return matches&&type}),[query,filter,done])

 const card=(t:Title)=>{
  const watched=isTitleWatched(t)
  const epsTotal=(t.seasons||[]).flat().length
  const epsDone=(t.seasons||[]).flat().filter(e=>done[e.id]).length
  return <div className={'card '+(watched?'finished':'')} key={t.id}>
   <img src={t.poster} alt={`${t.name} poster`}/>
   <div className="info">
    <div className="titleRow"><div><h3>{t.name}</h3><p>{t.year} · {t.type==='movie'?runtime(t.runtime||0):`${tx(lang,'series')} · ${epsDone}/${epsTotal}`} · {t.platform}</p></div>{t.type==='series'&&<button className="icon" onClick={()=>setOpen(o=>({...o,[t.id]:!o[t.id]}))}>{open[t.id]?<ChevronDown/>:<ChevronRight/>}</button>}</div>
    {t.type==='movie'?<button className={'watch '+(done[t.id]?'on':'')} onClick={()=>toggle(t.id)}><Check/> {done[t.id]?tx(lang,'watched'):tx(lang,'markWatched')}</button>:open[t.id]&&<div className="episodes">{t.seasons?.map((s,i)=><div key={i}><b>{tx(lang,'season')} {i+1}</b>{s.map((e,ei)=><button key={e.id} onClick={()=>toggle(e.id)} className={done[e.id]?'epDone':''}><span>{tx(lang,'episode')} {ei+1}</span><Check/></button>)}</div>)}</div>}
   </div>
  </div>
 }

 const unitRow=(u:Unit)=><div className="unit" key={u.id}><img src={u.title.poster} alt=""/><div><b>{u.title.name}</b><span>{u.season?`S${u.season} · ${tx(lang,'episode')} ${u.episode}`:runtime(u.runtime)}</span></div><button onClick={()=>toggle(u.id)} aria-label={tx(lang,'markWatched')}><Check/></button></div>
 const filterLabel=(f:Filter)=>f==='all'?tx(lang,'filterAll'):f==='movie'?tx(lang,'filterMovies'):f==='series'?tx(lang,'filterSeries'):f==='watched'?tx(lang,'filterWatched'):tx(lang,'filterUnwatched')

 return <main>
  <header><div><span className="brand">WATCHPATH</span><small>{tx(lang,'subtitle')}</small></div><div className="countdown"><b>{days}</b><span>{tx(lang,'days')}</span></div></header>
  <section className="hero"><p>{tx(lang,'marathon')}</p><h1>{pct}% {tx(lang,'complete')}</h1><div className="bar"><i style={{width:`${pct}%`}}/></div><div className="stats"><span><b>{completed}</b> / {units.length} {tx(lang,'tasks')}</span><span>⏱ {Math.round(pending.reduce((a,u)=>a+u.runtime,0)/60)} {tx(lang,'hours')}</span></div></section>

  {tab==='home'&&<><h2>{tx(lang,'today')}</h2><p className="muted">{tx(lang,'todayHint')}</p>{today.length?<div className="units">{today.map(unitRow)}</div>:<div className="calendarBox compact"><Check size={30}/><h3>{tx(lang,'free')}</h3><p>{tx(lang,'freeHint')}</p></div>}<h2>{tx(lang,'upcoming')}</h2>{upcoming.map(([k,us])=><div className="day" key={k}><b>{fmt(new Date(k+'T12:00:00'))}</b><div className="units">{us.map(unitRow)}</div></div>)}</>}

  {tab==='titles'&&<><h2>{tx(lang,'allTitles')}</h2><p className="muted">{tx(lang,'allTitlesHint')}</p><section className="libraryTools"><div className="searchBox"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={tx(lang,'search')}/></div><div className="filterChips">{(['all','movie','series','watched','unwatched'] as Filter[]).map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{filterLabel(f)}</button>)}</div></section>{filteredTitles.length?<div className="list">{filteredTitles.map(card)}</div>:<div className="calendarBox compact"><Search size={28}/><p>{tx(lang,'noResults')}</p></div>}</>}

  {tab==='calendar'&&<><h2>{tx(lang,'smartCalendar')}</h2><p className="muted">{tx(lang,'smartCalendarHint')}</p>{[...schedule.entries()].slice(0,30).map(([k,us])=><div className="day" key={k}><b>{fmt(new Date(k+'T12:00:00'))}</b><div className="units">{us.map(unitRow)}</div></div>)}</>}

  <nav><button className={tab==='home'?'active':''} onClick={()=>setTab('home')}><Home/>{tx(lang,'today')}</button><button className={tab==='titles'?'active':''} onClick={()=>setTab('titles')}><Film/>{tx(lang,'titles')}</button><button className={tab==='calendar'?'active':''} onClick={()=>setTab('calendar')}><CalendarDays/>{tx(lang,'calendar')}</button></nav>
 </main>
}
