// Her henter vi kategorien via URL'en, så vi kan bruge eks ?category=beauty
const mycategory = new URLSearchParams(window.location.search).get("category");

// Finder de html elementer der skal bruges i js
const ListContainer = document.querySelector(".product_list_container");
const overskrift = document.querySelector("h1")

// Sørger for at vores overskrift viser den valgte kategori
overskrift.innerHTML = mycategory;

// Henter api dataen
fetch(`https://dummyjson.com/products`)
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
          <img
            src="${product.images[1] || product.images[0]}"
            alt="Billede af produkt"
          />
        </div>
        <div>
          <h3 class="productdisplayname">${product.title}</h3>
          <p class="brandname">${product.brand}</p>
          <h4 class="price">${product.price} $</h4>
          <div class="button">
            <a href="produkt.html?id=${product.id}">Read More</a>
          </div>
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




