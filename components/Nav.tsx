import Link from "next/link";

export default function Nav() {
  return (
    <div className="wrap">
      <nav className="nav">
        <Link className="brand" href="/">
          <em>SHiFT</em>
          <span>Protocol</span>
        </Link>
        <div className="nav-links">
          <Link className="hide" href="/#evidence">Evidence</Link>
          <Link href="/data">Field notes</Link>
          <Link href="/investor">Investor</Link>
          <Link className="btn" href="/session">Run a session</Link>
        </div>
      </nav>
    </div>
  );
}
