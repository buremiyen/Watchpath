'use client'

import {useState} from 'react'

const groups=[
 ['Spider-Man',['Spider-Man (2002)','Spider-Man 2','Spider-Man 3','The Amazing Spider-Man','The Amazing Spider-Man 2','Spider-Man: Homecoming','Spider-Man: Far From Home','Spider-Man: No Way Home','Spider-Man: Brand New Day']],
 ['Batman',['Batman Begins','The Dark Knight','The Dark Knight Rises','Batman v Superman: Dawn of Justice','Zack Snyder’s Justice League','The Batman']],
 ['X-Men',['X-Men','X2: X-Men United','X-Men: The Last Stand','X-Men Origins: Wolverine','X-Men: First Class','The Wolverine','X-Men: Days of Future Past','X-Men: Apocalypse','Logan','Dark Phoenix','The New Mutants','Deadpool & Wolverine']],
 ['Star Wars',['Episode I – The Phantom Menace','Episode II – Attack of the Clones','Episode III – Revenge of the Sith','Solo: A Star Wars Story','Rogue One: A Star Wars Story','Episode IV – A New Hope','Episode V – The Empire Strikes Back','Episode VI – Return of the Jedi','Episode VII – The Force Awakens','Episode VIII – The Last Jedi','Episode IX – The Rise of Skywalker']],
 ['Harry Potter',["Harry Potter and the Philosopher's Stone",'Harry Potter and the Chamber of Secrets','Harry Potter and the Prisoner of Azkaban','Harry Potter and the Goblet of Fire','Harry Potter and the Order of the Phoenix','Harry Potter and the Half-Blood Prince','Harry Potter and the Deathly Hallows – Part 1','Harry Potter and the Deathly Hallows – Part 2']]
] as const

export default function Marathons(){
 const[open,setOpen]=useState('Spider-Man')
 return <main style={{maxWidth:940,margin:'0 auto',padding:'48px 18px 140px'}}>
  <a href="/" style={{color:'#aaa',textDecoration:'none'}}>← Watchpath</a>
  <h1 style={{fontSize:'clamp(42px,7vw,70px)',margin:'34px 0 8px'}}>Diğer maratonlar</h1>
  <p style={{color:'#999',lineHeight:1.7,maxWidth:620}}>Doomsday dışında popüler seriler için hazırlanmış izleme sıraları.</p>
  <section style={{display:'grid',gap:12,marginTop:28}}>{groups.map(([name,items])=><article key={name} style={{border:'1px solid rgba(255,255,255,.14)',borderRadius:24,background:'rgba(255,255,255,.05)',backdropFilter:'blur(22px)',overflow:'hidden'}}>
   <button onClick={()=>setOpen(open===name?'':name)} style={{width:'100%',border:0,background:'transparent',color:'inherit',padding:20,textAlign:'left'}}><small style={{color:'#ff7180',letterSpacing:'.15em'}}>{items.length} YAPIM</small><h2 style={{margin:'6px 0 0',fontSize:25}}>{name}</h2></button>
   {open===name&&<div style={{display:'grid',gap:7,padding:'0 20px 20px'}}>{items.map((item,i)=><div key={item} style={{display:'grid',gridTemplateColumns:'34px 1fr',alignItems:'center',gap:10,padding:11,border:'1px solid rgba(255,255,255,.08)',borderRadius:13,background:'rgba(0,0,0,.16)'}}><span style={{fontSize:9,color:'#777'}}>{String(i+1).padStart(2,'0')}</span><b style={{fontSize:12}}>{item}</b></div>)}</div>}
  </article>)}</section>
 </main>
}
