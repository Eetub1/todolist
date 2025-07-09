class Projects {
    constructor() {
        this.projects = []
    }

    add(project) {
        this.projects.push(project)
    }

    show() {
        console.log("All projects: ");
        for (const project of this.projects) {
            console.log(project.name, project.project_id);
        }
    }
}

export {Projects}