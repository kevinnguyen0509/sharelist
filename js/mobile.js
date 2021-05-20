const overlay = document.querySelector(".overlay");
const productScrollOverlay = document.querySelector(".product-image-page");
const addGroceryInputBox = document.querySelector(".add-item-input");
const groceryListItems = document.querySelector(".col-container");
let groceryList = async () => {
  try {
    const allGroceryList = await fetch(
      "https://agile-everglades-82259.herokuapp.com/api/v1/grocery/"
    );

    const groceryJson = await allGroceryList.json();
    return groceryJson.groceryList;
  } catch (err) {
    console.log("Not correct route.");
  }
};
(async () => {
  groceryList = await groceryList();
  for (let i = 0; i < groceryList.length; i++) {
    if (groceryList[i].isBought) {
      //turn background green by adding background green class in css
      groceryListItems.insertAdjacentHTML(
        "beforeend",
        `<div class="item-container background-green" id="${groceryList[i]._id}" isBought="${groceryList[i].isBought}">
          <i class="flaticon-${groceryList[i].image} flaticonss" " ></i>
          <p>${groceryList[i].name}</p>
        </div>`
      );
    } else {
      //Keep background not green
      groceryListItems.insertAdjacentHTML(
        "beforeend",
        `<div class="item-container" id="${groceryList[i]._id}" isBought="${groceryList[i].isBought}">
          <i class="flaticon-${groceryList[i].image} flaticonss"  ></i>
          <p>${groceryList[i].name}</p>
        </div>`
      );
    }
  }

  let groceryItemClicked = document.querySelectorAll(".item-container");
  //console.log(groceryItemClicked);
  updatedList(groceryItemClicked, updateItem);

  addToDatabase(
    addGroceryInputBox,
    overlay,
    productScrollOverlay,
    groceryPictureArray,
    addItem, //Grocery List is GroceryListModel
    groceryListItems
  );

  dismissOverlay(overlay, productScrollOverlay);
  deleteAllList(addGroceryInputBox, deleteAll);
})();
/**********start of functions******** */
//console.log(groceryList);

//Render.deleteAllList(addGroceryInputBox, GroceryList);

let groceryItemClicked = document.querySelectorAll(".item-container");
//console.log(groceryItemClicked);

updatedList(groceryItemClicked, updateItem);

//Render.dismissOverlay(overlay, productScrollOverlay);

// Render.addToDatabase(
//   addGroceryInputBox,
//   overlay,
//   productScrollOverlay,
//   groceryPictureArray,
//   GroceryList,
//   groceryListItems
// );

/******************Grocery Model**************************** */
async function getAllGroceryList() {
  try {
    const allGroceryList = await fetch(
      "https://agile-everglades-82259.herokuapp.com/api/v1/grocery/"
    );

    const groceryJson = await allGroceryList.json();
    return groceryJson.groceryList;
  } catch (err) {
    console.log("Not correct route.");
  }
}

async function addItem(name, imageString) {
  try {
    const response = await fetch(
      "https://agile-everglades-82259.herokuapp.com/api/v1/grocery/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          image: imageString,
          isBought: false,
        }),
      }
    );

    return response.json();
  } catch (err) {
    console.log("You already have that item");
  }
}

async function updateItem(id, isBought) {
  try {
    const response = await fetch(
      "https://agile-everglades-82259.herokuapp.com/api/v1/grocery/" + id,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isBought: isBought,
        }),
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
}

