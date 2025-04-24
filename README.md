# 📸 visora Website


## 🧠 Over dit project

Voor deze opdracht heb ik een webapplicatie gebouwd die gebruikmaakt van de [Unsplash API](https://unsplash.com/developers) om afbeeldingen op te halen.  
De applicatie is geïnspireerd op Pinterest, waarbij gebruikers door afbeeldingen kunnen bladeren, deze kunnen liken en opslaan op een persoonlijke pagina.


## WEEK 1

[x] orienteren welke content API te gebruiken is (gratis)
[x] wat voor soort website wil ik maken?
[ ] welke Web APIs wil ik gebruiken?

### ideeen:
hi ik wil voor dit vak een eigen social media app gaan maken en ik zit te kijken naar:

- Pinterest API
- Instagram API
- Fake user API + PEXELS API

ik wilde met de PEXELS api werken, maar daar had ik geen toegang voor gebruikers, dus heb uiteindelijk gekozen voor unsplash

Dit concept is goed gekeurd, alleen vinden Cyd en Declan het een saai project, want instagram is helemaal niet interessant om te maken. 

## schets
 
 ik heb eerst instagram nagemaakt en op pinterest en dribbble gekeken wat beter kon want instagram op desktop is niet al te best. 
 dit zijn mijn eerste schermen: 
 
<img height="300" alt="Screenshot 2025-04-24 at 12 53 22" src="https://github.com/user-attachments/assets/021ca37a-ab4a-4d3f-91cc-5109ba2f49ab" />
<img height="300" alt="Screenshot 2025-04-24 at 12 53 31" src="https://github.com/user-attachments/assets/74d0c9ca-517f-4303-93b9-decbfb9a35b5" />


## feedback:

Cyd raadde aan om een overzicht te maken met alle fotos, en met een dialog kunnen openen met meer informatie om vervolgens naar een detail pagina te kunnen. Daarnaast meer tags toevoegen die van te foto van toepassing zijn voor meer informatie.

## reflectie
Ik heb nog niet veel gedaan, dus ik kan niet echt goed reflecteren op deze week, ik was deze week gewoon vooral aan het orienteren en kijken of het lukte met de API. ik heb geen enkele ervaring met APIs dus ik vind zelf dat ik het goed heb gedaan, met hun van Cyd en het ook echt aan de praat heb kunnen krijgen en het ook snapte hoe de route vanuit de api naar het liquid bestand. 

## WEEK 2

[x] overzichtspagina maken
[x] dialogs toevoegen op elke foto
[ ] welke Web APIs wil ik gebruiken?
[x] detail pagina maken/ profiel pagina

## wat heb ik gedaan deze week?
Deze week heb ik gewerkt aan het helemaal veranderen van mijn eerste schets. Ik heb het logo gemaakt, en daarmee mijn website 'officieel' gemaakt. daarna heb ik de 1 voor 1 foto overzicht een overzicht gemaakt van de standaard 10 fotos die je krijgt vanuit de API. ik wilde dat veranderen naar oneindig, maar dat is neit gelukt. De max was 30 dus heb het nu bij 30 gehouden. als Feedback van vorige week had ik gekregen om ook dialogs/ popovers te gaan maken voor elke foto om de foto zo groot mogelijk te zien en meer informatie er over te krijgen.

op de dialog heb ik ook een p gemaakt met de kleur code van de foto, wat ik eigenlijk best gaaf vind. ik wilde eerst de achtergrond van de dialog maken als die kleur, maar dat vond ik niet mooi, dus heb een soort tekst vlakje met de kleur gemaakt!

<img width="1000" alt="Screenshot 2025-04-24 at 12 08 56" src="https://github.com/user-attachments/assets/525ffb6b-37ce-4594-ba66-6e52953692de" />

toen dat af was ben ik begonnen aan de detail pagina. ik heb deze week vooral gefocused op de styling en nog niet aan de. Web APIs. 

## feedback:
Ik kreeg deze week feedback van Declan en die had nog mijn idee niet gezien en hij zei dat hij het er goed uit vond zien en dus neit meer over de styling na hoefde te denken en nu vooral bezig moet zijn met de APIs. ik vertelde dat ik geen idee had wat voor apis ik kon gebruiken dat nuttig waren, naast misschien animatie op een pagina of van het wisselen van paginas. 

hij zei dat het handig was om misschien, omdat ik zei dat ik de fotos willen kunnen liken, local storage te gebruiken en dan alles op een andere pagina op te slaan. Maar dus lokaal en echt alleen voor de gebruiker die in die browser aan het gebruiken is. 

## reflectie week2 

ik heb gemerkt dat ik het moeilijk vond om met web APIs te werken, waardoor ik dus vooral aan css heb gezeten om het mooi te maken. ik denk dat het wel verstandiger was geweest om al te beginnen aan de APIs, omdat ik dan straks een probleem krijg. maar ik ga meteen aan de slag met de local storage, want Declan zei dat hij me wel zou helpen. Deze week vond ik wel heel leuk, want ht nu wel op een echte website begint te lijken met een werkende Content API. 


## WEEK 3

[x] local storage
[x] favorieten pagina maken
[ ] wat is mijn tweede API?

## wat heb ik gedaan deze week?
ik ben begonnen met mijn APIs te gebruiken, en local storage werkte bijna meteen en meteen gelinkt aan de favorieten pagina. ik kreeg in het begin wel dat de eerste li item op favorieten pagina leeg bleef en ik snapte niet wat ik verkeerd deed en heb ik samen met een klasgenoot er aan gezeten en allerlei dingen geprobeerd en daarna volgens mij weer gecommand z, en toen deed hij het wel.....

met deze code : '{% if likes.size > 0 %}'
deze week heb ik een paar dingen toegevoegd aan mijn paginas (tekst en styling). 


Ook begon ik met een animation api, maar die werkte niet hoe ik dat wilde omdat de img van de dilog ging van de foto in het overzicht naar groter en daarna kwam pas de dialog tevoorschijn en het snapte raar dus ik heb die weer verwijderd. 



## feedback:
deze week had ik weer Cyd, en zij vond dat het er goed uit zag en misschien het hartje naar de favorieten kan animeren voor de web api. bij de dialog zei ze ook dat ik het duidelijk moest maken dat je er op kon klikken om naar de profiel pagina te gaan. 

ze zei ook over de kleur van de foto om die te maken naar de dialog en ik vertelde haar dat ik het eigenlijk helemaal neit mooi vond, omdat het zo heftig was en niet helemaal paste bij de paarse kleur ik gebruik. toen zei ze dat ik ook color-mix kan doen en dus kan mixen. 

<img width="1000" alt="Screenshot 2025-04-24 at 12 11 17" src="https://github.com/user-attachments/assets/2c4f1067-92c6-4822-b805-cc3b66475095" />


## reflectie

deze week was wel moeilijk, omdat ik dus was begonnen met mijn web APIs. en de local storage werkte wel goed gelukkig en had ik geen problemen mee, maar met de animation API werkte het niet helemaal hoe ik het wilde en werd ik beetje gedemotiveerd en schuifte ik het naar week4. 

Daarnaast had ik ook moeite met het kunnen verwijderen van de favorieten in mijn favorieten pagina.


## WEEK 4

[x] animation API
[x] puntjes op de i zetten

## wat heb ik gedaan deze week?
deze week begon ik eerst aan mijn favoreiten pagina, want ik kon hem nog niet unliken en dat hij dan word verwijderd. blijkbaar was mijn javascript niet goed gekoppeld omdat hij een querySelector niet kon vinden. dat had ik gefixt en toen begon ik met mijn web api. 

met Declan heb ik gekeken of ik de foto in de button groter kan worden en dan in mijn dialog te zien krijgt. maar het clonen werd heel lastig/ het kon gewoon niet dus nu heb ik een basic  transition er in gestopt wat je eigenlijk niet kan zien, maar toch fijner is dat hij er is. 

ik zat te kijken wat ik wilde voor animatie, want ik vond eigenlijk alle animatie die ik kon bedenken onnodig. 

ik zag een animatie over het verwijderen van cards, en ik vond dat wel interessant voor mijn liked pagina
link: https://developer.chrome.com/docs/web-platform/view-transitions

ik kon niet vinden hoe zij dit deden dus heb chatGPT gevraagd en hij gaf me deze code:

<img width="500" alt="Screenshot 2025-04-24 at 12 25 12" src="https://github.com/user-attachments/assets/5e005738-87f0-4ff4-aa38-f1115ea2e37b" />



## feedback:
- eind gesprek


## reflectie

we hadden maar 1 dag voor het eindgesprek en ik had een druk weekend waardoor ik niks in het weekend heb gedaan. 

Ik vind persoonlijk dat ik wel meer had kunnen doen voor de animation API, want het is niet veel. Maar door tijdsgebrek vind ik dat ik een goede website heb kunnen neerzetten waar ik trots op ben


wat ik nog had kunnen doen met meer tijd:

* meer animatie tussen de popover en tussen paginas in.
* animatie tussen het scrollen van fotos en misschien infinite scrolling?
* kijken of ik ook een eigen account kon maken dus dat je zelf kan inloggen
* van favorieten naar de gesaved pagina gaan.
* finetunenn
