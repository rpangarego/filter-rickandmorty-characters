document.addEventListener("DOMContentLoaded", () => {
  //SELECTORS & VARIABLES
  const filterButtons = document.querySelectorAll(".filter-btn");
  let cards = null;
  const searchInput = document.querySelector("input.search-input");
  const cardWrapper = document.querySelector(".card-wrapper");

  // ADD EVENT LISTENER
  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    cards.forEach((card) => {
      const characterName = card.dataset.name.toLowerCase();

      if (characterName.includes(searchText)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

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
        const characterStatus = card.dataset.status.toLowerCase();

        if (status === "All") {
          card.style.display = "block";
          return;
        }

        if (status.toLowerCase() === characterStatus) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Functions
  function renderCards(characters) {
    let items = "";

    characters.forEach((character) => {
      items += `<div class="card" data-status="${character.status.toLowerCase()}" data-name="${
        character.name
      }">
      <img src="${character.image}" alt="" class="card-img" />
      <div class="card-info">
        <span class="badge">${character.status}</span>
        <h3>${character.name}</h3>
        <p>${character.origin.name}</p>
      </div>
    </div>`;
    });

    cardWrapper.innerHTML = items;
    cards = document.querySelectorAll(".card");
  }

  // Fetch data from API
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((result) => renderCards(result.results))
    .catch((error) => console.error(error));
});
