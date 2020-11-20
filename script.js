document.addEventListener("DOMContentLoaded", () => {
  // SELECTORS & VARIABLES ====================
  const searchInput = document.querySelector("input.search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cardContainer = document.querySelector(".cards");
  const clearButton = document.querySelector(".clear-button");
  let cards = null;

  // FUNCTIONS ====================
  function addActiveClass(filterStatus) {
    filterButtons.forEach((button) => {
      button.classList.remove("active");

      if (button.dataset.filter === filterStatus) {
        button.classList.add("active");
      }
    });
  }

  function filterCards(filterStatus) {
    cards.forEach((card) => {
      if (filterStatus === "all") {
        card.style.display = "block";
        return;
      }

      if (card.dataset.status === filterStatus) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function searchByName(name) {
    cards.forEach((card) => {
      const characterName = card.children[1].children[1].textContent.toLowerCase();

      if (characterName.includes(name.toLowerCase())) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function renderCharacters(characters) {
    let items = "";

    characters.forEach((character) => {
      items += `<div class="card" data-status="${character.status.toLowerCase()}">
      <img src="${character.image}" alt="" class="card-image" />

      <div class="card-info">
        <p class="badge">${character.status}</p>
        <h3>${character.name}</h3>
        <p>${character.origin.name}</p>
      </div>
    </div>`;
    });

    cardContainer.innerHTML = items;
  }

  // EVENT LISTENERS ====================
  searchInput.addEventListener("input", (e) => {
    searchByName(searchInput.value);
    if (searchInput.value) {
      clearButton.style.display = "block";
    } else {
      clearButton.style.display = "none";
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      addActiveClass(button.dataset.filter);
      filterCards(button.dataset.filter);
      searchInput.value = "";
    });
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterCards("all");
    clearButton.style.display = "none";
  });

  // FETCH DATA FROM API ====================
  // mengambil data karakter dari API rickandmortyapi.com
  fetch("https://rickandmortyapi.com/api/character")
    // setelah mendapatkan data karakter dari rickandmortyapi.com
    // ubah response (data yg didapat) kedalam bentuk JSON agar nantinya data tsb dapat kita olah/pake
    .then((response) => response.json())
    /*setelah data diubah dalam bentuk JSON. kita render karakter tersebut
     kedalam tag html agar tampil dibrowser, dengan membuat function renderCharacters
     dan argumen yg dikirim ke function adalah data yg kita dapat dari api. (function bisa dilihat diatas)

     setelah dirender ke dlm HTML, kita perlu memilih/select element yg telah dirender lalu disimpan ke dalam variabel cards.
     ini dilakukan agar nanti kita dapat melakukan filter berdasarkan status karakter. */
    .then((data) => {
      renderCharacters(data.results);
      cards = document.querySelectorAll(".card");
    })
    // kalo ada error, tampilkan di console
    .catch((error) => console.log(error));
});
