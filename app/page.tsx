/* eslint-disable @next/next/no-img-element -- vinext does not safely hydrate next/image in this RSC route */
import ExperienceController from './experience';
import SignalEngine from './signal-engine';
import { FlywheelEngine, ProductEngine } from './product-engine';

const products = [
  {
    index: '01', phase: 'Acquire', name: 'Radar', tone: 'radar',
    visualLabel: 'Buyer qualification field',
    thesis: 'Find demand before demand finds us.',
    description: 'Demand intelligence that identifies, verifies, scores, and prioritizes high-value buyers—then points the team toward the next best action.',
    proof: ['Buyer, not supplier, targeting', 'Evidence-backed fit scoring', 'Model-agnostic intelligence'],
  },
  {
    index: '02', phase: 'Experience', name: 'Tequila Town App', tone: 'app',
    visualLabel: 'Guest journey map',
    thesis: 'Turn attendance into participation.',
    description: 'A digital companion for tickets, wayfinding, missions, passport progression, recommendations, rewards, and a measurable guest journey.',
    proof: ['Ticket-to-profile connection', 'Journey and mission guidance', 'Participation intelligence'],
  },
  {
    index: '03', phase: 'Operate', name: 'Agent Swarm', tone: 'swarm',
    visualLabel: 'Mission routing lattice',
    thesis: 'Give the operation a digital workforce.',
    description: 'One orchestrator routes missions across specialist agents for guest service, commerce, operations, sponsors, analytics, and creative execution.',
    proof: ['Coordinated mission routing', 'Specialist execution', 'Human approval and visibility'],
  },
  {
    index: '04', phase: 'Control', name: 'Control Center', tone: 'control',
    visualLabel: 'Live operating picture',
    thesis: 'See the whole business at once.',
    description: 'One prioritized operating picture for demand, sales, guests, operations, sponsors, marketing, and AI activity.',
    proof: ['Decision-first daily brief', 'Cross-system attention queue', 'Recommended next actions'],
  },
];

function Glyph({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    radar: <><path d="M8 36A28 28 0 1 1 36 64"/><path d="M36 36 58 14"/><circle cx="36" cy="36" r="7"/><path d="M12 36h8M52 36h8"/></>,
    app: <><path d="M19 8h34v56H19z"/><path d="M28 20c13-8 20 6 10 13-10 7-2 17 8 12"/><circle cx="46" cy="45" r="5"/><path d="M29 55h14"/></>,
    swarm: <><circle cx="36" cy="36" r="8"/><path d="M36 28V10M42 31l15-10M44 39l17 8M36 44v18M29 40l-17 9M29 31 14 20"/><circle cx="36" cy="8" r="3"/><circle cx="60" cy="19" r="3"/><circle cx="64" cy="49" r="3"/><circle cx="36" cy="64" r="3"/><circle cx="10" cy="51" r="3"/><circle cx="11" cy="18" r="3"/></>,
    control: <><path d="M10 18h18v18H10zM44 18h18v18H44zM10 45h18v11H10zM44 45h18v11H44z"/><path d="M27 27h18M36 27v18"/><circle cx="36" cy="36" r="5"/></>,
  };
  return <svg className="glyph" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{paths[type]}</svg>;
}

