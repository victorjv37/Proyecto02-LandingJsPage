// index.js

const products = [
  {
    id: 1,
    name: "Asus ProArt GeForce RTX 4080",
    category: "A",
    price: 100,
    image:
      "https://thumb.pccomponentes.com/w-150-150/articles/1081/10812822/1906-asus-proart-geforce-rtx-4080-16gb-oc-edition-gddr6x-dlss3.jpg",
    link: "https://www.pccomponentes.com/asus-proart-geforce-rtx-4080-16gb-oc-edition",
  },
  {
    id: 2,
    name: "Asus Dual GeForce RTX 4060 Ti",
    category: "B",
    price: 200,
    image:
      "https://thumb.pccomponentes.com/w-150-150/articles/1083/10831360/1955-asus-dual-geforce-rtx-4060-ti-evo-oc-edition-16gb-gddr6-dlss3.jpg",
    link: "https://www.pccomponentes.com/asus-dual-geforce-rtx-4060-ti-evo-oc-edition",
  },
  {
    id: 3,
    name: "Gigabyte GeForce RTX 4060",
    category: "A",
    price: 150,
    image:
      "https://thumb.pccomponentes.com/w-150-150/articles/1073/10739334/1105-gigabyte-geforce-rtx-4060-windforce-oc-8gb-gddr6-dlss3-foto.jpg",
    link: "https://www.pccomponentes.com/gigabyte-geforce-rtx-4060-windforce-oc",
  },
  {
    id: 4,
    name: "Gigabyte GeForce RTX 4070",
    category: "C",
    price: 300,
    image:
      "https://thumb.pccomponentes.com/w-150-150/articles/1085/10856456/1252-gigabyte-geforce-rtx-4070-windforce-oc-v2-12gb-gddr6-dlss3-638b39cc-a3ad-4e4d-8be6-9d72f57a1b76.jpg",
    link: "https://www.pccomponentes.com/gigabyte-geforce-rtx-4070-windforce-oc-v2",
  },
  {
    id: 5,
    name: "Gigabyte GeForce RTX 4080 Super",
    category: "B",
    price: 250,
    image:
      "https://thumb.pccomponentes.com/w-150-150/articles/1081/10811576/1762-gigabyte-geforce-rtx-4080-super-windforce-v2-16gb-gddr6x-dlss3.jpg",
    link: "https://www.pccomponentes.com/gigabyte-geforce-rtx-4080-super-windforce-v2",
  },
  {
    id: 6,
    name: "ASRock Challenger D AMD Radeon RX 6600",
    category: "C",
    price: 350,
    image:
      "https://thumb.pccomponentes.com/w-150-150/articles/1063/10634604/1692-asrock-challenger-d-amd-radeon-rx-6600-8-gb-gddr6.jpg",
    link: "https://www.pccomponentes.com/asrock-challenger-d-amd-radeon-rx-6600",
  },
];

const productContainer = document.getElementById("productContainer");
const filterButton = document.getElementById("filterButton");

function renderProducts(productsToRender, message = "") {
  productContainer.innerHTML = message
    ? `<div class="suggested-message">${message}</div>`
    : "";
  productsToRender.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <a href="${product.link}" target="_blank">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Categoría: ${product.category}</p>
                <p>Precio: $${product.price}</p>
            </a>
        `;
    productContainer.appendChild(productDiv);
  });
}

function showFilterModal() {
  const filterModal = document.createElement("div");
  filterModal.id = "filterModal";
  filterModal.innerHTML = `
        <div id="filterContent">
            <h2>Filtrar Productos</h2>
            <label>Categoría:
                <select id="categoryFilter">
                    <option value="">Todas</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </label>
            <label>Precio Máximo:
                <input type="number" id="priceFilter" min="0">
            </label>
            <button onclick="applyFilters()">Aplicar Filtros</button>
            <button onclick="clearFilters()">Limpiar Filtros</button>
            <button onclick="closeFilterModal()">Cerrar</button>
        </div>
    `;
  document.body.appendChild(filterModal);
  filterModal.style.display = "flex";
}

function closeFilterModal() {
  const filterModal = document.getElementById("filterModal");
  if (filterModal) {
    filterModal.remove();
  }
}

function applyFilters() {
  const category = document.getElementById("categoryFilter").value;
  const maxPrice = document.getElementById("priceFilter").value;
  const filteredProducts = products.filter((product) => {
    return (
      (category === "" || product.category === category) &&
      (maxPrice === "" || product.price <= maxPrice)
    );
  });

  if (filteredProducts.length === 0) {
    renderProducts(getRandomProducts(3), "<h2>Productos Sugeridos</h2>");
  } else {
    renderProducts(filteredProducts);
  }
  closeFilterModal();
}

function clearFilters() {
  renderProducts(products);
  closeFilterModal();
}

function getRandomProducts(count) {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

filterButton.addEventListener("click", showFilterModal);
renderProducts(products);
