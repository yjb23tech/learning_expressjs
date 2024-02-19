const express = require('express')
const app = express()

app.use(express.json())

const courses = [

    {id: 1, name: "Meditations"}, 
    {id: 2, name: "The Bible"}, 
    {id: 3, name: "Othello"}

]

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) 
        {res.status(404).send('The course with the given id was not found')}
    else {
        res.send(course)
    }
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query)
})

app.post('/api/courses', (req, res) => {

    if (!req.body.name || req.body.name.length < 3) {
        // 400 Bad Request 
        res.status(400).send("Name is required and should be a minimum of 3 characters I'm afraid!")
        return; 
        
    }
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

// Ports 
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})

// Everything above is working right now @ 20.51 PM



