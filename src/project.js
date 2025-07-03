class Project {
    static next_id = 1

    constructor(name) {
        this.name = name
        this.setProject_id()
    }

    projectInfo() {
        return this.name
    }

    getProject_id() {
        return this.project_id
    }

    setProject_id()  {
        this.project_id = Project.next_id
        Project.next_id += 1
    }

    addTodo(todo) {
        todo.project_id = this.project_id
    }
}

export {Project}