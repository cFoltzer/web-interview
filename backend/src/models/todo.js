const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS todos (id integer primary key, title, completed, list_id)';
    db.run(sql);
    db.run('INSERT INTO todos(title, completed, list_id) VALUES("First item of first list", false, 1)');
    db.run('INSERT INTO todos(title, completed, list_id) VALUES("First item of second list", false, 2)');
});

class Todo {

    constructor(id, title, listId) {
        this.id = id;
        this.title = title;
        this.listId = listId;
    }

    static all(callback) {
        db.all('SELECT * FROM todos', callback);
    }

    static selectTodosOfList(todoListId, callback) {
        db.all('SELECT * FROM todos WHERE list_id=' + todoListId, callback);
    };

    static updateTodoTitle(todoId, title, callback) {
        const sql = 'UPDATE todos SET title = ? WHERE id = ?';
        db.run(sql, title, todoId, callback);
    }

    static updateTodoCompleted(todoId, completed, callback) {
        const sql = 'UPDATE todos SET completed = ? WHERE id = ?';
        db.run(sql, completed, todoId, callback);
    }

    static addTodo(listId, callback) {
        const sql = 'INSERT INTO todos(title, completed, list_id) VALUES("", false, ?)';
        db.run(sql, listId,  callback);
    }

    static deleteTodo(todoId, callback) {
        const sql = 'DELETE FROM todos WHERE id = ?';
        db.run(sql, todoId, callback);
    }

}

module.exports = Todo;