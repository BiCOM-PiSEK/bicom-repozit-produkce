🌿 Bicom Písek – White Paper & Architektonická Studie
=====================================================

Tento dokument slouží jako centrální strategický manifest, architektonická studie a podklad pro AI agenty. Definuje vizi, datovou strukturu, uživatelské cesty (pipelines) a marketingovou integraci pro projekt celostního zdraví a biorezonance v Písku.

1\. Vize a Manifest (Quiet Luxury & Důvěra)
-------------------------------------------

Biorezonance Bicom Optima se pohybuje na rozhraní certifikované biofyzikální technologie (v EU klasifikováno jako zdravotnický prostředek třídy IIa) a celostní, alternativní medicíny. Z tohoto důvodu je vizuální a komunikační styl klíčem k úspěchu:

*   **Punc exkluzivity (Quiet Luxury):** Web nesmí působit jako levná "ezo-poradna" ani jako chladná, sterilní nemocnice. Designový jazyk používá hřejivé, smetanově béžové tóny (#FAF8F5), šalvějově zelenou (#738A75) symbolizující přírodu a obnovu, a decentní detaily v barvě champagne gold (#C5A880).
    
*   **Budování hluboké důvěry:** Cílová skupina vyžaduje bezpečí. Biorezonance pracuje s citlivými údaji o zdraví a životním stylu. Komunikace je proto nanejvýš empatická, diskrétní a odborně podložená (citace norem, certifikátů, vysvětlení principu buněčné biofyziky).
    
*   **Přístupnost a lidskost:** Za celým projektem stojí osobnost paní Lenky Limpouchové. Lidé se neobjednávají k "přístroji", ale k "Lence". Web proto staví na jejím příběhu a osobním přístupu.
    

2\. Lokální výzkum a demografie (Písek + 30 km)
-----------------------------------------------

Naše sémantická optimalizace (GEO/AIO) a marketingové kampaně (Mikeš) se opírají o reálná sociodemografická data regionu v okruhu 20–30 km (Písek, Strakonice, Milevsko, Vodňany, Protivín).

### Rozdělení cílového publika:

1.  **Ženy 35–55 let (Hlavní cílová skupina - 60 %):**
    
    *   _Symptomy:_ Vyhoření, chronický stres, nespavost, psychosomatické bolesti, ženské zdraví (hormonální nerovnováha, migrény).
        
    *   _Slovník:_ "hledám vnitřní klid", "únava bez příčiny", "přírodní cesta", "celostní přístup".
        
2.  **Maminky s dětmi (20 %):**
    
    *   _Symptomy:_ Atopický ekzém, potravinové intolerance (mléko, lepek), pylové alergie, oslabená imunita po nástupu do školky.
        
    *   _Slovník:_ "bezbolestný test pro děti", "šetrná léčba ekzému", "jak na pylovou rýmu u dětí".
        
3.  **Muži & Kuřáci (15 %):**
    
    *   _Symptomy:_ Fyzická závislost na nikotinu, stres z práce, chronická únava (pracující ve směnných provozech v průmyslové zóně Písek/Strakonice).
        
    *   _Slovník:_ "jak přestat kouřit hned", "odvykání kouření bez absťáku", "bolest zad z práce".
        
4.  **Biohackeři & Regenerace (5 %):**
    
    *   _Symptomy:_ Detoxikace těžkých kovů, paraziti, obnova plicní kapacity po virových onemocněních.
        

3\. Technický diagram & Tok dat (Cloudflare Edge Grid)
------------------------------------------------------

Pro zajištění minimálních nákladů v produkci nepoužíváme těžké servery (např. Google Cloud Run). Vše běží na globální distribuované síti Cloudflare:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   [ UŽIVATEL / MOBIL ]            |           | (HTTPS / WSS) -> Ochrana Cloudflare WAF           v  [ CLOUDFLARE PAGES ] ----(Servíruje bleskový Quiet Luxury Frontend)           |           v (API volání)  [ CLOUDFLARE WORKERS ]       |      |      |      |      |      +---> [ CLOUDFLARE WORKERS AI ] ---> (Llama 3 Chatbot & Copywriter)      |      |      |      +----------> [ CLOUDFLARE R2 ] ------------> (Knihovna videí, fotky, média)      |      +-----------------> [ CLOUDFLARE D1 (SQL) ] ------> (Ukládání rezervací & Newsletterů)              |              +---------> [ GOOGLE CALENDAR API ] ------> (Zápis termínu paní Lence)              |              +---------> [ GMAIL / RESEND API ] -------> (Transakční mail s přípravou na Bicom)   `

4\. Uživatelské cesty (Pipelines)
---------------------------------

### Pipeline A: Návštěvník webu (Od problému k rezervaci)

1.  **Vstup:** Žena (42 let, Písek) přichází z Facebookové reklamy od Mikeše ("Trápí vás neustálá únava a stres?").
    
2.  **První vteřiny:** Načtení webu z CF Pages do 200ms. Vidí klidné barvy, foto ordinace a text: _"Ulevte svému tělu bez chemie"_. Okamžitý pocit bezpečí.
    
3.  **Interakce:** Kliká na interaktivní sekci _"Moje cesta k rovnováze"_ -> volí _"Vyhoření & Únava"_. Web se okamžitě bez přebliknutí přizpůsobí a vysvětlí, jak Bicom testuje toxiny a těžké kovy.
    
4.  **Důvěra:** Prohlíží si fotky ordinace, certifikáty a kratičké video v knihovně (streamované bez zpoždění z R2).
    
5.  **Akce:** Vyplňuje poptávkový formulář.
    
6.  **Potvrzení:** Systém jí ukáže stránku s poděkováním a do e-mailu jí dorazí instrukce: _"Jak se připravit na první biorezonanci (24h předem nepít kávu a alkohol, pít čistou vodu)"_.
    

### Pipeline B: Provozovatel (Bezúdržbový provoz paní Lenky)

1.  **Tvorba obsahu:** Paní Lenka přidá fotku a text o novém úspěšném případu odvykání kouření na svůj **Instagram**.
    
2.  **Automatizace:** Cloudflare Worker na pozadí zaznamená nový post, stáhne obrázek do R2 a text uloží do D1 databáze. Web se sám aktualizuje bez jejího zásahu.
    
3.  **Příjem rezervace:** Klient odešle formulář. Paní Lence pípne upozornění a termín se automaticky zapíše jako "předběžný" do jejího **Google Kalendáře** v mobilu.
    
4.  **Schválení:** Paní Lenka v tajné sekci webu (nebo přímo v mobilu) klikne na _"Potvrdit"_. Systém pošle klientovi e-mail s potvrzením a SMS připomínku 24 hodin před termínem.
    
5.  **AI Asistence (Admin AI Service):** Chce napsat nový článek. Namluví do mobilu krátkou hlasovou zprávu o tom, jak dnes pomohla holčičce s pylovou rýmou. Vloží přepis do administrace. **Workers AI (Llama 3)** přetaví surový přepis do nádherného, čtivého článku v tónu _Quiet Luxury_ a jedním kliknutím ho publikuje.
    

5\. Marketing, SEO, GEO & AIO Engine
------------------------------------

Abychom zajistili, že Bicom Písek bude doporučován v AI konverzacích (AIO/GEO) a vyhledávačích:

*   **Strukturovaná sémantika (JSON-LD):** Do kódu integrujeme hluboká schémata pro vyhledávače. AI modely (ChatGPT, Gemini) tak okamžitě pochopí vazbu: Lenka Limpouchová + Bicom Optima + Písek.
    
*   **Časté otázky (FAQ) jako GEO potrava:** AI asistenti odpovídají na otázky uživatelů. Web proto obsahuje sekci FAQ s vědecky i lidsky popsanými odpověďmi na klíčové otázky (Bolí to? Kolik sezení potřebuji? Co jsou to elektromagnetické frekvence?).
    
*   **Meta Graph API:** Pravidelná synchronizace s Instagramem zajišťuje čerstvá, klíčovými slovy nabitá data pro indexaci vyhledávači.
    

🤖 Systémový Prompt pro implementaci API (Cloudflare Worker)
------------------------------------------------------------

_Tento prompt předej svému AI agentovi ve VS Code pro naprogramování API logiky._

