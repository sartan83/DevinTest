interface Props {
  before: string;
  after: string;
}

function basename(p: string): string {
  const idx = Math.max(p.lastIndexOf("/"), p.lastIndexOf("\\"));
  return idx === -1 ? p : p.slice(idx + 1);
}

function dirname(p: string): string {
  const idx = Math.max(p.lastIndexOf("/"), p.lastIndexOf("\\"));
  return idx === -1 ? "" : p.slice(0, idx);
}

export default function PathPair({ before, after }: Props) {
  return (
    <div className="path">
      <div><span className="muted">from</span>&nbsp; {dirname(before)}{" / "}<strong>{basename(before)}</strong></div>
      <div><span className="muted">to</span>&nbsp;&nbsp;&nbsp; {dirname(after)}{" / "}<strong>{basename(after)}</strong></div>
    </div>
  );
}
