const input = document.querySelector('#inputText');
const btnDelete = document.querySelector('#delete');
const deleteLast = document.querySelector('#deleteLast');
const btnAdd = document.querySelector('#add');
const content = document.querySelector('.content');
const showAll = document.querySelector('#showAll');
const showCompleted = document.querySelector('#showCompleted');
const searchElement = document.querySelector('#search');
const headerInfo = document.querySelector('.header_info');
const allItems = document.querySelector('#all_items');
const completedItems = document.querySelector('#completed_items');
let todos = getName();
let inputValue = '';
let searchValue = '';
if (todos.length) {
    for (let item of todos)addNewBlock(item.text, item.date, item.id, item.isChecked);
    getCountItems();
}
input.addEventListener('input', (event)=>inputValue = event.target.value
);
searchElement.addEventListener('input', (event)=>{
    searchValue = event.target.value;
    searchItem(searchValue);
});
btnDelete.addEventListener('click', ()=>{
    deleteBlocks();
    getCountItems();
    todos = [];
    setName();
});
deleteLast.addEventListener('click', ()=>{
    deleteLastBlock();
    getCountItems();
    todos.pop();
    setName();
});
btnAdd.addEventListener('click', ()=>{
    if (!inputValue.length) alert('Введите свой текст');
    else {
        let date = getCurrentDate();
        let id;
        if (todos.length) id = todos[todos.length - 1].id + 1;
        else id = 1;
        addNewBlock(inputValue, date, id);
        processData(inputValue, date, id);
        getCountItems();
    }
});
showCompleted.addEventListener('click', ()=>showCompletedItems()
);
showAll.addEventListener('click', ()=>showAlldItems()
);
function addItemBlock(id) {
    const newBlock = document.createElement('div');
    addElementProperties(newBlock, 'block_item');
    newBlock.id = 'item_' + id;
    return newBlock;
}
function addCheckBtn(id, block, isChecked) {
    const btn = document.createElement('button');
    addElementProperties(btn, 'new_btn_block', '');
    btn.id = 'check_' + id;
    if (isChecked) checkActiveItem(btn, block);
    btn.addEventListener('click', ()=>{
        checkActiveItem(btn, block);
        getCountItems();
        for(let i in todos)if (todos[i].id === id) {
            if (todos[i].isChecked) todos[i].isChecked = false;
            else todos[i].isChecked = true;
            break;
        }
        setName();
    });
    return btn;
}
function checkActiveItem(btn, block) {
    if (block.classList.contains('active')) {
        block.classList.remove('active');
        btn.innerText = '';
    } else {
        btn.innerText = '✓';
        addElementProperties(block, 'active');
    }
}
function addTextElement(value) {
    const text = document.createElement('p');
    addElementProperties(text, 'input_value', value);
    return text;
}
function addInfoBlock() {
    const info = document.createElement('div');
    addElementProperties(info, 'block_item_info');
    return info;
}
function addDeleteBtn(id) {
    const deleteBtn = document.createElement('button');
    addElementProperties(deleteBtn, 'new_btn_block', 'X');
    deleteBtn.setAttribute('name', 'deleteItem');
    deleteBtn.id = 'delete_' + id;
    deleteBtn.addEventListener('click', ()=>{
        deleteOneBlock(deleteBtn);
        getCountItems();
        for(let i in todos)if (todos[i].id === id) {
            todos.splice(i, 1);
            break;
        }
        setName();
    });
    return deleteBtn;
}
function addDateBlock(curDate) {
    const date = document.createElement('span');
    addElementProperties(date, 'date_current', curDate);
    return date;
}
function addNewBlock(text, date, idBlock, isChecked = false) {
    const newBlock = addItemBlock(idBlock);
    const checkBtn = addCheckBtn(idBlock, newBlock, isChecked);
    const inputValue1 = addTextElement(text);
    const headerInfo1 = addInfoBlock();
    const newDeleteBtn = addDeleteBtn(idBlock);
    const headSpan = addDateBlock(date);
    headerInfo1.appendChild(newDeleteBtn);
    headerInfo1.appendChild(headSpan);
    newBlock.appendChild(checkBtn);
    newBlock.appendChild(inputValue1);
    newBlock.appendChild(headerInfo1);
    content.appendChild(newBlock);
}
function getCurrentDate() {
    let date = new Date().toLocaleDateString();
    return date;
}
function processData(inputValue2, date, id) {
    todos.push({
        id: id,
        date: date,
        text: inputValue2,
        isChecked: false
    });
    setName();
    input.value = '';
    inputValue2 = '';
}
function addElementProperties(element, classElement, textElement = false) {
    element.classList.add(classElement);
    if (textElement !== false) element.innerText = textElement;
}
function deleteBlocks() {
    let deleteAll = document.querySelectorAll('.block_item');
    for(let i = 0; i < deleteAll.length; i++)deleteAll[i].remove();
}
function deleteOneBlock(element) {
    let idButton = element.id.split('_');
    document.querySelector('#item_' + idButton[1]).remove();
}
function deleteLastBlock() {
    let arrBlocks = document.querySelectorAll('.block_item');
    if (arrBlocks.length) arrBlocks[arrBlocks.length - 1].remove();
}
function getCountItems() {
    let countAll = document.querySelectorAll('.block_item');
    let countCheked = document.querySelectorAll('.block_item.active');
    allItems.innerText = `All: ${countAll.length}`;
    completedItems.innerText = `Completed: ${countCheked.length}`;
}
function showCompletedItems() {
    let chekedItems = document.querySelectorAll('.block_item:not(.active)');
    for (let item of chekedItems)item.style.display = 'none';
}
function showAlldItems() {
    let chekedItems = document.querySelectorAll('.block_item:not(.active)');
    for (let item of chekedItems)item.style.display = '';
}
function searchItem(searchValue1) {
    let arrItems = document.querySelectorAll('.block_item');
    for (let item of arrItems)if (searchValue1) item.style.display = 'none';
    else item.style.display = '';
    for(let index in todos)if (todos[index].text.toLowerCase().includes(searchValue1.toLowerCase())) {
        let searchItem1 = document.querySelector('#item_' + todos[index].id);
        if (searchItem1 !== null) searchItem1.style.display = '';
    }
}
function setName() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getName() {
    if (localStorage.getItem('todos')) return JSON.parse(localStorage.getItem('todos'));
    else return [];
}

//# sourceMappingURL=index.09c24910.js.map
