import { menuArray } from './data.js'

const orderedItems = []


document.addEventListener("submit", function (e) {

    if (e.target.id == 'form') {
        e.preventDefault();
        document.querySelector(".overlay").classList.add("hidden");
        document.querySelector(".modal").classList.add("hidden");
        orderedItems.length = 0
        getOrderHtml(orderedItems);
        document.getElementById("order-conf").classList.remove("hidden");

    }


}
)



document.addEventListener("click", function (e) {

    if (e.target.dataset.addItem) {
        document.getElementById("cart").classList.remove("hidden");

        handleOrderClick(e.target.dataset.addItem)

        document.getElementById("order-conf").classList.add("hidden");
    }

    else if (e.target.dataset.removeItem) {
        handleRemoveBtn(e.target.dataset.removeItem)
    }

    else if (e.target.id == 'modal') {

        document.querySelector(".overlay").classList.remove("hidden");
        document.querySelector(".modal").classList.remove("hidden");
    }

    else if (e.target.id == 'close') {
        document.querySelector(".overlay").classList.add("hidden");
        document.querySelector(".modal").classList.add("hidden");
    }

    // else if (e.target.id == 'pay-btn') {

    //     document.querySelector(".overlay").classList.add("hidden");
    //     document.querySelector(".modal").classList.add("hidden");
    //     orderedItems.length = 0
    //     getOrderHtml(orderedItems)
    //     document.getElementById("order-conf").classList.remove("hidden");

    // }

})

// function showThanks() {
//     document.getElementById("order-conf").classList.remove("hidden");
// }


















// add item from menu into orderItemsArray
function handleOrderClick(orderId) {

    const orderObject = menuArray.filter(function (orderItem) {
        return orderItem.id === Number(orderId)
    })[0]

    orderedItems.push(orderObject)

    getOrderHtml(orderedItems)
}



function handleRemoveBtn(item) {

    let removeItem = orderedItems.find(function (Item) {
        return Item.id === Number(item)
    })

    const index = orderedItems.indexOf(removeItem);

    console.log('the removed item:')
    console.log(removeItem)

    orderedItems.splice(index, 1);


    console.log('úpdated orderedItems')
    console.log(orderedItems)

    getOrderHtml(orderedItems)

}


// add orderItemsArray into HTML
function getOrderHtml(order) {
    let orderHtml = ''

    order.forEach(function (orderItem) {
        orderHtml +=
            `
        <div class="cart-item">
                <span class="cart-item-name">${orderItem.name}</span>
                <button class="remove-btn" data-remove-item="${orderItem.id}">remove</button>
                <span class="cart-item-price">€ ${orderItem.price}</span>
            </div>          
   `
    })

    document.getElementById("order-list").innerHTML = orderHtml


    if (orderedItems.length < 1) {
        document.getElementById("cart").classList.add("hidden");
    }

    console.log('orderedItems')
    console.log(orderedItems)

    getTotal(order)
}


function getTotal(order) {
    let totalPrice = order.reduce(function (sum, orderItem) {
        return sum + orderItem.price; // add each item’s price to the sum 
    }, 0); // start with 0 as the initial sum

    document.getElementById("total-price").innerHTML = `€ ${totalPrice}`
}










function displayMenuHtml() {
    let menuHtml = ``;

    menuArray.forEach(function (item) {
        menuHtml +=
            `
        <div class="menu-item">
            <img src="images/${item.name}-img.png" class="menu-img">
            
            <div class="item-title">
                <h2 >${item.name}</h2>
                <p class="item-description">${item.ingredients}</p>
                <p>$${item.price}</p>
            </div>
            
            <button class="add-btn" data-add-item="${item.id}" data-item-name="${item.name}">+</button> 

        </div>
        `


    })

    document.getElementById("menu").innerHTML = menuHtml;

}



displayMenuHtml()



