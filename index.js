import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://addtocart-dbba0-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDb, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDb, function (snapshot) {
  if (snapshot.exists()) {
    let ItemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < ItemsArray.length; i++) {
      let currentItem = ItemsArray[i];

      appendToShoppingListInDb(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No, Items exits yet..";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = null;
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = null;
}

function appendToShoppingListInDb(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDb = ref(database, `shoppingList/${itemId}`);
    remove(exactLocationOfItemInDb);
  });

  shoppingListEl.append(newEl);
}
