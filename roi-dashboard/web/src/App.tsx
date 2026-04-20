import { Link, NavLink, Route, Routes } from "react-router-dom";
import { AppStateProvider, useAppState } from "./state";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ProjectDetail from "./pages/ProjectDetail";
import Connect from "./pages/Connect";
import clsx from "clsx";

function Header() {
  const { apiKey, setApiKey } = useAppState();
  return (
    <header className="border-b border-ink-800/80 bg-ink-950/70 backdrop-blur-md sticky top-0 z-10">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2 text-slate-100">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent/20 text-accent font-black">
            Δ
          </span>
          <span className="font-semibold tracking-tight">Devin ROI</span>
          <span className="text-slate-500 text-xs font-mono">/dashboard</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {[
            { to: "/", label: "Projects" },
            { to: "/settings", label: "Settings" },
          ].map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                clsx(
                  "rounded-md px-3 py-1.5 text-slate-300 hover:text-white hover:bg-ink-800",
                  isActive && "bg-ink-800 text-white"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 text-xs">
          {apiKey ? (
            <>
              <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <span className="live-dot" />
                connected
              </span>
              <button
                className="btn-ghost"
                onClick={() => {
                  if (confirm("Disconnect and remove your API key from this browser?")) setApiKey(null);
                }}
              >
                Disconnect
              </button>
            </>
          ) : (
            <NavLink to="/connect" className="btn-primary">
              Connect Devin
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

function Shell() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/p/:tag" element={<ProjectDetail />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
      <footer className="border-t border-ink-800/80 py-4 text-center text-xs text-slate-500">
        Built with the Devin v3 API · Share this URL — others connect with their own API key
      </footer>
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
