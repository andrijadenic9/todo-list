let input = document.querySelector('.input-todo');
let addBtn = document.querySelector('.btn-add');
let checkboxesArea = document.querySelector('.checkboxes-area');
let empty = document.querySelector(".empty");

let clicks = 0;
let allTodos = [];
let forJSON = [];

window.addEventListener("load", function () {
    input.focus();
});

addBtn.addEventListener("click", addCheckbox);
input.addEventListener("keypress", addCheckbox);

// * checking if already have some todos in local storage
if (localStorage.todo) {
    todoLists = JSON.parse(localStorage.todo);
} else {
    var todoLists = [];
}

// * making todo input filed
createTable();
function createTable() {
    let text = '';
    for (let i = 0; i < todoLists.length; i++) {
        text += '<div class="box"><input class="checkbox" type="checkbox" data-id="' + i + '"' + todoLists[i].checked + '><input class="main-input ' + todoLists[i].overline + '" type="text" value="' + todoLists[i].text + '" readonly><span class="edit" data-id="' + i + '">' + todoLists[i].edit + '</span><span class="close" data-id="' + i + '">' + todoLists[i].close + '</span></div>';
    }
    localStorage.todo = JSON.stringify(todoLists);
    checkboxesArea.innerHTML = text;
    input.value = '';
    input.focus();

    let checkbox = document.querySelectorAll('.checkbox');
    let mainInput = document.querySelectorAll('.main-input');
    let edit = document.querySelectorAll('.edit');
    let close = document.querySelectorAll('.close');

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', checkIfChecked)
        edit[i].addEventListener('click', checkIfEdited);
        close[i].addEventListener('click', checkIfClosed);
    }

    // * handling when user want to edit and save edited todo
    function checkIfEdited(e) {
        let id = this.getAttribute('data-id');
        if (edit[id].innerHTML === '✎') {
            mainInput[id].removeAttribute('readonly');
            mainInput[id].focus();
            edit[id].innerHTML = '&#10004;';
        } else {
            mainInput[id].setAttribute('readonly', true);
            edit[id].innerHTML = '&#9998;';
            todoLists[id].text = mainInput[id].value;
            createTable();
        }
        localStorage.todo = JSON.stringify(todoLists);
    }
}

// * deleting single todo
function checkIfClosed() {
    let id = this.getAttribute('data-id');
    todoLists.splice(id, 1);
    localStorage.todo = JSON.stringify(todoLists);
    createTable();
}
// let arrChecked = []
// * handling when user whant to check or uncheck todo
function checkIfChecked() {
    let id = this.getAttribute('data-id');
    todoLists[id].checked === 'checked' ? todoLists[id].checked = "" : todoLists[id].checked = 'checked';
    todoLists[id].overline === 'done' ? todoLists[id].overline = "" : todoLists[id].overline = "done";
    localStorage.todo = JSON.stringify(todoLists);
    createTable();
}

// * adding new todo with message
function addCheckbox(e) {
    if (e.keyCode === 13 || e.type === 'click') {
        if (input.value != '') {
            let checked = '';
            let overline = '';
            let text = input.value;
            let close = '&#10008;';
            let edit = '&#9998;';

            let newTodoList = {
                checked: checked,
                overline: overline,
                text: text,
                close: close,
                edit: edit
            }
            todoLists.push(newTodoList);
            localStorage.todo = JSON.stringify(todoLists);
            createTable();
        } else {

            // * handling popup message if user tries to add empty todo
            input.focus();
            empty.style.opacity = "1";
            empty.style.transform = "opacity 0.5s linear";
            let btnClose = document.querySelector(".btn-close");
            btnClose.addEventListener("click", function () {
                empty.style.opacity = "0";
            });
            setTimeout(function () {
                empty.style.opacity = "0";
            }, 4000);
        }
    }
}

