# PROJECT_CONTEXT.md

## Formål

Dette er John Michael Mauseths personlige porteføljenettsted. Det skal supplere CV og LinkedIn og vise hvordan han kobler digital markedsføring, analyse, strategi, UX, produktutvikling og grunnleggende webutvikling.

Målet er ikke å fremstille eieren som en erfaren utvikler. Porteføljen skal vise praktisk teknisk forståelse, gode brukerreiser og evne til å videreutvikle konsepter på en troverdig måte.

Norsk er hovedspråket. En gjennomarbeidet engelsk versjon kan lages senere når norsk innhold er stabilt.

## Retning og nåværende portefølje

Uttrykket er rolig, redaksjonelt, profesjonelt og bevisdrevet. Behold luft når den gir fokus, og prioriter prosjektmateriale og fungerende interaksjoner fremfor dekorasjon.

Forsiden `index.html` er responsiv og inneholder:

- kort introduksjon
- nummerert prosjektoversikt
- GG-BOX og CommuniGreen som visuelle hovedcaser
- en foreløpig, ikke-klikkbar oppføring for Analyse og strategi
- Om meg og kontakt
- lys og mørk modus

Ikke gjør en større redesign eller erstatt hovedcasene med en ren prosjektliste uten å avklare det først.

`analyse-strategi.html` er opprettet som et internt arbeidsgrunnlag, men er foreløpig ikke tilgjengelig via prosjekt 03 på forsiden. Oppføringen er merket «Kommer senere» frem til dokumenterte prosjektdata er valgt. Mulige senere arbeider er SATS, The Broth Company og bachelorarbeid. Ikke dikt opp innhold eller publiser konfidensiell informasjon.

## GG-BOX

### Bakgrunn og kreditering

GG-BOX startet som et studentgruppeprosjekt med to personer i 2024. Brukerens dokumenterte bidrag omfatter analyse, strategi/skriftlig arbeid og brukertesting. Den opprinnelige Figma-prototypen var et samarbeid, og det tekniske/visuelle Figma-arbeidet ble utført av medstudenten. Brukeren har tillatelse til å videreutvikle konseptet.

Den kodede løsningen fra 2026 er brukerens selvstendige tekniske videreutvikling. Den skal omtales som en demo eller demonstrasjon, aldri som en ekte butikk eller virksomhet.

### Case

`gg-box.html` er en ferdig, responsiv caseside med:

- bakgrunn, målgruppe og korrekt rollefordeling
- analyse, strategi, prosess og brukertesting
- Figma-materiale og lenke til den opprinnelige prototypen
- egen læringsseksjon som skiller studentprosjektet fra 2026-videreutviklingen
- lenke til den kodede demoen
- tre prosjektfakta med tydelige ikoner

Et mer illustrert bakgrunnsdesign for caseheroen ble vurdert, men satt på pause. Ikke gjenoppta dette uten at brukeren ber om det.

### Kodet demo

GG-BOX-demoen er nå funksjonelt sammenhengende og består av:

- `gg-box-demo.html`: produkter, favoritter, handlekurv, mengder og nyhetsbrevdemonstrasjon
- `gg-box-favorites.html`: lagrede favoritter og legg i kurv
- `gg-box-account.html`: fiktiv konto, bestillingshistorikk, innstillinger, FAQ/hjelp og lokal dataoversikt
- `gg-box-checkout.html`: fiktiv levering, betalingsvalg og ordreoversikt
- `gg-box-order.html`: ordredetaljer og simulert leveringsstatus
- `gg-box-privacy.html`: vilkår, personvern, informasjonskapsler, rettigheter og lokale preferanser

Handlekurv, favoritter, bestillinger, status og preferanser lagres bare i `localStorage`. Ingen ekte betaling, innlogging, e-post, kundedata eller serverkommunikasjon brukes.

Alle butikksidene har:

- felles «Globale Goodies»-logo fra lokal PNG
- oransje hovedheader
- hjemknapp til butikkforsiden
- relevante konto- og handlekurvikoner
- en metastripe med tilbake-lenke til GG-BOX-casen og «Demo · 2026»
- konsistent footer: «Studentkonsept fra 2024, videreutviklet i 2026» og ikke-klikkbar kreditering

Bruk «demo» i korte etiketter og «demonstrasjon» i løpende tekst. Den eldre termen «porteføljedemo» er fjernet fra nettstedet.

### Semantisk fargesystem

Fargene skal bestemmes av funksjon, ikke av side. De delte variablene ligger i `gg-box-header.css`, som lastes på alle butikksidene.

- hovedbakgrunn: `#FFFDFB` / mørk `#171515`
- varm krem og footer: `#FFF3ED` / mørk `#171515`
- metastripe, sekundær navigasjon og informasjonspaneler: fersken `#F3DDD2` / kakao `#241E1B`
- hovedheader og handlinger: oransje `#E9784A`
- hovedtekst: `#1F1A18` / mørk `#F7F0ED`
- kantlinjer: `#EADBD4` / mørk `#4B4541`

Dette gjelder blant annet landmeny, personvernmeny, produktbilder, favorittpaneler, bestillinger, checkout, ordrestatus og handlekurv. Produktkortene skifter til hvit bakgrunn ved produktteksten. Ikke innfør sidevise avvik uten en tydelig funksjonell grunn.

## CommuniGreen

### Bakgrunn og kreditering

