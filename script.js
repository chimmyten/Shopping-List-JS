const itemForm = document.getElementById("item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
const items = itemList.querySelectorAll("li");
let isEditMode = false;

function onAddItemSubmit(e) {
	e.preventDefault();
	const newItem = itemInput.value;

	if (checkDupe(newItem)) {
		alert("This item is already in the list");
		return;
	}

	// Validate Input
	if (newItem === "") {
		alert("Please enter an item");
		return;
	}

	if (isEditMode === true) {
		const itemToEdit = itemList.querySelector(".edit-mode");
		removeItem(itemToEdit);
		isEditMode = false;
		itemToEdit.classList.remove("edit-mode");
	}
	// Create item DOM element
	addItemToDOM(newItem);
	// Add item to storage
	addItemToLocalStorage(newItem);

	itemInput.value = "";

	checkUI();
}

function checkDupe(newItem) {
	let isDupe = false;
	itemList.querySelectorAll("li").forEach((i) => {
		if (i.textContent.toLowerCase() === newItem.toLowerCase()) {
			isDupe = true;
		}
	});
	return isDupe;
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
	} else if (e.target.tagName === "LI") {
		setItemToEdit(e.target);
	}
}

function setItemToEdit(item) {
	isEditMode = true;
	itemList.querySelectorAll("li").forEach((i) => {
		i.classList.remove("edit-mode");
	});
	addCancelButton(item);
	item.classList.add("edit-mode");
	formBtn.innerHTML = "<i class = 'fa-solid fa-pen'></i> Update Item";
	formBtn.style.backgroundColor = "green";
	itemInput.value = item.innerText;
}

function addCancelButton(item) {
	const btn = document.createElement("button");
	const text = document.createTextNode("Cancel");
	const container = document.querySelector(".form-and-cancel-container");
	btn.className = "cancel-btn";
	btn.appendChild(text);
	container.appendChild(btn);
	btn.item = item;
	btn.addEventListener("click", cancelEdit)
}

function cancelEdit(e) {
	checkUI();
	e.target.item.classList.remove("edit-mode")
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
	itemInput.value = "";

	const items = itemList.querySelectorAll("li");
	if (items.length === 0) {
		clearBtn.style.display = "none";
		itemFilter.style.display = "none";
	} else {
		clearBtn.style.display = "block";
		itemFilter.style.display = "block";
	}

	isEditMode = false;
	formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
	formBtn.style.backgroundColor = "black";

	const cancelBtn = document.querySelectorAll(".cancel-btn");
	if (cancelBtn.length > 0) {
		cancelBtn.forEach(btn => {
			btn.remove();
		})
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
	// Event Listeners
	itemForm.addEventListener("submit", onAddItemSubmit);
	itemList.addEventListener("click", onItemClick);
	clearBtn.addEventListener("click", removeAllItems);
	itemFilter.addEventListener("input", filterItems);
	window.addEventListener("load", displayLocalStorage);

	checkUI();
}
init();
