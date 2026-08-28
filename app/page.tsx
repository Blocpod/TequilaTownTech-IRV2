/* eslint-disable @next/next/no-img-element -- vinext safely serves the optimized static brand assets */
import AgaveField from './agave-field';
import ExperienceV6 from './experience-v6';
import FlightStage from './flight-stage';
import { FlywheelEngine, ProductEngine } from './product-engine';

type ProductType = 'radar' | 'app' | 'swarm' | 'control';

const products: Array<{
  id: string;
  type: ProductType;
  number: string;
  phase: string;
  name: string;
  tagline: string;
  body: string;
  stats: Array<[string, string]>;
}> = [
  {
    id: 'radar', type: 'radar', number: '01', phase: 'Acquire · Demand intelligence', name: 'Tequila Town Radar',
    tagline: 'Find demand before demand finds us.',
    body: 'Radar finds people and groups that are likely to book. It checks each lead, ranks the best ones, and tells the sales team who to call first.',
    stats: [['94', 'TOP FIT'], ['142', 'VERIFIED'], ['+38', 'THIS WEEK']],
  },
  {
    id: 'app-layer', type: 'app', number: '02', phase: 'Experience · Guest intelligence', name: 'Tequila Town App',
    tagline: 'Turn attendance into participation.',
    body: 'The App helps guests before, during, and after their visit. It holds tickets, gives directions, unlocks games and rewards, and learns what each guest likes.',
    stats: [['71%', 'ENGAGED'], ['03', 'LIVE MISSIONS'], ['LVL 4', 'PASSPORT']],
  },
  {
    id: 'swarm', type: 'swarm', number: '03', phase: 'Operate · Digital workforce', name: 'Agent Swarm',
    tagline: 'Give every job to the right helper.',
    body: 'The Swarm is a team of 21 AI helpers. One boss agent sends each job to the right specialist, checks the work, and keeps people in control.',
    stats: [['21', 'SPECIALISTS'], ['07', 'MISSIONS'], ['92%', 'CAPACITY']],
  },
  {
    id: 'control', type: 'control', number: '04', phase: 'Decide · Executive intelligence', name: 'Control Center',
    tagline: 'See the whole business at once.',
    body: 'Control Center puts the whole business on one screen. It shows what changed, what needs attention, and the three things leaders should do next.',
    stats: [['18.4%', 'MOMENTUM'], ['03', 'PRIORITIES'], ['LIVE', 'STATE']],
  },
];

function InstrumentOverlay({ type }: { type: ProductType }) {
  if (type === 'radar') return <div className="instrument-overlay lead-overlay"><small>VERIFIED BUYERS</small><div><span>Corporate offsite · 120</span><b>94</b></div><div><span>Luxury concierge channel</span><b>89</b></div><div><span>Private members club</span><b>86</b></div></div>;
  if (type === 'app') return <div className="instrument-overlay guest-overlay"><small>GUEST STATE</small><b>ANONYMOUS → KNOWN</b><span>Sofia · VIP intent · Reposado profile</span><div><i/><i/><i/><i/></div></div>;
  if (type === 'swarm') return <div className="instrument-overlay mission-overlay"><small>MISSION ROUTER</small><div><i/> VIP guest recovery <b>74%</b></div><div><i/> Sponsor recap <b>46%</b></div><div><i/> Staffing check <b>88%</b></div></div>;
  return <div className="instrument-overlay attention-overlay"><small>ATTENTION QUEUE</small><div><b>01</b><span>VIP conversion opportunity</span></div><div><b>02</b><span>Concierge demand surge</span></div><div><b>03</b><span>Peak-hour pinch point</span></div></div>;
}

