const API = "http://127.0.0.1:8000/api/orders/";


/* ================= MENU DATA ================= */

const menuData = [

    {
        id: 1,
        name: "Espresso Shot",
        cat: "espresso",
        price: 149,
        img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500"
    },

    {
        id: 2,
        name: "Cappuccino",
        cat: "espresso",
        price: 199,
        img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500"
    },

    {
        id: 3,
        name: "Latte Vanilla",
        cat: "latte",
        price: 229,
        img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500"
    },

    {
        id: 4,
        name: "Cold Brew",
        cat: "cold",
        price: 179,
        img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500"
    },

    {
        id: 5,
        name: "Mocha Delight",
        cat: "latte",
        price: 249,
        img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500"
    },

    {
        id: 6,
        name: "Americano",
        cat: "espresso",
        price: 129,
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
    },

    {
        id: 7,
        name: "Caramel Macchiato",
        cat: "latte",
        price: 269,
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },

    {
        id: 8,
        name: "Iced Americano",
        cat: "cold",
        price: 159,
        img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500"
    }

];


/* ================= VARIABLES ================= */

let cart = [];

let total = 0;

let selectedCoffee = null;

let isPlaying = false;

let cur = 0;


/* ================= MUSIC ================= */

const playlist = [

    {
        name: "Kadalalle - Dear Comrade",
        online: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        name: "Cozy Cafe Jazz",
        online: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }

];


function loadSong(n) {

    cur = n;

    const audio = document.getElementById("aud");

    audio.src = playlist[n].online;

    document.getElementById("songName").innerText =
        playlist[n].name;

    if (isPlaying) {
        audio.play();
    }
}


function toggleMusic() {

    const audio = document.getElementById("aud");

    const button = document.getElementById("playBtn");

    if (isPlaying) {

        audio.pause();

        button.innerText = "▶";

        isPlaying = false;

    } else {

        if (!audio.src) {
            loadSong(0);
        }

        audio.play();

        button.innerText = "II";

        isPlaying = true;

        buildWave();
    }
}


function nextSong() {

    cur = (cur + 1) % playlist.length;

    loadSong(cur);

    isPlaying = true;

    document.getElementById("aud").play();

}


function prevSong() {

    cur =
        (cur - 1 + playlist.length)
        % playlist.length;

    loadSong(cur);

    isPlaying = true;

    document.getElementById("aud").play();

}


function buildWave() {

    const wave = document.getElementById("wave");

    wave.innerHTML = "";

    for (let i = 0; i < 22; i++) {

        const span = document.createElement("span");

        span.style.height =
            (5 + Math.random() * 16) + "px";

        wave.appendChild(span);
    }
}


/* ================= SEARCH ================= */

function toggleSearch() {

    const box =
        document.getElementById("searchBox");

    if (box.style.display === "block") {

        box.style.display = "none";

    } else {

        box.style.display = "block";

        document.getElementById("sInput").focus();
    }
}


function doSearch(query) {

    query = query.toLowerCase();

    const result =
        menuData.filter(item =>
            item.name
                .toLowerCase()
                .includes(query)
        );

    render(result);
}


/* ================= CATEGORY ================= */

function filterCat(category, element) {

    document
        .querySelectorAll(".pill")
        .forEach(button =>
            button.classList.remove("active")
        );

    element.classList.add("active");

    if (category === "all") {

        render(menuData);

    } else {

        render(
            menuData.filter(
                item => item.cat === category
            )
        );

    }
}


/* ================= MENU ================= */

function render(list) {

    let html = "";

    list.forEach(item => {

        html += `

            <div class="card">

                <img
                    src="${item.img}"
                    alt="${item.name}"
                >

                <h4>
                    ${item.name}
                </h4>

                <div class="price">
                    ₹${item.price}
                </div>

                <button
                    class="add"
                    onclick="addToCart(${item.id})"
                >
                    CUSTOMIZE +
                </button>

            </div>

        `;

    });

    document.getElementById("menu").innerHTML =
        html;
}


/* ================= CUSTOMIZATION ================= */

function addToCart(id) {

    selectedCoffee =
        menuData.find(item => item.id == id);

    if (!selectedCoffee) {
        return;
    }

    document.getElementById("customImg").src =
        selectedCoffee.img;

    document.getElementById("customName").innerText =
        selectedCoffee.name;

    document.getElementById("customBasePrice").innerText =
        selectedCoffee.price;

    document.getElementById("customTotal").innerText =
        selectedCoffee.price;

    document.getElementById("instructions").value =
        "";

    document
        .querySelectorAll(
            '#customModal input[type="checkbox"]'
        )
        .forEach(input => {

            input.checked = false;

        });

    document.querySelector(
        'input[name="temperature"][value="Hot"]'
    ).checked = true;

    document.getElementById("customModal").style.display =
        "flex";
}


function closeCustomization() {

    document.getElementById("customModal").style.display =
        "none";
}


