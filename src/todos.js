class Todos {
    constructor() {
        this.todos = []
    }

    add(todo) {
        this.todos.push(todo)
    }

    show() {
        console.log("All todos:");
        for (const td of this.todos) {
            td.sayInfo()
        }
    }
}

export {Todos}