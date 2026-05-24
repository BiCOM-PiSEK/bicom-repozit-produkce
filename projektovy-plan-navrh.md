📅 GitHub Setup, Projektové Plánování & Předávací Protokol
==========================================================

Tento soubor definuje proces nastavení GitHub organizace, strukturu úkolů (milestones) pro vývoj a kompletní předávací protokol pro bezpečný převod celého ekosystému na paní Lenku Limpouchovou po dokončení vývoje.

1\. Nastavení GitHub Organizace BiCOM-PiSEK
-------------------------------------------

Pro bezpečný vývoj a budoucí snadné předání kompletního vlastnictví zákazníkovi jsme zvolili model GitHub Organizace:

### Architektura repozitářů:

1.  **BiCOM-PiSEK/bicom-repozit-produkce (Veřejný / Sdílený v org):**
    
    *   Obsahuje finální, produkční kód (HTML, CSS, JS, Workers backend), který je přímo propojen s Cloudflare Pages a D1.
        
    *   Tento repozitář bude plně převeden na klientku. Neobsahuje tvé soukromé, univerzální knihovny nebo skryté know-how, ale pouze čisté, sémantické řešení jejího webu.
        
2.  **Soukromý repozitář (Tvé osobní prostředí):**
    
    *   Zde probíhá tvůj primární vývoj, experimenty s AI agenty, ukládání komplexních systémových promptů a příprava robustních backendových funkcí.
        
    *   Do produkční organizace pushuješ až odladěné, čisté a bezpečné verze kódů.
        

### Kroky pro nastavení organizace:

*   \[ \] Pozvat do organizace BiCOM-PiSEK případné další spolupracovníky (např. Mikeše pro marketingové integrace).
    
*   \[ \] V nastavení organizace (Settings -> Member privileges) nastavit základní oprávnění pro členy na "Read" nebo "Write" dle potřeby.
    
*   \[ \] Propojit GitHub Actions s Cloudflare pomocí API Tokenu (vložit do Settings -> Secrets and variables -> Actions).
    

2\. Projektové plánování & Milestones (Google Workspace & GitHub Projects)
--------------------------------------------------------------------------

Celý vývoj rozdělíme do 5 fází s jasnými milníky. Pro organizaci práce doporučujeme využít **GitHub Projects** integrovaný přímo v organizaci.

### 📍 Milník 1: Inicializace a GEO Příprava (Týden 1)

*   **Úkoly:** Založení repozitáře, nastavení DNS na Cloudflare, nákup domény bicompisek.cz a přesměrování bicom-pisek.cz.
    
*   **GEO/AIO:** Zápis JSON-LD schémat, nastavení Google Mapy profilu ("Bicom Písek - Lenka Limpouchová").
    

### 📍 Milník 2: Vývoj Frontendu (Quiet Luxury UI) (Týden 2)

*   **Úkoly:** Kódování responzivního SPA portálu. Implementace interaktivního průvodce symptomem ("Moje cesta k rovnováze").
    
*   **UX:** Vyvážení barev (smetanová béžová, šalvějová), integrace Lucide ikon, animace načítání sekcí (AOS).
    

### 📍 Milník 3: Integrace Backend API & Databáze (Týden 3)

*   **Úkoly:** Vývoj Cloudflare Workers pro endpointy /api/book a /api/newsletter. Inicializace tabulek v Cloudflare D1 SQL databázi.
    
*   **Konektory:** Napojení na Google Calendar API (zápis rezervací) a e-mailovou bránu (odesílání instrukcí klientům).
    

### 📍 Milník 4: AI Služby & Instagram Connector (Týden 4)

*   **Úkoly:** Vývoj Workers AI chatbota (Llama 3) pro rychlé dotazy klientů. Naprogramování Instagram sync skriptu pro automatické plnění sekce Blog/Magazín a Galerie.
    
*   **Admin:** Zprovoznění skrytého admin rozhraní s AI Copywriterem.
    

### 📍 Milník 5: Testování, QA a Ostrý start (Týden 5)

*   **Úkoly:** Testování funkčnosti formulářů, simulace klientských cest na mobilních zařízeních, ověření rychlosti načítání na Edge (Target: < 300ms).
    
*   **Předání:** Spuštění předávacího protokolu.
    

3\. Předávací Protokol (Handover Protocol)
------------------------------------------

Po dokončení vývoje a schválení webu dojde k bezpečnému převodu všech práv a přístupů na paní Lenku Limpouchovou:

### A. Doména a DNS (Cloudflare)

1.  Vytvoříme bezplatný osobní Cloudflare účet pro paní Lenku.
    
2.  Pomocí funkce **„Member Access“** ji pozveme jako administrátora do naší zóny, nebo provedeme přímý **„Domain Transfer“** pod její účet.
    
3.  Všechny DNS záznamy, nastavení WAF a SSL se převedou automaticky bez výpadku webu.
    

### B. Google Workspace & E-maily

1.  Založíme pro ni Google Workspace na doméně bicompisek.cz (byznys tarif).
    
2.  Nastavíme e-mailové schránky (např. info@bicompisek.cz a osobní lenka@bicompisek.cz).
    
3.  Propojíme Google Kalendář s naším API Service Accountem z Cloudflare Workers.
    

### C. GitHub a Kód

1.  Převedeme vlastnictví organizace BiCOM-PiSEK na její nově vytvořený GitHub účet (nebo účet jejího IT správce).
    
2.  Ona získá plný přístup k repozitáři bicom-repozit-produkce, kde je uložen kompletní produkční kód, historie verzí a dokumentace.
    
3.  Tvůj soukromý repozitář s vývojovým know-how zůstává bezpečně u tebe.
    

🤖 Systémový Prompt pro plánování a automatizaci QA
---------------------------------------------------
Jsi QA inženýr specializující se na Cloudflare serverless stack a integrace s třetími stranami.
Navrhni sadu testovacích scénářů pro prověření rezervačního ekosystému Bicom Písek:
1. Otestuj validaci dat v poptávkovém formuláři (ošetření XSS, SQL injection v D1).
2. Simuluj selhání Google Calendar API (exponenciální backoff, zápis chyb do logu).
3. Prověř rychlost načítání frontendu na mobilních zařízeních (target Lighthouse score > 95).
4. Otestuj funkčnost cookie lišty a správné spouštění měřících kódů až po udělení souhlasu.

_Tento prompt předej svému AI agentovi pro otestování celého ekosystému před odevzdáním._

