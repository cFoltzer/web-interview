const express = require('express'); //import express

const router  = express.Router(); 
const todoController = require('../controllers/todo-controller'); 
router.get('/lists', todoController.getTodoLists);
router.get('/lists/:id/todos', todoController.getListTodos);
router.post('/lists/:id/add', todoController.addTodoItem);
router.put('/todos/:id/update', todoController.updateTodoTitle);
router.put('/todos/:id/complete', todoController.updateTodoCompleted);
router.delete('/todos/:id/delete', todoController.deleteTodoItem);
module.exports = router;