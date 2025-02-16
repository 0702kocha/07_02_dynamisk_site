# Teknisk dokumentation for Tema 7 gruppeprojekt

Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:

Beslut, hvordan I vil organisere jeres projekt – struktur for mapper og filer.

- Hvordan organiserer I billeder, fonte og andre ressourcer?
- Hvor placerer I boilerplate?(fx CSS- og JavaScript-filer, der bruges på tværs af projektet)
- Hvor placerer I HTML, CSS- og JavaScript-filer til fx detaljevisning og listevisning?

Vi har lavet en mappestruktur hvor alle HTML filer ligger i grundmappen. CSS og Javascript har hver fået sin egen mappe, for bedre at kunne holde styr på disse. Da vi arbejder hver for sig og har flere CSS og Javascript filer, er det rart at have et overblik og en ordenlig mappestruktur til at holde orden i det hele.
Derudover har vi oprettet en assets mappe, hvor alle relevante billeder, ikoner, faviconer og fonter ligger, således at dette også er hold så overskueligt som muligt.

## Navngivning:

Beslutte hvordan i vil navngive filer og mapper for at sikre en ensartet struktur og undgå forvirring.

- Hvordan navngiver I filnavne? (fx små bogstaver, ingen mellemrum, brug af - eller \_)
- Hvordan sikre I at det er til at forstå hvilke HTML-, CSS- og JavaScript-filer der høre sammen?

Vi benytter kun små bogstaver og har navngivet vores HTML, CSS og Javascript de samme navne, med undtagelse af endelsen som defineres af hvilken slags fil det er, så man tydeligt kan se hvilke der hænger sammen, og hvilke vi hver i ser arbejder i.

## Link til scripts:

- Hvor placerer I script referencer i HTML'en? (fx i <head> med defer attribute, eller sidst i <body>)

Vi ligger den alle i bunden, som vi først har lært.

## Git branches:

- Hvordan navngiver I branches, så alle kan forstår hvem der arbejder i branchen og på hvad?(fx feature-lotte-formular)

Vi har sørget for at navne give det som branchena arbejder på, samt navn, således man har overblik over hvilken person den høre til.

## Arbejdsflow:

- Hvordan fordeler I arbejdet, så I undgår at flere arbejder i de samme filer samtidigt?
- Hvordan sikrer I, at commit-beskeder er beskrivende?
- Hvordan kommunikerer i om ændringer i main branchen når feature merges?

Vi har hver især arbejdet på forskellige aspekter af siden. En har arbejdet på index.html, en på productlist.html, en på singleproduct.html og en på header_footer.html. Derudover har folk også arbejdet med deres egen css og js, således at vi ikke kom til at arbejde oven i hinandens.

## Kode:

- Hvordan skriver i funktioner i JavaScript?(fx med function keyword eller som arrow functions)
- Beslut hvilken CSS selector i benyttes til referener i henholdsvis CSS og JavaScript(fx. id'er til JavaScript og Classes til CSS)
- Skal filer have korte forklaringer som kommentarer?

# Funktionalitet

Dette afsnit skal forklare hvad I konkret har arbejde med, for at udvikle websitet. Tænk over hvilke interaktioner brugeren kan foretage på sitet? Eller hvordan websitet håndterer og præsenterer data? Eksempler på funktionalitet, der kan beskrives:

- Hentning af produkter fra API.
- Filtrering af produkter baseret på brugerens valg.
- Dynamisk visning af produkter i HTML.

Brug korte beskrivelser, som i eksemplerne herover

- Hentning af produkter fra API
- Filtrering ud fra pris (hvis vi når at få det til at fungere)
- dynamisk visning af produkter i HTML

# API endpoints

Dette afsnit skal liste de endpoints fra API'et i har benyttet:

- (fx. https://dummyjson.com/products)

- https://dummyjson.com/products?category=${mycategory}

# Dokumentation af Funktion

Dette afsnit skal beskrive en funktion I selv har udviklet. Det kunne eksempelvis være en funktion der generere en listen over fx. produkter:

- Beskrivelse: Hvad gør funktionen? Hvordan spiller den sammen med resten af koden?
- Parametre: Hvilke input forventes (fx en værdi fra en dropdown eller URL'en)?
- Returnerer: Beskriv, om funktionen returnerer en værdi eller blot manipulerer DOM’en.
- Eksempel på brug: Indsæt funktions-koden herunder(der hvor koden er i eksemplet) og vis, hvordan funktionen kaldes:

```javascript
//funktionens kode:
function voresFunktion(sprog) {
  console.log(`${sprog} syntax highlighting`);
}
//hvordan funktionen kaldes:
voresFunktion("JavaScript");
```

Funktionen henter en liste af produkter fra en API (et eksternt websted), baseret på den kategori, der er valgt i URL'en. Den viser produkterne på en webside, så brugeren kan se billeder, priser og rabatter. Koden sørger for, at produkterne vises på siden automatisk.

Funktionen returnerer ikke noget. Den opdaterer bare siden ved at vise produkterne i en liste.

category: Dette er den kategori, som vi henter fra URL'en. For eksempel kan URL'en se sådan ud: ?category=beauty. Denne værdi bruges til at hente de rigtige produkter fra API'et.

// Her henter vi kategorien via URL'en, så vi kan bruge eks ?category=beauty
const mycategory = new URLSearchParams(window.location.search).get("category");

// Finder de html elementer der skal bruges i js
const ListContainer = document.querySelector(".product_list_container");
const overskrift = document.querySelector("h1");

// Sørger for at vores overskrift viser den valgte kategori
overskrift.innerHTML = mycategory;

// Henter api dataen
fetch(`https://dummyjson.com/products?category=${mycategory}`)
.then((response) => response.json())
.then(showProducts);

function showProducts(data) {
console.log(data);

// Laver html til hvert enkelt produkt
const markup = data.products
.map(
(product) => `

        <article class="product_container">

          <div class="image-container">
          <a href="singleproduct.html?id=${product.id}" class="product_link">
            <img
              src="${product.images[1] || product.images[0]}"
              alt="Billede af produkt"
            />
           <p class="discount ${
             product.discountPercentage > 0 && "IsOnSale"
           }">-${product.discountPercentage}%</p>
            <p class="sold-out ${
              product.stock <= 0 && "IsSoldOut"
            }">Sold Out</p>

            </a>
          </div>
          <div>
            <a href="singleproduct.html?id=${product.id}" class="product_link">
            <h3 class="productdisplayname">${product.title}</h3>
            <p class="brandname">${product.brand}</p>

   <p class="price ${
     product.discountPercentage > 0 ? "discount-price IsOnSale" : ""
   }">${product.price} $</p>
            ${
              product.discountPercentage > 0
                ? `<p class="discount-price IsOnSale">Now ${Math.round(
                    product.price * (1 - product.discountPercentage / 100)
                  )} $</p>`
                : ""
            }
       
            </a>
          </div>
        </article>
  
      `
    )
    .join("");

// Logger den færdige HTML så vi kan se hvad der bliver sat ind
console.log(markup);
// Indsætter det i det færdige html i elementet
ListContainer.innerHTML = markup;
}
