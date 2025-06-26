import './style.css';
import { Todo } from './todo.js'
import { Todos } from './todos.js'
import { Project } from './project.js'
import { Projects } from './projects.js';
import { drawProjects } from './handleUI.js';

function testClasses() {
//todo 1
const shower = new Todo("shower", "take a shower nerd", "right about now", "IMPORTANT")
shower.sayInfo()
shower.getTodo_id()

console.log("");

//todo 2
const doStuff = new Todo("stuff", "do stuff", "dunno", "?")
doStuff.sayInfo()
doStuff.getTodo_id()

console.log("");

//project 1
const stuff = new Project("Stuff!")
stuff.projectInfo()
stuff.getProject_id()

console.log("");

//adding todo 1 to project 1
stuff.addTodo(shower)
shower.sayInfo()
//adding todo 2 to project 1
stuff.addTodo(doStuff)
doStuff.sayInfo()

console.log("");

// project 2
const hygiene = new Project("Hygiene")
hygiene.projectInfo()
hygiene.getProject_id()

//adding todo 2 to project 2
hygiene.addTodo(shower)
shower.sayInfo()

console.log("")

//todos list, adding all todos to a list
const todos = new Todos()
todos.add(doStuff)
todos.add(shower)
todos.show()

console.log("");

//adding project to projects list
const projects = new Projects()
projects.add(stuff)
projects.show()

drawProjects(projects)

}

testClasses()


