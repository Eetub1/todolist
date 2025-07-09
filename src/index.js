import './style.css';
import { Todo } from './todo.js'
import { Todos } from './todos.js';
import { Project } from './project.js'
import { Projects } from './projects.js';
import { drawProjects, setAllTodosCont, drawProjectTodos, drawAllTodos, drawTodo} from './handleUI.js';

//setting up the class instances
let projects = new Projects()
let allTodosList = new Todos()

const closeTodoModalBtn = document.getElementById("todoFormCloseBtn")
const closeProjectModalBtn = document.getElementById("projectFormCloseBtn")

//==================================================================================

//code for adding a new project
const projectDialog = document.getElementById("addProjectDialog")
const addProjectBtn = document.getElementById("addProject")
addProjectBtn.addEventListener("click", () => projectDialog.showModal())

const submitProjectBtn = document.getElementById("projectSubmitBtn")
submitProjectBtn.addEventListener("click", (event) => createNewProject(event))

const projectForm = document.forms.addProjectForm

let project
let projectName

/**
 * Function creates a new project object by getting the name of the project
 * from the form. Then the Object is added to the projects object
 * @param {Event} event
 */
function createNewProject(event) {
    event.preventDefault()

    const name = projectForm.prName.value
    if (name.trim() === "") return

    const newProject = new Project(name)
    projects.add(newProject)
    drawProjects(projects, allTodosList)

    projectDialog.close()
    projectForm.reset()

    //LOCALSTORAGE
    setDataObj()
}

/**
 * Function finds the current project that is selected in the UI.
 * If no project is selected, then return nothing
 */
function findCurrentProjectInfo() {
    //saving the clicked projects name so we can add the todo to
    //a specific project
    project = document.getElementById("projectName")
    if (project === null) return
    //the saved project has an attribute project which contains the projects name
    projectName = project.getAttribute("project")
}

/**
 * Function adds a todo to the project that is selected
 * @param {Object} newTodo todo object
 */
function addToCurrentProject(newTodo) {
    projects.projects.forEach(project => {
        if (project.name === projectName) {
            project.addTodo(newTodo)
            drawProjectTodos(project, allTodosList)
        }
    })
}

/**
 * Function finds the project object from projects, which has the same name
 * as the one that is stored in the variable projectName
 * @returns project object
 */
function findProjectObject() {
    return projects.projects.find(project => project.name === projectName)
}

/**
 * Removes the project and all the todos that it hast from the projects object
 * Updates the screen after
 * @param {Event} event
 */
function removeProject(event) {
    event.stopPropagation();
    const id = parseInt(event.target.id.split("-")[1])

    projects.projects = projects.projects.filter(project => project.project_id !== id)
    allTodosList.todos = allTodosList.todos.filter(todo => todo.project_id !== id)
    
    drawProjects(projects, allTodosList)
    drawAllTodos(allTodosList)

    //LOCALSTORAGE
    setDataObj()
}

//==================================================================================

//code for adding new todos
const todoDialog = document.getElementById("addTodoDialog")

const saveChangesBtn = document.getElementById("todoSaveChanges")
saveChangesBtn.addEventListener("click", (event) => applyChanges(event))

const todoSubmitBtn = document.getElementById("todoSubmitBtn")
todoSubmitBtn.addEventListener("click", (event) => addTodo(event))
const todoForm = document.forms.addTodoForm
const radioButtons = document.querySelectorAll(".todoRadioBtn")

//adding a new todo only to all todos, not into a specific project
const addToAllTodosBtn = document.getElementById("addToAllTodos")
addToAllTodosBtn.addEventListener("click", () => {
    todoDialog.showModal()
    saveChangesBtn.style.display = "none"
    todoSubmitBtn.style.display = "block"
})

/**
 * Adds a todo to the all todos object by extracting the info from the 
 * todoForm
 * @param {Event} event
 * @returns 
 */
