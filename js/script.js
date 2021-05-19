import * as GroceryList from "../model/groceryListModel.js";
//https://agile-everglades-82259.herokuapp.com/
const overlay = document.querySelector(".overlay");
const productScrollOverlay = document.querySelector(".product-image-page");
const addGroceryInputBox = document.querySelector(".add-item-input");

overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  productScrollOverlay.classList.add("hidden");
});

addGroceryInputBox.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  productScrollOverlay.classList.remove("hidden");
});

const groceryList = await GroceryList.getAllGroceryList();
console.log(groceryList);
