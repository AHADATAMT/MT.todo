
masterTodoList = localStorage.getItem('MT.todo') ? JSON.parse(localStorage.getItem('MT.todo')) : [];

const $form = document.querySelector('#todo');
const $todoInput = $form.querySelector('input[type="text"]');
const $showNotDone = $form.querySelector('input[type="checkbox"]');
const $todoBtn = $form.querySelector('#todo a');
const $ulTaskList = document.querySelector('#todo_container ul');

let html = '';

let addTodo = () => {
    let task = $todoInput.value;
    if (task !== '') {
        masterTodoList.push({ text: task, isDone: false });
    }
    $todoInput.value = '';
    updateTodoList();
}
$todoBtn.addEventListener('click', addTodo);

const updateTodoList = () => {
    let html = masterTodoList.reduce((accumulator, currentValue, index) => {
        let stringCurrent = `<li><p><label><input id="box${index}" type="checkbox" ${(masterTodoList[index].isDone) ? 'checked="checked"' : ''} class="filled-in"><span onclick="toggleDone(${index})"></span></label>${currentValue.text}</p>` +
            `<span><a onclick="remove(${index})" href="#">Remove</a></span></li>`;
        if ($showNotDone.checked == true) {
            if (!currentValue.isDone)
                return accumulator + stringCurrent;
            else
                return accumulator;

        } return accumulator + stringCurrent;


    }, '');
    $ulTaskList.innerHTML = html;
    console.log(masterTodoList);
    localStorage.setItem('MT.todo', JSON.stringify(masterTodoList));
}
updateTodoList();
function remove(index) {
    masterTodoList.splice(index, 1);
    updateTodoList();
}

function toggleDone(index) {
    masterTodoList[index].isDone = !masterTodoList[index].isDone;
    updateTodoList();
}

$showNotDone.addEventListener('change', ()=>{
    updateTodoList();
});