const todoCont = document.getElementById("todos")
const todoDialog = document.getElementById("addTodoDialog")

function drawProjects(projects) {
    const projectsCont = document.getElementById("projects")
    projectsCont.textContent = ""

    //projects.projects is a list containing all projects, a bit confusing
    projects.projects.forEach(project => {
        const p = document.createElement("p")
        p.id = project.project_id
        p.addEventListener("click", () => drawProjectTodos(project))
        p.textContent = project.name
        projectsCont.appendChild(p)
    })
}

function drawProjectTodos(project) {
    todoCont.textContent = ""

    const div = document.createElement("div")
    const button = document.createElement("button")
    button.addEventListener("click", () => todoDialog.showModal())
    button.textContent = "Add new task"
    const p = document.createElement("p")
    p.textContent = `Project name: ${project.name}`
    div.appendChild(p)
    div.appendChild(button)
    todoCont.appendChild(div)

    project.todos.forEach(todo => {
        const p = document.createElement("p")
        p.textContent = todo.title
        todoCont.appendChild(p)
    })
}

function allTodos(todos) {
    const allTodosBtnCont = document.getElementById("allTodos")
    const p = document.createElement("p")
    p.textContent = "All todos"
    p.addEventListener("click", () => showAllTodos(todos))
    allTodosBtnCont.appendChild(p)
}

function showAllTodos(todos) {
    todoCont.textContent = ""
    todos.todos.forEach(todo => {
        const p = document.createElement("p")
        p.textContent = todo.title
        todoCont.appendChild(p)
    })
}

export {drawProjects, allTodos}