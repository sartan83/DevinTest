import { Link, NavLink, Route, Routes } from "react-router-dom";
import { AppStateProvider, useAppState } from "./state";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ProjectDetail from "./pages/ProjectDetail";
import Connect from "./pages/Connect";
import clsx from "clsx";

function Sidebar() {
  const { apiKey, setApiKey } = useAppState();
  return (
    <aside className="w-60 shrink-0 border-r border-ink-800/80 bg-ink-900/60 backdrop-blur-md flex flex-col">
      <Link to="/" className="flex items-center gap-3 px-5 py-5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-fuchsia-400 text-ink-950 font-black text-lg shadow-glow">
          Δ
        </span>
        <div className="leading-tight">
          <div className="font-semibold tracking-tight">Devin ROI</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            control center
          </div>
        </div>
      </Link>

      <div className="side-section">Overview</div>
      <NavLink
        to="/"
        end
        className={({ isActive }) => clsx("side-item", isActive && "active")}
      >
        <span className="side-icon">
          <GridIcon />
        </span>
        Dashboard
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => clsx("side-item", isActive && "active")}
      >
        <span className="side-icon">
          <SlidersIcon />
        </span>
        Settings
      </NavLink>
      <NavLink
        to="/connect"
        className={({ isActive }) => clsx("side-item", isActive && "active")}
      >
        <span className="side-icon">
          <KeyIcon />
        </span>
        Connect
      </NavLink>

      <div className="side-section">Links</div>
      <a
        href="https://app.devin.ai"
        target="_blank"
        rel="noreferrer"
        className="side-item"
      >
        <span className="side-icon">
          <ExternalIcon />
        </span>
        Devin app
      </a>
      <a
        href="https://docs.devin.ai/api-reference/overview"
        target="_blank"
        rel="noreferrer"
        className="side-item"
      >
        <span className="side-icon">
          <BookIcon />
        </span>
        API docs
      </a>

      <div className="mt-auto p-4 border-t border-ink-800/60">
        {apiKey ? (
          <div className="flex items-center justify-between gap-2">
            <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="live-dot" />
              connected
            </span>
            <button
              className="text-xs text-slate-400 hover:text-white"
              onClick={() => {
                if (confirm("Disconnect and remove your API key from this browser?"))
                  setApiKey(null);
              }}
            >
              disconnect
            </button>
          </div>
        ) : (
          <NavLink to="/connect" className="btn-primary w-full justify-center">
            Connect Devin
          </NavLink>
        )}
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-ink-800/60">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Control Center</h1>
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
          Devin projects · real-time
        </div>
      </div>
      <nav className="flex items-center gap-1 text-sm">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            clsx(
              "rounded-lg px-3 py-1.5 border border-transparent",
              isActive
                ? "bg-ink-800 border-ink-700/80 text-white"
                : "text-slate-400 hover:text-white hover:bg-ink-800/60"
            )
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              "rounded-lg px-3 py-1.5 border border-transparent",
              isActive
                ? "bg-ink-800 border-ink-700/80 text-white"
                : "text-slate-400 hover:text-white hover:bg-ink-800/60"
            )
          }
        >
          Settings
        </NavLink>
      </nav>
    </header>
  );
}

function Shell() {
  return (
    <div className="min-h-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 px-8 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/p/:tag" element={<ProjectDetail />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <Shell />
    </AppStateProvider>
  );
}

/* --- simple inline icons (stroke-based) --- */

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M20 18h0" strokeLinecap="round" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}
function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="8" cy="15" r="3.5" />
      <path d="M11 13l9-9M16 8l2 2" strokeLinecap="round" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M4 5a2 2 0 012-2h11v15H6a2 2 0 00-2 2V5z" />
      <path d="M4 5v15a2 2 0 002 2h11" />
    </svg>
  );
}
