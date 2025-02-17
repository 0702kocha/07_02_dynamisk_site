// Her henter vi kategorien via URL'en, så vi kan bruge eks ?category=beauty
const mycategory = new URLSearchParams(window.location.search).get("category");

// Finder de html elementer der skal bruges i js
const ListContainer = document.querySelector(".product_list_container");
const overskrift = document.querySelector("h1");

// Sørger for at vores overskrift viser den valgte kategori
overskrift.innerHTML = mycategory;

// Henter api dataen
fetch(`https://dummyjson.com/products/category/${mycategory}`)
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
           <p class="discount ${product.discountPercentage > 0 && "IsOnSale"}">
  -${Math.ceil(product.discountPercentage)}%
</p>
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
   ${product.discountPercentage > 0 
    ? `<p class="discount-price IsOnSale">Now ${Math.floor((product.price * (1 - product.discountPercentage / 100)) / 0.5) * 0.5} $</p>` 
    : ""}

       
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


// FILTER FUNKTION

const filterSelect = document.querySelector(".filter");

filterSelect.addEventListener("change", function() {
    fetch(`https://dummyjson.com/products?category=${mycategory}`)
        .then((response) => response.json())
        .then((data) => {
            let filteredProducts = [...data.products];

            switch(this.value) {
                case "low-to-high":
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case "high-to-low":
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case "under-10":
                    filteredProducts = filteredProducts.filter(product => product.price < 10);
                    break;
            }
            
            showProducts({products: filteredProducts});
        });
});