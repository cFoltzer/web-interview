const Todo = require('../models/todo')
const TodoList = require('../models/todo-list')

const getTodoLists = (req, res) => {
    TodoList.all((err, list) => {
        if (err) {
            res.status(404).send();
        } else {
            res.json(list);
        }
    })
}

const getListTodos = (req, res) => {
    var id = parseInt(req.params.id);
    Todo.selectTodosOfList(id, (err, todos) => {
        if (err) {
            res.status(404).send();
        } else {
            res.json(todos);
        }
    })
}

const updateTodoTitle = (req, res) => {
    var id = parseInt(req.params.id);
    var updatedTodo = req.body;
    Todo.updateTodoTitle(id, updatedTodo.title, (err, todo) => {
        if(err) {
            res.status(404, 'Todo not found').send();
        } else {
            res.json(todo);
        }
    })
}

const updateTodoCompleted = (req, res) => {
    var id = parseInt(req.params.id);
    var updatedTodo = req.body;
    Todo.updateTodoCompleted(id, updatedTodo.completed, (err, todo) => {
        if (err) {
            res.status(404, 'Todo not found').send();
        } else {
            res.json(todo);
        }
    })
}

const addTodoItem = (req, res) => {
    var listId = parseInt(req.params.id);
    Todo.addTodo(listId, (err) => {
        if (err) {
            res.status(404, 'List not found').send();
        } else {
            Todo.selectTodosOfList(listId, (err, result) => {
                if (err) {
                    res.status(404, 'Could not fetch todos').send();
                } else {
                    res.json(result);
                }
            })
        }
    })
}

const deleteTodoItem = (req, res) => {
    var id = parseInt(req.params.id);
    Todo.deleteTodo(id, (err) => {
        if (err) {
            res.status(404, 'Todo not found').send();
        } else {
            res.status(200).send();
        }
    })
}

module.exports = {getTodoLists, getListTodos, updateTodoTitle, updateTodoCompleted, addTodoItem, deleteTodoItem};