function addTodo(event) {
    event.preventDefault()
    const title = todoForm.title.value
    const description = todoForm.description.value
    const dueDate = todoForm.dueDate.value

    let priority
    radioButtons.forEach(button => {
        if (button.checked) priority = button.value;
    })

    if (title.trim() === "" || description.trim() === "" || dueDate.trim() === "") return

    const newTodo = new Todo(title, description, dueDate, priority)
    allTodosList.add(newTodo)

    todoDialog.close()
    todoForm.reset()
    updateScreen()

    //if a project has been clicked open, then project isnt null
    //and the todo is added to that project
    if (project !== null) addToCurrentProject(newTodo)

    //LOCALSTORAGE
    setDataObj()
}

//==================================================================================
let clickedTodo

/**
 * Shows the todos info when clicked. Pulls up the todoForm but with
 * the todos info and the button changed to saveChanges
 * @param {Event} event 
 */
function showTodoInfo(event) {
    event.preventDefault()
    todoDialog.showModal()
    saveChangesBtn.style.display = "block"
    todoSubmitBtn.style.display = "none"
    
    for (const todo of allTodosList.todos) {
        if (todo.title === event.target.id) {
            clickedTodo = todo
        }
    }

    todoForm.title.value = clickedTodo.title
    todoForm.description.value = clickedTodo.description
    todoForm.dueDate.value = clickedTodo.dueDate

    const todoPriority = clickedTodo.priority
    radioButtons.forEach(button => {
        if (button.value === todoPriority) button.checked = true
    })
}

/**
 * When the saveChanges button is pressed, all the information is saved on
 * the todo object
 * @param {Event} event 
 */
function applyChanges(event) {
    event.preventDefault()

    clickedTodo.title = todoForm.title.value
    clickedTodo.description = todoForm.description.value
    clickedTodo.dueDate = todoForm.dueDate.value

    clickedTodo.priority = ""
    radioButtons.forEach(button => {
        if (button.checked) clickedTodo.priority = button.value;
    })

    todoDialog.close()
    todoForm.reset()
    updateScreen()

    //LOCALSTORAGE
    setDataObj()
}

/**
 * Either draws all todos to the screen or the current project and its todos
 * if a project is selected at the moment
 */
function updateScreen() {
    findCurrentProjectInfo()
    if (project === null) {
        drawAllTodos(allTodosList)
    } else {
        const projectObj = findProjectObject()
        drawProjectTodos(projectObj, allTodosList)
    }
}

/**
 * Removes a todo from the todos object
 * @param {string} id of the todo that is to be removed
 */
function removeTodo(id) {
    let num = parseInt(id)
    allTodosList.remove(num)
    updateScreen()

    //LOCALSTORAGE
    setDataObj()
}

closeTodoModalBtn.addEventListener("click", () => {
    todoDialog.close()
    todoForm.reset()
})

closeProjectModalBtn.addEventListener("click", () => {
    projectDialog.close()
    projectForm.reset()
})

//==================================================================================
let dataObjJSON

/**
 * Whenever a change happens to some object in the todoApp this function
 * updates that to localstorage
 */
function setDataObj() {
    const data = {
        projects: projects.projects,
        allTodos: allTodosList.todos
    }

    const dataObjString = JSON.stringify(data)
    localStorage.setItem("dataObj", dataObjString)
}

/**
 * Fetches data from localstorage and if there is data, then
 * updates the projects and todos objects based on that
 */
function fetchData() {
    const fetchedData = localStorage.getItem("dataObj")

    if (!fetchedData) {
        console.log("No data in localstorage")
    }
    dataObjJSON = JSON.parse(fetchedData)
    console.log("Heres the parsed data: ", dataObjJSON);

    if (dataObjJSON.projects.length > 0) {
        dataObjJSON.projects.map(project => {
            const newProject = new Project(project.name, project.project_id)
            projects.add(newProject)
        })
    }

    if (dataObjJSON.allTodos.length > 0) {
        dataObjJSON.allTodos.map(todo => {
            const newTodo = new Todo(
                todo.title, 
                todo.description, 
                todo.dueDate,
                todo.priority,
                todo.project_id,
                todo.project_id
            )
            allTodosList.add(newTodo)
        })
    }
    setDataObj()
}

function main() {
    fetchData()
    drawProjects(projects, allTodosList)
    drawAllTodos(allTodosList)
    setAllTodosCont(allTodosList)
}

main()

export {todoDialog, saveChangesBtn, todoSubmitBtn, showTodoInfo, removeTodo, removeProject}

