import './globals.css'
import type {Metadata,Viewport} from 'next'
import RegisterSW from './register-sw'
import ClientTools from './client-tools'
export const metadata:Metadata={title:'Watchpath',description:'Adaptive movie and TV marathon planner',manifest:'/manifest.webmanifest',applicationName:'Watchpath',appleWebApp:{capable:true,title:'Watchpath',statusBarStyle:'black-translucent'}}
export const viewport:Viewport={themeColor:'#08090d',width:'device-width',initialScale:1,viewportFit:'cover'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body><RegisterSW/><ClientTools/>{children}</body></html>}
