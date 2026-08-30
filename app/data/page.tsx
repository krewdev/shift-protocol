"use client";

import FieldNotes, { FieldStats } from "@/components/FieldNotes";

export default function DataPage() {
  return (
    <main>
      <section style={{ borderTop: 0, paddingTop: 48 }}>
        <div className="wrap">
          <p className="mono">Field notes · product data, not a trial</p>
          <h1 style={{ marginTop: 12 }}>Score the state. Then run the clock.</h1>
          <p className="lede">
            Consented 0–10 ratings before and after a session. Stored on this device
            until you export. No PHI required.
          </p>
          <div style={{ marginTop: 28 }}>
            <FieldStats />
          </div>
          <div style={{ marginTop: 22 }}>
            <FieldNotes />
          </div>
        </div>
      </section>
    </main>
  );
}
