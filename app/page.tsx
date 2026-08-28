"use client";
import { useMemo, useState } from "react";
import Wavefield from "@/components/Wavefield";
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <main>
      <header className="hero">
        <Wavefield />
        <div className="wrap" style={{ position: "relative" }}>
          <p className="kicker">Project Resonance · investigational protocol</p>
          <h1>Stop the loop. Change the clock.</h1>
          <p className="lede">SHiFT uses AI, VR-ready stimuli, and neural entrainment so a craving, a panic spike, or a PTSD surge meets a faster scene than the old one. Headphones today. Headset and raw brain data next.</p>
          <div className="hero-actions">
            <a className="btn" href="/session">Start the 15-minute sit</a>
            <a className="btn ghost" href="/investor">Investor brief</a>
          </div>
          <div className="stats">
            <div className="stat"><b>6 Hz</b><span>Published stress-to-flow gap</span></div>
            <div className="stat"><b>15:00</b><span>Alpha → theta → gamma sit</span></div>
            <div className="stat"><b>5</b><span>Intent protocols in the MVP</span></div>
            <div className="stat"><b>Closed loop</b><span>HRV now. EEG next.</span></div>
          </div>
        </div>
      </header>
      <section id="problem">
        <div className="wrap grid-2">
          <div>
            <p className="mono">The problem</p>
            <h2 style={{ marginTop: 12 }}>Cue, surge, story, relapse. Talk arrives after the wave has already peaked.</h2>
          </div>
          <div className="card"><p>Addiction, panic, mood collapse, and PTSD share a timing problem. The body locks a high-tempo pattern before language can intervene. SHiFT does not argue with the story. It changes the oscillator and replaces the scene while the window is open.</p></div>
        </div>
      </section>
      <section id="protocol">
        <div className="wrap">
          <p className="mono">The protocol</p>
          <h2 style={{ margin: "12px 0 28px" }}>VR + stimuli + raw brain data + high-speed scene placement.</h2>
          <div className="grid-3">
            <article className="card"><p className="mono">01 Neural input</p><h3>Entrain the band</h3><p>Binaural carriers lock alpha 10, theta 6, gamma 40. Frequency-following response, not a playlist.</p></article>
            <article className="card"><p className="mono">02 Scene engine</p><h3>Replace the image</h3><p>Craving gets rapid cuts. Panic and PTSD get a slow safety field. No trauma imagery.</p></article>
            <article className="card"><p className="mono">03 Closed loop</p><h3>Read, then place</h3><p>Project Resonance adds HRV and EEG so the next frame lands on a live phase, not a guess.</p></article>
          </div>
        </div>
      </section>
      <section id="science">
        <div className="wrap grid-2">
          <div>
            <p className="mono">From the research desk</p>
            <h2 style={{ marginTop: 12 }}>Already written. Now executable.</h2>
            <div className="protocol"><strong>6 Hz</strong><span>The published sit: 5 min alpha, 7 min theta, 3 min gamma.</span></div>
            <div className="protocol"><strong>SHIFT system</strong><span>HRV-adaptive beats, self-voice in theta, RAS visual anchors.</span></div>
            <div className="protocol"><strong>Tuning In</strong><span>FFR is real. Solfeggio is not the moat.</span></div>
            <p style={{ marginTop: 22 }}><a className="btn ghost" href="https://shift33.substack.com" target="_blank" rel="noreferrer">Read the source research</a></p>
          </div>
          <aside className="card"><p className="mono">What this MVP is</p><p>A working session engine an investor can run with headphones. Investigational, not a cleared medical device. First layer of a headset protocol.</p></aside>
        </div>
      </section>
      <section id="access">
        <div className="wrap grid-2">
          <div>
            <p className="mono">Founder access</p>
            <h2 style={{ marginTop: 12 }}>Jay Young. SHiFT Protocol.</h2>
            <p className="lede">Run craving interrupt. Then run PTSD load. Notice they do not feel the same. That difference is the product.</p>
          </div>
          <form className="card" onSubmit={(e) => { e.preventDefault(); const leads = JSON.parse(localStorage.getItem("shift-leads") || "[]"); leads.push({ email, at: new Date().toISOString() }); localStorage.setItem("shift-leads", JSON.stringify(leads)); setSent(true); }}>
            <p className="mono">Private list</p>
            <h3 style={{ marginTop: 8 }}>Founders team / investor notes</h3>
            <div className="form">
              <input type="email" required placeholder="you@fund" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn" type="submit">{sent ? "Received" : "Request access"}</button>
            </div>
          </form>
        </div>
      </section>
      <footer><div className="wrap">SHiFT Protocol · investigational wellness technology · not a substitute for emergency care · {year}</div></footer>
    </main>
  );
}
