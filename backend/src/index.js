const express = require('express')
const cors = require('cors')
const app = express()
const todoRoutes = require('./routes/todo-route');

app.use(cors())
app.use(express.json())

const PORT = 3001

app.use('/', todoRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
