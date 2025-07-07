import './style.css';
import { Todo } from './todo.js'
import { Todos } from './todos.js';
import { Project } from './project.js'
import { Projects } from './projects.js';
import { drawProjects, setAllTodosCont, drawProjectTodos, drawAllTodos, drawTodo} from './handleUI.js';

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

function createNewProject(event) {
    event.preventDefault()
    const name = projectForm.prName.value
    if (name.trim() === "") return

    const newProject = new Project(name)
    projects.add(newProject)
    drawProjects(projects, allTodosList)
    projectDialog.close()
    projectForm.reset()
}

//finds the current project that is selected
function findCurrentProjectInfo() {
    //saving the clicked projects name so we can add the todo to
    //a specific project
    project = document.getElementById("projectName")
    if (project === null) return
    projectName = project.getAttribute("project")
}

//adds a todo to the project that is selected
function addToCurrentProject(newTodo) {
    //finding the right project object
    projects.projects.forEach(project => {
        if (project.name === projectName) {
            project.addTodo(newTodo)
            drawProjectTodos(project, allTodosList)
        }
    })
}

function findProjectObject() {
    return projects.projects.find(project => project.name === projectName)
}

function removeProject(event) {
    event.stopPropagation();
    const id = parseInt(event.target.id.split("-")[1])

    //deleting the project from the list and then updating the projects list
    projects.projects = projects.projects.filter(project => project.project_id !== id)

    //deleting all the todos belonging to the project that was deleted
    allTodosList.todos = allTodosList.todos.filter(todo => todo.project_id !== id)

    //drawing the projects container again
    drawProjects(projects, allTodosList)

    //drawing theAllTodos page for now
    //maybe in the future make it so that if there is another project remaining, that is rendered instead
    //of always being allTodos that gets rendered whenever a project is deleted
    drawAllTodos(allTodosList)
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

    //console.log(title, description, dueDate, priority);

    const newTodo = new Todo(title, description, dueDate, priority)
    allTodosList.add(newTodo)

    todoDialog.close()
    todoForm.reset()
    updateScreen()
    if (project !== null) addToCurrentProject(newTodo)
}

//adding a new todo only to all todos, not into a specific project
const addToAllTodosBtn = document.getElementById("addToAllTodos")
addToAllTodosBtn.addEventListener("click", () => {
    todoDialog.showModal()
    saveChangesBtn.style.display = "none"
    todoSubmitBtn.style.display = "block"
})

//==================================================================================
let clickedTodo

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
}

function updateScreen() {
    findCurrentProjectInfo()
    if (project === null) {
        drawAllTodos(allTodosList)
    } else {
        const projectObj = findProjectObject()
        drawProjectTodos(projectObj, allTodosList)
    }
}

function removeTodo(id) {
    let num = parseInt(id)
    allTodosList.remove(num)
    updateScreen()
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

//function adds example data to the page
function testClasses() {

    //chatGPT generated example data
    const todo1 = new Todo("Buy groceries", "Milk, eggs, bread", "2025-06-30", "high");
    const todo2 = new Todo("Call mom", "Check in and chat", "2025-07-01", "medium");
    const todo3 = new Todo("Workout", "Leg day at the gym", "2025-06-27", "high");
    const todo4 = new Todo("Read book", "Finish reading 'Clean Code'", "2025-07-05", "low");
    const todo5 = new Todo("Pay bills", "Electricity and water", "2025-06-28", "high");

    allTodosList.add(todo1);
    allTodosList.add(todo2);
    allTodosList.add(todo3);
    allTodosList.add(todo4);
    allTodosList.add(todo5);

    setAllTodosCont(allTodosList)

    const defaultProject = new Project("Default project")

    projects.add(defaultProject)

    drawProjects(projects, allTodosList)
}
testClasses()

export {todoDialog, saveChangesBtn, todoSubmitBtn, showTodoInfo, removeTodo, removeProject}

