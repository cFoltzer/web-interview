import React, { useRef, useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

const url = 'http://localhost:3001';

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const timeout = useRef();
  
  const saveChanges = (todo) => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo)
      };
      return fetch(`${url}/todos/${todo.id}/update`, requestOptions)
        .then(async response => {
          if (response.status === 200) {
            saveTodoList({ todos });
          }
        })
        .catch((e) => {
          console.error(`An error occured: ${e}`)
        });
    }, 500);
  }

  const updateCompleted = (todo) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    };
    return fetch(`${url}/todos/${todo.id}/complete`, requestOptions)
      .then(async response => {
        if (response.status === 200) {
          saveTodoList({ todos });
        }
      })
      .catch((e) => {
        console.error(`An error occured: ${e}`)
      });
  }

  const addItem = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(`${url}/lists/${todoList.id}/add`, requestOptions)
      .then(response => response.json())
      .then(response => {
        setTodos([...response]);
      })
      .catch((e) => {
        console.error(`An error occured: ${e}`)
      });
  }

  const deleteItem = (todoItem, index) => {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(`${url}/todos/${todoItem.id}/delete`, requestOptions)
      .then(async response => {
        if (response.status === 200) {
          setTodos([
            // immutable delete
            ...todos.slice(0, index),
            ...todos.slice(index + 1),
          ])
          saveTodoList({ todos });
        }
      })
      .catch((e) => {
        console.error(`An error occured: ${e}`)
      });
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.title}
                onChange={(event) => {
                  let updatedTodo = todo;
                  updatedTodo.title = event.target.value;
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    updatedTodo,
                    ...todos.slice(index + 1),
                  ])
                  saveChanges(updatedTodo);
                }}
              />
              <input type="checkbox"
                checked={todo.completed === 1}
                onChange={(event) => {
                  let updatedTodo = todo;
                  updatedTodo.completed = event.target.checked ? 1 : 0;
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    updatedTodo,
                    ...todos.slice(index + 1),
                  ])
                  updateCompleted(updatedTodo);
                }}/>
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='primary'
                onClick={() => {
                  deleteItem(todo, index);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                addItem();
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
