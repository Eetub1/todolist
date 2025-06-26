import { todos } from './todos.js'

function drawProjects(projects) {
    const projectsCont = document.getElementById("projects")

    projects.projects.forEach(project => {
        const p = document.createElement("p")
        p.id = project.project_id
        p.addEventListener("click", (event) => drawProjectTodos(event))
        p.textContent = project.name
        projectsCont.appendChild(p)
    })
}

function drawProjectTodos(event) {
    //sitten etsitään todos taulukosta kaikki todot, joilla project_id on yhtäkuin 1
    console.log(event.target);

}

export {drawProjects}