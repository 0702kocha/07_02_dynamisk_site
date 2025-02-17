const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".product_container");
fetch(`https://dummyjson.com/products/${productId}`)
  .then((Response) => Response.json())
  .then(showProduct);

function showProduct(data) {
  productContainer.innerHTML = ` <div class="grid_pic_text">
          <img
            class="product_pic"
            src="https://dummyjson.com/products/${productId}"
            alt="Picture of product"
          />

          <div class="product_info">
            <h2 class="product_titel">${product.titel}</h2>
            <p>${product.brand}</p>
            <p>${product.price}</p>
            <button class="basket_button">Add to basket</button>
          </div>

          <div class="description_info">
            <h2>Description</h2>
            <p>
            ${product.description}
            </p>
          </div>
        </div>
        <div class="divider"></div>
        <div class="divider_768px">
          <img src="assets/img/greenLineNoText.svg" alt="Green Path" />
        </div>
        <h3>Reviews</h3>
        <div class="review">
          <p>${product.reviewerName}</p>
          <p>${product.comment}</p>
          <p>${product.rating}</p>
        </div>`;
}
