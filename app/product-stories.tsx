'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';

const clamp=(value:number,min=0,max=1)=>Math.min(max,Math.max(min,value));

function useStoryPhase(steps:number):[RefObject<HTMLDivElement|null>,number]{
  const ref=useRef<HTMLDivElement>(null);
  const [phase,setPhase]=useState(0);

  useEffect(()=>{
    const reduce=matchMedia('(prefers-reduced-motion: reduce)');
    const compact=matchMedia('(max-width: 1050px)');
    let frame=0;
    const update=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const element=ref.current;
        if(!element)return;
        if(reduce.matches){setPhase(steps-1);return;}
        const section=element.closest<HTMLElement>('[data-story-section]');
        if(!section)return;
        let progress=0;
        if(compact.matches){
          const rect=element.getBoundingClientRect();
          progress=clamp((innerHeight*.78-rect.top)/(rect.height+innerHeight*.45));
        }else{
          const rect=section.getBoundingClientRect();
          const travel=Math.max(1,rect.height-innerHeight*.7);
          progress=clamp((innerHeight*.18-rect.top)/travel);
        }
        setPhase(Math.min(steps-1,Math.floor(progress*steps)));
      });
    };
    addEventListener('scroll',update,{passive:true});
    addEventListener('resize',update);
    reduce.addEventListener('change',update);
    compact.addEventListener('change',update);
    update();
    return()=>{
      cancelAnimationFrame(frame);
      removeEventListener('scroll',update);
      removeEventListener('resize',update);
      reduce.removeEventListener('change',update);
      compact.removeEventListener('change',update);
    };
  },[steps]);

  return[ref,phase];
}

function Theater({kind,labels,phase,caption,truth,children}:{kind:string;labels:string[];phase:number;caption:string;truth:string;children:ReactNode}){
  return <div className={`story-theater ${kind}-theater`} data-phase={phase}>
    <div className="theater-top">
      <span>LIVE PRODUCT STORY</span>
      <div><em>{String(phase+1).padStart(2,'0')} / {String(labels.length).padStart(2,'0')}</em><strong>{labels[phase]}</strong></div>
      <div className="theater-dots" aria-hidden="true">{labels.map((label,index)=><i className={index<=phase?'on':''} key={label}/>)}</div>
    </div>
    <div className="theater-stage"><div className="scene-in" key={`${kind}-${phase}`}>{children}</div></div>
    <div className="theater-foot"><p>{caption}</p><span>{truth}</span></div>
  </div>;
}

const radarSteps=['SEARCH','PROVE','SCORE','RANK','REACH OUT'];
const radarCaptions=[
  'Radar starts with one plain question: who is likely to book?',
  'It checks public proof before a buyer moves forward.',
  'Five fit signals become one score a sales person can understand.',
  'The strongest buyer rises to the top of the list.',
  'Radar prepares the first move. A person reviews it and sends it.',
];

export function RadarStory(){
  const [ref,phase]=useStoryPhase(radarSteps.length);
  return <div ref={ref} role="img" aria-label="Radar searches for likely buyers, checks public proof, scores fit, ranks the best lead, and prepares outreach for a person to review.">
    <Theater kind="radar" labels={radarSteps} phase={phase} caption={radarCaptions[phase]} truth="WORKING FLOW · PUBLIC WEB PROOF · HUMAN SEND">
      {phase===0&&<div className="radar-search-scene"><div className="radar-rings"><i/><i/><i/><b/></div><div className="scene-statement"><small>MIAMI · CORPORATE GROUPS</small><strong>WHO IS READY<br/>TO BOOK?</strong><span>Searching real public sources…</span></div></div>}
      {phase===1&&<div className="big-lead-card"><small>BUYER FOUND · PROOF CHECKED</small><h3>Shoreline<br/>Tech</h3><p>Miami company · 10–150 people</p><div className="proof-pills"><span>TEAM PAGE ✓</span><span>GROUP EVENTS ✓</span><span>MIAMI OFFICE ✓</span></div></div>}
      {phase===2&&<div className="fit-score-scene"><div className="score-orb"><small>BUYER FIT</small><strong>92</strong><span>/ 100</span></div><div className="score-signals">{['Team match','Buying power','Booking intent','Near the venue','Easy to reach'].map((item,index)=><div key={item}><span>{item}</span><i><b style={{width:`${[94,88,91,96,84][index]}%`}}/></i></div>)}</div></div>}
      {phase===3&&<div className="rank-scene"><small>BEST BUYERS · FIRST</small>{[['01','Shoreline Tech','92'],['02','Meridian Members','86'],['03','Palm House Group','79']].map(([rank,name,score])=><div key={rank}><span>{rank}</span><b>{name}</b><strong>{score}</strong></div>)}</div>}
      {phase===4&&<div className="action-scene"><small>FIRST MOVE · READY TO REVIEW</small><strong>Invite the people lead<br/>to a private team night.</strong><div><span>EMAIL</span><span>LINKEDIN</span><span>CALL</span></div><p>PERSON CHECKS IT → PERSON SENDS IT</p></div>}
    </Theater>
  </div>;
}

