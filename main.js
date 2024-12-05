// constants and variable
const date = document.querySelector('#date');
const list = document.querySelector('#list');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const addButton = document.querySelector('#addButton');
const check = 'bi-record-circle';
const scratch = 'done';
const uncheck = 'bi-circle'

let LIST;
let id;

const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString('en-EU', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

function addTask(task, id, done, discard) {

    if (discard) {
        return
    }
    const ready = done ? check : uncheck;
    const LINE = done ? scratch : '';
    const elemento = `<li id="elemento">
    <i id="${id}" data="done" class="bi ${ready}"></i>
    <p class="finishedTask text ${LINE}">${task}</p>
    <i id="${id}" data="discard" class="bi bi-x-circle"></i>
</li> `

list.insertAdjacentHTML("beforeend", elemento);

};

function doneTask(element) {

    element.classlist.toggle(check);
    element.classlist.toggle(check);
    element.parentNode.querySelector('.text').classlist.toggle(scratch);
    LIST[element.id].ready = LIST[element.id].ready ? false : true;

};

function discardTask(element) {

    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].discard = true;

};
addButton.addEventListener("click", () => {
    const task = input.value;
    if (task) {

        addTask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            discard: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";

    }
});

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "done") {
        doneTask(element);
    } else if (elementData = "discard") {
        discardTask(element);
    };
})

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
};

function loadList(array){
    array.forEach(
        function (item){
            addTask(item.name, item.id, item.discard);
        }
    );
};
