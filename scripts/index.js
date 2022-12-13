/* ---------- Cart ---------- */

let cart = document.getElementById('cart');
let isVisible = false;

let cartArr = [];
let totalPrice = 0;
let menuItem = document.getElementsByClassName('menu-item')[0];
let price = document.getElementsByClassName('cart-total-price')[0];
let tax = document.getElementsByClassName('cart-total-tax');

let items = [
  [
    'Edamame',
    5.99,
    'Steamed young soybeans in pods, lightly seasoned with a pinch of salt. A subtle nutty flavor with a soft, firm bite texture.',
    1,
  ],
  [
    'Scallion Pancakes',
    7.99,
    'A pancake made with scallions. Chewy, flaky, and savory.',
    1,
  ],
  [
    'Shrimp Tempura',
    8.99,
    'A light, crispy coating. Lightly battered and deep fried shrimp.',
    1,
  ],
  [
    'Vegetable Tempura',
    8.99,
    'A light, crispy coating. Lightly battered and deep fried sweet potato.',
    1,
  ],
  [
    'Soup',
    5.99,
    'Miso or Clear Soup.',
    1,
  ],
  [
    'Kani Salad',
    6.99,
    'Shredded crab sticks with a homemade, mayo-based dressing made from Japanese mayonnaise (Kewpie). The dressing is spiced with sriracha, and the salad is tossed with tobiko and panko breadcrumbs.',
    1,
  ],
  [
    'Seaweed Salad',
    6.99,
    'Wakame seaweed mixed with sesame seeds, vinegar, and sesame oil.',
    1,
  ],
  [
    'Avocado Salad',
    8.99,
    'Sliced avocado is topped with a bright dressing of rice vinegar, soy sauce, and sesame oil.',
    1,
  ],
  [
    'Ahi Tuna Nachos',
    12.99,
    'Made with seared sesame seed crusted tuna, deep-fried wonton pieces, and other toppings.',
    1,
  ],
  [
    'Cold Sesame Noodles',
    7.99,
    'Sweet and savory richly flavored sauce on top of thick egg noodle with crunchy peanuts and sesame seeds.',
    1,
  ],
  [
    'Salmon',
    2.99,
    '2 pcs',
    1,
  ],
  [
    'Spanish Mackeral',
    2.99,
    '2 pcs',
    1,
  ],
  [
    'Eel',
    2.99,
    '2 pcs',
    1,
  ],
  [
    'White Tuna',
    2.99,
    '2 pcs',
    1,
  ],
  [
    'Yellow Tail',
    2.99,
    '2 pcs',
    1,
  ],
  [
    'Salmon Squared Rolls',
    13.99,
    'Salmon tempura roll with Salmon on top.',
    1,
  ],
  [
    'Spicier Tuna Roll',
    10.99,
    'Traditional Spicy Tuna Roll with cucumber, avocado, and jalapeño pepper.',
    1,
  ],
  [
    'Lemon Roll',
    14.99,
    'Spicy krab, avocado, cucumber. On top: Salmon with thin lemon slices, cilantro, sriracha sauce, ponzu sauce.',
    1,
  ],
  [
    'Corn Roll',
    15.99,
    'A fine piece of sushi with rice and corn wrapped in kelp.',
    1,
  ],
  [
    'House Special Roll',
    18.99,
    'Spicy Tuna, Salmon, with tobiko and kani.',
    1,
  ],
  [
    'Fried Tofu Roll',
    6.99,
    'A fine piece of sushi with rice and tofu wrapped in kelp.',
    1,
  ],
  [
    'Tofu Lemongrass Roll',
    9.99,
    'A fine piece of sushi with rice and tofu and peanutbutter wrapped in kelp. Topped with peanuts.',
    1,
  ],
  [
    'Peanut Tofu Roll',
    8.99,
    'A fine piece of sushi with rice and tofu and peanutbutter wrapped in kelp. Topped with peanuts.',
    1,
  ],
  [
    'Kani Roll',
    11.99,
    'A fine piece of sushi with rice and kani wrapped in kelp. Topped with tobiko.',
    1,
  ],
  [
    'California Roll',
    6.99,
    'A fine piece of sushi with crab and avocado wrapped in kelp and rice.',
    1,
  ],
];

if (localStorage.getItem('items') === null) {
  localStorage.setItem('items', JSON.stringify(items));
}

let itemStorage = JSON.parse(localStorage.getItem('items'));

function shoppingCart() {
  if (isVisible == false) {
    isVisible = true;
    cart.classList.replace('shopping-cart', 'sliding-cart');
  } else if (isVisible == true) {
    isVisible = false;
    cart.classList.replace('sliding-cart', 'shopping-cart');
  }
}

