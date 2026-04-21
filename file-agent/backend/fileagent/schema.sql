-- fileagent SQLite schema. Safe to re-run (idempotent CREATE IF NOT EXISTS).
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS watched_folders (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    path            TEXT    NOT NULL UNIQUE,
    role            TEXT    NOT NULL DEFAULT 'user',     -- 'downloads' | 'documents' | 'pictures' | 'user'
    enabled         INTEGER NOT NULL DEFAULT 1,
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS files_index (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    path            TEXT    NOT NULL UNIQUE,
    folder_id       INTEGER REFERENCES watched_folders(id) ON DELETE CASCADE,
    name            TEXT    NOT NULL,
    extension       TEXT,
    size_bytes      INTEGER NOT NULL,
    created_at      TEXT,
    modified_at     TEXT,
    sha256          TEXT,
    last_scanned_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_files_index_folder ON files_index(folder_id);
CREATE INDEX IF NOT EXISTS idx_files_index_sha    ON files_index(sha256);

CREATE TABLE IF NOT EXISTS classification_results (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    file_id         INTEGER NOT NULL REFERENCES files_index(id) ON DELETE CASCADE,
    category        TEXT    NOT NULL,
    topic           TEXT,
    confidence      REAL    NOT NULL DEFAULT 0.0,
    source          TEXT    NOT NULL DEFAULT 'rules',   -- 'rules' | 'ai' | 'hybrid'
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_classification_file ON classification_results(file_id);

CREATE TABLE IF NOT EXISTS organization_rules (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    key             TEXT    NOT NULL UNIQUE,    -- stable identifier, e.g. 'downloads_installers'
    name            TEXT    NOT NULL,
    description     TEXT,
    enabled         INTEGER NOT NULL DEFAULT 1,
    risk            TEXT    NOT NULL DEFAULT 'safe',   -- 'safe' | 'review' | 'sensitive'
    mode            TEXT    NOT NULL DEFAULT 'preview',-- 'off' | 'preview' | 'approval' | 'auto'
    min_confidence  REAL    NOT NULL DEFAULT 0.85,
    config_json     TEXT    NOT NULL DEFAULT '{}',
    priority        INTEGER NOT NULL DEFAULT 100,
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS proposed_actions (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id         TEXT    NOT NULL,
    file_id         INTEGER NOT NULL REFERENCES files_index(id) ON DELETE CASCADE,
    rule_id         INTEGER REFERENCES organization_rules(id) ON DELETE SET NULL,
    op_type         TEXT    NOT NULL,      -- 'move' | 'rename' | 'quarantine' | 'create_folder' | 'archive'
    before_path     TEXT    NOT NULL,
    after_path      TEXT    NOT NULL,
    reason          TEXT    NOT NULL DEFAULT '',
    confidence      REAL    NOT NULL DEFAULT 0.0,
    requires_approval INTEGER NOT NULL DEFAULT 1,
    status          TEXT    NOT NULL DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected' | 'executed' | 'skipped'
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_proposed_plan   ON proposed_actions(plan_id);
CREATE INDEX IF NOT EXISTS idx_proposed_status ON proposed_actions(status);

CREATE TABLE IF NOT EXISTS executed_actions (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id        TEXT    NOT NULL,
    proposed_id     INTEGER REFERENCES proposed_actions(id) ON DELETE SET NULL,
    rule_id         INTEGER REFERENCES organization_rules(id) ON DELETE SET NULL,
    op_type         TEXT    NOT NULL,
    before_path     TEXT    NOT NULL,
    after_path      TEXT    NOT NULL,
    success         INTEGER NOT NULL,
    error_message   TEXT,
    reversible      INTEGER NOT NULL DEFAULT 1,
    rollback_token  TEXT,
    executed_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_executed_batch ON executed_actions(batch_id);

CREATE TABLE IF NOT EXISTS rollback_history (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id        TEXT    NOT NULL,
    executed_id     INTEGER NOT NULL REFERENCES executed_actions(id) ON DELETE CASCADE,
    op_type         TEXT    NOT NULL,      -- 'undo' | 'redo'
    before_path     TEXT    NOT NULL,
    after_path      TEXT    NOT NULL,
    success         INTEGER NOT NULL,
    error_message   TEXT,
    executed_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS app_settings (
    key             TEXT    PRIMARY KEY,
    value           TEXT    NOT NULL,
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS scheduled_jobs (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL UNIQUE,
    trigger         TEXT    NOT NULL,      -- 'daily' | 'startup' | 'weekly' | 'manual'
    mode            TEXT    NOT NULL DEFAULT 'preview',
    enabled         INTEGER NOT NULL DEFAULT 1,
    last_run_at     TEXT,
    next_run_at     TEXT,
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);
