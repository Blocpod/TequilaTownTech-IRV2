/* eslint-disable @next/next/no-img-element -- vinext safely serves static brand assets */
import FreshExperience from './fresh-experience';
import HeroSpecimen from './hero-specimen';

const leads=[['94','Corporate offsite','120 guests · ready now'],['89','Luxury concierge','Repeat VIP groups'],['86','Private members club','New partner lead']];
const agents=['GUEST','SALES','OPS','SPONSOR','MEDIA','DATA','STUDIO','TICKETS'];

export default function Home(){return <main>
  <FreshExperience/>
  <a className="skip-link" href="#jobs">Skip to the story</a>
  <div className="load-gate" aria-hidden="true"><img src="/brand/tequila-town-tech-horizontal.png" alt=""/><i/></div>
  <div className="read-progress" aria-hidden="true"><i/></div>

  <header className="topbar">
    <a className="top-logo" href="#top" aria-label="Tequila Town Tech home"><img src="/brand/tequila-town-tech-horizontal.png" alt="Tequila Town Tech" width="1803" height="407" fetchPriority="high"/></a>
    <nav aria-label="Main navigation"><a href="#radar">The tools</a><a href="#loop">How they connect</a><a href="#build">What funding builds</a></nav>
    <a className="top-cta mag" href="#build">THE PLAN <span>↗</span></a>
    <details className="menu"><summary aria-label="Open menu"><i/><i/></summary><nav><a href="#radar">The tools</a><a href="#loop">How they connect</a><a href="#build">What funding builds</a></nav></details>
  </header>

  <section className="fresh-hero" id="top" aria-labelledby="hero-title">
    <div className="fresh-copy" data-reveal><p className="fresh-kicker">TEQUILA TOWN TECH / MIAMI</p><h1 id="hero-title">ONE NIGHT.<br/>FOUR BRAINS.<br/><em>ZERO GUESSWORK.</em></h1><p>Tequila Town has four smart tools. One finds customers. One helps guests. One gets work done. One shows leaders what matters.</p><div className="fresh-actions"><a className="fresh-primary mag" href="#jobs">SEE HOW IT WORKS <span>↘</span></a><span>SCROLL TO BUILD THE SYSTEM</span></div></div>
    <div className="fresh-machine"><HeroSpecimen/><div className="machine-tags"><span>01 / FIND</span><span>02 / GUIDE</span><span>03 / DO</span><span>04 / DECIDE</span></div></div>
    <div className="fresh-foot"><span>THE EXPERIENCE IS REAL</span><b>THE SYSTEM MAKES IT SMARTER</b><i>2026 / 001</i></div>
  </section>

  <section className="jobs" id="jobs"><header data-reveal><span>THE WHOLE IDEA / IN PLAIN ENGLISH</span><h2>FOUR JOBS.<br/><em>THAT&apos;S IT.</em></h2></header><div className="job-grid">{[
    ['01','FIND','people who may book.'],['02','GUIDE','guests through the night.'],['03','DO','the work that slows teams down.'],['04','DECIDE','what matters right now.'],
  ].map(([no,verb,text])=><article data-reveal key={no}><span>{no}</span><b>{verb}</b><p>{text}</p><i>↘</i></article>)}</div></section>

  <section className="world radar-world" id="radar"><div className="world-copy" data-reveal><span className="world-no">01 / FIND</span><h2>WHO IS READY<br/><em>TO BOOK?</em></h2><p>Radar searches for groups that fit Tequila Town. It checks each lead and puts the best ones first.</p><ul><li>Find real buyers</li><li>Check that they fit</li><li>Tell sales who to call first</li></ul></div><div className="world-machine radar-machine" data-reveal>
    <div className="radar-disc"><i/><i/><i/><i/><b>MIAMI</b><span className="sweep"/><span className="ping p1"/><span className="ping p2"/><span className="ping p3"/></div>
    <div className="lead-board"><header><span>BEST LEADS / LIVE</span><b>FIT</b></header>{leads.map(([score,title,text])=><div key={score}><b>{score}</b><span><strong>{title}</strong><small>{text}</small></span><i style={{'--fit':`${score}%`} as React.CSSProperties}/></div>)}</div>
    <div className="machine-label"><i/> SEARCHING NOW / 142 LEADS CHECKED</div>
  </div></section>

  <section className="world app-world" id="app"><div className="world-copy" data-reveal><span className="world-no">02 / GUIDE</span><h2>MAKE THE NIGHT<br/><em>EASY TO LOVE.</em></h2><p>The App gives every guest one simple place for tickets, directions, games, rewards, and memories.</p><ul><li>Tickets stay in one place</li><li>Guests always know where to go</li><li>Every visit becomes more personal</li></ul></div><div className="world-machine app-machine" data-reveal>
    <div className="phone phone-main"><header><b>TEQUILA TOWN</b><span>9:41</span></header><div className="guest-hello"><small>GOOD EVENING</small><strong>Ready for chapter 3?</strong><span>38% complete</span><i/></div><div className="journey-map"><span className="route"/><i className="way w1">1</i><i className="way w2">2</i><i className="way w3">3</i><b>YOUR NEXT STOP</b><small>Agave Lab · 2 min</small></div><div className="phone-nav"><i/><i/><i/><i/></div></div>
    <div className="phone phone-pass"><small>DIGITAL PASSPORT</small><b>LEVEL 04</b><div>{Array.from({length:6},(_,i)=><i className={i<4?'earned':''} key={i}/>)}</div><span>2 stamps to the next reward</span></div>
    <div className="guest-card"><small>GUEST SIGNAL</small><b>SOFIA / VIP INTENT</b><span>Reposado · Group of 8 · Return visit</span></div>
  </div></section>

  <section className="world swarm-world" id="swarm"><div className="world-copy" data-reveal><span className="world-no">03 / DO</span><h2>GIVE THE JOB<br/><em>TO THE RIGHT HELPER.</em></h2><p>The Swarm is a team of 21 AI helpers. A boss agent sends each job to the right one. People approve the important parts.</p><ul><li>One clear job goes in</li><li>The right helper does the work</li><li>A person stays in control</li></ul></div><div className="world-machine swarm-machine" data-reveal>
    <div className="mission-in"><small>NEW JOB</small><b>HELP A VIP GUEST</b><span>Priority / High</span></div>
    <div className="swarm-core"><span>BOSS<br/>AGENT</span><i/><i/><i/><i/></div>
    <div className="agent-ring">{agents.map((agent,i)=><div className={`agent a${i+1}`} key={agent}><i>{String(i+1).padStart(2,'0')}</i><b>{agent}</b><span>{i===0?'WORKING':'READY'}</span></div>)}</div>
    <div className="human-check"><i/> PERSON CHECKS FINAL ANSWER</div>
  </div></section>

  <section className="world control-world" id="control"><div className="world-copy" data-reveal><span className="world-no">04 / DECIDE</span><h2>WHAT SHOULD WE<br/><em>DO NEXT?</em></h2><p>Control Center watches the whole business. It shows what changed, what needs help, and the three best next moves.</p><ul><li>One screen, not ten</li><li>Important things rise to the top</li><li>Every answer comes with a next step</li></ul></div><div className="world-machine control-machine" data-reveal>
    <header><span>CONTROL CENTER / TODAY</span><i>LIVE</i></header><div className="big-question"><small>THE QUESTION</small><b>What needs our attention today?</b></div><div className="control-kpis"><div><small>BOOKINGS</small><b>↑ 18%</b><span className="mini-bars">{[30,42,38,57,64,82].map((h,i)=><i style={{height:`${h}%`}} key={i}/>)}</span></div><div><small>BEST LEADS</small><b>142</b><em>+38 this week</em></div><div><small>HAPPY GUESTS</small><b>71%</b><span className="donut"/></div></div><div className="next-moves"><small>BEST NEXT MOVES</small>{[['1','Call the top VIP group'],['2','Open more premium seats'],['3','Add staff at 8 PM']].map(([n,t])=><div key={n}><b>{n}</b><span>{t}</span><i>→</i></div>)}</div>
  </div></section>

  <section className="loop" id="loop"><header data-reveal><span>HOW THE FOUR TOOLS CONNECT</span><h2>ONE TOOL LEARNS.<br/><em>THE NEXT ONE ACTS.</em></h2><p>Then the loop starts again—smarter than before.</p></header><div className="loop-track" data-reveal>{[
    ['01','RADAR','finds the right people'],['02','APP','learns what guests like'],['03','SWARM','turns needs into work'],['04','CONTROL','shows the next move'],
  ].map(([n,t,d])=><article key={n}><span>{n}</span><b>{t}</b><p>{d}</p><i>→</i></article>)}</div><div className="loop-core" aria-hidden="true"><b>LEARN</b><span>DO</span></div></section>

  <section className="build" id="build"><header data-reveal><span>WHAT THE MONEY BUILDS</span><h2>THE PIECES WORK.<br/><em>NOW CONNECT THEM.</em></h2><p>Funding turns four strong tools into one safe, fast system for real guests and real business.</p></header><div className="build-steps">{[
    ['NOW','Working pieces','The four tools prove the idea.'],['NEXT','One live system','Connect tickets, guests, staff, and sales.'],['THEN','A system that grows','Make every new event better than the last.'],
  ].map(([stage,title,text],i)=><article data-reveal key={stage}><span>{stage} / 0{i+1}</span><h3>{title}</h3><p>{text}</p><div><i style={{width:`${(i+1)*33}%`}}/></div></article>)}</div></section>

  <section className="end" id="end"><div data-reveal><span>THE SIMPLE TRUTH</span><h2>THE VENUE<br/>CREATES THE MAGIC.<br/><em>THE SYSTEM HELPS IT GROW.</em></h2><a className="end-link mag" href="#top">BACK TO THE TOP <i>↑</i></a></div><img src="/brand/tequila-town-tech-badge.png" alt="Tequila Town Tech" width="1024" height="1024" loading="lazy"/></section>
  <footer><span>© 2026 TEQUILA TOWN TECH</span><b>THE EXPERIENCE OPERATING SYSTEM</b><span>MIAMI / FLORIDA</span></footer>
</main>}
