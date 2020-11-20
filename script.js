//SELECTORS & VARIABLES
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

// ADD EVENT LISTENER
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const status = e.target.textContent;

    // hapus 'active' class di semua button
    filterButtons.forEach((button) => {
      button.classList.remove("active");

      // menambahkan 'active' class dibutton yg diklik
      if (status === button.textContent) {
        button.classList.add("active");
      }
    });

    // manipulasi card (show/hide)
    cards.forEach((card) => {
      const characterStatus = card.children[1].children[0].textContent;

      if (status === "All") {
        card.style.display = "block";
        return;
      }

      if (status === characterStatus) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
