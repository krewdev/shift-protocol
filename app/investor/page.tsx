export default function InvestorPage() {
  return (
    <main>
      <section style={{ borderTop: 0, paddingTop: 48 }}>
        <div className="wrap">
          <p className="mono">Investor brief</p>
          <h1 style={{ marginTop: 12, maxWidth: "16ch" }}>SHiFT is a state machine for the nervous system.</h1>
          <p className="lede">Closed-loop neurotech for craving, panic, mood, and PTSD load. A protocol you can run now. A headset loop you can fund next.</p>
        </div>
      </section>
      <section>
        <div className="wrap grid-3">
          <article className="card"><p className="mono">Problem</p><h3>Wrong clock</h3><p>Clinics talk after the surge. Apps play one track for every nervous system.</p></article>
          <article className="card"><p className="mono">Product</p><h3>Protocol, not content</h3><p>Intent-specific sessions. Binaural lock. High-speed scene placement. Planned raw EEG.</p></article>
          <article className="card"><p className="mono">Wedge</p><h3>Browser proof</h3><p>Feel craving interrupt versus PTSD load in one sitting. That is diligence.</p></article>
        </div>
      </section>
      <section>
        <div className="wrap grid-2">
          <div>
            <p className="mono">Stack to fund</p>
            <h2 style={{ marginTop: 10 }}>Four layers.</h2>
            <div className="protocol"><strong>Now</strong><span>Web session engine. Five intents.</span></div>
            <div className="protocol"><strong>90 days</strong><span>Phone PPG / HRV. Session telemetry. Founder cohort.</span></div>
            <div className="protocol"><strong>Headset</strong><span>VR scenes + optional EEG.</span></div>
            <div className="protocol"><strong>Loop</strong><span>Project Resonance maps raw bands to scene rate.</span></div>
          </div>
          <aside className="card"><p className="mono">Moat</p><p>The asset is protocol grammar: which band, which scene rate, which safety constraint, for which state. Data from the loop becomes the model.</p></aside>
        </div>
      </section>
      <section>
        <div className="wrap">
          <p className="mono">Honest constraints</p>
          <div className="grid-3">
            <article className="card"><h3>Not FDA-cleared</h3><p>Wellness and research path first.</p></article>
            <article className="card"><h3>Not cue flooding</h3><p>PTSD protocol refuses trauma imagery.</p></article>
            <article className="card"><h3>Not infinite audio</h3><p>Closed-loop personalization is how we beat the mean.</p></article>
          </div>
          <p style={{ marginTop: 28 }}><a className="btn" href="/session">Run the product</a></p>
        </div>
      </section>
    </main>
  );
}