CommuniGreen er et student-/Figma-konsept fra 2023. Brukeren hadde ansvar for idéutvikling, planlegging, testopplegg, brukertesting og skriftlig dokumentasjon. Den opprinnelige Figma-prototypen ble utformet av en medstudent, og brukeren har tillatelse til å videreutvikle konseptet.

### Case og demo

`communigreen.html` er en responsiv caseside med korrekt rollefordeling, prosess, innsikt, læring, prosjektfakta med ikoner og lenker til Figma og kodet demo.

`communigreen-demo.html`, `communigreen-demo.css` og `communigreen-demo.js` utgjør en mobilorientert webdemo. Visuell stil er etablert og skal beholdes. Versjon 1.1 er funksjonelt ferdig før ekstern brukertesting og inneholder:

- fiktive aktiviteter, filtrering og detaljvisning
- lagring av aktiviteter og tomtilstander
- funksjonell kalender med datovalg og månedsbytte
- forum med søk, kategorier, detaljer og reaksjoner
- oppretting og sletting av egne lokale innlegg og kommentarer
- valgfri kalenderdato på nye foruminnlegg
- profil med lagrede aktiviteter og lokale innstillinger
- fire fiktive, handlingsbaserte utmerkelser
- lokal personvern-/demodatavisning, lesbar dataoversikt og nullstilling
- statisk hjelpesenter
- lys/mørk modus og større tekst

Faste eksempelinnlegg kan ikke slettes. Alt innhold er fiktivt, og brukerdata lagres bare lokalt i nettleseren. Det finnes ingen konto, database, e-postutsending eller ekte persondata.

Hovedflytene er kontrollert ved 320 og 390 piksler, med omlasting, mørk modus, større tekst og tastaturfokus. Ingen JavaScript-feil ble funnet. Fullstendig nullstilling av CommuniGreen-data er også prøvd manuelt via Live Server.

Frivillig.no kan brukes som inspirasjon for aktivitetstyper, men innhold eller data skal ikke kopieres eller kobles inn uten avklart tillatelse og bruksvilkår.

## Viktige designbeslutninger

- Behold den nåværende visuelle retningen; ingen generell redesign er planlagt.
- GG-BOX og CommuniGreen beholder egne fargeidentiteter.
- Lys og mørk modus skal oppleves som samme design.
- Mobilvisning er viktig; unngå layoutendring ved hover.
- På forsiden er hele «CommuniGreen» hvit i hvile. Bare «Green» blir `#2F7049` ved hover eller tastaturfokus.
- Synlige bindestreker unngås i løpende tekst og etiketter, med unntak av prosjektnavnet «GG-BOX».
- Bruk små, funksjonelle overganger. Unngå overdreven animasjon.
- Bruk eksisterende lokale bilder og ikoner før nye dekorative elementer opprettes.

Porteføljesidene er kontrollert i Chromium og representativt i Firefox på mobil og desktop. CSS har tekstskalerings- og visningshøydehensyn for Safari/iOS, men en fysisk sluttkontroll i Safari på Mac eller iPhone gjenstår.

## Teknisk struktur

Prosjektet bruker kun:

- HTML
- CSS
- vanilla JavaScript
- lokale bilder
- `localStorage` for avgrenset demotilstand
- Live Server for lokal testing
- Git/GitHub Desktop for versjonshistorikk og flytting mellom maskiner

Viktige filer:

- `index.html`: forside med intern CSS
- `script.js`: delt temalogikk for porteføljesidene
- `gg-box.html` + `gg-box-case.css`: GG-BOX-case
- `gg-box-*.html/css/js`: GG-BOX-butikk og undersider
- `gg-box-header.css`: delt header og semantiske butikkfarger
- `gg-box-footer.css`: delt footer for checkout og ordre
- `communigreen.html` + `communigreen.css`: CommuniGreen-case
- `communigreen-demo.html/css/js`: CommuniGreen-demo
- `analyse-strategi.html/css`: foreløpig samleside

Ikke introduser rammeverk, npm-pakker, backend, database, ekte autentisering eller eksterne tjenester uten et nytt, uttrykkelig behov.

## Reelle neste steg

1. Gjennomfør fjernbrukertest av GG-BOX og/eller CommuniGreen og dokumenter konkrete funn.
2. Gjennomfør fysisk Safari-test når Mac eller iPhone er tilgjengelig.
3. Fullfør innholds- og lenkekontrollen før publisering.
4. Koble til og fyll `analyse-strategi.html` først når dokumentert prosjektinnhold er valgt.
5. Gjør senere språkvask, og vurder engelsk versjon eller profesjonelt portrett når norsk versjon er stabil.

GG-BOX og CommuniGreen trenger ikke nye funksjoner bare for å virke mer avanserte. Prioriter brukertesting, dokumentasjon og begrunnede forbedringer.

## Begrensninger og sannhetskilder

Ikke legg inn eller påstå:

- ekte betaling, abonnement, kontoer eller kundedata
- backend eller database uten nytt mål
- udokumenterte resultater, roller, datoer eller eierskap
- kopiert eller konfidensielt prosjektmateriale
- at Figma-prototypene ble laget alene av brukeren

Prioritet ved konflikt:

1. Nåværende kode i prosjektmappen.
2. Brukerens nyeste eksplisitte beslutning.
3. Denne filen.
4. Eldre samtalehistorikk.

Oppdater denne filen ved større milepæler, ikke etter hver mindre CSS-endring.
