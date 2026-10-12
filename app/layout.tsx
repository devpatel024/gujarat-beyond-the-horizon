import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Gujarat — Beyond the Horizon',description:'An independent journey through Gujarat’s salt landscapes, living heritage, forests and sacred coast. Explore destinations and build a regional itinerary.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
