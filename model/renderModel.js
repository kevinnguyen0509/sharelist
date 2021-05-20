//Display all grocery list
function allGroceryListItems(groceryList, groceryListItems) {
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
}

function updatedList(groceryItemClicked, GroceryList) {
  for (let i = 0; i < groceryItemClicked.length; i++) {
    groceryItemClicked[i].addEventListener("click", function (item) {
      groceryItemClicked[i].classList.add("background-green");

      if (groceryItemClicked[i].getAttribute("isbought") == "false") {
        GroceryList.updateItem(groceryItemClicked[i].id, true);
        groceryItemClicked[i].setAttribute("isbought", "true");
      } else {
        GroceryList.updateItem(groceryItemClicked[i].id, false);
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
  GroceryList, //Grocery List is GroceryListModel
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
        GroceryList.addItem(addGroceryInputBox.value, searchIcon[i].title);

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

function dismissOverlay(overlay, productScrollOverlay) {
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    productScrollOverlay.classList.add("hidden");
  });
}

function deleteAllList(addGroceryInputBox, GroceryList) {
  addGroceryInputBox.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      if (addGroceryInputBox.value == "/delete") {
        GroceryList.deleteAll();
        //location.reload();
      }
    }
  });
}
export {
  allGroceryListItems,
  updatedList,
  addToDatabase,
  dismissOverlay,
  deleteAllList,
};
