import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
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

  appendToShoppingListInDb(inputValue);
});

function clearInputFieldEl() {
  inputFieldEl.value = null;
}

function appendToShoppingListInDb(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
