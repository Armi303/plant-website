let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-3');
let scrollTop = document.querySelector('.scroll-top');

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.onscroll = () => {

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if (window.scrollY > 250) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }

    if (window.scrollY > 250) {
        scrollTop.style.display = 'initial';
    } else {
        scrollTop.style.display = 'none';
    }

}

let swiper = new Swiper(".home-slider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
});

let countDate = new Date('jun 25, 2023 24:00:00').getTime();

function countDown() {

    let now = new Date().getTime();

    gap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;

}

setInterval(function() {
    countDown();
}, 1000)

//Cart
let cartIcon = document.querySelector('#cart-btn');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};


//Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Making Function
function ready() {
    //Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItems);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
}


function ready() {
  // Dodavanje proizvoda u korpu
  var addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addCartClicked);
  }

  // Uklanjanje proizvoda iz korpe
  var removeButtons = document.getElementsByClassName("remove");
  for (var i = 0; i < removeButtons.length; i++) {
    var button = removeButtons[i];
    button.addEventListener("click", removeCartItem);
  }
}

// Buy Button work
document.getElementsByClassName('btn-buy')[0]
.addEventListener('click',buyButonClicked);

// Buy Button
function buyButonClicked(){
   alert("Your Order is placed");
   var cartContent = document.getElementsByClassName("cart-content")[0];
   while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
   }
   updateTotal();
}

// Remove Items from Cart
function removeCartItems(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}

//Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
            <i class="fas fa-trash-alt remove" id="cart-remove"></i>
        </div>
    </div>`;

    cartShopBox.innerHTML = cartBoxContent;

    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("remove")[0].addEventListener("click", removeCartItems);

    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

    updateTotal();
}

// Prikazivanje proizvoda
var addToCartButtons = document.getElementsByClassName("btn");
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addCartClicked);
}


//Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        
        // If price contains some cents value
        total = Math.round(total * 100) / 100;
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
}
