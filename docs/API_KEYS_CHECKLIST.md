# Checklist API klíčů a tokenů — Co zajistit

> **Účel:** Kompletní odškrtávací seznam všech API klíčů, tokenů a secrets potřebných pro provoz ekosystému Bicom Písek.
> **Pravidlo:** Vše ukládáme **výhradně do Cloudflare Secrets** (příkaz `wrangler secret put NAZEV`). Lokálně pro vývoj do `.dev.vars` (v `.gitignore`). GitHub Secrets nebo `.env` soubory POUZE pokud CF Secrets nepodporuje daný scénář.

---

## 🔒 Backend Secrets (prefix `SECRET_` — pouze ve Workers, nikdy na frontendu)

### Šifrování a admin přístup
- [ ] **`SECRET_ENCRYPTION_KEY`**
  - **Co to je:** 256-bit AES klíč pro šifrování osobních a zdravotních údajů klientů v D1
  - **Formát:** 64-znakový hex řetězec
  - **Kde vygenerovat:** Terminál → `openssl rand -hex 32`
  - **Kam uložit:** CF Secrets (`wrangler secret put SECRET_ENCRYPTION_KEY`)
  - **⚠️ KRITICKÉ:** Ztráta = nečitelná databáze. Zálohovat offline!

- [ ] **`SECRET_ADMIN_TOKEN`**
  - **Co to je:** Dlouhý náhodný řetězec pro vnitřní ověření admin endpointů
  - **Formát:** Min. 32 znaků (alfanumerické + speciální)
  - **Kde vygenerovat:** Terminál → `openssl rand -base64 48`
  - **Kam uložit:** CF Secrets

