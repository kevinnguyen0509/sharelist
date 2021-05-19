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

export { getAllGroceryList };
