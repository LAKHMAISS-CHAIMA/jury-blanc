const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const resourceRoutes = require('./routes/resourceRoutes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 7000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/construction'

app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URI)
.then(() => {console.log('MongoDB is Connected')})
.catch((err) => console.log(err))

app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/resources', resourceRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})