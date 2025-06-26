function drawProjects(projects) {
    const projectsCont = document.getElementById("projects")

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
    const todoCont = document.getElementById("todos")
    todoCont.textContent = ""
    project.todos.forEach(todo => {
        const p = document.createElement("p")
        p.textContent = todo.title
        todoCont.appendChild(p)
    })
}

export {drawProjects}