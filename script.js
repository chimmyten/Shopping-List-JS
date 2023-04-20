const itemForm = document.getElementById("item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.querySelector(".btn-clear")
const itemFilter = document.getElementById("filter");
const items = itemList.querySelectorAll("li");

function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;

// Validate Input
    if (newItem === "") {
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
    checkUI();
};

function removeItem(e) {
    if (e.target.classList.contains("fa-xmark")) {
        e.target.parentElement.parentElement.remove();
    }
    checkUI();
};

function removeAllItems(e) {
    // const items = itemList.querySelectorAll("li");
    // items.forEach((item) => {
    //     item.remove();
    // });

    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
};

function checkUI() {
    const items = itemList.querySelectorAll("li"); 
    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
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

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll("li");
    console.log(text);

    items.forEach((item) => {
        if (item.firstChild.textContent.toLowerCase().includes(text) === false) {
            item.style.display = "none";
        }
        else {
            item.style.display = "flex";
        }
    }) 

}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeAllItems);
itemFilter.addEventListener("input", filterItems);

checkUI();