const appSteps=['CLAIM','ENTER','EXPLORE','EARN','RETURN'];
const appCaptions=[
  'A guest claims a ticket and gets one clear place to begin.',
  'The visit opens with a simple path through the venue.',
  'Rooms become missions guests can finish together.',
  'Every completed mission adds a stamp and points.',
  'The next suggestion is shaped by what the guest enjoyed.',
];

export function AppStory(){
  const [ref,phase]=useStoryPhase(appSteps.length);
  return <div ref={ref} role="img" aria-label="The App turns a claimed ticket into entry, a venue journey, missions, stamps, points, and a personal next stop.">
    <Theater kind="app" labels={appSteps} phase={phase} caption={appCaptions[phase]} truth="WORKING GUEST JOURNEY · LIVE CONNECTIONS COME NEXT">
      <div className="guest-phone">
        <div className="phone-bar"><span>TEQUILA TOWN</span><i/></div>
        {phase===0&&<div className="ticket-screen"><small>JOURNEY PASS · CLAIMED</small><strong>SOFIA R.</strong><span>TT–26–0417</span><b>WELCOME IN →</b></div>}
        {phase===1&&<div className="route-screen"><small>YOUR NIGHT</small><strong>START HERE.</strong><div className="big-route"><i/><span>GATE</span><span>AGAVE LAB</span><span>LA CAVA</span></div></div>}
        {phase===2&&<div className="mission-screen"><small>LIVE MISSION · AGAVE LAB</small><strong>Decode<br/>the aroma.</strong><div><span>1 · VISIT</span><span>2 · TASTE</span><span>3 · SCAN</span></div><b>250 POINTS WAITING</b></div>}
        {phase===3&&<div className="passport-screen"><small>YOUR PASSPORT</small><strong>1,850 POINTS</strong><div>{['AG','CA','RO','ME'].map(item=><i key={item}>{item}</i>)}</div><b>NEW STAMP EARNED</b></div>}
        {phase===4&&<div className="next-screen"><small>MADE FOR SOFIA</small><strong>GO TO<br/>LA CAVA NEXT.</strong><span>Reposado tasting · 2 minute walk</span><b>SHOW THE WAY →</b></div>}
      </div>
    </Theater>
  </div>;
}

const swarmSteps=['MISSION','ROUTE','WORK','COMBINE','REVIEW'];
const swarmCaptions=[
  'One clear mission goes in.',
  'The lead agent chooses only the specialists the job needs.',
  'Each specialist works on one clear part.',
  'Their work returns as one useful result.',
  'A person checks the result before anything moves forward.',
];

const specialists=['ANALYTICS','SPONSOR INTEL','RESEARCH','WRITING','SLIDES'];

export function SwarmStory(){
  const [ref,phase]=useStoryPhase(swarmSteps.length);
  return <div ref={ref} role="img" aria-label="Agent Swarm receives a mission, chooses the right specialists, runs their work, combines the result, and sends it to a person for review.">
    <Theater kind="swarm" labels={swarmSteps} phase={phase} caption={swarmCaptions[phase]} truth="21 REAL SPECIALISTS · CONNECTIONS AND HISTORY COME NEXT">
      {phase===0&&<div className="mission-card"><small>MISSION · 9:14 PM</small><strong>CREATE A SPONSOR<br/>RECAP FOR TONIGHT.</strong><span>One goal. One owner. One clear finish.</span></div>}
      {phase===1&&<div className="route-map"><div className="route-core"><small>LEAD AGENT</small><b>ROUTE</b></div><div>{specialists.map((name,index)=><span key={name} style={{'--agent':index} as CSSProperties}>{name}</span>)}</div></div>}
      {phase===2&&<div className="work-grid">{specialists.map((name,index)=><div key={name}><small>{String(index+1).padStart(2,'0')} · WORKING</small><b>{name}</b><i><span style={{width:`${[84,72,91,64,78][index]}%`}}/></i></div>)}</div>}
      {phase===3&&<div className="recap-scene"><small>ONE RESULT · BUILT TOGETHER</small><strong>SPONSOR RECAP</strong><div><span>01 · Guest story</span><span>02 · Activation proof</span><span>03 · Partner next moves</span></div><b>12 SLIDES · READY</b></div>}
      {phase===4&&<div className="review-scene"><small>HUMAN CHECK</small><strong>THE WORK IS READY.<br/>YOU MAKE THE CALL.</strong><div><span>REVIEW</span><span>REVISE</span><span>APPROVE</span></div></div>}
    </Theater>
  </div>;
}

