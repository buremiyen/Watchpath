'use client'

import {useEffect,useState} from 'react'
import {Sparkles,Trophy} from 'lucide-react'

// The main marathon currently contains 38 films/specials plus episode-level TV progress.
// We derive completion from the same localStorage object used by the planner, without changing existing progress data.
export default function DoomsdayFinale(){
 const[complete,setComplete]=useState(false)
 useEffect(()=>{
  const check=()=>{try{const progress=JSON.parse(localStorage.getItem('watchpath-progress')||'{}');const values=Object.values(progress);setComplete(values.length>0&&values.every(Boolean)&&values.filter(Boolean).length>=38)}catch{setComplete(false)}}
  check();window.addEventListener('storage',check);const timer=setInterval(check,1200);return()=>{window.removeEventListener('storage',check);clearInterval(timer)}
 },[])
 return <div className="wp-finale-wrap">
  <section className="wp-doomsday">
   <div className="wp-final-badge">FINAL</div><Sparkles className="wp-spark"/>
   <p>MARVEL STUDIOS</p><h3>AVENGERS</h3><h2>DOOMSDAY</h2><b>18 DECEMBER 2026</b>
   <span>Maratonun son durağı. Buraya geldiğinde Doomsday için hazırsın.</span>
  </section>
  {complete&&<section className="wp-celebration"><div className="wp-confetti">✦ ✧ ✦ ✧ ✦</div><Trophy/><p>MARATON TAMAMLANDI</p><h2>🎉 Tebrikler, bitirdin!</h2><span>Doomsday için hazırsın. Marvel maratonunun sonuna geldin.</span><div className="wp-party">⚡ 🏆 ⚡</div></section>}
  <style jsx>{`
   .wp-finale-wrap{width:min(760px,calc(100% - 32px));margin:42px auto 120px}.wp-doomsday{position:relative;overflow:hidden;padding:68px 24px;text-align:center;border:1px solid rgba(255,70,85,.3);border-radius:28px;background:radial-gradient(circle at 50% 34%,rgba(210,22,50,.3),transparent 35%),linear-gradient(145deg,#19080e,#08090d 60%,#11050a);box-shadow:0 30px 80px rgba(0,0,0,.4)}.wp-doomsday:after{content:'';position:absolute;left:18%;right:18%;bottom:-70px;height:140px;background:rgba(230,30,60,.22);filter:blur(40px);border-radius:50%}.wp-final-badge{display:inline-block;padding:7px 13px;border:1px solid rgba(255,255,255,.18);border-radius:999px;font-size:10px;letter-spacing:.25em;color:#ff8d99}.wp-spark{display:block;margin:20px auto 5px;color:#ff687a}.wp-doomsday p{margin:7px 0 2px;font-size:10px;letter-spacing:.4em;color:#aaa}.wp-doomsday h3{margin:0;font-size:22px;letter-spacing:.3em;color:#ddd}.wp-doomsday h2{margin:2px 0 10px;font-size:clamp(42px,10vw,76px);line-height:.95;letter-spacing:.06em}.wp-doomsday b{display:block;font-size:11px;letter-spacing:.17em;color:#ff7888}.wp-doomsday span{display:block;max-width:430px;margin:22px auto 0;color:#999;line-height:1.6;font-size:13px}.wp-celebration{margin-top:20px;padding:52px 24px;text-align:center;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:radial-gradient(circle at top,rgba(255,80,110,.22),transparent 42%),#101116;box-shadow:0 28px 70px rgba(0,0,0,.4)}.wp-celebration svg{width:52px;height:52px;margin:0 auto 15px}.wp-celebration p{font-size:10px;letter-spacing:.25em;color:#ff8190}.wp-celebration h2{font-size:clamp(28px,7vw,48px);margin:8px 0 12px}.wp-celebration span{display:block;color:#aaa;line-height:1.6}.wp-confetti{font-size:25px;letter-spacing:10px;margin-bottom:17px;animation:wp-party 1.8s ease-in-out infinite alternate}.wp-party{font-size:25px;margin-top:22px}@keyframes wp-party{to{transform:translateY(-8px) scale(1.04)}}
  `}</style>
 </div>
}
