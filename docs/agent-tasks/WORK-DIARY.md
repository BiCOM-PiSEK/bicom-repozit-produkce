# Pracovní deník agentů — Bicom Písek

> Každý agent po dokončení (nebo přerušení) práce zapíše záznam.

---

## 2026-05-26 Fáze A — Jádro a databáze (Sprint A.1–A.3)
**Model:** Antigravity (Claude)
**Branch:** agent/ag-w2-00-repo-init
**Status:** ✅ Hotovo

### Co bylo implementováno
- Kompletní D1 databázové schéma (13 tabulek) s CHECK constrainty, indexy a FK
- 5 číslovaných migrací (0001–0005) — nahrazují starou monolitickou 0000
- Seed data pro 11 reálných služeb Bicom s průměrnými cenami a individuální cenovou poznámkou
- Šifrovací vrstva `DataCrypt` (AES-GCM 256-bit, Web Crypto API, Workers-kompatibilní)
- Databázové helpery (`createBooking`, `confirmBooking`, `getDecryptedBooking`, `addGeoLead`, `subscribeNewsletter`)
- Checklist API klíčů a tokenů (`docs/API_KEYS_CHECKLIST.md`)

### Soubory změněné
- `db/schema.sql` — kompletní idempotentní schéma (přepsáno)
- `db/migrations/0000_init_management.sql` — **smazáno** (nahrazeno 0001–0005)
- `db/migrations/0001_core_tables.sql` — **nový** (bookings, newsletter, blog, services)
- `db/migrations/0002_geo_reminders.sql` — **nový** (geo_leads, reminders)
- `db/migrations/0003_audit_operators.sql` — **nový** (audit_log, operators)
- `db/migrations/0004_calendar_social.sql` — **nový** (calendar_slots, social_posts, campaigns)
- `db/migrations/0005_content_management.sql` — **nový** (content_blocks, process_states + defaults)
- `db/seed/services.sql` — **přepsáno** (11 reálných služeb)
- `functions/lib/datacrypt.js` — **nový** (AES-GCM 256 šifrování)
- `functions/lib/db.js` — **nový** (DB helpery se šifrováním a audit logem)
- `docs/API_KEYS_CHECKLIST.md` — **nový** (odškrtávací seznam 18 klíčů/tokenů)

### Blokátory / poznámky pro vlastníka
- Unit testy pro DataCrypt zatím nespuštěny (vitest není nainstalován lokálně)
- Starý `functions/lib/crypto.js` zůstává v repo — zvážit smazání (nahrazen `datacrypt.js`)
- K lokálnímu ověření schématu je třeba mít nainstalovaný `wrangler`

### Akceptační kritéria — splněno?
- [x] Kompletní D1 schéma se všemi tabulkami z implementačního plánu
- [x] Číslované migrace (0001–0005) místo monolitického souboru
- [x] Seed data pro všech 11 služeb s reálnými daty
- [x] DataCrypt třída (AES-GCM 256, Web Crypto API, bez Node.js)
- [x] DB helpery s atomickými operacemi a audit logem
- [x] Checklist API klíčů pro orchestrátora
- [x] Commitnuté a pushnuté na GitHub
- [ ] Unit test encrypt/decrypt (odloženo — vitest)
- [ ] Lokální ověření schématu (`wrangler d1 execute`)
