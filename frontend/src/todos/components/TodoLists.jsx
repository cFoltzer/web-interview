import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const url = 'http://localhost:3001';

const fetchTodoLists = () => {
  return fetch(`${url}/lists`)
    .then(response => response.json())
    .catch((e) => {
      console.error(`An error occured: ${e}`)
    });
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const fetchTodos = (index) => {
    let id = todoLists[index].id;
    return fetch(`${url}/lists/${id}/todos`)
      .then(response => response.json())
      .then(
        (response) => {
          todoLists[index].todos = response;
          setActiveList(index);
        }, 
        (error) => {
          console.error(`An error occured: ${error}`);
        })
      .catch((e) => {
        console.error(`An error occured: ${e}`);
      });
  }

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  // Add error component showing a message if there is an error
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => fetchTodos(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
          setRefreshList={() => {fetchTodos(activeList)}}
        />
      )}
    </Fragment>
  )
}
