class Todos {
    constructor() {
        this.todos = []
    }

    add(todo) {
        this.todos.push(todo)
    }

    remove(id) {
        this.todos.forEach(todo => {
            if (todo.todo_id === id) {
                let index = this.todos.indexOf(todo)
                this.todos.splice(index, 1)
            }
        })
    }

    show() {
        console.log("All todos:");
        for (const td of this.todos) {
            td.sayInfo()
        }
    }
}

export {Todos}