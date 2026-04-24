interface Props {
  value: number;
}

export default function ConfidenceBadge({ value }: Props) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const tier = pct >= 85 ? "" : pct >= 65 ? "warn" : "low";
  return (
    <span className="confidence-bar" title={`Confidence: ${pct}%`}>
      <span className={`fill ${tier}`}><span style={{ width: `${pct}%` }} /></span>
      <span className="muted">{pct}%</span>
    </span>
  );
}