export default function Home() {
  return (
    <main>
      <ExperienceController />
      <a className="skip-link" href="#platform">Skip to the platform</a>
      <header className="site-nav">
        <a className="brand brand-image" href="#top" aria-label="Tequila Town Tech home">
          <img src="/brand/tequila-town-tech-horizontal.png" alt="Tequila Town Tech" width="1803" height="407" fetchPriority="high" decoding="async" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#platform">Platform</a><a href="#products">Products</a><a href="#flywheel">Flywheel</a><a href="#roadmap">Build plan</a>
        </nav>
        <a className="nav-cta" href="#products">Enter system <span aria-hidden="true">↘</span></a>
        <details className="mobile-menu"><summary aria-label="Open navigation"><span/><span/></summary><nav><a href="#platform">Platform</a><a href="#products">Products</a><a href="#flywheel">Flywheel</a><a href="#roadmap">Build plan</a></nav></details>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <SignalEngine />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="hero-brandline"><span>TEQUILA TOWN</span><b>TECH</b></p>
          <p className="eyebrow"><span>Real-world experience intelligence</span><span>System / 01—04</span></p>
          <h1 id="hero-title">The experience is physical.<br/><em>The multiplier is digital.</em></h1>
          <p className="hero-lede">Tequila Town is building a coordinated technology operating system around how it finds demand, engages guests, runs the operation, and sees the whole business.</p>
          <a className="primary-link" href="#platform">Enter the operating system <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-proof"><span><b>04</b> coordinated layers</span><span><b>01</b> shared architecture</span><span><b>NOW</b> working foundations</span></div>
      </section>

      <section className="platform" id="platform">
        <div className="section-index">01 / Platform premise</div>
        <div className="platform-copy" data-reveal>
          <p>Tequila Town is more than a venue.</p>
          <h2>The physical experience creates the signal.<br/><em>Tequila Town Tech turns it into leverage.</em></h2>
          <div className="platform-detail"><p>Acquisition, guest behavior, operations, and executive decisions are usually fragmented. The platform connects them into one learning system designed around the reality of a live experiential business.</p><p>The venue remains the attraction. Technology makes every cycle more intelligible, more coordinated, and increasingly repeatable.</p></div>
        </div>
        <div className="word-crop" aria-hidden="true"><span>TEQUILA</span><span>TOWN</span></div>
      </section>

      <section className="products" id="products">
        <header className="section-head" data-reveal><div><span className="section-index">02 / Product architecture</span><h2>Four products.<br/><em>One operating system.</em></h2></div><p>Each layer does a distinct job. Their value compounds when signals move between them.</p></header>
        <div className="product-stack">
          {products.map((product) => (
            <article className={`product-card ${product.tone}`} key={product.tone} data-reveal>
              <div className="product-copy">
                <div className="product-meta"><span>{product.index}</span><span>{product.phase}</span><Glyph type={product.tone}/></div>
                <p className="product-overline">Tequila Town</p><h3>{product.name}</h3><h4>{product.thesis}</h4><p>{product.description}</p>
                <ul>{product.proof.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="product-visual"><div className="illustrative">{product.visualLabel}</div><ProductEngine type={product.tone as 'radar'|'app'|'swarm'|'control'}/></div>
            </article>
          ))}
        </div>
      </section>

      <section className="flywheel" id="flywheel" data-step="0">
        <div className="flywheel-sticky">
          <div className="fly-copy">
            <span className="section-index">03 / Compounding intelligence</span>
            <h2>One signal.<br/><em>Four transformations.</em></h2>
            <div className="fly-steps">
              <article><span>01</span><div><b>Radar qualifies demand.</b><p>The system begins with evidence-backed opportunity.</p></div></article>
              <article><span>02</span><div><b>The App creates participation data.</b><p>Anonymous attendance becomes a known journey.</p></div></article>
              <article><span>03</span><div><b>The Swarm converts signals into action.</b><p>One mission routes to the right specialists.</p></div></article>
              <article><span>04</span><div><b>Control improves the next cycle.</b><p>Results return as prioritized management intelligence.</p></div></article>
            </div>
          </div>
          <FlywheelEngine />
        </div>
      </section>

      <section className="command" id="command">
        <div className="command-plate" aria-hidden="true"/>
        <div className="command-copy" data-reveal><span className="section-index">04 / Executive intelligence</span><h2>The command layer is not more dashboards.</h2><p>It is one place that answers the questions leadership actually has: What changed? What matters? Where is revenue moving? What should happen next?</p></div>
        <div className="command-console" data-reveal>
          <header><span><i/> TEQUILA TOWN TECH / CONTROL</span><b>EXECUTIVE BRIEF · TODAY</b></header>
          <div className="console-grid">
            <div className="console-main"><small>PRIORITY QUESTION</small><h3>What requires attention today?</h3><div className="priority"><span>01</span><div><b>Qualified group demand requires faster follow-up.</b><p>Radar has surfaced a cluster of high-fit opportunities. Current sales capacity is the constraint, not demand.</p></div></div><div className="recommend"><small>RECOMMENDED NEXT ACTION</small><p>Route the highest-fit accounts into an approval-ready outreach mission.</p></div></div>
            <aside><div><small>SYSTEM SIGNALS</small><p><i className="l1"/>Radar <b>Opportunity</b></p><p><i className="l2"/>App <b>Participation</b></p><p><i className="l3"/>Swarm <b>Capacity</b></p></div><div><small>OPERATING STATE</small><strong>Connected view</strong><span>Working foundation → production integration</span></div></aside>
          </div>
        </div>
      </section>

      <section className="roadmap" id="roadmap">
        <header className="section-head" data-reveal><div><span className="section-index">05 / Investment build plan</span><h2>Foundation today.<br/><em>Integrated platform next.</em></h2></div><p>Investment turns existing product foundations into a connected, secure, production-grade operating system.</p></header>
        <div className="roadmap-grid">
          <article data-reveal><span>NOW / 01</span><h3>Working product foundations</h3><p>Guest application, demand intelligence, multi-agent operations, and control-center architecture already establish the four-layer direction.</p><i>Existing foundation</i></article>
          <article data-reveal><span>NEXT / 02</span><h3>Production integration</h3><p>Connect live ticketing, CRM, guest, sponsor, marketing, and operational data with authentication, permissions, persistence, monitoring, and governance.</p><i>Capital deployment</i></article>
          <article data-reveal><span>SCALE / 03</span><h3>Compounding intelligence</h3><p>Shared production signals improve targeting, personalization, execution, sponsor visibility, forecasting, and the decisions leadership makes next.</p><i>Platform potential</i></article>
        </div>
      </section>

      <section className="value">
        <span className="section-index">06 / Why the technology matters</span>
        <div className="value-grid">
          <h2 data-reveal>Technology becomes a multiplier on the experience.</h2>
          {['Revenue intelligence|See and prioritize high-value demand earlier.','Guest intelligence|Turn physical attendance into measurable participation.','Operational leverage|Coordinate repetitive, analytical, and creative work.','Executive visibility|Replace fragmented tools with one prioritized operating picture.'].map((item,i)=>{const [title,text]=item.split('|');return <article key={title} data-reveal><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>})}
        </div>
      </section>

      <section className="closing">
        <div className="closing-signal" aria-hidden="true"/><p>The venue is the experience.</p><h2>The technology is<br/><em>the multiplier.</em></h2><a href="#top">Return to the system <span>↑</span></a>
        <img className="closing-brand" src="/brand/tequila-town-tech-badge.png" alt="Tequila Town Tech" width="1024" height="1024" loading="lazy" decoding="async" />
      </section>
      <footer><span className="footer-brand"><img src="/brand/tequila-town-tech-horizontal.png" alt="Tequila Town Tech" width="1803" height="407" loading="lazy" decoding="async" /><small>© 2026</small></span><span>Experience intelligence platform</span><span>Built around the physical experience</span></footer>
    </main>
  );
}
