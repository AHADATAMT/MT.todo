let masterTodoList = [];

if (localStorage.getItem('MT.todo')) {
    masterTodoList = JSON.parse(localStorage.getItem('MT.todo'));
} else {
    masterTodoList = [];
}
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

        let stringCurrent = `<li>${currentValue.text} <a onclick="remove(${index})" href="#">Remove</a>` +
            ` - <a onclick="done(${index})" href="#">${(masterTodoList[index].isDone) ? 'Mark Undone' : 'Done'}</a></li>`;

        if ($showNotDone.checked == true) {
            if (!currentValue.isDone)
                return accumulator + stringCurrent;
            else
                return accumulator;

        } return accumulator + stringCurrent;


    }, '');
    $ulTaskList.innerHTML = html;
    localStorage.setItem('MT.todo', JSON.stringify(masterTodoList));
    console.log(masterTodoList);
}
updateTodoList();

function remove(index) {
    masterTodoList.splice(index, 1);
    updateTodoList();
}
function done(index) {
    masterTodoList[index].isDone = !masterTodoList[index].isDone;
    updateTodoList();
}

$showNotDone.addEventListener('click', () => {
    updateTodoList();
})