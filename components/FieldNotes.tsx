"use client";

import { useEffect, useMemo, useState } from "react";
import { PROTOCOLS, type IntentId } from "@/lib/protocol";

export type FieldNote = {
  intent: IntentId;
  pre: number;
  post: number;
  phones: boolean;
  note: string;
  at: string;
};

const KEY = "shift-field-notes";
const INTAKE = "https://formsubmit.co/ajax/jcandjcandav@gmail.com";
const LOAD_WORD: Record<IntentId, string> = {
  craving: "Craving intensity",
  panic: "Panic / arousal",
  mood: "Mood load",
  ptsd: "Threat load",
  sit: "Restlessness",
};

function readNotes(): FieldNote[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function summarize(notes: FieldNote[]) {
  const deltas = notes.map((n) => n.post - n.pre);
  const avg = deltas.length ? deltas.reduce((a, b) => a + b, 0) / deltas.length : null;
  const counts: Record<string, number> = {};
  notes.forEach((n) => {
    counts[n.intent] = (counts[n.intent] || 0) + 1;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return {
    n: notes.length,
    avg,
    top: top ? PROTOCOLS[top[0] as IntentId]?.label || top[0] : "—",
  };
}

export function FieldStats() {
  const [notes, setNotes] = useState<FieldNote[]>([]);
  useEffect(() => setNotes(readNotes()), []);
  const stats = useMemo(() => summarize(notes), [notes]);
  const delta = stats.avg == null ? "—" : `${stats.avg > 0 ? "+" : ""}${stats.avg.toFixed(1)}`;
  return (
    <div className="grid-3">
      <article className="card"><p className="mono">N</p><h3>{stats.n}</h3><p>consented sessions</p></article>
      <article className="card"><p className="mono">Δ</p><h3>{delta}</h3><p>mean pre → post</p></article>
      <article className="card"><p className="mono">Intent</p><h3>{stats.top}</h3><p>most logged</p></article>
    </div>
  );
}

export default function FieldNotes({ intent = "sit" as IntentId }) {
  const [consent, setConsent] = useState(false);
  const [phones, setPhones] = useState(true);
  const [pre, setPre] = useState(5);
  const [post, setPost] = useState(5);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Consent, score before and after, then save.");
  const [notes, setNotes] = useState<FieldNote[]>([]);

  useEffect(() => setNotes(readNotes()), []);

  const save = () => {
    if (!consent) {
      setStatus("Consent required.");
      return;
    }
    const row: FieldNote = { intent, pre, post, phones, note: note.slice(0, 280), at: new Date().toISOString() };
    const next = [...readNotes(), row];
    localStorage.setItem(KEY, JSON.stringify(next));
    setNotes(next);
    setStatus("Saved on this device. Sending to the SHiFT inbox…");
    fetch(INTAKE, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `SHiFT field note · ${PROTOCOLS[intent].label}`,
        intent: row.intent,
        pre: row.pre,
        post: row.post,
        delta: row.post - row.pre,
        phones: row.phones,
        note: row.note || "(none)",
        at: row.at,
      }),
    })
      .then((r) => r.json())
      .then(() => setStatus("Saved here and sent to the SHiFT inbox."))
      .catch(() => setStatus("Saved on this device. Inbox send failed — use Export JSON."));
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(readNotes(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shift-field-notes.json";
    a.click();
  };

  const clear = () => {
    if (!confirm("Delete field notes stored on this device?")) return;
    localStorage.setItem(KEY, "[]");
    setNotes([]);
  };

  return (
    <div className="card">
      <p className="mono">Session note</p>
      <h3 style={{ marginTop: 8 }}>{LOAD_WORD[intent]}</h3>
      <label className="check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        I consent to store this anonymous 0–10 rating on this device. Not medical care.
      </label>
      <div className="slider-row"><span><b>Before</b><b>{pre}</b></span><input type="range" min={0} max={10} value={pre} onChange={(e) => setPre(Number(e.target.value))} /></div>
      <div className="slider-row"><span><b>After</b><b>{post}</b></span><input type="range" min={0} max={10} value={post} onChange={(e) => setPost(Number(e.target.value))} /></div>
      <label className="check"><input type="checkbox" checked={phones} onChange={(e) => setPhones(e.target.checked)} /> Stereo headphones on</label>
      <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional: one sentence. No names." />
      <div className="hero-actions" style={{ marginTop: 14 }}>
        <button className="btn" type="button" onClick={save}>Save note</button>
        <button className="btn ghost" type="button" onClick={exportJson}>Export JSON</button>
        <button className="btn ghost" type="button" onClick={clear}>Clear</button>
      </div>
      <p className="disclaimer" style={{ marginTop: 12 }}>{status} · {notes.length} notes on this device</p>
    </div>
  );
}
