import { showTodoInfo } from "./index.js"
import {todoDialog, saveChangesBtn, todoSubmitBtn} from "./index.js"

const todoCont = document.getElementById("todos")
const allTodosBtnCont = document.getElementById("allTodos")

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
 * calls the drawAllTodos function
 * @param {Object} todos Object containing all todos
 */
function setAllTodosCont(todos) {
    const p = document.createElement("p")
    p.textContent = "All todos"
    p.addEventListener("click", () => {
        drawAllTodos(todos)
    })
    allTodosBtnCont.appendChild(p)
}

function drawAllTodos(todos) {
    todoCont.textContent = ""
    todos.todos.forEach(todo => drawTodo(todo))
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

export {drawProjects, setAllTodosCont, drawProjectTodos, drawAllTodos, drawTodo}