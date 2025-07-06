
import {todoDialog, saveChangesBtn, todoSubmitBtn, showTodoInfo, removeTodo, removeProject} from "./index.js"

const todoCont = document.getElementById("todos")
const allTodosBtnCont = document.getElementById("allTodos")

/**
 * Draws all project's names on the left side of the screen
 * Also adds eventlisteners to each one
 * @param {Object} projects Object that contains all projects 
 */
function drawProjects(projects, allTodosList) {
    const projectsCont = document.getElementById("projects")
    projectsCont.textContent = ""

    projects.projects.forEach(project => {
        const projectDiv = document.createElement("div")
        projectDiv.id = project.project_id
        projectDiv.addEventListener("click", () => drawProjectTodos(project, allTodosList))
        //projectDiv.textContent = project.name
        projectDiv.className = "projectDiv"

        const nameP = document.createElement("p")
        nameP.textContent = project.name
        nameP.className = "inline"

        const p = document.createElement("p")
        p.textContent = "X"
        p.className = "deleteProjectBtn"
        p.id = `¤%&#-${project.project_id}`
        p.addEventListener("click", (event) => removeProject(event))

        projectDiv.appendChild(nameP)
        projectDiv.appendChild(p)

        projectsCont.appendChild(projectDiv)
    })
}

/**
 * Draws a specific projects todos on the screen 
 * @param {Object} project  
 */
function drawProjectTodos(project, allTodosList) {
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
    p.textContent = project.name

    div.appendChild(p)
    div.appendChild(button)
    todoCont.appendChild(div)
    
    const projectTodos = allTodosList.todos.filter(todo => project.project_id === todo.project_id);
    projectTodos.forEach(todo => drawTodo(todo))
}

/**
 * Adds an eventlistener to the all todos div so that when it's pressed,
 * calls the drawAllTodos function
 * @param {Object} todos Object containing all todos
 */
function setAllTodosCont(todos) {
    const div = document.createElement("div")
    div.textContent = "All todos"
    div.className = "projectDiv"
    div.addEventListener("click", () => {
        drawAllTodos(todos)
    })
    allTodosBtnCont.appendChild(div)
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

    const remove = document.createElement("p")
    remove.textContent = "X"
    remove.className = "todoParagraphElem removeTodoBtn"
    remove.id = todo.todo_id
    remove.addEventListener("click", (event) => findRemovableTodoId(event))

    const div2 = document.createElement("div")
    div2.className = "removeBtnAndDateCont"
    div2.appendChild(date)
    div2.appendChild(remove)


    const div = document.createElement("div")
    div.className = "todoElementContainer"
    div.appendChild(p)
    div.appendChild(div2)
    todoCont.appendChild(div)
}

function findRemovableTodoId(event) {
    const todoId = event.target.id
    removeTodo(todoId)    
}

export {drawProjects, setAllTodosCont, drawProjectTodos, drawAllTodos, drawTodo}