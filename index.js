const Joi = require('joi'); 
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course1'}, 
    { id: 2, name: 'course2'}, 
    { id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('Hello world!!! Higher')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(404).send(error.details[0].message)
        return
    }

   if (error) {
    res.status(400).send(error.details[0].message)
    return
   }

   const course = courses.find((c) => {
        c.id === parseInt(req.params.id)
   })

   if (!course) {
        res.status(404).send('The course with given ID was not found')
    } else {
        res.send(course)
    }
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params)
})

app.get('/api/posts/:location', (req, res) => {
    res.send(req.query); 
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

   if (error) {
    res.status(400).send(error.details[0].message)
    return
   }

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', function(req, res) {
    // Look up the course 
    // If the course doesn't exist, we need to return 404 - resource not found
    const course = courses.find((c) => {
        c.id === parseInt(req.params.id)
        if (!course) {
            res.status(400).send('We nuh av date')
        }
    })

    // Validate
    // If invalid, return 400 - bad request

    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .required()
    })

    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return; 
    }

    // Update course
    // Return updated course to the client 
    course.name = req.body.name
    res.send(course)
})

function validateCourse(course) {

    schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .required()
        
    })

    return (schema.validate(course))
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})




