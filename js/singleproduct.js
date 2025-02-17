const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector(".product_container");
let currentProductData;

// Fetch product data
fetch(`https://dummyjson.com/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    currentProductData = data;
    showProduct(data);
  });

function showProduct(data) {
  // Produkt info
  let html = `
        <div class="grid_pic_text">
            <img
                class="product_pic"
                src="${data.images[1] || data.images[0]}"
                alt="Picture of ${data.title}"
            />
            <div class="product_info">
                <h2 class="product_titel">${data.title}</h2>
                <p>${data.brand}</p>
                <p>$${data.price}</p>
                <button class="basket_button">Add to basket</button>
            </div>
            <div class="description_info">
                <h2>Description</h2>
                <p>${data.description}</p>
            </div>
        </div>
        <div class="divider"></div>
            <img class=class="divider_768px" src="assets/img/greenLineNoText.svg" alt="Green Path" />
        
        <h3>Reviews</h3>`;

  // Tilføj reviews fra API data
  data.reviews.forEach((review) => {
    let starImage =
      '<img src="assets/img/Iconer/star.svg" alt="star" class="star-icon">'.repeat(
        review.rating
      );
    html += `
            <div class="review">
                <div class="review-header">
                <div class="rating">${"⭐".repeat(review.rating)}</div>
                    <p class="reviewer-name">${review.reviewerName}</p>
                <p class="review-comment">${review.comment}</p>
                <p class="review-date">${new Date(
                  review.date
                ).toLocaleDateString()}</p>
            </div>
        `;
  });

  // Tilføj review form
  html += `
        <div class="add-review">
            <h4>Add a Review</h4>
            <form id="reviewForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="rating">Rating:</label>
                    <select id="rating" required>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="comment">Comment:</label>
                    <textarea id="comment" required></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    `;

  productContainer.innerHTML = html;
}
