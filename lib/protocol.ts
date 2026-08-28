export type IntentId = "craving" | "panic" | "mood" | "ptsd" | "sit";
export type Phase = { name: string; band: "alpha" | "theta" | "gamma"; hz: number; seconds: number; copy: string; sceneRate: number };
export type Protocol = { id: IntentId; label: string; outcome: string; durationLabel: string; carrier: number; phases: Phase[]; flashSafe: boolean };
export const PROTOCOLS: Record<IntentId, Protocol> = {
  craving: { id: "craving", label: "Craving interrupt", outcome: "Break the cue loop.", durationLabel: "12 minutes", carrier: 220, flashSafe: true, phases: [
    { name: "Lock", band: "alpha", hz: 10, seconds: 150, copy: "Quiet the critic. Hold still while the cue loses contrast.", sceneRate: 0.4 },
    { name: "Interrupt", band: "theta", hz: 6, seconds: 420, copy: "High-speed scene placement. The image does not stay long enough to become a plan.", sceneRate: 8 },
    { name: "Seal", band: "gamma", hz: 40, seconds: 150, copy: "Bind the new pattern.", sceneRate: 1.2 }
  ]},
  panic: { id: "panic", label: "Panic downshift", outcome: "Restore an alpha floor.", durationLabel: "10 minutes", carrier: 200, flashSafe: false, phases: [
    { name: "Floor", band: "alpha", hz: 10, seconds: 300, copy: "No rapid cuts. The body gets a slower clock.", sceneRate: 0.15 },
    { name: "Settle", band: "theta", hz: 6, seconds: 240, copy: "Panic is a tempo problem before it is a thought problem.", sceneRate: 0.2 },
    { name: "Return", band: "alpha", hz: 10, seconds: 60, copy: "Come back online without snapping into high beta.", sceneRate: 0.25 }
  ]},
  mood: { id: "mood", label: "Mood stabilize", outcome: "Theta-alpha working state.", durationLabel: "15 minutes", carrier: 210, flashSafe: false, phases: [
    { name: "Quiet DMN", band: "alpha", hz: 10, seconds: 300, copy: "Down-regulate the inner narrator.", sceneRate: 0.3 },
    { name: "Associative", band: "theta", hz: 6, seconds: 420, copy: "The published SHiFT gap is 6 Hz.", sceneRate: 0.5 },
    { name: "Schema", band: "gamma", hz: 40, seconds: 180, copy: "Consolidate the new schema.", sceneRate: 0.8 }
  ]},
  ptsd: { id: "ptsd", label: "PTSD load", outcome: "Lower threat tempo. No cue flooding.", durationLabel: "12 minutes", carrier: 196, flashSafe: false, phases: [
    { name: "Safety clock", band: "alpha", hz: 10, seconds: 360, copy: "Slow field. No trauma imagery. You can exit at any second.", sceneRate: 0.12 },
    { name: "Soft theta", band: "theta", hz: 6, seconds: 300, copy: "A longer wave for the nervous system to stand down.", sceneRate: 0.18 },
    { name: "Re-entry", band: "alpha", hz: 8, seconds: 60, copy: "Return at the theta-alpha border.", sceneRate: 0.2 }
  ]},
  sit: { id: "sit", label: "Frequency sit", outcome: "Published 15-minute SHiFT sit.", durationLabel: "15 minutes", carrier: 200, flashSafe: false, phases: [
    { name: "Alpha 10 Hz", band: "alpha", hz: 10, seconds: 300, copy: "Down-regulate default mode.", sceneRate: 0.35 },
    { name: "Theta 6 Hz", band: "theta", hz: 6, seconds: 420, copy: "Associative insight. Memory window.", sceneRate: 0.45 },
    { name: "Gamma 40 Hz", band: "gamma", hz: 40, seconds: 180, copy: "Bind the new schema.", sceneRate: 0.9 }
  ]}
};
export const INTENTS: IntentId[] = ["craving", "panic", "mood", "ptsd", "sit"];
export function totalSeconds(protocol: Protocol) { return protocol.phases.reduce((sum, phase) => sum + phase.seconds, 0); }
export function formatClock(total: number) { const m = Math.floor(total / 60); const s = Math.floor(total % 60); return `${m}:${s.toString().padStart(2, "0")}`; }