export default function Home() {
  return <main>
    <ExperienceV6 />
    <FlightStage />
    <a className="skip-link" href="#system">Skip to the system</a>

    <div className="intro-wipe" aria-hidden="true"><img src="/brand/tequila-town-tech-horizontal.png" alt="" /></div>

    <header className="site-nav">
      <a className="brand-image" href="#top" aria-label="Tequila Town Tech home"><img src="/brand/tequila-town-tech-horizontal.png" alt="Tequila Town Tech" width="1803" height="407" fetchPriority="high" /></a>
      <nav aria-label="Primary navigation"><a href="#system">System</a><a href="#flywheel">Flywheel</a><a href="#command">Command</a><a href="#build">Build plan</a></nav>
      <a className="nav-cta mag" href="#value">Investor case <span>↗</span></a>
      <details className="mobile-menu"><summary aria-label="Open navigation"><span/><span/></summary><nav><a href="#system">System</a><a href="#flywheel">Flywheel</a><a href="#command">Command</a><a href="#build">Build plan</a></nav></details>
    </header>

    <nav className="chapter-rail" aria-label="Story chapters"><span className="rail-track"><i/></span>{['top','shift','system','radar','app-layer','swarm','control','flywheel','command','build','value','thesis'].map((id, index) => <a key={id} href={`#${id}`} aria-label={`Chapter ${index + 1}`}><span>{String(index).padStart(2,'0')}</span></a>)}</nav>

    <section className="hero" id="top" data-scene="top" aria-labelledby="hero-title">
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-copy" data-reveal>
        <p className="brandline"><span>TEQUILA TOWN</span><b>TECH / SYSTEM ONLINE</b></p>
        <p className="eyebrow"><span>Investor technology experience</span><span>25.7617° N / 80.1918° W</span></p>
        <h1 id="hero-title">The venue is<br/>the experience.<br/><em>The system compounds it.</em></h1>
        <p className="hero-lede">Four smart tools work together. They find customers, guide guests, get work done, and show leaders what matters next.</p>
        <div className="hero-actions"><a className="primary-link mag" href="#shift">Enter the system <span>→</span></a><a className="secondary-link" href="#build">What capital unlocks</a></div>
      </div>
      <div className="hero-console" aria-hidden="true"><span>SYS/TTT-04</span><b>FOUR SYSTEMS · ONE LOOP</b><i>LIVE SIGNAL</i></div>
      <div className="ticker" aria-hidden="true"><div>{['RADAR · 142 VERIFIED BUYERS','APP · 71% PARTICIPATION','SWARM · 21 SPECIALISTS','CONTROL · 03 PRIORITIES','SYSTEM · COMPOUNDING'].concat(['RADAR · 142 VERIFIED BUYERS','APP · 71% PARTICIPATION','SWARM · 21 SPECIALISTS']).map((item,index)=><span key={`${item}-${index}`}>{item}</span>)}</div></div>
      <div className="hero-proof"><span><b>04</b> coordinated layers</span><span><b>21</b> specialist agents</span><span><b>01</b> compounding loop</span></div>
    </section>

    <section className="shift" id="shift" data-scene="shift">
      <div className="shift-sticky"><AgaveField /><div className="shift-statements">
        <article data-reveal><span>01 · THE BIG IDEA</span><h2>A full room is great.<br/><em>Knowing your guests is better.</em></h2></article>
        <article data-reveal><span>02 · WHAT WE LEARN</span><h2>Every search, visit, choice, and game teaches the system something useful.</h2></article>
        <article data-reveal><span>03 · HOW IT WORKS</span><h2>Four simple tools share what they learn.<br/><em>Each one makes the others smarter.</em></h2></article>
      </div><div className="agave-caption"><i/> AGAVE / GROWN FROM SIGNAL / LIVE VOXEL FIELD</div></div>
    </section>

    <section className="system-intro" id="system" data-scene="system">
      <header data-reveal><span className="section-index">02 / THE SYSTEM</span><h2>Four tools.<br/><em>One smart team.</em></h2><p>Each tool does one clear job. They share what they learn, so the whole business gets smarter every day.</p></header>
      <div className="system-strip">{products.map(product => <a href={`#${product.id}`} key={product.id} data-reveal style={{'--tone': `var(--${product.type})`} as React.CSSProperties}><span>{product.number}</span><small>{product.phase.split(' · ')[0]}</small><b>{product.type === 'app' ? 'APP' : product.type.toUpperCase()}</b><i>↘</i></a>)}</div>
    </section>

    {products.map((product, index) => <section className={`product-chapter product-${product.type}`} id={product.id} data-scene={product.id} key={product.id}>
      <div className="product-shell">
        <div className="product-copy" data-reveal>
          <div className="product-phase"><i/><span>{product.number}</span>{product.phase}</div>
          <h2>{product.name}</h2><h3>{product.tagline}</h3><p>{product.body}</p>
          <div className="product-stats">{product.stats.map(([value,label]) => <div key={label}><b>{value}</b><small>{label}</small></div>)}</div>
          <div className="product-pagination"><span>{String(index + 1).padStart(2,'0')} / 04</span><i/></div>
        </div>
        <div className="product-instrument" data-reveal><ProductEngine type={product.type}/><InstrumentOverlay type={product.type}/></div>
      </div>
      <span className="chapter-number" aria-hidden="true">{product.number}</span>
    </section>)}

    <section className="flywheel" id="flywheel" data-scene="flywheel">
      <div className="flywheel-sticky">
        <div className="fly-copy" data-reveal><span className="section-index">07 / THE LOOP</span><h2>Every tool<br/><em>helps the next.</em></h2><p>Radar finds the right people. The App learns what guests enjoy. The Swarm gets jobs done. Control Center helps leaders make the next call.</p>
          <div className="fly-steps">{['Radar finds people who may book.','The App learns what guests like.','The Swarm turns ideas into work.','Control Center shows what to do next.'].map((step,index)=><div key={step}><span>0{index+1}</span><b>{step}</b></div>)}</div>
        </div>
        <div className="fly-visual" data-reveal><FlywheelEngine/><div className="velocity"><small>CYCLE VELOCITY</small><span><i/></span><b>× 4.6</b></div></div>
      </div>
    </section>

    <section className="command" id="command" data-scene="command">
      <header data-reveal><span className="section-index">08 / THE CONTROL ROOM</span><h2>Answers first.<br/><em>Charts second.</em></h2><p>Leaders should not hunt through ten screens. They should ask one question and get a clear answer.</p></header>
      <div className="executive-query" data-reveal><span><i/> EXECUTIVE QUERY / LIVE</span><strong data-question>What requires attention today?</strong><b>ASK THE SYSTEM →</b></div>
      <div className="command-center" data-reveal>
        <header><span>TEQUILA TOWN TECH / CONTROL</span><i>LIVE OPERATING PICTURE</i></header>
        <aside><b>TODAY</b>{['Sales & Tickets','Radar','Guest Intelligence','Operations','Sponsors','Marketing','Agent Swarm'].map(item=><span key={item}>{item}</span>)}</aside>
        <div className="command-main">
          <div className="kpi-card"><small>TICKET MOMENTUM</small><b>↑ 18.4%</b><div className="spark-bars">{[28,42,36,54,49,68,74,91].map((height,index)=><i style={{height:`${height}%`}} key={index}/>)}</div></div>
          <div className="kpi-card"><small>QUALIFIED BUYERS</small><b>142</b><em>+38 THIS WEEK</em></div>
          <div className="kpi-card"><small>GUEST PARTICIPATION</small><b>71%</b><div className="ring-meter"><i/></div></div>
          <div className="priority-card"><small>ATTENTION QUEUE / PRIORITIZED</small>{[['01','VIP conversion opportunity','High-intent group demand is outrunning visible premium inventory.'],['02','Concierge channel surge','Verified buyers are clustering around one geography.'],['03','Evening service pinch point','Schedule density predicts a peak-hour bottleneck.']].map(([no,title,text])=><div key={no}><b>{no}</b><span><strong>{title}</strong><p>{text}</p></span><i>→</i></div>)}</div>
          <div className="agent-card"><small>AGENT ACTIVITY</small><b>21 specialists</b><div>{Array.from({length:18},(_,i)=><i className={i%3===0||i%7===0?'hot':''} key={i}/>)}</div></div>
        </div>
      </div>
    </section>

    <section className="build" id="build" data-scene="build"><header data-reveal><span className="section-index">09 / WHAT THE MONEY BUILDS</span><h2>Working tools today.<br/><em>One full system next.</em></h2><p>The first pieces already work. New funding connects them, makes them safe, and gets them ready for real guests and real business.</p></header><div className="build-grid">{[
      ['NOW','01','Four working tools','The main pieces already exist and prove the idea.','PRODUCTS / DESIGN / PROOF'],
      ['NEXT','02','Connect everything','Link the tools to tickets, customers, staff, and live business data.','DATA / SAFETY / TESTING'],
      ['SCALE','03','Learn and improve','Use what the system learns to make every new event better than the last.','LEARNING / SPEED / GROWTH'],
    ].map(([stage,no,title,text,meta])=><article data-reveal key={stage}><span>{stage} / {no}</span><h3>{title}</h3><p>{text}</p><i>{meta}</i></article>)}</div></section>

    <section className="value" id="value" data-scene="value"><header data-reveal><span className="section-index">10 / WHY IT MATTERS</span><h2>A better guest experience.<br/><em>A smarter business.</em></h2><p>The venue creates the fun. The system helps Tequila Town learn from it, improve it, and grow it.</p></header><div className="value-grid">{[
      ['01','More bookings','Find the best customers and help the sales team reach them first.'],['02','Happier guests','Learn what people enjoy and make each visit feel more personal.'],['03','Less busywork','Let AI helpers handle repeat jobs while people stay in control.'],['04','Better sponsor results','Show partners what guests saw, touched, and enjoyed.'],['05','Clearer decisions','Put the most important facts and next steps in one place.'],['06','A system that can grow','Use the same playbook for more events, cities, and experiences.'],
    ].map(([no,title,text])=><article data-reveal key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p><i>↗</i></article>)}</div></section>

    <section className="thesis" id="thesis" data-scene="thesis"><div className="thesis-glow"/><span className="section-index">THE THESIS / 2026</span><h2 data-reveal>One system.<br/>Four layers.<br/><em>Compounding intelligence.</em></h2><p data-reveal>The venue creates the signal.<br/>Tequila Town Tech turns it into leverage.</p><a className="primary-link mag" href="#top">Return to origin <span>↑</span></a><img className="thesis-badge" src="/brand/tequila-town-tech-badge.png" alt="Tequila Town Tech" width="1024" height="1024" loading="lazy" /></section>

    <footer><span className="footer-brand"><img src="/brand/tequila-town-tech-horizontal.png" alt="Tequila Town Tech" width="1803" height="407" loading="lazy"/><small>© 2026</small></span><span>THE EXPERIENCE OPERATING SYSTEM</span><span>MIAMI / FLORIDA / LIVE SIGNAL</span></footer>
  </main>;
}
