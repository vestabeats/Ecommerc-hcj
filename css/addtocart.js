let cartIcon = document.querySelector("#cartic");
let hrtIcon = document.querySelector("#dfx");
let hrt = document.querySelector(".ht");
let cart = document.querySelector(".carti");
let closeCart = document.querySelector("#close-carti");


cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}
let count = 0;

ht.addEventListener('click', () => {
  count++;
  hrtIcon.textContent = count;
});

function ready(){
    try{
    var removeCartButtons = document.getElementsByClassName("carti-remove")
    console.log(removeCartButtons)
    for(var i= 0; i<removeCartButtons.length;i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityinputs = document.getElementsByClassName("carti-quantity")
    for(var i= 0; i<quantityinputs.length;i++){
        var input = quantityinputs[i];
        input.addEventListener("change",quantityChanged);
    }
    var addCart = document.getElementsByClassName("add-carti");
    for(var i= 0; i<addCart.length;i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    document.getElementsByClassName('btni-buy')[0].addEventListener('click',buyButtonClicked);
}catch(e){
    console.log(e)
}
}

function buyButtonClicked(){
    alert('Your Order is Placed')
    var cartContent = document.getElementsByClassName('carti-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}


function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest(".product-item"); // Get the closest ancestor with class "product-item"
    
    var title = shopProducts.querySelector(".product-title").innerText;
    var price = shopProducts.querySelector(".price").innerText;
    var productImg = shopProducts.querySelector(".product-img").src;
    
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("carti-box");
    var cartItems = document.getElementsByClassName("carti-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("carti-product-title");
    for(var i= 0; i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == title){
            alert("you have already added this item to cart");
            return; 

        } 
        
    }
    var cartBoxContent =` 

<img src = "${productImg}" alt ="" class ="carti-img">
<div class = "detail-box">
    <div class = "carti-product-title">${title}</div>
    <div class = "carti-price">${price}</div>
    <input type = "number" value = "1" class ="carti-quantity">
</div>
<i class='bx bxs-trash-alt carti-remove '></i>`;

cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('carti-remove')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('carti-quantity')[0].addEventListener('change',quantityChanged)
    
}


  

function updatetotal(){
    var cartContent = document.getElementsByClassName("carti-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("carti-box");
    var total = 0;
    var cv= 0;
    for(var i= 0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("carti-price")[0];
        var quantityElement = cartBox.getElementsByClassName("carti-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
       
        cv += parseInt(quantity);
        
    }
        total = Math.round(total * 100) / 100;
       

        document.getElementsByClassName("totali-price")[0].innerText = "$" + total;
        document.getElementsByClassName("cartv")[0].innerText =  cv;
    
}