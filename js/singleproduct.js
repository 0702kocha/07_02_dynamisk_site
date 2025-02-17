const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".product_container");
const reviewContainer = document.querySelector(".review_container");
let currentProductData;

// Fetch product data
fetch(`https://dummyjson.com/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    currentProductData = data;
    showProduct(data);
    showReviews(data.reviews);
  });

function showProduct(data) {
  // Produkt info
  let html = /*html*/ `<div class="grid_pic_text">
      <img
        class="product_pic"
        src="${data.images[1] || data.images[0]}"
        alt="Picture of ${data.title}"
      />
      <div class="product_info">
        <h2 class="product_titel">${data.title}</h2>
        <p>${data.brand}</p>
        <p
          class="price ${
            data.discountPercentage > 0 ? "discount-price IsOnSale" : ""
          }"
        >
          $${data.price}
        </p>
        ${
          data.discountPercentage > 0
            ? `<p class="discount-price IsOnSale">Now ${
                Math.floor(
                  (data.price * (1 - data.discountPercentage / 100)) / 0.5
                ) * 0.5
              } $</p>`
            : ""
        }
        <button class="basket_button">Add to basket</button>
      </div>
      <div class="description_info">
        <h2>Description</h2>
        <p>${data.description}</p>
      </div>
    </div>
    <div class="divider"></div>
    <img
      id="divider_768px"
      src="assets/img/greenLineNoText.svg"
      alt="Green Path"
    />
    <h3>Reviews</h3>`;
  productContainer.innerHTML = html;
}
function showReviews(reviews) {
  let html = "";

  // Tilføj reviews fra API data
  reviews.forEach((review) => {
    let starImage =
      '<img src="assets/img/Iconer/star.svg" alt="star" class="star-icon">'.repeat(
        review.rating
      );
    html += /*html*/ `
      <div>
        <div class="review-header">
          <div class="rating">${starImage}</div>
          <p class="reviewer-name">${review.reviewerName}</p>
          <p class="review-comment">${review.comment}</p>
          <p class="review-date">
            ${new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    `;
  });

  reviewContainer.innerHTML = html;
}
