class Todo {
    static id = 1
    constructor(title, description, dueDate, priority, project_id=-1) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project_id = project_id
        this.setTodo_id()
    }

    setTodo_id() {
        this.todo_id = Todo.id
        Todo.id += 1
    }

    getTodo_id() {
        return this.todo_id
    }

    sayInfo() {
        console.log(`${this.title} ${this.description} ${this.dueDate} ${this.priority}`);
    }
}

export {Todo}