// info for the array for organiziation purposes
// 0 - name
// 1 - price
// 2 - description
// 3 - quantity selector

// info for the array for organiziation purposes
// 0 - name
// 1 - price
// 2 - description
// 3 - quantity selector

function updateCart() {
  menuItem.innerHTML = '';
  totalPrice = 0;
  for (i = 0; i < cartArr.length; i++) {
    menuItem.innerHTML += `
        <div class="menu-item">
            <div class="menu-details">
                <h3 class="menu-name">${cartArr[i][0]}</h3>
                <span class="menu-description">${cartArr[i][2]}</span>
            </div>
            <div class="menu-tag">
                <span class="menu-price">$${cartArr[i][1]}</span>
            </div>
            <input class="cart-quantity-input" onchange="changeQuantity()" type="number" value='${cartArr[i][3]}'>
            <button class="BTN-REMOVE" onclick="removeItem(${i})" type="button">REMOVE</button>
        </div>
        `;
  }
  totalCost();
}

function changeQuantity() {
  let cartQuantityInput = document.getElementsByClassName(
    'cart-quantity-input',
  );
  for (i = 0; i < cartQuantityInput.length; i++) {
    if (cartQuantityInput[i].value < 1) {
      cartQuantityInput[i].value = 1;
    }
    let popElement = cartQuantityInput[i].value;
    cartArr[i].pop();
    cartArr[i].push(parseInt(popElement));
  }
  totalPrice = 0;
  totalCost();
}

function totalCost() {
  for (i = 0; i < cartArr.length; i++) {
    let cartPrice = cartArr[i][1] + cartArr[i][1] * 0.06;
    let numberOfItems = cartArr[i][3];
    let finalPrice = cartPrice * numberOfItems;
    totalPrice = finalPrice + totalPrice;
  }
  return (price.innerHTML = '$' + parseFloat(totalPrice).toFixed(2));
}

function addItem(item) {
  check = false;
  for (i = 0; i < cartArr.length; i++) {
    if (cartArr[i][0] == itemStorage[item][0]) {
      check = true;
    }
  }
  if (check == true) {
    alert('Item is in cart!');
  } else {
    cartArr.push(itemStorage[item]);
    updateCart();
    alert('Item added');
  }
}

function removeItem(item) {
  cartArr.splice(item, 1);
  updateCart();
}

updateCart();

/* ---------- Login Signup + Admin Login Signup ---------- */

/* ---------- Login Signup + Admin Login Signup ---------- */

// this is just setting up some login stuff for the email
function signup() {
  let email = document.getElementById('email').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let passwordconfirm = document.getElementById('password-confirm').value;

  if (passwordconfirm == password) {
    if (username == 'admin') {
      alert('no');
    } else {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
  } else {
    alert("Passwords don't match");
  }
}

function login() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  let usernameCustomer = localStorage.getItem('username');
  let passwordCustomer = localStorage.getItem('password');

  if (usernameCustomer == username && passwordCustomer == password) {
    alert('Nice');
    window.location.href = 'menu.html';
  } else if (username === 'admin' && password === 'admin') {
    window.location.href = 'admin-menu.html';
  } else {
    alert('no');
  }
}

/* ---------- Admin Editing Menu---------- */

function adminMenu() {
  let menuContainer = document.getElementById('menu-container-id');
  menuContainer.innerHTML = '';
  for (i = 0; i < itemStorage.length; i++) {
    menuContainer.innerHTML += `

        <div class="menu-item">
            <div class="menu-details">
                <h3 class="menu-name">${itemStorage[i][0]}</h3>
                <span class="menu-description">${itemStorage[i][2]}</span>
            </div>
            <div class="menu-tag">
                <span class="menu-price">$${itemStorage[i][1]}</span>
                <button class="BTN-ADD" onclick='addItem(${i})'>ADD TO CART</button>
            </div>
        </div>
        `;
  }
}

function adminRemoveItems() {
  let itemNameInput = document.getElementById('input-remove').value;
  let length = itemStorage.length;
  for (i = 0; i < length; i++) {
    if (itemStorage[i][0] === itemNameInput) {
      itemStorage.splice(i, 1);
    }
  }
  localStorage.setItem('items', JSON.stringify(itemStorage));
  itemStorage = JSON.parse(localStorage.getItem('items'));
  adminMenu();
}

function adminAddItems() {
  let inputName = document.getElementById('input-name').value;
  let inputPrice = parseInt(document.getElementById('input-price').value);
  let inputDescription = document.getElementById('input-description').value;
  let newItemArr = [inputName, inputPrice, inputDescription];

  itemStorage.unshift(newItemArr);
  localStorage.setItem('items', JSON.stringify(itemStorage));
  adminMenu();
}

adminMenu();