/* ================= PRICE CALCULATION ================= */

function updateCustomTotal() {

    if (!selectedCoffee) {
        return;
    }

    let customTotal =
        selectedCoffee.price;

    document
        .querySelectorAll(
            '#customModal input[type="checkbox"]:checked'
        )
        .forEach(input => {

            customTotal +=
                Number(input.value);

        });

    document.getElementById("customTotal").innerText =
        customTotal;
}


/* ================= ADD CUSTOMIZED ITEM ================= */

function confirmCustomization() {

    if (!selectedCoffee) {
        return;
    }


    let ingredients = [];


    document
        .querySelectorAll(
            '#customModal input[type="checkbox"]:checked'
        )
        .forEach(input => {

            ingredients.push({

                name: input.dataset.name,

                price: Number(input.value)

            });

        });


    const temperature =
        document.querySelector(
            'input[name="temperature"]:checked'
        ).value;


    const instructions =
        document
            .getElementById("instructions")
            .value
            .trim();


    let customPrice =
        selectedCoffee.price;


    ingredients.forEach(item => {

        customPrice += item.price;

    });


    const customizedItem = {

        cartId: Date.now(),

        coffee_id: selectedCoffee.id,

        name: selectedCoffee.name,

        base_price: selectedCoffee.price,

        price: customPrice,

        ingredients: ingredients,

        temperature: temperature,

        instructions: instructions,

        img: selectedCoffee.img

    };


    cart.push(customizedItem);


    total += customPrice;


    updateCart();


    closeCustomization();


    openCart();

}


/* ================= CART ================= */

function openCart() {

    document.getElementById("cartDrawer").style.display =
        "block";

    document.getElementById("overlay").style.display =
        "block";
}


function closeCart() {

    document.getElementById("cartDrawer").style.display =
        "none";

    document.getElementById("overlay").style.display =
        "none";
}


function updateCart() {

    document.getElementById("cartCount").innerText =
        cart.length;

    document.getElementById("total").innerText =
        total;


    if (cart.length === 0) {

        document.getElementById("cartItems").innerHTML =
            "No items — Click ADD +";

        return;
    }


    document.getElementById("cartItems").innerHTML =

        cart.map(item => {

            const ingredientText =
                item.ingredients.length > 0

                    ? item.ingredients
                        .map(i => i.name)
                        .join(", ")

                    : "Default";


            return `

                <div class="cart-item">

                    <strong>
                        ☕ ${item.name}
                    </strong>

                    <div>
                        Ingredients:
                        ${ingredientText}
                    </div>

                    <div>
                        Temperature:
                        ${item.temperature}
                    </div>

                    <div>
                        Instructions:
                        ${item.instructions || "None"}
                    </div>

                    <div>
                        Price:
                        <b>₹${item.price}</b>
                    </div>

                </div>

            `;

        }).join("");

}


/* ================= PLACE ORDER ================= */

async function placeOrder() {

    if (cart.length === 0) {

        alert("Please add a coffee first!");

        return;
    }


    const name =
        document.getElementById("cname")
            .value
            .trim() || "Deepthi";


    const orderData = {

        customer_name: name,

        temperature:
            cart[0].temperature,

        recipe:
            cart[0].coffee_id,

        ingredients:
            cart[0].ingredients,

        instructions:
            cart[0].instructions,

        total_price:
            cart[0].price

    };


    try {

        const response =
            await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(orderData)

            });


        if (response.ok) {

            document.getElementById("msg").innerText =
                "✅ Order Placed Successfully!";

            cart = [];

            total = 0;

            updateCart();

            loadOrders();

        } else {

            document.getElementById("msg").innerText =
                "❌ Backend rejected the order.";

        }


    } catch (error) {

        console.log(error);

        document.getElementById("msg").innerText =
            "⚠️ Backend is not connected.";

    }

}


/* ================= LOAD ORDERS ================= */

async function loadOrders() {

    try {

        const response =
            await fetch(API);

        const data =
            await response.json();


        document.getElementById("orders").innerHTML =

            data
                .slice(-5)
                .reverse()
                .map(order =>

                    `☕ ${order.customer_name}`

                )
                .join("<br>");

    } catch (error) {

        console.log(
            "Orders API unavailable"
        );

    }

}


/* ================= HERO BUTTON ================= */

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= WEATHER BANNER ================= */

function updateBanner() {

    const hour =
        new Date().getHours();

    let message;

    if (hour >= 18 || hour < 6) {

        message =
            "🌧️ Rainy evening in Hyderabad — Perfect time for a warm coffee!";

    } else {

        message =
            "☀️ Hyderabad weather — Enjoy a freshly prepared coffee!";

    }

    document.getElementById("envBanner").innerText =
        message;
}


/* ================= INITIAL LOAD ================= */

render(menuData);

updateBanner();

buildWave();

loadOrders();