-- 0000_init_management.sql
-- Inicializace D1 tabulek pro "Secret Frontend" (Management vrstvu)

-- Tabulka pro audit logy (akce agentů a administrátorů)
-- Poznámka: v reálném nasazení z dokumentu 05 má actor formát např. `operator:{id}`
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id TEXT PRIMARY KEY,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabulka pro operátory (dvě a více provozovatelek pro asynchronní zamykání a identity)
CREATE TABLE IF NOT EXISTS operators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin', -- 'owner', 'admin'
    calendar_color TEXT,
    email TEXT UNIQUE NOT NULL
);

-- Tabulka zámků kalendářních slotů k prevenci dvojí rezervace
CREATE TABLE IF NOT EXISTS calendar_slots (
    start_ts DATETIME UNIQUE NOT NULL,
    end_ts DATETIME NOT NULL,
    locked_by TEXT, -- reference na operators.id
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabulka příspěvků na sociální sítě pro 'social-publish'
CREATE TABLE IF NOT EXISTS social_posts (
    id TEXT PRIMARY KEY,
    content_text TEXT,
    media_url TEXT,
    status TEXT DEFAULT 'draft',
    publish_at DATETIME,
    created_by TEXT, -- reference na operators.id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabulka marketingových kampaní (agregace doporučení)
CREATE TABLE IF NOT EXISTS marketing_campaigns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'planned',
    target_geo TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Tabulka pro správu dynamických obsahových bloků (aby klient mohl měnit texty z frontendu)
CREATE TABLE IF NOT EXISTS content_blocks (
    id TEXT PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL,
    title TEXT,
    content_markdown TEXT NOT NULL,
    last_updated_by TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabulka pro nastavení a stavy procesů (např. automatizace z Google Workspace, stavy front)
CREATE TABLE IF NOT EXISTS process_states (
    key TEXT PRIMARY KEY,
    value TEXT,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Příklad úvodních hodnot
INSERT INTO process_states (key, value, description) VALUES
('instagram_sync_status', 'active', 'Stav automatické synchronizace Instagram příspěvků'),
('gdpr_anonymizer_status', 'active', 'Zda je zapnutý anonymizér rezervací po 3 letech');
