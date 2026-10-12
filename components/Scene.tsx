'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Instances,Instance} from '@react-three/drei';
import {useEffect,useRef,useState,useMemo,type RefObject} from 'react';
import * as THREE from 'three';
const cream='#F9E6A8',gold='#F2A900',ochre='#CC6F00',brown='#4D2A00';
function World({chapter,progress}:{chapter:number;progress:RefObject<number>}){
 const groups=useRef<(THREE.Group|null)[]>([]),sun=useRef<THREE.Mesh>(null),waves=useRef<THREE.Group>(null);
 const fog=useMemo(()=>new THREE.Fog(cream,25,105),[]),target=useMemo(()=>new THREE.Color(),[]),pointer=useRef({x:0,y:0});
 const mobile=typeof window!=='undefined'&&window.innerWidth<700;
 useEffect(()=>{if(!matchMedia('(pointer:fine)').matches)return;const move=(e:PointerEvent)=>{pointer.current={x:e.clientX/window.innerWidth*2-1,y:1-e.clientY/window.innerHeight*2}};window.addEventListener('pointermove',move,{passive:true});return()=>window.removeEventListener('pointermove',move)},[]);
 useFrame(({camera,clock},delta)=>{
  const p=progress.current,t=clock.elapsedTime,d=Math.min(delta,.05);
  camera.position.x=THREE.MathUtils.damp(camera.position.x,Math.sin(p*Math.PI*2)*2.5+pointer.current.x*(mobile?0:1.1),3,d);
  camera.position.y=THREE.MathUtils.damp(camera.position.y,3.8+Math.sin(p*Math.PI)*1.8+pointer.current.y*.25,3,d);
  camera.position.z=THREE.MathUtils.damp(camera.position.z,15-p*9,3,d);camera.lookAt(1,1,-24);
  target.set([cream,cream,gold,cream][chapter]);fog.color.lerp(target,.025);
  groups.current.forEach((g,i)=>{if(!g)return;const goal=i===chapter?0:-15;g.position.y=THREE.MathUtils.damp(g.position.y,goal,2.4,d);g.visible=g.position.y>-14.8});
  if(sun.current)sun.current.position.y=14-p*5;
  if(waves.current)waves.current.children.forEach((g,i)=>{g.position.y=.04+Math.sin(t*.65+i*.6)*.08;g.position.z=-i*3+(t*.3%3)});
 });
 return <><color attach="background" args={[cream]}/><primitive object={fog} attach="fog"/><ambientLight intensity={1.5} color={cream}/><directionalLight position={[15,22,5]} intensity={2.4} color={cream}/>
 <mesh ref={sun} position={[22,14,-65]}><sphereGeometry args={[6,32,24]}/><meshBasicMaterial color={gold} fog={false}/></mesh>
 <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.15,-40]}><planeGeometry args={[300,300]}/><meshStandardMaterial color={cream} roughness={1}/></mesh>
 <Instances limit={20}><coneGeometry args={[10,5,5]}/><meshStandardMaterial color={ochre} roughness={1}/>{Array.from({length:16},(_,i)=><Instance key={i} position={[(i-8)*12,-1,-65-(i%3)*9]} scale={[1+(i%3)*.4,.5+(i%4)*.3,1]}/>)}</Instances>
 <group ref={g=>{groups.current[0]=g}}>
 <Instances limit={120}><ringGeometry args={[3.45,3.48,6]}/><meshBasicMaterial color={ochre} transparent opacity={.28}/>{Array.from({length:mobile?50:110},(_,i)=><Instance key={i} rotation={[-Math.PI/2,0,0]} position={[(i%11-5)*6+(Math.floor(i/11)%2)*3,.01,-Math.floor(i/11)*5.2+8]}/>)}</Instances>
 <group position={[13,0,-22]}><mesh position={[0,.9,0]}><boxGeometry args={[1.8,.65,.6]}/><meshStandardMaterial color={brown}/></mesh><mesh position={[-.65,1.5,0]} rotation={[0,0,-.3]}><boxGeometry args={[.35,1.1,.4]}/><meshStandardMaterial color={brown}/></mesh>{[-.6,.6].map(x=><mesh key={x} position={[x,.4,0]}><boxGeometry args={[.12,.8,.45]}/><meshStandardMaterial color={brown}/></mesh>)}<mesh position={[.1,1.4,0]}><sphereGeometry args={[.42,8,8]}/><meshStandardMaterial color={brown}/></mesh></group>
 </group>
 <group ref={g=>{groups.current[1]=g}} position={[0,-15,0]}>
 <Instances limit={24}><boxGeometry args={[.8,6,.8]}/><meshStandardMaterial color={ochre} roughness={.9}/>{Array.from({length:16},(_,i)=><Instance key={i} position={[(i%2?1:-1)*6,3,-Math.floor(i/2)*6]}/>)}</Instances>
 <Instances limit={16}><boxGeometry args={[13,.5,1.4]}/><meshStandardMaterial color={brown} roughness={1}/>{Array.from({length:8},(_,i)=><Instance key={i} position={[0,6,-i*6]}/>)}</Instances>
 {Array.from({length:8},(_,i)=><mesh key={i} position={[0,-.08+i*.18,-28-i*2]}><boxGeometry args={[11, .3,2]}/><meshStandardMaterial color={i%2?ochre:gold}/></mesh>)}
 </group>
 <group ref={g=>{groups.current[2]=g}} position={[0,-15,0]}>
 <Instances limit={48}><cylinderGeometry args={[.18,.35,6,6]}/><meshStandardMaterial color={brown}/>{Array.from({length:mobile?20:42},(_,i)=><Instance key={i} position={[(i%2?1:-1)*(5+(i*7%13)),3,-(i*11%62)]}/>)}</Instances>
 <Instances limit={48}><icosahedronGeometry args={[2.5,1]}/><meshStandardMaterial color={ochre} roughness={1}/>{Array.from({length:mobile?20:42},(_,i)=><Instance key={i} position={[(i%2?1:-1)*(5+(i*7%13)),6,-(i*11%62)]} scale={[1+i%3*.2,1.1,1]}/>)}</Instances>
 </group>
 <group ref={g=>{groups.current[3]=g}} position={[0,-15,0]}><mesh rotation={[-Math.PI/2,0,0]} position={[0,-.08,-30]}><planeGeometry args={[200,170]}/><meshStandardMaterial color={gold} roughness={.35} metalness={.15}/></mesh><group ref={waves}>{Array.from({length:34},(_,i)=><mesh key={i} rotation={[-Math.PI/2,0,.01]} position={[0,.04,-i*3]}><planeGeometry args={[130,.05+(i%3)*.03]}/><meshBasicMaterial color={cream} transparent opacity={.7}/></mesh>)}</group><group position={[16,0,-32]}><mesh position={[0,1,0]}><boxGeometry args={[6,2,6]}/><meshStandardMaterial color={brown}/></mesh><mesh position={[0,5,0]}><coneGeometry args={[3,7,4]}/><meshStandardMaterial color={ochre}/></mesh><mesh position={[0,9,0]}><cylinderGeometry args={[.05,.05,3]}/><meshStandardMaterial color={brown}/></mesh><mesh position={[.8,9.8,0]}><planeGeometry args={[1.6,.7]}/><meshBasicMaterial color={gold} side={THREE.DoubleSide}/></mesh></group></group>
 </>
}
export default function Scene({chapter,progress}:{chapter:number;progress:RefObject<number>}){
 const[active,setActive]=useState(true);useEffect(()=>{const f=()=>{const hero=document.getElementById('home')?.getBoundingClientRect(),chapters=document.querySelector('.chapters')?.getBoundingClientRect();setActive(!document.hidden&&!!((hero&&hero.bottom>0)||(chapters&&chapters.top<innerHeight&&chapters.bottom>0)))};f();document.addEventListener('visibilitychange',f);window.addEventListener('scroll',f,{passive:true});return()=>{document.removeEventListener('visibilitychange',f);window.removeEventListener('scroll',f)}},[]);
 return <Canvas dpr={[1,typeof window!=='undefined'&&window.innerWidth<700?1:1.5]} frameloop={active?'always':'never'} camera={{position:[0,3.8,15],fov:52}} gl={{antialias:true,powerPreference:'low-power'}}><World chapter={chapter} progress={progress}/></Canvas>
}
