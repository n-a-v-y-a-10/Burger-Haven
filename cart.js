if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeButtons = document.getElementsByClassName('deleteitem')
    for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('items-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var placeOrderButton = document.getElementsByClassName('btn-success')[0];
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', placeOrder)
    }

    var addItemButtons = document.getElementsByClassName('additem')
    for (var i = 0; i < addItemButtons.length; i++) {
        var button = addItemButtons[i];
        button.addEventListener('click', addItemToCart);
    }
}

function addItemToCart(event) {
    var button = event.target;
    var item = button.parentElement.parentElement
    var price = item.getElementsByClassName("price")[0].innerText
    var title = item.getElementsByClassName("name")[0].innerText
    addItemToTable(price, title)
    
    updateCartTotal()
}

function addItemToTable(price, title) {
    console.log("inside addItemToCart")
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    var cartItem = document.getElementsByTagName("tbody")[0]
    var cartItemNames = document.getElementsByClassName('item-names')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("Item already added")
            return
        }
    }

    var cartRowContents = `
        <td>
            <h5><span class="item-names">${title}</span></h5>
        </td>
        <td class="items-price">
            <h5>${price}</h5>
        </td>
        <td>
            <input type="number" class="items-quantity" value="1">
        </td>
        <td>
            <div>
                <a href="#cart-container"><button id="btn" class="deleteitem red">Remove</button></a>
            </div>
        </td>
    `
    cartRow.innerHTML = cartRowContents
    cartItem.append(cartRow);
    cartRow.getElementsByClassName('deleteitem')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('items-quantity')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartContainer = document.getElementsByTagName('tbody')[0]
    var cartItems = cartContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartItems.length; i++) {
        var row = cartItems[i]
        var priceElement = row.getElementsByClassName('items-price')[0]
        var quantityElement = row.getElementsByClassName('items-quantity')[0]
        var priceText = priceElement.innerText.replace('₹', '').replace(',', '').trim();
        var price = parseFloat(priceText);
        var quantity = quantityElement.value
        total += price * quantity
    }
    total = Math.round(total * 100) / 100
    console.log(total)
    document.getElementsByClassName('total')[0].innerText = '₹' + total
}

function placeOrder(event) {
    var total = document.getElementsByClassName('total')[0];
    if (total.innerText == '₹0') {
        event.preventDefault();
        alert("Cart is empty")
    }
}
