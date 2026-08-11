'use client'
import {useEffect,useMemo,useState} from 'react'
import {Check,ChevronDown,ChevronRight,CalendarDays,Film,Home} from 'lucide-react'

type Episode={id:string;name:string}
type Title={id:string;name:string;year:number;type:'movie'|'series';runtime?:number;poster:string;platform:string;seasons?:Episode[][]}

const titles:Title[]=[
{id:'iron-man',name:'Iron Man',year:2008,type:'movie',runtime:126,poster:'https://image.tmdb.org/t/p/w342/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',platform:'Disney+'},
{id:'hulk',name:'The Incredible Hulk',year:2008,type:'movie',runtime:112,poster:'https://image.tmdb.org/t/p/w342/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg',platform:'Disney+'},
{id:'iron-man-2',name:'Iron Man 2',year:2010,type:'movie',runtime:124,poster:'https://image.tmdb.org/t/p/w342/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',platform:'Disney+'},
{id:'thor',name:'Thor',year:2011,type:'movie',runtime:115,poster:'https://image.tmdb.org/t/p/w342/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg',platform:'Disney+'},
{id:'cap1',name:'Captain America: The First Avenger',year:2011,type:'movie',runtime:124,poster:'https://image.tmdb.org/t/p/w342/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',platform:'Disney+'},
{id:'avengers',name:'The Avengers',year:2012,type:'movie',runtime:143,poster:'https://image.tmdb.org/t/p/w342/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',platform:'Disney+'},
{id:'thor2',name:'Thor: The Dark World',year:2013,type:'movie',runtime:112,poster:'https://image.tmdb.org/t/p/w342/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg',platform:'Disney+'},
{id:'winter',name:'Captain America: The Winter Soldier',year:2014,type:'movie',runtime:136,poster:'https://image.tmdb.org/t/p/w342/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg',platform:'Disney+'},
{id:'gotg',name:'Guardians of the Galaxy',year:2014,type:'movie',runtime:121,poster:'https://image.tmdb.org/t/p/w342/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',platform:'Disney+'},
{id:'ultron',name:'Avengers: Age of Ultron',year:2015,type:'movie',runtime:141,poster:'https://image.tmdb.org/t/p/w342/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg',platform:'Disney+'},
{id:'antman',name:'Ant-Man',year:2015,type:'movie',runtime:117,poster:'https://image.tmdb.org/t/p/w342/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg',platform:'Disney+'},
{id:'civil',name:'Captain America: Civil War',year:2016,type:'movie',runtime:147,poster:'https://image.tmdb.org/t/p/w342/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg',platform:'Disney+'},
{id:'strange',name:'Doctor Strange',year:2016,type:'movie',runtime:115,poster:'https://image.tmdb.org/t/p/w342/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',platform:'Disney+'},
{id:'ragnarok',name:'Thor: Ragnarok',year:2017,type:'movie',runtime:130,poster:'https://image.tmdb.org/t/p/w342/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',platform:'Disney+'},
{id:'infinity',name:'Avengers: Infinity War',year:2018,type:'movie',runtime:149,poster:'https://image.tmdb.org/t/p/w342/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',platform:'Disney+'},
{id:'endgame',name:'Avengers: Endgame',year:2019,type:'movie',runtime:181,poster:'https://image.tmdb.org/t/p/w342/or06FN3Dka5tukK1e9sl16pB3iy.jpg',platform:'Disney+'},
{id:'wandavision',name:'WandaVision',year:2021,type:'series',poster:'https://image.tmdb.org/t/p/w342/glKDfE6btIRcVB5zrjspRIs4r52.jpg',platform:'Disney+',seasons:[[1,2,3,4,5,6,7,8,9].map(n=>({id:`wv-${n}`,name:`Bölüm ${n}`}))]},
{id:'loki',name:'Loki',year:2021,type:'series',poster:'https://image.tmdb.org/t/p/w342/voHUmluYmKyleFkTu3lOXQG702u.jpg',platform:'Disney+',seasons:[1,2].map(s=>[1,2,3,4,5,6].map(n=>({id:`loki-${s}-${n}`,name:`Bölüm ${n}`})))},
{id:'shangchi',name:'Shang-Chi and the Legend of the Ten Rings',year:2021,type:'movie',runtime:132,poster:'https://image.tmdb.org/t/p/w342/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg',platform:'Disney+'},
{id:'strange2',name:'Doctor Strange in the Multiverse of Madness',year:2022,type:'movie',runtime:126,poster:'https://image.tmdb.org/t/p/w342/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',platform:'Disney+'},
{id:'quantumania',name:'Ant-Man and the Wasp: Quantumania',year:2023,type:'movie',runtime:125,poster:'https://image.tmdb.org/t/p/w342/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',platform:'Disney+'},
{id:'gotg3',name:'Guardians of the Galaxy Vol. 3',year:2023,type:'movie',runtime:150,poster:'https://image.tmdb.org/t/p/w342/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',platform:'Disney+'},
{id:'xmen',name:'X-Men',year:2000,type:'movie',runtime:104,poster:'https://image.tmdb.org/t/p/w342/bRDAc4GogyS9ci3ow7UnInOcriN.jpg',platform:'Disney+'},
{id:'x2',name:'X2: X-Men United',year:2003,type:'movie',runtime:133,poster:'https://image.tmdb.org/t/p/w342/bWMw0FMsY8DICgrQnrTSWbzEgtr.jpg',platform:'Disney+'},
{id:'firstclass',name:'X-Men: First Class',year:2011,type:'movie',runtime:132,poster:'https://image.tmdb.org/t/p/w342/hNEokmUke0dazoBhttFN0o3L7Xv.jpg',platform:'Disney+'},
{id:'dofp',name:'X-Men: Days of Future Past',year:2014,type:'movie',runtime:132,poster:'https://image.tmdb.org/t/p/w342/tYfijzolzgoMOtegh1Y7j2Enorg.jpg',platform:'Disney+'},
{id:'logan',name:'Logan',year:2017,type:'movie',runtime:137,poster:'https://image.tmdb.org/t/p/w342/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg',platform:'Disney+'}
]

