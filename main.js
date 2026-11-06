const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('.todo-list')
let tasks;
if (!localStorage.getItem('task')) {
    tasks = []
} else {
    tasks = JSON.parse(localStorage.getItem('task'))
    renderTasks(tasks)
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (todoInput.value.trim() === '') return alert('please write task')
     const item = todoInput.value.trim()   
    tasks.push(item)
    localStorage.setItem('task', JSON.stringify(tasks))
    renderTasks(tasks)
    todoInput.value = ''
})
todoList.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn')
    if (!btn) return
    tasks.splice(btn.dataset.id,1)
    localStorage.setItem('task',JSON.stringify(tasks))
    renderTasks(tasks)
})
function renderTasks(tasks) {
    todoList.innerHTML = ''
    if(tasks.length === 0) return todoList.innerHTML = `<h4>Add tasks..</h4>`

    const fragment = document.createDocumentFragment();
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        const label = document.createElement('label')
        const checkbox = document.createElement('input')
        const span = document.createElement('span')
        const deleteBtn = document.createElement('button')
        li.className = 'todo-item'
        label.className = 'todo-content'
        deleteBtn.textContent = '*'
        deleteBtn.className = 'delete-btn'
        deleteBtn.type = 'button'
        deleteBtn.dataset.id = index
        checkbox.type = 'checkbox'
        span.textContent = task
        label.append(checkbox, span)
        li.append(label, deleteBtn)
        fragment.append(li)
    });

    todoList.appendChild(fragment)

}

