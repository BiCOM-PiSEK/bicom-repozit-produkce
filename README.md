🌿 Bicom Písek – Produkční Repozitář (bicom-repozit-produkce)
=============================================================

Vítejte v hlavním produkčním repozitáři organizace [**BiCOM-PiSEK**](https://github.com/organizations/BiCOM-PiSEK). Tento repozitář slouží jako **„Single Source of Truth“** pro klientskou distribuci, nasazení na síť Cloudflare a následné předání kompletního ekosystému koncovému zákazníkovi.

Projekt je vyvíjen v souladu s hybridním technologickým stackem **Meverik Studio (2026)** s maximálním důrazem na strategii **„Edge-First“** (nulové nebo zanedbatelné fixní provozní náklady, extrémní rychlost načítání a robustní AI funkce přímo na okraji sítě).

🏗️ Technologický Stack (Edge-First & Cloudflare Only)
------------------------------------------------------

Pro zajištění minimálních provozních nákladů v produkci (Zero-Cost Hosting model) využíváme výhradně serverless architekturu:

*   **Prezentační vrstva (Frontend):** HTML5 / Tailwind CSS / Vanilla JS (nasazeno na **Cloudflare Pages**).
    
*   **Aplikační logika (Backend):** **Cloudflare Workers** (rychlé, lehké API endpointy pro zpracování rezervací, newsletterů a komunikaci).
    
*   **Datová vrstva (SQL):** **Cloudflare D1** (distribuovaná SQLite databáze na Edge síti).
    
*   **Úložiště médií (Blob):** **Cloudflare R2** (nulové poplatky za stahování dat / egress fees – pro knihovnu videí a fotogalerii).
    
*   **Umělá inteligence (AI Hub):** **Cloudflare Workers AI** (lokální, bleskurychlá inference modelů Llama pro chatbota a administraci).
    
*   **Integrace & Kalendář:** **Google Workspace API** (Gmail pro transakční maily, Google Calendar pro přímý zápis a správu rezervací).
    

📁 Struktura repozitáře
-----------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   /  ├── public/                 # Statický produkční frontend (Pages)  │   ├── index.html          # Hlavní portál (Quiet Luxury UI, sémantika, sitemap)  │   ├── assets/             # Optimalizovaná lokální média (R2 fallback)  │   └── gdpr.html           # Právní náležitosti a nakládání s údaji o zdraví  ├── functions/              # Cloudflare Workers (Backend & API)  │   ├── api/  │   │   ├── book.js         # API pro rezervace -> Google Calendar & D1  │   │   ├── newsletter.js   # Sběr kontaktů do D1  │   │   └── chat.js         # Workers AI / Llama 3 endpoint pro asistentku  │   └── admin/  │       └── copywriter.js   # Workers AI pro přepis poznámek na články  ├── db/  │   └── schema.sql          # Inicializační schéma pro Cloudflare D1  ├── README.md               # Tento dokument  └── WHITE_PAPER.md          # Strategický a architektonický manifest   `

🚀 Jak začít (Pro vývojáře a AI agenty)
---------------------------------------

### 1\. Klonování a lokální spuštění

Pro lokální testování frontendu i backendu využíváme vývojový nástroj **Wrangler** od Cloudflare:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   # Klonování repozitáře  git clone [https://github.com/BiCOM-PiSEK/bicom-repozit-produkce.git](https://github.com/BiCOM-PiSEK/bicom-repozit-produkce.git)  cd bicom-repozit-produkce  # Spuštění lokálního emulátoru (Pages + Workers + D1)  npx wrangler pages dev public --local --d1=DB   `

### 2\. Inicializace databáze

Před prvním spuštěním lokálně nebo na produkci je nutné vytvořit tabulky v databázi D1:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   # Lokální inicializace  npx wrangler d1 execute DB --local --file=db/schema.sql  # Produkční nasazení (po propojení s Cloudflare)  npx wrangler d1 execute bicom-db-prod --remote --file=db/schema.sql   `

🤖 Protokol pro AI Agenty (Antigravity / VS Code)
-------------------------------------------------

Pokud jsi AI agent (např. Claude, Gemini) s oprávněním kódovat:

1.  **Vždy** zapisuj provedené změny do lokálního agent\_journal.md.
    
2.  Při úpravách public/index.html zachovej designový jazyk **„Quiet Luxury“** (kombinace písem _Cormorant Garamond_ a _Montserrat_, šalvějové, krémové a champagne tóny).
    
3.  Nikdy nepoužívej externí knihovny, pokud nejsou výslovně definovány v tomto dokumentu.
    
4.  Při jakékoliv změně v API route zkontroluj kompatibilitu s Cloudflare Workers specifikací.
    

📈 Předání projektu a správa
----------------------------

Kompletní návod na předání domén, Cloudflare účtu, Google Workspace licencí a API klíčů naleznete v souboru GITHUB\_SETUP\_AND\_PLANNING.md.
