const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('.todo-list')
let tasks;
if (!localStorage.getItem('task')) {
    tasks = [
        {
            task: 'Example Task',
            completed: false,
        }
    ]
} else {
    tasks = JSON.parse(localStorage.getItem('task'))

}
renderTasks(tasks)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (todoInput.value.trim() === '') return alert('please write task')
    const inputValue = todoInput.value.trim()
    if (!localStorage.getItem('task')) {
        tasks = []
    }
    const item = {
        task: inputValue,
        completed: false
    }
    tasks.push(item)
    localStorage.setItem('task', JSON.stringify(tasks))
    renderTasks(tasks)
    todoInput.value = ''
})
todoList.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn')
    if (!btn) return

    tasks.splice(btn.dataset.id, 1)
    localStorage.setItem('task', JSON.stringify(tasks))
    renderTasks(tasks)

})
todoList.addEventListener('change', (e) => {
    const checkbox = e.target.closest('.todo-checkbox')
    if (!checkbox) return

    const task = checkbox.dataset.id
    tasks[task].completed = checkbox.checked
    localStorage.setItem('task', JSON.stringify(tasks))
    renderTasks(tasks)
})
function renderTasks(tasks) {
    todoList.innerHTML = ''
    if (tasks.length === 0) return todoList.innerHTML = `<h4>Add tasks...</h4>`

    const fragment = document.createDocumentFragment();
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        const label = document.createElement('label')
        const checkbox = document.createElement('input')
        const span = document.createElement('span')
        const deleteBtn = document.createElement('button')
        li.className = 'todo-item'
        label.className = 'todo-content'
        deleteBtn.textContent = 'x'
        deleteBtn.className = 'delete-btn'
        deleteBtn.type = 'button'
        deleteBtn.dataset.id = index
        checkbox.className = 'todo-checkbox'
        checkbox.type = 'checkbox'
        checkbox.dataset.id = index
        checkbox.checked = task.completed
        span.textContent = task.task
        label.append(checkbox, span)
        li.append(label, deleteBtn)
        fragment.append(li)
    });

    todoList.appendChild(fragment)

}

