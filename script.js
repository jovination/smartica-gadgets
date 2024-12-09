// Retrieve stored data from localStorage
const productName = localStorage.getItem("orderProduct");
const productQuantity = parseInt(localStorage.getItem("orderQuantity"));

// Determine price based on the product name
let productUnitPrice = 0;
if (productName === "AirPods Pro (1st Gen)") {
    productUnitPrice = 35000; // Price for 1st Gen
} else if (productName === "AirPods Pro (2nd Gen)") {
    productUnitPrice = 55000; // Price for 2nd Gen
}

// Calculate the total price
const totalPrice = productUnitPrice * productQuantity;

// Update the page with the retrieved and calculated data
document.getElementById("product-name").textContent = productName || "Unknown Product";
document.getElementById("product-quantity").textContent = productQuantity || 0;
document.getElementById("product-unit-price").textContent = `Tsh ${productUnitPrice.toLocaleString()}`;
document.getElementById("modalProductPrice").textContent = `Tsh ${totalPrice.toLocaleString()}`;
