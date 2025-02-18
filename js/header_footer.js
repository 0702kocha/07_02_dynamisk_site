document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const burgerToggle = document.getElementById("burger-toggle");
  
    // Når brugeren klikker på burger-menuen
    burgerToggle.addEventListener("change", function () {
      if (this.checked) {
        header.classList.add("menu-open");
      } else {
        header.classList.remove("menu-open");
      }
    });
  
    // Gør også at header får baggrund når man scroller
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  });