### Google Calendar API
- [ ] **`SECRET_GOOGLE_CALENDAR_CLIENT_EMAIL`**
  - **Co to je:** E-mail Service Accountu pro přístup ke kalendáři
  - **Formát:** `xxx@project-id.iam.gserviceaccount.com`
  - **Kde vygenerovat:** [Google Cloud Console](https://console.cloud.google.com/) → IAM → Service Accounts → Create → JSON klíč
  - **Kam uložit:** CF Secrets
  - **Nutný krok:** Sdílet kalendář Lenky/ordinace s tímto e-mailem (oprávnění „Provádět změny")

- [ ] **`SECRET_GOOGLE_CALENDAR_PRIVATE_KEY`**
  - **Co to je:** Privátní klíč ze staženého JSON souboru Service Accountu
  - **Formát:** PEM string (začíná `-----BEGIN PRIVATE KEY-----`)
  - **Kde vygenerovat:** Ve stejném JSON souboru jako výše (pole `private_key`)
  - **Kam uložit:** CF Secrets

- [ ] **`SECRET_GOOGLE_CALENDAR_ID`**
  - **Co to je:** ID sdíleného kalendáře ordinace
  - **Formát:** Obvykle e-mail majitelky nebo speciální ID
  - **Kde najít:** Google Calendar → Nastavení → Integrace kalendáře → ID kalendáře
  - **Kam uložit:** CF Secrets

### Google Workspace
- [ ] **`SECRET_GOOGLE_WORKSPACE_ADMIN_EMAIL`**
  - **Co to je:** Admin e-mail pro Workspace správu
  - **Formát:** `admin@bicompisek.cz`
  - **Kam uložit:** CF Secrets

### Telegram Bot
- [ ] **`SECRET_TELEGRAM_BOT_TOKEN`**
  - **Co to je:** Token Telegram bota pro odesílání zpráv a příjem příkazů
  - **Formát:** `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`
  - **Kde vygenerovat:** Telegram → [@BotFather](https://t.me/BotFather) → `/newbot` → pojmenovat (např. „Bicom Písek Asistent")
  - **Kam uložit:** CF Secrets

- [ ] **`SECRET_TELEGRAM_CHAT_ID`**
  - **Co to je:** ID skupinového chatu, kam bot posílá notifikace
  - **Formát:** Záporné číslo (např. `-100xxxxxxxxxx`)
  - **Kde najít:** Vytvořit skupinu v Telegramu, přidat bota, poslat zprávu, zavolat `https://api.telegram.org/bot{TOKEN}/getUpdates`
  - **Kam uložit:** CF Secrets

### iDoklad (Fakturace)
- [ ] **`SECRET_IDOKLAD_CLIENT_ID`**
  - **Co to je:** Client ID aplikace registrované v iDokladu
  - **Kde vygenerovat:** [iDoklad Developer Portal](https://app.idoklad.cz/) → Registrace API aplikace
  - **Kam uložit:** CF Secrets

- [ ] **`SECRET_IDOKLAD_CLIENT_SECRET`**
  - **Co to je:** Client Secret k aplikaci
  - **Kde vygenerovat:** Tamtéž jako výše
  - **Kam uložit:** CF Secrets

### E-maily (Resend)
- [ ] **`SECRET_RESEND_API_KEY`**
  - **Co to je:** API klíč pro odesílání transakčních e-mailů
  - **Formát:** `re_xxxxxxxx`
  - **Kde vygenerovat:** [resend.com](https://resend.com/) → Dashboard → API Keys
  - **Kam uložit:** CF Secrets
  - **Nutný krok:** Ověřit doménu `bicompisek.cz` (SPF/DKIM záznamy v DNS)

### SMS brána
- [ ] **`SECRET_SMS_GATEWAY_API_KEY`**
  - **Co to je:** API klíč pro odesílání SMS upomínek (T-24h před termínem)
  - **Kde vygenerovat:** [GoSMS.cz](https://www.gosms.cz/) nebo alternativa (sms.sluzba.cz, BulkGate)
  - **Kam uložit:** CF Secrets
  - **Nutný krok:** Dobít SMS kredit

### Instagram / Meta Graph API
- [ ] **`SECRET_META_GRAPH_ACCESS_TOKEN`**
  - **Co to je:** Long-lived access token pro čtení příspěvků z Instagramu
  - **Kde vygenerovat:** [developers.facebook.com](https://developers.facebook.com/) → Business App → Instagram Basic Display API
  - **Kam uložit:** CF Secrets
  - **Nutný krok:** Propojit profesní IG účet s Facebook Business

- [ ] **`SECRET_META_IG_USER_ID`**
  - **Co to je:** Numerické ID IG Business účtu
  - **Kde najít:** Graph API Explorer → `/me?fields=id`
  - **Kam uložit:** CF Secrets

### AI zálohy (Fallback chain)
- [ ] **`SECRET_GROQ_API_KEY`**
  - **Co to je:** API klíč pro záložní LLM (Groq — ultra-rychlé Llama 3 inference)
  - **Kde vygenerovat:** [console.groq.com](https://console.groq.com/) → API Keys
  - **Kam uložit:** CF Secrets

- [ ] **`SECRET_GEMINI_API_KEY`**
  - **Co to je:** API klíč pro záložní LLM (Google Gemini 1.5 Pro)
  - **Kde vygenerovat:** [Google AI Studio](https://aistudio.google.com/) → Get API Key
  - **Kam uložit:** CF Secrets

---

## 🌐 Veřejné proměnné (prefix `NEXT_PUBLIC_` — viditelné na frontendu)

Ukládají se do **Cloudflare Pages Environment Variables** (Build Settings v CF Dashboardu).

- [ ] **`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`**
  - **Co to je:** API klíč pro Google Maps embed / recenze
  - **Kde vygenerovat:** [Google Cloud Console](https://console.cloud.google.com/) → APIs → Maps JavaScript API → Credentials
  - **Kam uložit:** CF Pages Environment Variables

- [ ] **`NEXT_PUBLIC_GOOGLE_PLACES_ID`**
  - **Co to je:** Place ID ordinace v Google Mapách
  - **Kde najít:** [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
  - **Kam uložit:** CF Pages Environment Variables

- [ ] **`NEXT_PUBLIC_MAPY_CZ_API_KEY`**
  - **Co to je:** API klíč pro embed Mapy.cz (primární mapa na webu)
  - **Kde vygenerovat:** [api.mapy.cz](https://api.mapy.cz/) → Registrace
  - **Kam uložit:** CF Pages Environment Variables

- [ ] **`NEXT_PUBLIC_GA_MEASUREMENT_ID`**
  - **Co to je:** Google Analytics 4 Measurement ID
  - **Formát:** `G-XXXXXXXXXX`
  - **Kde najít:** [analytics.google.com](https://analytics.google.com/) → Admin → Data Streams
  - **Kam uložit:** CF Pages Environment Variables
  - **Pozn.:** Aktivuje se AŽ po souhlasu s cookies (cookie consent lišta)

---

## 🏗️ Infrastruktura (nastavit v Cloudflare Dashboardu)

- [ ] **D1 databáze** `bicom-db-prod` → zkopírovat `database_id` do `wrangler.toml`
- [ ] **R2 bucket** `bicom-multimedia`
- [ ] **KV namespace** (cache/rate-limit) → zkopírovat `id` do `wrangler.toml`
- [ ] **Workers AI** povolené (Llama 3)
- [ ] **Queues** `booking-jobs` + `social-jobs`
- [ ] **Cloudflare Access** pro `/admin` (whitelist e-mailů + doporučené 2FA)

---

## 📋 Kontaktní údaje od Lenky (pro NAP, JSON-LD, souhlas)

- [ ] IČO
- [ ] Přesná adresa ordinace (ulice, číslo, PSČ)
- [ ] Telefon (mezinárodní formát +420)
- [ ] Ceník služeb (potvrzení průměrných cen)
- [ ] Souhlas se zpracováním zdravotních údajů — **revize advokátem**
- [ ] Foto ordinace + portrét (nebo zadání pro Nano Banana)
