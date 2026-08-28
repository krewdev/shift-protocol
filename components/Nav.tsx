import Link from "next/link";
export default function Nav() {
  return (
    <div className="wrap">
      <nav className="nav">
        <Link className="brand" href="/"><em>SHiFT</em><span>Protocol</span></Link>
        <div className="nav-links">
          <Link className="hide" href="/#protocol">Protocol</Link>
          <Link className="hide" href="/#science">Science</Link>
          <Link href="/investor">Investor</Link>
          <Link className="btn" href="/session">Run a session</Link>
        </div>
      </nav>
    </div>
  );
}
