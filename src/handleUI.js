import { showTodoInfo } from "./index.js"

const todoCont = document.getElementById("todos")
const todoDialog = document.getElementById("addTodoDialog")
const allTodosBtnCont = document.getElementById("allTodos")
const saveChangesBtn = document.getElementById("todoSaveChanges")
const todoSubmitBtn = document.getElementById("todoSubmitBtn")

/**
 * Draws all project's names on the left side of the screen
 * Also adds eventlisteners to each one
 * @param {Object} projects Object that contains all projects 
 */
function drawProjects(projects) {
    const projectsCont = document.getElementById("projects")
    projectsCont.textContent = ""

    //projects.projects is a list containing all projects, confusing naming
    projects.projects.forEach(project => {
        const p = document.createElement("p")
        p.id = project.project_id
        p.addEventListener("click", () => drawProjectTodos(project))
        p.textContent = project.name
        projectsCont.appendChild(p)
    })
}

/**
 * Draws a specific projects todos on the screen 
 * @param {Object} project  
 */
function drawProjectTodos(project) {
    todoCont.textContent = ""

    const div = document.createElement("div")

    const button = document.createElement("button")
    button.addEventListener("click", () => {
        todoDialog.showModal()
        saveChangesBtn.style.display = "none"
        todoSubmitBtn.style.display = "block"
    })
    button.textContent = "Add new task"

    const p = document.createElement("p")
    p.id = "projectName"
    p.setAttribute("project", project.name)
    p.textContent = `Project name: ${project.name}`

    div.appendChild(p)
    div.appendChild(button)
    todoCont.appendChild(div)
    project.todos.forEach(todo => drawTodo(todo))
}

/**
 * Adds an eventlistener to the all todos div so that when it's pressed,
 * all todos are drawn on the screen
 * @param {Object} todos Object containing all todos
 */
function allTodos(todos) {
    const p = document.createElement("p")
    p.textContent = "All todos"
    p.addEventListener("click", () => {
        todoCont.textContent = ""
        todos.todos.forEach(todo => drawTodo(todo))
    })
    allTodosBtnCont.appendChild(p)
}

/**
 * Function draws a single todo
 * @param {Object} todo Object
 */
function drawTodo(todo) {
    const date = document.createElement("p")
    date.className = "todoParagraphElem"
    date.textContent = todo.dueDate

    const p = document.createElement("p")
    p.className = "todoParagraphElem todoTitle"
    p.id = todo.title
    p.textContent = todo.title
    p.addEventListener("click", (event) => showTodoInfo(event))

    const div = document.createElement("div")
    div.className = "todoElementContainer"
    div.appendChild(p)
    div.appendChild(date)
    todoCont.appendChild(div)
}

export {drawProjects, allTodos, drawProjectTodos}