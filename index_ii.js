const Joi = require('joi')
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

    // if (!req.body.name || req.body.name.length < 3) {
    //     // 400 Bad Request 
    //     res.status(400).send("Name is required and should be a minimum of 3 characters I'm afraid!")
    //     return; 

    // }
    // const course = {
    //     id: courses.length + 1, 
    //     name: req.body.name
    // }

    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
    })

    const result = schema.validate(req.body)
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    } else {
        courses.push(course)
        res.send(course)
        console.log("All systems go")
    }
})

app.put('/api/courses/:id', (req, res) => {
    //Look up the course with it's id; if it doesn't exist, we need to return 404
    const course = courses.find((c) => c.id === parseInt(req.params.id))

    if (!course) {
        res.status(404).send('The course you are looking to overrite does not exist')
    } else {
        console.log("Hit me!")
    }

    // If the course you wish to update exists, we need to validate that the course you are looking to replace the known course with
    // has been structured appropriately 
    // If invalid, return 400 - bad request 
    const schema = Joi.object({

        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
    })

    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    } else {
        console.log('Feeling even better than I was the last time!')
    }

    // Update the course
    // Return the updated course 
    course.name = req.body.name 
    res.send(course)
})

// Ports 
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})

// Everything above is working right now @ 20.51 PM



