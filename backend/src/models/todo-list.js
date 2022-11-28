const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS todo_list (id integer primary key, title)';
    db.run(sql);
    db.run('INSERT INTO todo_list(title) VALUES(?)', 'First List');
    db.run('INSERT INTO todo_list(title) VALUES(?)', 'Second List');
});

class TodoList {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    static all(callback){
        db.all('SELECT * FROM todo_list', callback);
    };
}

module.exports = TodoList;