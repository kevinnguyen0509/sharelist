import * as GroceryList from "../model/groceryListModel.js";
import * as Render from "../model/renderModel.js";
import { groceryPictureArray } from "../js/utils/array.js";
//https://agile-everglades-82259.herokuapp.com/
const overlay = document.querySelector(".overlay");
const productScrollOverlay = document.querySelector(".product-image-page");
const addGroceryInputBox = document.querySelector(".add-item-input");
const groceryListItems = document.querySelector(".col-container");
const groceryList = await GroceryList.getAllGroceryList();
// const groceryList = async () => {
//   const result = await GroceryList.getAllGroceryList();

//   return result;
// };
// (async () => {
//   const groceryList2 = await groceryList();
//   Render.allGroceryListItems(groceryList2, groceryListItems);
// })();

Render.deleteAllList(addGroceryInputBox, GroceryList);
//Render.allGroceryListItems(groceryList2, groceryListItems);
Render.allGroceryListItems(groceryList, groceryListItems);
let groceryItemClicked = document.querySelectorAll(".item-container");
Render.updatedList(groceryItemClicked, GroceryList);

Render.dismissOverlay(overlay, productScrollOverlay);

Render.addToDatabase(
  addGroceryInputBox,
  overlay,
  productScrollOverlay,
  groceryPictureArray,
  GroceryList,
  groceryListItems
);