const TARGET=new Date('2026-12-18T00:00:00')
export default function Page(){
 const [done,setDone]=useState<Record<string,boolean>>({}); const [open,setOpen]=useState<Record<string,boolean>>({}); const [tab,setTab]=useState('home')
 useEffect(()=>{try{setDone(JSON.parse(localStorage.getItem('watchpath-progress')||'{}'))}catch{}},[])
 const toggle=(id:string)=>setDone(d=>{const n={...d,[id]:!d[id]};localStorage.setItem('watchpath-progress',JSON.stringify(n));return n})
 const units=useMemo(()=>titles.flatMap(t=>t.type==='movie'?[t.id]:(t.seasons||[]).flat().map(e=>e.id)),[])
 const completed=units.filter(id=>done[id]).length, pct=Math.round(completed/units.length*100)
 const remaining=titles.filter(t=>t.type==='movie'?!done[t.id]:(t.seasons||[]).flat().some(e=>!done[e.id]))
 const days=Math.max(0,Math.ceil((TARGET.getTime()-Date.now())/86400000)); const today=remaining.slice(0,Math.min(2,Math.max(1,Math.ceil(remaining.length/Math.max(days,1)))))
 const card=(t:Title)=><div className={'card '+(t.type==='movie'&&done[t.id]?'finished':'')} key={t.id}>
   <img src={t.poster} alt=""/><div className="info"><div className="titleRow"><div><h3>{t.name}</h3><p>{t.year} · {t.type==='movie'?`${Math.floor((t.runtime||0)/60)}s ${(t.runtime||0)%60}dk`:'Dizi'} · {t.platform}</p></div>{t.type==='series'&&<button className="icon" onClick={()=>setOpen(o=>({...o,[t.id]:!o[t.id]}))}>{open[t.id]?<ChevronDown/>:<ChevronRight/>}</button>}</div>
   {t.type==='movie'?<button className={'watch '+(done[t.id]?'on':'')} onClick={()=>toggle(t.id)}><Check/> {done[t.id]?'İzlendi':'İzlendi olarak işaretle'}</button>:open[t.id]&&<div className="episodes">{t.seasons?.map((s,i)=><div key={i}><b>Sezon {i+1}</b>{s.map(e=><button key={e.id} onClick={()=>toggle(e.id)} className={done[e.id]?'epDone':''}><span>{e.name}</span><Check/></button>)}</div>)}</div>}</div></div>
 return <main><header><div><span className="brand">WATCHPATH</span><small>DOOMSDAY MARATHON</small></div><div className="countdown"><b>{days}</b><span>GÜN KALDI</span></div></header>
 <section className="hero"><p>MARVEL MARATONUN</p><h1>{pct}% tamamlandı</h1><div className="bar"><i style={{width:`${pct}%`}}/></div><div className="stats"><span><b>{completed}</b> / {units.length} tamamlandı</span><span>🎬 {remaining.length} yapım kaldı</span></div></section>
 {tab==='home'&&<><h2>Bugün</h2><p className="muted">İlerlemene göre sıradaki yapımlar. Fazladan izlersen liste otomatik öne gelir.</p><div className="list">{today.map(card)}</div><h2>Yaklaşanlar</h2><div className="list">{remaining.slice(today.length,today.length+4).map(card)}</div></>}
 {tab==='titles'&&<><h2>Tüm Yapımlar</h2><div className="list">{titles.map(card)}</div></>}
 {tab==='calendar'&&<><h2>Akıllı Takvim</h2><div className="calendarBox"><CalendarDays size={38}/><h3>Doomsday'e {days} gün</h3><p>Kalan {remaining.length} yapım, ilerlemen değiştikçe otomatik olarak yeniden sıraya giriyor.</p></div></>}
 <nav><button className={tab==='home'?'active':''} onClick={()=>setTab('home')}><Home/>Bugün</button><button className={tab==='titles'?'active':''} onClick={()=>setTab('titles')}><Film/>Yapımlar</button><button className={tab==='calendar'?'active':''} onClick={()=>setTab('calendar')}><CalendarDays/>Takvim</button></nav></main>
}
