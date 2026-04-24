import { useState } from "react";
import Sidebar, { type PageKey } from "./components/Sidebar";
import Home from "./pages/Home";
import FolderSelection from "./pages/FolderSelection";
import Analysis from "./pages/Analysis";
import Rules from "./pages/Rules";
import ActivityLog from "./pages/ActivityLog";
import Quarantine from "./pages/Quarantine";
import Undo from "./pages/Undo";
import Settings from "./pages/Settings";

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [planId, setPlanId] = useState<string | null>(null);

  return (
    <div className="layout">
      <Sidebar active={page} onSelect={setPage} />
      <main className="main">
        {page === "home" && <Home onStart={() => setPage("folders")} />}
        {page === "folders" && <FolderSelection />}
        {page === "analysis" && (
          <Analysis planId={planId} onPlanId={setPlanId} />
        )}
        {page === "rules" && <Rules />}
        {page === "activity" && <ActivityLog />}
        {page === "quarantine" && <Quarantine />}
        {page === "undo" && <Undo />}
        {page === "settings" && <Settings />}
      </main>
    </div>
  );
}
