export type PageKey =
  | "home" | "folders" | "analysis" | "rules"
  | "activity" | "quarantine" | "undo" | "settings";

interface Props {
  active: PageKey;
  onSelect: (p: PageKey) => void;
}

const ITEMS: Array<{ key: PageKey; label: string }> = [
  { key: "home",       label: "Home" },
  { key: "folders",    label: "Folders" },
  { key: "analysis",   label: "Analysis" },
  { key: "rules",      label: "Rules" },
  { key: "activity",   label: "Activity log" },
  { key: "quarantine", label: "Quarantine" },
  { key: "undo",       label: "Undo / Rollback" },
  { key: "settings",   label: "Settings" },
];

export default function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">FileAgent</div>
      <nav>
        {ITEMS.map((item) => (
          <a
            key={item.key}
            className={item.key === active ? "active" : ""}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