async function deleteAll() {
  try {
    const response = await fetch(
      "https://agile-everglades-82259.herokuapp.com/api/v1/grocery/",
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    location.reload();
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

function updatedList(groceryItemClicked, updateItem) {
  for (let i = 0; i < groceryItemClicked.length; i++) {
    groceryItemClicked[i].addEventListener("click", function (item) {
      groceryItemClicked[i].classList.add("background-green");

      if (groceryItemClicked[i].getAttribute("isbought") == "false") {
        updateItem(groceryItemClicked[i].id, true);
        groceryItemClicked[i].setAttribute("isbought", "true");
      } else {
        updateItem(groceryItemClicked[i].id, false);
        groceryItemClicked[i].classList.remove("background-green");
        groceryItemClicked[i].setAttribute("isbought", "false");
      }
    });
  }
}

function addToDatabase(
  addGroceryInputBox,
  overlay,
  productScrollOverlay,
  groceryPictureArray,
  addItem, //Grocery List is GroceryListModel
  groceryListItems
) {
  addGroceryInputBox.addEventListener("keyup", function () {
    overlay.classList.remove("hidden");
    productScrollOverlay.classList.remove("hidden");

    productScrollOverlay.innerHTML = "";
    for (let i = 0; i < groceryPictureArray.length; i++) {
      productScrollOverlay.insertAdjacentHTML(
        "beforeend",
        `<div class="search-img-container">
            <i class="flaticon-${groceryPictureArray[i]} flaticons-search" title="${groceryPictureArray[i]}"></i>
            </div>`
      );
    }

    //Add One
    const searchIcon = document.querySelectorAll(".flaticons-search");

    for (let i = 0; i < searchIcon.length; i++) {
      searchIcon[i].addEventListener("click", function () {
        addItem(addGroceryInputBox.value, searchIcon[i].title);

        groceryListItems.insertAdjacentHTML(
          "beforeend",
          `<div class="item-container">
                <i class="flaticon-${searchIcon[i].title} flaticonss"></i>
                <p>${addGroceryInputBox.value}</p>
              </div>`
        );

        addGroceryInputBox.value = "";
        overlay.classList.add("hidden");
        productScrollOverlay.classList.add("hidden");
      });
    }
  });
}

let groceryPictureArray = [
  "apple-1",
  "apple-jam",
  "apple",
  "avocado",
  "barbecue",
  "birthday-cake-1",
  "birthday-cake-2",
  "birthday-cake-3",
  "birthday-cake",
  "blender",
  "boiled-egg",
  "bone",
  "bottle",
  "bread-1",
  "bread",
  "brochette-1",
  "brochette-2",
  "brochette-3",
  "brochette",
  "cake-slice-1",
  "cake-slice",
  "cake",
  "candy-1",
  "candy-2",
  "candy",
  "carrot",
  "champagne-1",
  "champagne-2",
  "champagne-3",
  "champagne-4",
  "champagne-5",
  "champagne-glass",
  "champagne",
  "cheese",
  "chef-hat",
  "chef",
  "cherries-1",
  "cherries",
  "chicken-leg-1",
  "chicken-leg",
  "chocolate",
  "cocktail",
  "coffee-beans",
  "coffee-cup-1",
  "coffee-cup-2",
  "coffee-cup-3",
  "coffee-cup",
  "coffee-grinder",
  "coffee-machine",
  "cookie-1",
  "cookie-2",
  "cookie",
  "cucumber-1",
  "cucumber",
  "cupcake-1",
  "cupcake",
  "cutlery",
  "doughnut-1",
  "doughnut-2",
  "doughnut-3",
  "doughnut-4",
  "doughnut-5",
  "doughnut-6",
  "doughnut-7",
  "doughnut",
  "easter-egg",
  "egg",
  "eggplant",
  "eggs-1",
  "eggs-2",
  "eggs",
  "fast-food",
  "faucet",
  "feeder-1",
  "feeder-2",
  "feeder",
  "flour",
  "french-fries",
  "fridge",
  "fried-egg",
  "garlic",
  "grapefruit-1",
  "grapefruit",
  "grill-1",
  "grill",
  "groceries",
  "hamburger-1",
  "hamburger-2",
  "hamburger-3",
  "hamburger",
  "hot-dog",
  "hot-drink",
  "ice-cream-1",
  "ice-cream-2",
  "ice-cream-3",
  "ice-cream-4",
  "ice-cream-5",
  "ice-cream-6",
  "ice-cream-7",
  "ice-cream",
  "ice-lolly-1",
  "ice-lolly-2",
  "ice-lolly-3",
  "ice-lolly-4",
  "ice-lolly-5",
  "ice-lolly-6",
  "ice-lolly-7",
  "ice-lolly",
  "lemon-slice",
  "lemonade",
  "lollipop-1",
  "lollipop-2",
  "lollipop-3",
  "lollipop-4",
  "lollipop",
  "meal",
  "meat",
  "melon",
  "menu",
  "milk-1",
  "milk",
  "mitten",
  "mixer",
  "muffin-1",
  "muffin-2",
  "muffin-3",
  "muffin",
  "mushroom",
  "noodles-1",
  "noodles-2",
  "noodles",
  "nut",
  "olive-oil",
  "olive",
  "onion",
  "orange-1",
  "orange-2",
  "orange",
  "pear",
  "peeler",
  "pepper",
  "pitcher-1",
  "pitcher",
  "pizza-1",
  "pizza-2",
  "pizza-3",
  "pizza",
  "pot-1",
  "pot-2",
  "pot-3",
  "pot",
  "pumpkin",
  "restaurant-1",
  "restaurant-2",
  "restaurant",
  "rice-1",
  "rice",
  "roast-chicken-1",
  "roast-chicken",
  "salmon",
  "sausage-1",
  "sausage-2",
  "sausage",
  "shop-1",
  "shop",
  "snack",
  "soft-drink-1",
  "soft-drink-2",
  "soft-drink-3",
  "soft-drink-4",
  "soft-drink",
  "soup-1",
  "soup-2",
  "soup-3",
  "soup-4",
  "soup-5",
  "soup-6",
  "soup-7",
  "soup-8",
  "soup-9",
  "soup-ladle",
  "soup",
  "spatula",
  "squeezer",
  "sugar",
  "sushi",
  "syrup-1",
  "syrup",
  "taco",
  "toast-1",
  "toast",
  "toiletries",
  "tomato",
  "tray",
  "turnip-1",
  "turnip",
  "watermelon",
  "wheat",
  "wine-glass",
  "wine",
];

function dismissOverlay(overlay, productScrollOverlay) {
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    productScrollOverlay.classList.add("hidden");
  });
}

function deleteAllList(addGroceryInputBox, deleteAll) {
  addGroceryInputBox.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      if (addGroceryInputBox.value == "/delete") {
        deleteAll();
        //location.reload();
      }
    }
  });
}
