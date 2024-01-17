import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
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
  let ItemsArray = Object.values(snapshot.val());

  clearShoppingListEl();

  for (let i = 0; i < ItemsArray.length; i++) {
    appendToShoppingListInDb(ItemsArray[i]);
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = null;
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = null;
}

function appendToShoppingListInDb(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
