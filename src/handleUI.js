const todoCont = document.getElementById("todos")

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
    todos.todos.forEach(todo => {
        const p = document.createElement("p")
        p.textContent = todo.title
        todoCont.appendChild(p)
    })
}

export {drawProjects, allTodos}