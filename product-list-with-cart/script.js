"use strict";
const productList = document.querySelector(".products__list");
const cartContainer = document.querySelector(".cart");
var CartUpdateAction;
(function (CartUpdateAction) {
    CartUpdateAction["ADD"] = "ADD";
    CartUpdateAction["REMOVE"] = "REMOVE";
    CartUpdateAction["UPDATE"] = "UPDATE";
})(CartUpdateAction || (CartUpdateAction = {}));
var CartAdjustment;
(function (CartAdjustment) {
    CartAdjustment["INCREASE"] = "INCREASE";
    CartAdjustment["DECREASE"] = "DECREASE";
})(CartAdjustment || (CartAdjustment = {}));
let productData = [];
let cartItems = [];
(async function () {
    const response = await fetch("data.json");
    const data = await response.json();
    productData = data.map((product) => (Object.assign(Object.assign({}, product), { id: crypto.randomUUID() })));
    renderProductList();
})();
function renderProductList() {
    const itemTemplate = document.getElementById("item-template");
    if (!itemTemplate)
        return;
    productData.forEach((product) => {
        const fragment = itemTemplate.content.cloneNode(true);
        if (!itemTemplate)
            return;
        const itemImage = fragment.querySelector(".item__image");
        const itemCategory = fragment.querySelector(".item__category");
        const itemName = fragment.querySelector(".item__name");
        const itemPrice = fragment.querySelector(".item__price");
        const itemButton = fragment.querySelector(".item__button");
        itemCategory.textContent = product.category;
        itemName.textContent = product.name;
        itemPrice.textContent = `$${product.price.toFixed(2)}`;
        itemButton.dataset.id = product.id;
        itemImage.src = product.image.desktop;
        itemImage.alt = product.name;
        itemImage.addEventListener("dragstart", (event) => {
            if (event.dataTransfer) {
                event.dataTransfer.setData("text/plain", product.id);
                event.dataTransfer.effectAllowed = "move";
            }
        });
        productList.append(fragment);
    });
}
function createCartItemElement(product) {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart__item";
    cartItemElement.innerHTML = `
  <div class="cart__item-details">
    <h5 class="cart__item-title"></h5>
    <div class="cart__item-info">
      <span class="cart__item-quantity"></span>
      <span class="cart__item-price"></span>
      <span class="cart__item-total"></span>
    </div>
  </div>
  <img
    class="cart__item-remove"
    src="images/icon-remove-item.svg"
    alt="remove item" />
  `;
    const cartItemTitle = cartItemElement.querySelector(".cart__item-title");
    const cartItemQuantity = cartItemElement.querySelector(".cart__item-quantity");
    const cartItemTotal = cartItemElement.querySelector(".cart__item-total");
    const cartItemPrice = cartItemElement.querySelector(".cart__item-price");
    const cartItemRemoveButton = cartItemElement.querySelector(".cart__item-remove");
    cartItemTitle.textContent = product.name;
    cartItemQuantity.textContent = `${product.quantity}x`;
    cartItemTotal.textContent = `$${product.totalAmount.toFixed(2)}`;
    cartItemPrice.textContent = `@$${product.price.toFixed(2)}`;
    cartItemRemoveButton.dataset.id = product.id;
    return cartItemElement;
}
function updateCart(productId, action) {
    var _a;
    const product = cartItems.find((item) => item.id === productId);
    if (!product)
        return;
    if (action === CartUpdateAction.ADD)
        return createCartItemElement(product);
    if (action === CartUpdateAction.REMOVE) {
        cartItems = cartItems.filter((item) => item.id !== productId);
        const removeIcon = cartContainer.querySelector(`img[data-id='${productId}']`);
        const cartItem = removeIcon.closest(".cart__item");
        cartItem.remove();
        cartItem.classList.remove("selected");
        updateProductButton(productId);
        updateCartSummary();
    }
    if (action === CartUpdateAction.UPDATE) {
        const existingItem = (_a = document
            .querySelector(`img[data-id='${productId}']`)) === null || _a === void 0 ? void 0 : _a.closest(".cart__item");
        if (!existingItem)
            return;
        existingItem.replaceWith(createCartItemElement(product));
    }
}
function updateProductButton(productId) {
    const cartItem = cartItems.find((c) => c.id === productId);
    const productButton = document.querySelector(`button[data-id='${productId}']`);
    const productCard = productButton.closest(".item");
    if (!productCard)
        return;
    if (cartItem) {
        productButton.classList.replace("item__button--add", "item__button--quantity");
        productButton.innerHTML = `
      <img class="item__button-decrease" src="images/icon-decrement-quantity.svg" alt="decrease quantity" />
      <span class="item__button-count">${cartItem.quantity}</span>
      <img class="item__button-increase" src="images/icon-increment-quantity.svg" alt="increase quantity" />
    `;
        productCard.classList.add("selected");
    }
    else {
        productButton.classList.replace("item__button--quantity", "item__button--add");
        productButton.innerHTML = `
      <img src="images/icon-add-to-cart.svg" alt="add to cart icon" />
      Add to Cart
    `;
        productCard.classList.remove("selected");
    }
}
function updateCartSummary() {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.totalAmount, 0);
    const cartContentEl = document.getElementById("cart-content");
    if (!cartContentEl)
        return;
    const replaceWithTemplate = (templateId) => {
        const template = document.getElementById(templateId);
        if (!template)
            return;
        const clone = template.content.cloneNode(true);
        cartContentEl.replaceWith(clone);
    };
    if (cartItems.length === 1 && !document.querySelector(".cart__content")) {
        replaceWithTemplate("cart-template");
    }
    if (cartItems.length < 1) {
        replaceWithTemplate("cart-empty-template");
    }
    else {
        const totalAmountEl = document.querySelector(".cart__total-amount");
        if (totalAmountEl)
            totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
    }
    const cartCountEl = document.querySelector(".cart__count");
    if (cartCountEl)
        cartCountEl.textContent = String(cartItems.length);
}
function handleProductSelection(productId) {
    const selectedProduct = productData.find((product) => product.id === productId);
    if (!selectedProduct)
        return;
    cartItems.push(Object.assign(Object.assign({}, selectedProduct), { quantity: 1, totalAmount: selectedProduct.price }));
    const cartItemElement = updateCart(productId, CartUpdateAction.ADD);
    const cartItemsContainer = document.querySelector(".cart__items");
    if (cartItemsContainer && cartItemElement) {
        cartItemsContainer.append(cartItemElement);
        cartItemElement.scrollIntoView({ behavior: "smooth" });
    }
    updateCartSummary();
    updateProductButton(productId);
}
function adjustCartItem(productId, action) {
    cartItems = cartItems.map((item) => {
        if (item.id === productId) {
            const newQuantity = action === CartAdjustment.INCREASE
                ? item.quantity + 1
                : item.quantity - 1;
            return Object.assign(Object.assign({}, item), { quantity: newQuantity, totalAmount: newQuantity * item.price });
        }
        return item;
    });
    const product = cartItems.find((item) => item.id === productId);
    if (!product)
        return;
    updateProductButton(productId);
    updateCartSummary();
    if (product.quantity <= 0) {
        updateCart(productId, CartUpdateAction.REMOVE);
    }
    else {
        updateCart(productId, CartUpdateAction.UPDATE);
    }
}
function showOrderModal() {
    const orderItemTemplate = document.getElementById("order-item-template");
    const orderItemsContainer = document.querySelector(".order__items");
    orderItemsContainer.innerHTML = "";
    const orderBackdrop = document.querySelector(".order__backdrop");
    const orderButton = document.querySelector(".order__button");
    orderBackdrop.addEventListener("click", hideOrderModal);
    orderButton.addEventListener("click", hideOrderModal);
    cartItems.forEach((item) => {
        const orderItem = orderItemTemplate.content.cloneNode(true);
        const orderImage = orderItem.querySelector(".order__image");
        const orderName = orderItem.querySelector(".order__name");
        const orderCount = orderItem.querySelector(".order__count");
        const orderPrice = orderItem.querySelector(".order__price");
        const orderTotal = orderItem.querySelector(".order__total");
        orderImage.src = item.image.desktop;
        orderImage.alt = item.name;
        orderName.textContent = item.name;
        orderCount.textContent = `${item.quantity}x`;
        orderPrice.textContent = `$${item.price.toFixed(2)}`;
        orderTotal.textContent = `$${item.totalAmount.toFixed(2)}`;
        orderItemsContainer.append(orderItem);
    });
    document.body.classList.add("show-modal");
}
function hideOrderModal() {
    document.body.classList.remove("show-modal");
}
productList.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
    if (target.classList.contains("item__button--add")) {
        const productId = target.dataset.id;
        if (productId)
            handleProductSelection(productId);
    }
    if (!target.parentElement)
        return;
    if (target.classList.contains("item__button-increase")) {
        const productId = target.parentElement.dataset.id;
        if (productId)
            adjustCartItem(productId, CartAdjustment.DECREASE);
    }
    if (target.classList.contains("item__button-decrease")) {
        const productId = target.parentElement.dataset.id;
        if (productId)
            adjustCartItem(productId, CartAdjustment.DECREASE);
    }
});
cartContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
    const productId = target.dataset.id;
    if (target.nodeName === "IMG") {
        updateCart(productId, CartUpdateAction.REMOVE);
    }
    if (target.classList.contains("cart__confirm-button")) {
        showOrderModal();
    }
});
cartContainer.addEventListener("dragenter", (event) => {
    if (!event.dataTransfer)
        return;
    if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const dropTarget = event.currentTarget;
        dropTarget === null || dropTarget === void 0 ? void 0 : dropTarget.classList.add("dropable");
    }
});
cartContainer.addEventListener("dragleave", (event) => {
    const relatedTarget = event.relatedTarget;
    if ((relatedTarget === null || relatedTarget === void 0 ? void 0 : relatedTarget.closest(".cart")) !== cartContainer) {
        const dropTarget = event.currentTarget;
        dropTarget === null || dropTarget === void 0 ? void 0 : dropTarget.classList.remove("dropable");
    }
});
cartContainer.addEventListener("dragover", (event) => {
    if (!event.dataTransfer)
        return;
    if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
    }
});
cartContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    if (!event.dataTransfer)
        return;
    const productId = event.dataTransfer.getData("text/plain");
    if (cartItems.find((item) => item.id === productId)) {
        adjustCartItem(productId, CartAdjustment.INCREASE);
    }
    else {
        handleProductSelection(productId);
    }
    const dropTarget = event.currentTarget;
    dropTarget === null || dropTarget === void 0 ? void 0 : dropTarget.classList.remove("dropable");
});
