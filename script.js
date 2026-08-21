const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },

    {
        id: 3,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },

    {
        id: 4,
        name: "Sneakers",
        category: "fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 5,
        name: "Face Cream",
        category: "beauty",
        price: 599,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500"
    },

    {
        id: 6,
        name: "Perfume",
        category: "beauty",
        price: 999,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
    }
];

const container =
    document.getElementById("productContainer");

const search =
    document.getElementById("search");

const category =
    document.getElementById("category");

const cartCount =
    document.getElementById("cartCount");

const themeBtn =
    document.getElementById("themeBtn");


let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Display products

function displayProducts(list) {

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// Add to cart

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

    alert(`${product.name} added to cart!`);
}


// Update cart

function updateCart() {

    cartCount.textContent = cart.length;
}


// Search and filter

function filterProducts() {

    const searchText =
        search.value.toLowerCase();

    const selectedCategory =
        category.value;

    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return matchesSearch &&
                   matchesCategory;
        });

    displayProducts(filtered);
}


search.addEventListener(
    "input",
    filterProducts
);

category.addEventListener(
    "change",
    filterProducts
);


// Dark mode

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");

        const darkMode =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "darkMode",
            darkMode
        );

        themeBtn.textContent =
            darkMode ? "☀️" : "🌙";
    }
);


// Restore theme

if (
    localStorage.getItem("darkMode") === "true"
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
}


// Initial load

displayProducts(products);

updateCart();