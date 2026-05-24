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

Pro zajištění minimálních nákladů v produkci nepoužíváme těžké servery (např. Google Cloud Run). Vše běží na globální distribuované síti Cloudflare, která je do detailu popsána v následující systémové struktuře:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
<system_architecture name="Bicom Písek Digital Ecosystem" environment="Cloudflare Edge Grid" version="2026.1">
    <client_entrypoint>
        <device_types>
            <device type="Mobile" primary="true" description="Primární přístup cílové skupiny" />
            <device type="Desktop" primary="false" description="Administrační rozhraní a management" />
            <device type="Tablet" primary="false" />
        </device_types>
        <network_security>
            <gateway name="Cloudflare WAF" secure="true">
                <protocols>
                    <protocol type="HTTPS" port="443" TLS_version="1.3" />
                    <protocol type="WSS" port="443" description="Zabezpečená komunikace pro real-time dotazy" />
                </protocols>
                <security_rules>
                    <rule type="DDoS Protection" active="true" />
                    <rule type="Rate Limiting" active="true" limit="100 requests/minute per IP" />
                    <rule type="Bot Management" active="true" target="Malicious crawlers" />
                </security_rules>
            </gateway>
        </network_security>
    </client_entrypoint>

    <presentation_layer>
        <service name="Cloudflare Pages" type="Jamstack Hosting">
            <content_distribution>
                <engine name="Cloudflare Global CDN" caching_level="Aggressive" />
            </content_distribution>
            <frontend_assets>
                <asset type="HTML5" routing="SPA Client Router" />
                <asset type="CSS3" framework="Tailwind CSS" theme="Quiet Luxury" />
                <asset type="JS" framework="Vanilla ES6 / Web Components" AsyncInit="true" />
            </frontend_assets>
            <performance_targets>
                <metric name="TTFB" target="&lt;50ms" />
                <metric name="FCP" target="&lt;200ms" />
                <metric name="LCP" target="&lt;500ms" />
            </performance_targets>
        </service>
    </presentation_layer>

    <logic_and_computation_layer>
        <service name="Cloudflare Workers" type="Serverless FaaS" execution="V8 Isolation">
            <routing>
                <route path="/api/book" handler="book_handler" method="POST" />
                <route path="/api/newsletter" handler="newsletter_handler" method="POST" />
                <route path="/api/chat" handler="ai_chat_handler" method="POST" />
                <route path="/api/admin/copywriter" handler="ai_admin_copywriter" method="POST" />
            </routing>
            
            <cognitive_services>
                <service_component name="Cloudflare Workers AI" runtime="Edge Inference">
                    <models>
                        <model name="@cf/meta/llama-3-8b-instruct" task="Chatbot &amp; Copywriter Assistant" />
                    </models>
                    <pipelines>
                        <pipeline name="Client QA" input="User query" output="Contextual calm response" />
                        <pipeline name="Audio-to-Blog" input="Voice transcript" output="Sémanticky optimalizovaný článek" />
                    </pipelines>
                </service_component>
            </cognitive_services>
        </service>
    </logic_and_computation_layer>

    <storage_layer>
        <database name="Cloudflare D1" engine="SQLite Distributed" latency="Minimal Edge Latency">
            <schemas>
                <table name="bookings">
                    <field name="id" type="TEXT" key="PRIMARY" />
                    <field name="name" type="TEXT" null="NOT NULL" />
                    <field name="email" type="TEXT" null="NOT NULL" />
                    <field name="phone" type="TEXT" null="NOT NULL" />
                    <field name="service" type="TEXT" null="NOT NULL" />
                    <field name="preferred_date" type="TEXT" null="NOT NULL" />
                    <field name="status" type="TEXT" default="pending" />
                    <field name="created_at" type="TIMESTAMP" default="CURRENT_TIMESTAMP" />
                </table>
                <table name="newsletter_subscribers">
                    <field name="id" type="TEXT" key="PRIMARY" />
                    <field name="email" type="TEXT" null="NOT NULL" unique="UNIQUE" />
                    <field name="status" type="TEXT" default="active" />
                    <field name="created_at" type="TIMESTAMP" default="CURRENT_TIMESTAMP" />
                </table>
                <table name="blog_posts">
                    <field name="id" type="TEXT" key="PRIMARY" />
                    <field name="title" type="TEXT" null="NOT NULL" />
                    <field name="content" type="TEXT" null="NOT NULL" />
                    <field name="image_url" type="TEXT" />
                    <field name="source" type="TEXT" default="instagram" />
                    <field name="created_at" type="TIMESTAMP" default="CURRENT_TIMESTAMP" />
                </table>
            </schemas>
        </database>

        <blob_storage name="Cloudflare R2" type="S3-Compatible Object Storage">
            <egress_fees cost="0.00 USD" />
            <data_buckets>
                <bucket name="multimedia-library">
                    <folder path="videos/" description="Streamovaná videa o biorezonanci" />
                    <folder path="gallery/" description="Fotografie ordinace a přístroje Bicom" />
                    <folder path="certificates/" description="Odborná osvědčení a certifikáty" />
                </bucket>
            </data_buckets>
        </blob_storage>
    </storage_layer>

    <integration_layer>
        <connector name="Google Workspace Connection">
            <integration type="Google Calendar API" OAuth="Service Account">
                <action trigger="booking_handler success" write="Insert pending event to Lenka's Calendar" />
            </integration>
            <integration type="Gmail API" protocol="OAuth2">
                <action trigger="booking_handler success" send="Pre-treatment preparation email to client" />
            </integration>
        </connector>

        <connector name="Transactional Email Delivery">
            <service name="Resend API" method="HTTPS POST" />
        </connector>

        <connector name="Social Sync Connection">
            <integration type="Meta Graph API" authorization="Long-Lived User Access Token">
                <action trigger="Cron Job (24h)" pull="Retrieve new Instagram posts" sync_to="Cloudflare D1 &amp; R2" />
            </integration>
        </connector>
    </integration_layer>
</system_architecture>


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

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Napiš kompletní kód pro Cloudflare Worker (index.js) s využitím ES modulů. Worker bude obsluhovat endpoint /api/book.  Požadavky:  1. Přijmi POST data (jméno, email, telefon, vybraná služba, datum).  2. Zapiš data do Cloudflare D1 SQL databáze do tabulky 'bookings'.  3. Volitelně priprav integraci na Google Calendar API pro zápis termínu (použij service account a fetch na googleapis.com).  4. Odešli transakční e-mail klientovi (příprava na terapii) pomocí libovolné doporučené e-mailové služby (např. Resend nebo Mailgun).  5. Ošetři CORS, chybové stavy a implementuj exponenciální backoff pro externí API volání. Kód musí běžet na Cloudflare Workers bez Node.js závislostí.   `
