async function getAllGroceryList() {
  try {
    const allGroceryList = await fetch(
      "https://agile-everglades-82259.herokuapp.com/api/v1/grocery/"
    );

    const groceryJson = await allGroceryList.json();
    groceryJson.groceryList.sort((a, b) => a.isBought - b.isBought);

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

export { getAllGroceryList, addItem, updateItem, deleteAll };
