"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { INTENTS, PROTOCOLS, formatClock, totalSeconds, type IntentId } from "@/lib/protocol";
type AudioGraph = { ctx: AudioContext; left: OscillatorNode; right: OscillatorNode; gain: GainNode };
const SCENES = [["#07131a", "#7de0c6"], ["#140c08", "#e3b15a"], ["#0b0a16", "#9aa0ff"], ["#160909", "#d9847a"], ["#08140f", "#b7f0a8"], ["#101010", "#e8e4d8"]];
export default function SessionEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioGraph | null>(null);
  const runningRef = useRef(false);
  const [intent, setIntent] = useState<IntentId>("sit");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const protocol = PROTOCOLS[intent];
  const duration = useMemo(() => totalSeconds(protocol), [protocol]);
  const phase = useMemo(() => {
    let acc = 0;
    for (const item of protocol.phases) {
      if (elapsed < acc + item.seconds) return { ...item, startedAt: acc };
      acc += item.seconds;
    }
    return protocol.phases[protocol.phases.length - 1];
  }, [elapsed, protocol]);
  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsed((value) => {
        if (value + 1 >= duration) { teardown(); setRunning(false); return duration; }
        return value + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, duration]);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const draw = (t: number) => {
      const w = canvas.clientWidth; const h = canvas.clientHeight;
      const sceneIndex = Math.floor((t / 1000) * phase.sceneRate) % SCENES.length;
      const [a, b] = SCENES[sceneIndex];
      const g = ctx.createRadialGradient(w * 0.5, h * 0.52, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      g.addColorStop(0, b); g.addColorStop(1, a); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const pulse = 0.5 + 0.5 * Math.sin((t / 1000) * Math.PI * 2 * Math.min(phase.hz, 12));
      ctx.beginPath(); ctx.arc(w * 0.5, h * 0.5, 70 + pulse * 90, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(232,228,216,${0.18 + pulse * 0.35})`; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = h * 0.78 + Math.sin(x * 0.02 + t * 0.001 * phase.hz) * 28;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(125,224,198,0.7)"; ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [phase.hz, phase.sceneRate]);
  useEffect(() => {
    const graph = audioRef.current; if (!graph || !running) return;
    graph.left.frequency.setTargetAtTime(protocol.carrier, graph.ctx.currentTime, 0.25);
    graph.right.frequency.setTargetAtTime(protocol.carrier + phase.hz, graph.ctx.currentTime, 0.25);
  }, [phase.hz, protocol.carrier, running]);
  const teardown = () => {
    const graph = audioRef.current;
    if (graph) {
      try { graph.left.stop(); graph.right.stop(); graph.ctx.close(); } catch {}
      audioRef.current = null;
    }
  };
  const start = async () => {
    const ctx = new AudioContext(); await ctx.resume();
    const left = ctx.createOscillator(); const right = ctx.createOscillator();
    const merger = ctx.createChannelMerger(2); const gain = ctx.createGain(); gain.gain.value = 0.04;
    left.type = "sine"; right.type = "sine";
    left.frequency.value = protocol.carrier; right.frequency.value = protocol.carrier + phase.hz;
    left.connect(merger, 0, 0); right.connect(merger, 0, 1); merger.connect(gain); gain.connect(ctx.destination);
    left.start(); right.start(); audioRef.current = { ctx, left, right, gain }; setElapsed(0); setRunning(true);
  };
  useEffect(() => () => teardown(), []);
  return (
    <div className="session-shell">
      <div className="stage">
        <canvas ref={canvasRef} />
        <div className="hud">
          <div className="intent-row">
            {INTENTS.map((id) => (
              <button key={id} className={`chip ${intent === id ? "on" : ""}`} disabled={running} onClick={() => { setIntent(id); setElapsed(0); }}>{PROTOCOLS[id].label}</button>
            ))}
          </div>
          <div>
            <p className="mono">{phase.name} · {phase.hz} Hz · {phase.band}</p>
            <h2 style={{ marginTop: 8 }}>{protocol.label}</h2>
            <p className="lede" style={{ color: "#e8e4d8" }}>{phase.copy}</p>
          </div>
        </div>
      </div>
      <div className="wrap readout">
        <div><b>{formatClock(Math.max(duration - elapsed, 0))}</b><span>remaining</span></div>
        <div><b>{phase.hz} Hz</b><span>beat frequency</span></div>
        <div><b>{phase.sceneRate.toFixed(1)} fps</b><span>scene placement</span></div>
        <div><b>{protocol.flashSafe ? "interrupt" : "safe field"}</b><span>visual mode</span></div>
      </div>
      <div className="wrap" style={{ paddingBottom: 40 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {!running ? <button className="btn" onClick={start}>Begin · headphones on</button> : <button className="btn ghost" onClick={() => { teardown(); setRunning(false); setElapsed(0); }}>End session</button>}
          <span className="chip">{protocol.durationLabel}</span>
        </div>
        <p className="disclaimer" style={{ marginTop: 16 }}>Stereo headphones required. Investigational wellness protocol, not emergency care. Photosensitive users should avoid craving interrupt.</p>
      </div>
    </div>
  );
}
