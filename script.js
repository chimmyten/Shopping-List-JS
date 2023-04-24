const itemForm = document.getElementById("item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.getElementById("filter");
const items = itemList.querySelectorAll("li");

function onAddItemSubmit(e) {
	e.preventDefault();
	const newItem = itemInput.value;

	// Validate Input
	if (newItem === "") {
		alert("Please enter an item");
		return;
	}
	// Create item DOM element
	addItemToDOM(newItem);
	// Add item to storage
	addItemToLocalStorage(newItem);

	itemInput.value = "";
	checkUI();
}

function addItemToDOM(item) {
	const list = document.querySelector(".items");
	const li = document.createElement("li");
	const text = document.createTextNode(item);
	const deleteBtn = createBtn("remove-item btn-link text-red");
	li.appendChild(text);
	li.appendChild(deleteBtn);
	list.appendChild(li);

	itemInput.value = "";
}

function addItemToLocalStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// Add new item to array
	itemsFromStorage.push(item);

	// convert to JSON string and set to localStorage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	let itemsFromStorage;
	if (localStorage.getItem("items") === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem("items"));
	}
	return itemsFromStorage;
}

function displayLocalStorage(e) {
	const storageArray = getItemsFromStorage();

	storageArray.forEach((item) => {
		addItemToDOM(item);
	});
	checkUI();
}

function onItemClick(e) {
	if (e.target.classList.contains("fa-xmark")) {
		removeItem(e.target.parentElement.parentElement);
	}
}

function removeItem(item) {
	// Remove item from DOM
	item.remove();

	// Remove item from storage
	removeItemFromLocalStorage(item.textContent);

	checkUI();
}

function removeItemFromLocalStorage(itemName) {
	let storageItems = getItemsFromStorage();
	storageItems = storageItems.filter((i) => i !== itemName);

	localStorage.setItem("items", JSON.stringify(storageItems));
}

function removeAllItems(e) {
	// const items = itemList.querySelectorAll("li");
	// items.forEach((item) => {
	//     item.remove();
	// });

	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
    // Clear from localStorage
	localStorage.removeItem("items");

	checkUI();
}

function checkUI() {
	const items = itemList.querySelectorAll("li");
	if (items.length === 0) {
		clearBtn.style.display = "none";
		itemFilter.style.display = "none";
	} else {
		clearBtn.style.display = "block";
		itemFilter.style.display = "block";
	}
}

function createBtn(classes) {
	const btn = document.createElement("button");
	btn.className = classes;
	const icon = createIcon("fa-solid fa-xmark");
	btn.appendChild(icon);
	return btn;
}

function createIcon(classes) {
	const icon = document.createElement("icon");
	icon.className = classes;
	return icon;
}

function filterItems(e) {
	const text = e.target.value.toLowerCase();
	const items = itemList.querySelectorAll("li");
	console.log(text);

	items.forEach((item) => {
		if (
			item.firstChild.textContent.toLowerCase().includes(text) === false
		) {
			item.style.display = "none";
		} else {
			item.style.display = "flex";
		}
	});
}

// Initialize app
function init() {
	itemForm.addEventListener("submit", onAddItemSubmit);
	itemList.addEventListener("click", onItemClick);
	clearBtn.addEventListener("click", removeAllItems);
	itemFilter.addEventListener("input", filterItems);
	window.addEventListener("load", displayLocalStorage);

	checkUI();
}
// Event Listeners
init();
