import './style.css';
import { Todo } from './todo.js'
import { Todos } from './todos.js';
import { Project } from './project.js'
import { Projects } from './projects.js';
import { drawProjects, allTodos, drawProjectTodos} from './handleUI.js';

const projects = new Projects()
const allTodosList = new Todos()
let addOnlyToAllTodos = false

//==================================================================================

//code for adding a new project
const projectDialog = document.getElementById("addProjectDialog")
const addProjectBtn = document.getElementById("addProject")
addProjectBtn.addEventListener("click", () => projectDialog.showModal())
const submitProjectBtn = document.getElementById("projectSubmitBtn")
submitProjectBtn.addEventListener("click", (event) => createNewProject(event))
const projectForm = document.forms.addProjectForm

function createNewProject(event) {
    event.preventDefault()
    const name = projectForm.prName.value
    if (name.trim() === "") return
    const newProject = new Project(name)
    projects.add(newProject)
    drawProjects(projects)
    projectDialog.close()
    projectForm.reset()
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

    //check if any field is empty
    if (title.trim() === "" || description.trim() === "" || dueDate.trim() === "") return

    console.log(title, description, dueDate, priority);

    const newTodo = new Todo(title, description, dueDate, priority)
    allTodosList.add(newTodo)

    //if this variable is true then skip this block of code
    //and only add the todo to the all todos page, not also
    //to a specific project
    if (!addOnlyToAllTodos) {
        //saving the clicked projects name so we can add the todo to
        //a specific project
        const project = document.getElementById("projectName")
        const projectName = project.getAttribute("project")

        //finding the right project object
        projects.projects.forEach(project => {
            if (project.name === projectName) {
                project.addTodo(newTodo)
                drawProjectTodos(project)
            }
        })
    }
    todoDialog.close()
    todoForm.reset()
    addOnlyToAllTodos = false
}

//adding a new todo only to all todos, not into a specific project
const addToAllTodosBtn = document.getElementById("addToAllTodos")
addToAllTodosBtn.addEventListener("click", addToAllTodos)

//when Add todo button is pressed, it sets the variable true, so
//that the todo only goes to the all todos page
function addToAllTodos() {
    addOnlyToAllTodos = true
    todoDialog.showModal()
    saveChangesBtn.style.display = "none"
    todoSubmitBtn.style.display = "block"
}

//==================================================================================
let clickedTodo

function showTodoInfo(event) {
    event.preventDefault()
    todoDialog.showModal()
    saveChangesBtn.style.display = "block"
    todoSubmitBtn.style.display = "none"
    //console.log(event.target);

    
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
    
}

//==================================================================================

//function adds example data to the page
function testClasses() {

    //chatGPT generated example data
    const todo1 = new Todo("Buy groceries", "Milk, eggs, bread", "2025-06-30", "high");
    const todo2 = new Todo("Call mom", "Check in and chat", "2025-07-01", "medium");
    const todo3 = new Todo("Workout", "Leg day at the gym", "2025-06-27", "high");
    const todo4 = new Todo("Read book", "Finish reading 'Clean Code'", "2025-07-05", "low");
    const todo5 = new Todo("Pay bills", "Electricity and water", "2025-06-28", "high");

    const shower = new Todo("Take a shower", "You stink", "today", "high")

    allTodosList.add(todo1);
    allTodosList.add(todo2);
    allTodosList.add(todo3);
    allTodosList.add(todo4);
    allTodosList.add(todo5);
    allTodosList.add(shower);

    allTodos(allTodosList)

    const stuff = new Project("Important stuff")
    stuff.addTodo(shower)

    const hygiene = new Project("Hygiene")
    hygiene.addTodo(shower)

    projects.add(stuff)
    projects.add(hygiene)

    drawProjects(projects)
}
testClasses()

export {showTodoInfo}

