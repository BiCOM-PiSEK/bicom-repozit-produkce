🌿 Strategické Provozní Protokoly & Security Blueprint
======================================================

Tento dokument doplňuje technický _White Paper_ a slouží jako strategický, právně-bezpečnostní a uživatelský manuál pro projekt **Bicom Písek**. Je navržen jako iniciační materiál pro vývojáře, marketingové specialisty a koncového provozovatele.

1\. GDPR & Protokol pro ochranu citlivých údajů o zdraví
--------------------------------------------------------

Biorezonanční péče pracuje s informacemi o alergiích, závislostech a celkovém fyzickém či psychickém stavu klienta. Podle obecného nařízení o ochraně osobních údajů (GDPR) se jedná o **zvláštní kategorii osobních údajů (čl. 9 GDPR – údaje o zdraví)**, které vyžadují zvýšené zabezpečení.

### A. Technická implementace v Cloudflare D1

Abychom splnili požadavky na bezpečnost a minimalizovali riziko úniku dat, implementujeme následující architekturu:

*   **Šifrování na úrovni aplikace (Field-Level Encryption):** Citlivé sloupce v databázi D1 (např. detailní popis potíží v tabulce bookings nebo surové přepisy v blog\_posts) nebudou ukládány jako čistý text.
    
*   **Symetrické šifrování v Workeru:** Cloudflare Worker před zápisem do D1 zašifruje citlivé hodnoty pomocí standardu **AES-GCM (Web Crypto API)** s využitím klíče uloženého v bezpečném prostředí Cloudflare Secrets.
    
*   **Data Minimization:** Osobní údaje (jméno, telefon, email) a údaje o zdraví (poptávaná služba) jsou ukládány pouze po dobu nezbytně nutnou pro vyřízení rezervace a následně (např. po 30 dnech od návštěvy) automaticky anonymizovány pomocí Cron Triggeru.
    

### B. Vzor Informovaného souhlasu (Pro papírovou / digitální formu v ordinaci)

Při první návštěvě musí klient podepsat fyzický nebo digitální souhlas. Zde je iniciační text, který paní Lenka může použít:

> _"Souhlasím se zpracováním mých osobních údajů, včetně údajů o mém zdravotním stavu, pro účely vedení klientské karty a optimalizace biorezonanční péče Bicom Optima. Zpracování provádí Lenka Limpouchová (IČO: \[Doplnit\]). Beru na vědomí, že svá data mohu kdykoliv nechat smazat či exportovat."_

2\. Secrets & Credentials Security Blueprint (Bezpečný Handover)
----------------------------------------------------------------

Při vývoji budeme integrovat řadu API klíčů. Abychom zachovali standardy _Meverik Studio (2026)_ a ochránili klientská data, nesmí se žádný tajný klíč dostat do repozitáře na GitHubu.

### A. Správa klíčů v Cloudflare Environment

Všechny tokeny budeme spravovat výhradně přes **Cloudflare Secrets** v produkčním prostředí.

**Název Secretu (CF)**

**Účel**

**Zdroj / Poskytovatel**

GOOGLE\_CALENDAR\_CLIENT\_EMAIL

Klientský e-mail pro Google Service Account

Google Cloud Console

GOOGLE\_CALENDAR\_PRIVATE\_KEY

Privátní šifrovací klíč pro OAuth2

Google Cloud Console

RESEND\_API\_KEY

Odesílání transakčních e-mailů s instrukcemi

Resend.com

META\_GRAPH\_ACCESS\_TOKEN

Dlouhodobý token pro synchronizaci Instagramu

Facebook Developer Portal

SMS\_GATEWAY\_API\_KEY

Odesílání upomínkových SMS 24h předem

GoSMS / SMS.sluzba.cz

ENCRYPTION\_KEY

Symetrický klíč pro šifrování dat v D1

Vygenerovaný bezpečný hash

### B. Lokální vývoj (.dev.vars)

Pro lokální testování ve VS Code přes Wrangler použijeme soubor .dev.vars (který je striktně zapsán v .gitignore):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   # Ukázka lokálního nastavení - NIKDY NECOMMITOVAT NA GITHUB  GOOGLE_CALENDAR_CLIENT_EMAIL="service-account@bicom-pisek.iam.gserviceaccount.com"  GOOGLE_CALENDAR_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."  RESEND_API_KEY="re_123456789"   `

3\. Uživatelský "Playbook" pro paní Lenku (Provozní manuál)
-----------------------------------------------------------

Abychom eliminovali technickou bariéru u klientky, administrace webu bude fungovat na principech, které již zná (ovládání profilu na sociálních sítích).

### A. Jak obsluhovat AI Copywritera (Hlasový přepis)

1.  **Záznam:** Paní Lenka si po úspěšné terapii otevře diktafon v mobilním telefonu a namluví krátkou hlasovou zprávu (např. o úspěšném odvykání kouření, bez jmenování klienta).
    
2.  **Přepis:** Využije vestavěný převod řeči na text v mobilní klávesnici a vloží text do políčka v administraci webu.
    
3.  **Generování:** Klikne na _"Generovat článek"_. **Cloudflare Workers AI** zpracuje text, vytvoří titulek, sémanticky optimalizuje obsah pro GEO/SEO a navrhne hashtagy pro případné sdílení.
    
4.  **Zveřejnění:** Klikne na _"Zveřejnit"_ a článek je okamžitě online.
    

### B. Správa rezervací v Google Kalendáři

*   Paní Lenka nemusí otevírat administraci webu, aby věděla, kdo se objednal.
    
*   Nová poptávka se zapíše do jejího **Google Kalendáře** jako světle žlutá (předběžná) událost.
    
*   Jakmile v kalendáři změní barvu události na zelenou (potvrzeno), webhook z Google Calendar API upozorní náš Cloudflare Worker, který automaticky odešle klientovi potvrzení a naplánuje odeslání upomínkové SMS.
    

🤖 Systémový Prompt pro implementaci šifrování v D1 (Crypto Web API)
--------------------------------------------------------------------

_Tento prompt předej svému AI agentovi ve VS Code pro naprogramování bezpečné šifrovací vrstvy._

Napiš JavaScriptovou třídu (DataCrypt) pro Cloudflare Workers s využitím Web Crypto API.
Třída musí obsahovat dvě asynchronní metody:
1. encryptText(plainText, keyHex): Přijme čistý text, zašifruje ho pomocí algoritmu AES-GCM (256-bit) s vygenerovaným IV (Initialization Vector) a vrátí Base64 řetězec obsahující zašifrovaná data i IV.
2. decryptText(cipherTextBase64, keyHex): Přijme zašifrovaný Base64 řetězec, dešifruje ho zpět na čistý text.
Kód musí být optimalizovaný pro prostředí Cloudflare Workers (bez závislostí na Node.js crypto modulu) a ošetřovat chybové stavy.

