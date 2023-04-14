const itemForm = document.getElementById("item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;

// Validate Input
    if (newItem.value === "") {
        alert("Please enter an item");
        return;
    };

// Creating the new item
    const list = document.querySelector(".items");
    const li = document.createElement("li");
    const text = document.createTextNode(newItem);
    const deleteBtn = createBtn("remove-item btn-link text-red");
    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    itemInput.value = "";
};

function createBtn(classes) {
    const btn = document.createElement("button");
    btn.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    btn.appendChild(icon);
    return btn;
};

function createIcon(classes) {
    const icon = document.createElement("icon");
    icon.className = classes;
    return icon;
};

// Event Listeners
itemForm.addEventListener("submit", addItem);