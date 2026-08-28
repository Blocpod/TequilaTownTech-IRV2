/* eslint-disable @next/next/no-img-element -- static brand assets are intentionally rendered without transformation */
import FreshExperience from './fresh-experience';
import HeroSpecimen from './hero-specimen';
import { AppStory, ControlStory, OperatingLoopStory, RadarStory, SwarmStory } from './product-stories';

export default function Home(){return <main>
  <FreshExperience/>
  <a className="skip-link" href="#jobs">Skip to the story</a>
  <div className="read-progress" aria-hidden="true"><i/></div>

  <header className="topbar">
    <a className="top-logo" href="#top" aria-label="Tequila Town Tech home"><img src="/brand/tequila-town-tech-horizontal.webp" alt="Tequila Town Tech" width="1803" height="407" fetchPriority="high"/></a>
    <nav aria-label="Main navigation"><a href="#radar">The tools</a><a href="#loop">How they connect</a><a href="#build">What funding builds</a></nav>
    <a className="top-cta mag" href="#build">THE PLAN <span>↗</span></a>
    <details className="menu"><summary aria-label="Open menu"><i/><i/></summary><nav><a href="#radar">The tools</a><a href="#loop">How they connect</a><a href="#build">What funding builds</a></nav></details>
  </header>

  <section className="fresh-hero" id="top" aria-labelledby="hero-title">
    <div className="fresh-copy" data-reveal><p className="fresh-kicker">TEQUILA TOWN TECHNOLOGY</p><h1 id="hero-title">A GREAT NIGHT.<br/><em>A SMARTER BUSINESS.</em></h1><p>Four tools find buyers, guide guests, help the team, and show what to do next.</p><div className="fresh-actions"><a className="fresh-primary mag" href="#jobs">SEE HOW IT WORKS <span>↘</span></a><span>SCROLL TO BUILD THE STORY</span></div></div>
    <div className="fresh-machine"><HeroSpecimen/><div className="machine-tags"><span>01 / ACQUIRE</span><span>02 / EXPERIENCE</span><span>03 / OPERATE</span><span>04 / CONTROL</span></div></div>
    <div className="fresh-foot"><span>FOUR REAL PRODUCTS</span><b>ONE CONNECTED TECHNOLOGY PLATFORM</b><i>MIAMI / 2026</i></div>
  </section>

  <section className="jobs" id="jobs"><header data-reveal><span>THE WHOLE SYSTEM / IN ONE SENTENCE EACH</span><h2>FOUR JOBS.<br/><em>NO GUESSING.</em></h2></header><div className="job-grid">{[
    ['01','FILL THE ROOMS','Radar finds real buyers.'],['02','GUIDE THE NIGHT','The App turns visits into journeys.'],['03','MOVE THE WORK','The Swarm brings in the right digital team.'],['04','MAKE THE CALL','Control Center shows the next three moves.'],
  ].map(([no,verb,text])=><article data-reveal key={no}><span>{no}</span><b>{verb}</b><p>{text}</p><i>↘</i></article>)}</div></section>

  <section className="culture" data-culture aria-labelledby="culture-title">
    <div className="culture-stage">
      <div className="culture-field" aria-hidden="true"><i/><i/><i/></div>
      <div className="culture-cast" aria-hidden="true">
        <img className="culture-mariachi" src="/culture/mariachi.webp" alt="" width="660" height="800" loading="lazy"/>
        <img className="culture-bartender" src="/culture/bartender.webp" alt="" width="572" height="850" loading="lazy"/>
        <img className="culture-dancer" src="/culture/dancer.webp" alt="" width="673" height="900" loading="lazy"/>
      </div>
      <div className="culture-copy">
        <span>TECHNOLOGY SHOULD NEVER STEAL THE SHOW</span>
        <h2 id="culture-title">THE TOOLS WORK<br/><em>BACKSTAGE.</em><br/>THE MAGIC STAYS<br/><em>HUMAN.</em></h2>
        <p>Guests should feel the music, the people, and the place—not the software. The system handles the busy work so the team can make the night unforgettable.</p>
      </div>
      <div className="culture-ticker" aria-hidden="true"><span>FIND THE PEOPLE</span><i>✦</i><span>GUIDE THE NIGHT</span><i>✦</i><span>HELP THE TEAM</span><i>✦</i><span>MAKE THE CALL</span></div>
    </div>
  </section>

  <section className="world product-world radar-world" id="radar" data-story-section><div className="world-copy" data-reveal><span className="world-no">01 / ACQUIRE / TEQUILA TOWN RADAR</span><h2>FIND REAL BUYERS.<br/><em>PROVE THE FIT.</em></h2><p>Radar searches for people and groups likely to book. It checks the proof, scores the fit, and shows sales who to call first.</p><ul><li>Four buyer search modes</li><li>Real public source proof</li><li>Five-part fit score</li><li>Outreach ready for a person to review</li></ul></div><div className="world-machine product-machine" data-reveal><RadarStory/></div></section>

  <section className="world product-world app-world" id="app" data-story-section><div className="world-copy" data-reveal><span className="world-no">02 / EXPERIENCE / TEQUILA TOWN APP</span><h2>TURN A TICKET<br/><em>INTO A JOURNEY.</em></h2><p>The App guides each guest from entry to discovery, missions, rewards, and a better next stop.</p><ul><li>Claim a ticket and enter</li><li>Discover rooms and missions</li><li>Scan, complete, and earn</li><li>Make the next visit more personal</li></ul></div><div className="world-machine product-machine" data-reveal><AppStory/></div></section>

  <section className="world product-world swarm-world" id="swarm" data-story-section><div className="world-copy" data-reveal><span className="world-no">03 / OPERATE / TEQUILA TOWN AGENT SWARM</span><h2>ONE MISSION.<br/><em>THE RIGHT DIGITAL TEAM.</em></h2><p>The Swarm has 21 specialists. The orchestrator reads the mission, routes each part, and brings the work back together.</p><ul><li>One clear mission goes in</li><li>Only the right specialists activate</li><li>Their work returns as one result</li><li>A person stays in control</li></ul></div><div className="world-machine product-machine" data-reveal><SwarmStory/></div></section>

  <section className="world product-world control-world" id="control" data-story-section><div className="world-copy" data-reveal><span className="world-no">04 / CONTROL / TEQUILA TOWN CONTROL CENTER</span><h2>MANY SIGNALS.<br/><em>THREE CLEAR MOVES.</em></h2><p>Control Center is built to collect many sources, check what is real, rank what matters, and turn it into a short daily brief.</p><ul><li>Collect from many sources</li><li>Reject noise and repeats</li><li>Rank facts by impact</li><li>Turn intelligence into action</li></ul></div><div className="world-machine product-machine" data-reveal><ControlStory/></div></section>

  <section className="loop" id="loop" data-story-section><header data-reveal><span>HOW THE FOUR PRODUCTS BECOME ONE SYSTEM</span><h2>EVERY NIGHT MAKES<br/><em>THE NEXT ONE BETTER.</em></h2><p>Each tool gives the next tool something useful. Then the loop starts again with better information.</p></header><OperatingLoopStory/></section>

  <section className="build" id="build"><header data-reveal><span>WHAT THE MONEY BUILDS</span><h2>THE PRODUCTS WORK.<br/><em>NOW MAKE THEM TALK.</em></h2><p>Funding connects the real systems behind tickets, guests, sales, sponsors, staff, and decisions.</p></header><div className="build-steps">{[
    ['NOW','Four working products','Real workflows already prove the idea.'],['NEXT','Real Tequila Town connections','Connect Tixr, CRM, Supabase, schedules, and sponsor data.'],['THEN','One learning loop','Make every event, mission, and sales cycle smarter.'],
  ].map(([stage,title,text],i)=><article data-reveal key={stage}><span>{stage} / 0{i+1}</span><h3>{title}</h3><p>{text}</p><div><i style={{width:`${(i+1)*33}%`}}/></div></article>)}</div></section>

  <section className="end" id="end"><div data-reveal><span>THE SIMPLE TRUTH</span><h2>THE PARTY IS REAL.<br/>THE SYSTEM<br/><em>LEARNS.</em></h2><a className="end-link mag" href="#top">RUN THE STORY AGAIN <i>↑</i></a></div><img src="/brand/tequila-town-tech-badge.webp" alt="Tequila Town Tech" width="1024" height="1024" loading="lazy"/></section>
  <footer><span>© 2026 TEQUILA TOWN TECH</span><b>THE EXPERIENCE OPERATING SYSTEM</b><span>MIAMI / FLORIDA</span></footer>
</main>}
