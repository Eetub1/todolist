function drawProjects(projects) {
    const projectsCont = document.getElementById("projects")

    projects.projects.forEach(project => {
        const p = document.createElement("p")
        p.addEventListener("click", drawProjectTodos)
        p.textContent = project.name
        projectsCont.appendChild(p)

    })
}

function drawProjectTodos() {
    //painetaan p elementtiä. p:lle attribuutti project jolla arvo esim project="1" jos kuuluu projectille 1
    //sitten etsitään todos taulukosta kaikki todot, joilla project_id on yhtäkuin 1
}

export {drawProjects}