const controlSteps=['COLLECT','CHECK','RANK','DECIDE'];
const controlCaptions=[
  'Control Center brings scattered business signals into one place.',
  'It removes repeats and facts that cannot be proved.',
  'The three signals with the most impact rise to the top.',
  'A long day of data becomes three clear moves.',
];

export function ControlStory(){
  const [ref,phase]=useStoryPhase(controlSteps.length);
  return <div ref={ref} role="img" aria-label="Control Center collects many signals, checks what is real, ranks the strongest facts, and turns them into three clear moves.">
    <Theater kind="control" labels={controlSteps} phase={phase} caption={controlCaptions[phase]} truth="WORKING VERIFICATION FLOW · TEQUILA TOWN FEEDS COME NEXT">
      {phase===0&&<div className="signal-cloud"><small>MANY SIGNALS · ONE VIEW</small><div>{['TICKET SPEED','VIP DEMAND','GUEST MISSIONS','SPONSOR ACTIVITY','TEAM WORK','PRESS'].map(item=><span key={item}>{item}</span>)}</div></div>}
      {phase===1&&<div className="check-scene"><small>TRUTH GATE</small><strong>6 FACTS PASS.<br/>2 GET CUT.</strong><div><span>SOURCE ✓</span><span>IDENTITY ✓</span><span>FRESHNESS ✓</span><span>NO REPEATS ✓</span></div></div>}
      {phase===2&&<div className="priority-scene"><small>RANKED BY IMPACT</small>{[['96','VIP demand is rising'],['88','Premium tickets moved faster'],['82','Sponsor room drew repeat visits']].map(([score,text])=><div key={score}><strong>{score}</strong><span>{text}</span></div>)}</div>}
      {phase===3&&<div className="brief-scene"><small>TODAY · THREE MOVES</small><strong>DO THIS NEXT.</strong><ol><li><b>1</b>Call the top VIP groups.</li><li><b>2</b>Open more premium seats.</li><li><b>3</b>Build the sponsor recap.</li></ol><span>PROOF ATTACHED · READY TO DECIDE</span></div>}
    </Theater>
  </div>;
}

const loopSteps=['ACQUIRE','EXPERIENCE','OPERATE','CONTROL','LEARN'];
const handoffs=[
  ['RADAR','WHO MAY BUY','APP','WHO ARRIVED'],
  ['APP','WHAT GUESTS DID','SWARM','WHAT NEEDS WORK'],
  ['SWARM','WHAT GOT DONE','CONTROL','WHAT MATTERS'],
  ['CONTROL','THE NEXT MOVE','RADAR','A BETTER TARGET'],
] as const;

export function OperatingLoopStory(){
  const [ref,phase]=useStoryPhase(loopSteps.length);
  const handoff=handoffs[Math.min(phase,handoffs.length-1)];
  return <div ref={ref} className="loop-theater" data-phase={phase} role="img" aria-label="Radar, the App, Agent Swarm, and Control Center pass useful information around one improving operating loop.">
    <div className="loop-progress"><span>{String(phase+1).padStart(2,'0')} / 05</span><strong>{loopSteps[phase]}</strong><div>{loopSteps.map((step,index)=><i className={index<=phase?'on':''} key={step}/>)}</div></div>
    <div className="loop-scene scene-in" key={`loop-${phase}`}>
      {phase<4?<><div className="loop-product"><small>FROM</small><strong>{handoff[0]}</strong><span>{handoff[1]}</span></div><b className="loop-arrow">→</b><div className="loop-product"><small>TO</small><strong>{handoff[2]}</strong><span>{handoff[3]}</span></div></>:<div className="learn-scene"><small>EVERY FULL TURN</small><strong>THE SYSTEM<br/>LEARNS.</strong><div><span>BETTER TARGET</span><span>BETTER NIGHT</span><span>BETTER WORK</span><span>BETTER CALL</span></div></div>}
    </div>
    <p className="loop-caption">{phase<4?`${handoff[0]} gives ${handoff[2]} a better signal.`:'The next night starts with better information.'}</p>
  </div>;
}
