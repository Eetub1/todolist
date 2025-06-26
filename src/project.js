class Project {
    static project_id = 1
    constructor(name) {
        this.todos = []
        this.name = name
        this.setProject_id()
    }

    projectInfo() {
        console.log(`${this.name}`);
    }

    getProject_id() {
        console.log(`${this.project_id}`);
    }

    setProject_id()  {
        this.project_id = Project.project_id
        Project.project_id += 1
    }

    addTodo(todo) {
        this.todos.push(todo)
    }
}

export {Project}