'use client';

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

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
          const travel=rect.height+innerHeight*.32;
          progress=clamp((innerHeight*.82-rect.top)/travel);
        }else{
          const rect=section.getBoundingClientRect();
          const travel=Math.max(1,rect.height-innerHeight*.72);
          progress=clamp((innerHeight*.2-rect.top)/travel);
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

function StoryProgress({labels,phase}:{labels:string[];phase:number}){
  return <div className="story-progress">
    <div><span>WORKFLOW DEMO</span><strong>{labels[phase]}</strong></div>
    <div className="story-steps">{labels.map((label,index)=><span className={index===phase?'is-active':index<phase?'is-done':''} key={label}><i/>{label}</span>)}</div>
  </div>;
}

const radarSteps=['SEARCH','VERIFY','SCORE','PRIORITIZE','ACTIVATE'];
const candidates=[
  {name:'Shoreline Tech',kind:'CORPORATE BUYER',proof:'Team culture program',score:92,state:'keep'},
  {name:'Harbor Event Hall',kind:'VENUE / SELLER',proof:'Sells event space',score:0,state:'reject'},
  {name:'Meridian Members',kind:'PRIVATE CLUB',proof:'Runs member outings',score:86,state:'keep'},
  {name:'South Coast Supply',kind:'EVENT SUPPLIER',proof:'Vendor, not buyer',score:0,state:'reject'},
];

export function RadarStory(){
  const [ref,phase]=useStoryPhase(radarSteps.length);
  const scores=[['AFFINITY',94],['CAPACITY',88],['INTENT',91],['PROXIMITY',96],['ACCESS',84]] as const;
  return <div ref={ref} className="story-demo radar-story" data-phase={phase} role="img" aria-label="Radar searches for likely buyers, verifies source evidence, scores fit, ranks the best lead, and prepares outreach.">
    <div aria-hidden="true">
      <StoryProgress labels={radarSteps} phase={phase}/>
      <div className="radar-workbench">
        <div className="search-order">
          <small>SEARCH ORDER / CORPORATE</small>
          <b>Miami groups<br/>10–150 people</b>
          <div className="mode-row"><span>HUNTER</span><span>CONCIERGE</span><span className="on">CORPORATE</span><span>PARTNER</span></div>
          <div className="search-line"><i/><span>{phase===0?'Finding possible buyers…':phase===1?'Checking real source proof…':phase===2?'Scoring buyer fit…':phase===3?'Sorting best first…':'Building the first move…'}</span></div>
        </div>

        <div className="candidate-stack">{candidates.map((candidate,index)=>{
          const rejected=phase>=1&&candidate.state==='reject';
          const ranked=phase>=3&&candidate.state==='keep';
          return <article className={`${rejected?'is-rejected ':''}${ranked?'is-ranked':''}`} key={candidate.name} style={{'--order':index} as CSSProperties}>
            <span>{String(index+1).padStart(2,'0')}</span><div><b>{candidate.name}</b><small>{candidate.kind}</small></div>
            <em>{rejected?'REJECT':phase>=1?'PROOF FOUND':'CHECK'}</em>
          </article>;
        })}</div>

        <div className={`evidence-dossier ${phase>=1?'is-open':''}`}>
          <header><span>SOURCE PROOF</span><b>VERIFIED</b></header>
          <div className="proof-line"><i/><span>Public team page</span><b>MATCH</b></div>
          <div className="proof-line"><i/><span>Past group outings</span><b>MATCH</b></div>
          <div className="proof-line"><i/><span>Miami office</span><b>MATCH</b></div>
          <p>“Employee culture and team events”</p>
        </div>

        <div className={`score-dossier ${phase>=2?'is-open':''}`}>
          <header><span>FIVE-PART FIT</span><b>92 / 100</b></header>
          {scores.map(([label,value])=><div className="score-row" key={label}><span>{label}</span><i><b style={{'--score':`${value}%`} as CSSProperties}/></i><em>{value}</em></div>)}
        </div>

        <div className={`activation-card ${phase>=4?'is-open':''}`}>
          <small>NEXT ACTION / READY</small><b>Invite the people lead<br/>to a private team night.</b>
          <div><span>EMAIL A</span><span>EMAIL B</span><span>LINKEDIN</span><span>CALL</span></div>
          <em>PERSON REVIEWS + SENDS →</em>
        </div>
      </div>
      <p className="truth-note">REAL PRODUCT FLOW / PUBLIC WEB EVIDENCE / A PERSON MAKES THE FINAL MOVE</p>
    </div>
  </div>;
}

const journeySteps=['TICKET','ENTER','DISCOVER','PARTICIPATE','COMPLETE','EARN','PERSONALIZE'];
const journeyCopy=[
  ['TICKET CLAIMED','Entry is linked to the guest.'],
  ['GATE OPEN','The visit begins.'],
  ['AGAVE LAB FOUND','The map lights the next stop.'],
  ['MISSION STARTED','Decode three agave aromas.'],
  ['SCAN ACCEPTED','Every mission step is complete.'],
  ['STAMP + 250 POINTS','The passport records the win.'],
  ['NEXT: LA CAVA','A better route, based on the guest.'],
] as const;

export function AppStory(){
  const [ref,phase]=useStoryPhase(journeySteps.length);
  return <div ref={ref} className="story-demo app-story" data-phase={phase} role="img" aria-label="The App turns a claimed ticket into entry, discovery, a mission, a passport stamp, points, and a personalized next stop.">
    <div aria-hidden="true">
      <StoryProgress labels={journeySteps} phase={phase}/>
      <div className="journey-board">
        <div className="guest-ticket">
          <small>ADMIT ONE / JOURNEY PASS</small><b>SOFIA R.</b><span>TT–26–0417</span><i className={phase>=0?'is-stamped':''}>CLAIMED</i>
        </div>
        <div className="venue-route">
          <div className="route-line"><i style={{'--route':`${phase/6*100}%`} as CSSProperties}/></div>
          {['GATE','PLAZA','AGAVE LAB','LA CAVA','STAGE'].map((place,index)=>{
            const unlockAt=[1,1,2,6,6][index];
            return <span className={phase>=unlockAt?'is-on':''} key={place} style={{'--place':index} as CSSProperties}><i>{index+1}</i><b>{place}</b></span>;
          })}
          <div className="guest-token" style={{'--journey':`${Math.min(phase,6)/6*100}%`} as CSSProperties}>GUEST</div>
        </div>
        <div className={`mission-slip ${phase>=3?'is-open':''}`}>
          <small>LIVE MISSION / AGAVE LAB</small><b>Decode the aroma</b>
          <div><span className={phase>=3?'done':''}>01 / VISIT</span><span className={phase>=4?'done':''}>02 / TASTE</span><span className={phase>=4?'done':''}>03 / SCAN</span></div>
          <em>{phase>=4?'MISSION COMPLETE':'250 POINTS WAITING'}</em>
        </div>
        <div className={`passport-card ${phase>=5?'is-open':''}`}>
          <small>DIGITAL PASSPORT / LEVEL 04</small>
          <div className="stamp-grid">{['AG','CA','RO','ME','MU','VIP'].map((stamp,index)=><i className={index<4||phase>=5&&index===4?'earned':''} key={stamp}>{stamp}</i>)}</div>
          <b className="stamp-hit">AGAVE<br/>LAB</b><strong>{phase>=5?'1,850 PTS':'1,600 PTS'}</strong>
        </div>
        <div className={`next-stop ${phase>=6?'is-open':''}`}><small>MADE FOR THIS GUEST</small><b>Go to La Cava next.</b><span>Reposado tasting · 2 min walk →</span></div>
        <div className="journey-status"><small>NOW HAPPENING</small><b>{journeyCopy[phase][0]}</b><span>{journeyCopy[phase][1]}</span></div>
      </div>
      <p className="truth-note">WORKING GUEST JOURNEY / TIXR AND WALLET CONNECTIONS ARE THE NEXT BUILD STEP</p>
    </div>
  </div>;
}

const swarmSteps=['MISSION','ORCHESTRATE','ROUTE','COLLABORATE','SYNTHESIZE','ACT'];
const specialists=[
  {name:'ANALYTICS',job:'Measure guest and revenue signals',output:'4 KPI findings'},
  {name:'SPONSOR INTEL',job:'Find partner activation proof',output:'7 proof points'},
  {name:'RESEARCH',job:'Add context and source checks',output:'9 sources'},
  {name:'DOCS',job:'Write the executive story',output:'Recap draft'},
  {name:'SLIDES',job:'Build the sponsor-ready deck',output:'12 slides'},
];

export function SwarmStory(){
  const [ref,phase]=useStoryPhase(swarmSteps.length);
  return <div ref={ref} className="story-demo swarm-story" data-phase={phase} role="img" aria-label="Agent Swarm receives a sponsor recap mission, routes work to five named specialists, combines their outputs, and produces one result for human review.">
    <div aria-hidden="true">
      <StoryProgress labels={swarmSteps} phase={phase}/>
      <div className="swarm-switchboard">
        <div className={`mission-brief ${phase>=0?'is-on':''}`}><small>MISSION / 21:14</small><b>Create a sponsor recap<br/>for last night.</b><span>One goal. One owner. Clear finish.</span></div>
        <div className={`orchestrator-block ${phase>=1?'is-on':''}`}><small>MASTER ORCHESTRATOR</small><b>{phase<2?'READING MISSION':'ROUTE LOCKED'}</b><span>5 of 21 specialists needed</span></div>
        <div className="specialist-grid">{specialists.map((agent,index)=>{
          const routed=phase>=2;
          const working=phase>=3;
          const done=phase>=4;
          return <article className={`${routed?'is-routed ':''}${working?'is-working ':''}${done?'is-done':''}`} key={agent.name} style={{'--agent':index} as CSSProperties}>
            <header><span>{String(index+1).padStart(2,'0')}</span><em>{done?'RETURNED':working?'WORKING':routed?'ROUTED':'STANDBY'}</em></header>
            <b>{agent.name}</b><p>{agent.job}</p><strong>{done?agent.output:'WORK ORDER'}</strong>
          </article>;
        })}</div>
        <div className={`synthesis-rail ${phase>=4?'is-on':''}`}><span>ANALYZE</span><span>PROVE</span><span>WRITE</span><span>DESIGN</span><i/></div>
        <div className={`recap-output ${phase>=5?'is-open':''}`}>
          <header><small>EXAMPLE OUTPUT / HUMAN REVIEW</small><b>SPONSOR RECAP</b></header>
          <div><span><b>01</b>Guest engagement story</span><span><b>02</b>Activation proof</span><span><b>03</b>Partner next moves</span></div>
          <footer><strong>12-SLIDE DECK</strong><em>READY TO CHECK →</em></footer>
        </div>
      </div>
      <p className="truth-note">REAL ROUTING + REAL SPECIALIST ROSTER / LIVE DATA CONNECTIONS AND MISSION HISTORY ARE THE NEXT BUILD STEP</p>
    </div>
  </div>;
}

const controlSteps=['SIGNALS','VERIFY','PRIORITIZE','UNDERSTAND','DECIDE'];
const signals=[
  {name:'Ticket velocity',source:'TIXR',state:'keep'},
  {name:'VIP demand',source:'CRM',state:'keep'},
  {name:'Guest missions',source:'APP',state:'keep'},
  {name:'Sponsor activity',source:'PARTNER',state:'keep'},
  {name:'Agent missions',source:'SWARM',state:'keep'},
  {name:'Press mention',source:'PUBLIC WEB',state:'keep'},
  {name:'Repeat story',source:'DUPLICATE',state:'drop'},
  {name:'Wrong brand',source:'NO PROOF',state:'drop'},
];

export function ControlStory(){
  const [ref,phase]=useStoryPhase(controlSteps.length);
  return <div ref={ref} className="story-demo control-story" data-phase={phase} role="img" aria-label="Control Center receives many source types, rejects duplicates and unverified noise, ranks the strongest facts, and turns them into three next moves.">
    <div aria-hidden="true">
      <StoryProgress labels={controlSteps} phase={phase}/>
      <div className="signal-refinery">
        <div className="signal-intake"><header><span>CONCEPTUAL CONNECTED VIEW</span><b>MANY SIGNALS</b></header>{signals.map((signal,index)=>{
          const dropped=phase>=1&&signal.state==='drop';
          const verified=phase>=1&&signal.state==='keep';
          return <article className={`${dropped?'is-dropped ':''}${verified?'is-verified':''}`} key={signal.name} style={{'--signal':index} as CSSProperties}><i/><div><b>{signal.name}</b><small>{signal.source}</small></div><em>{dropped?'OUT':verified?'CHECKED':'IN'}</em></article>;
        })}</div>
        <div className={`verification-gate ${phase>=1?'is-on':''}`}><span>SOURCE</span><span>IDENTITY</span><span>FRESHNESS</span><span>DUPLICATE</span><b>{phase>=1?'6 FACTS PASS':'CHECKING'}</b></div>
        <div className={`priority-stack ${phase>=2?'is-on':''}`}><header><span>RANKED BY IMPACT</span><b>WHY IT MATTERS</b></header><article><em>96</em><div><b>VIP demand is rising</b><small>Strong booking intent</small></div></article><article><em>88</em><div><b>Premium tickets moved faster</b><small>Inventory decision needed</small></div></article><article><em>82</em><div><b>Sponsor room drew repeat visits</b><small>Recap opportunity</small></div></article></div>
        <div className={`daily-brief ${phase>=3?'is-open':''}`}>
          <header><small>TODAY / EXECUTIVE BRIEF</small><b>Three moves matter now.</b></header>
          <ol><li><b>1</b><span>Call the top VIP groups.</span></li><li><b>2</b><span>Open more premium seats.</span></li><li><b>3</b><span>Build the sponsor recap.</span></li></ol>
          <footer><span>PROOF ATTACHED</span><em>{phase>=4?'READY TO DECIDE':'BUILDING THE BRIEF'}</em></footer>
        </div>
      </div>
      <p className="truth-note">VERIFICATION-FIRST PRODUCT FLOW / TEQUILA TOWN BUSINESS FEEDS SHOWN HERE ARE THE CONNECTION PLAN, NOT LIVE CLAIMS</p>
    </div>
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
  return <div ref={ref} className="operating-loop" data-phase={phase} role="img" aria-label="Radar, the App, Agent Swarm, and Control Center pass useful information around one improving operating loop.">
    <div aria-hidden="true">
      <StoryProgress labels={loopSteps} phase={phase}/>
      <div className="loop-workbench">
        {handoffs.map(([from,data,to,result],index)=><article className={phase>=index?'is-on':''} key={from} style={{'--handoff':index} as CSSProperties}><header><span>{String(index+1).padStart(2,'0')}</span><b>{from}</b><i>→</i><b>{to}</b></header><p>{data}</p><strong>{result}</strong></article>)}
        <div className={phase>=4?'learning-core is-on':'learning-core'}><small>EACH CYCLE</small><b>LEARNS</b><span>Better target. Better visit.<br/>Better work. Better decision.</span></div>
      </div>
    </div>
  </div>;
}
