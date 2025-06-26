import './style.css';
import { Todo } from './todo.js'
import { Todos } from './todos.js';
import { Project } from './project.js'
import { Projects } from './projects.js';
import { drawProjects, allTodos} from './handleUI.js';

const projects = new Projects()
const allTodosList = new Todos()

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

//function adds example data to the page
function testClasses() {

    //chatGPT generated example data
    const todo1 = new Todo("Buy groceries", "Milk, eggs, bread", "2025-06-30", "High");
    const todo2 = new Todo("Call mom", "Check in and chat", "2025-07-01", "Medium");
    const todo3 = new Todo("Workout", "Leg day at the gym", "2025-06-27", "High");
    const todo4 = new Todo("Read book", "Finish reading 'Clean Code'", "2025-07-05", "Low");
    const todo5 = new Todo("Pay bills", "Electricity and water", "2025-06-28", "High");
    const shower = new Todo("shower", "take a shower nerd", "right about now", "IMPORTANT")
    const doStuff = new Todo("stuff", "do stuff", "dunno", "?")

    allTodosList.add(todo1);
    allTodosList.add(todo2);
    allTodosList.add(todo3);
    allTodosList.add(todo4);
    allTodosList.add(todo5);
    allTodosList.add(shower);
    allTodosList.add(doStuff);

    allTodos(allTodosList)

    const stuff = new Project("Stuff!")
    stuff.addTodo(shower)
    stuff.addTodo(doStuff)

    const hygiene = new Project("Hygiene")
    hygiene.addTodo(shower)

    projects.add(stuff)
    projects.add(hygiene)

    drawProjects(projects)
}
testClasses()



