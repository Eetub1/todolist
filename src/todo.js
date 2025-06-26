class Todo {
    static id = 1
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.setTodo_id()
    }

    setTodo_id() {
        this.todo_id = Todo.id
        Todo.id += 1
    }

    getTodo_id() {
        console.log(this.todo_id);
    }

    sayInfo() {
        console.log(`${this.title} ${this.description} ${this.dueDate} ${this.priority}`);
    }
}

export {Todo}