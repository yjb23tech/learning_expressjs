// app.get('/api/courses/:uuid', (req, res) => {
//     // let selectedCourse = courses[req.params.uuid - 1]
//     // res.send(`You are currently studying for ${selectedCourse.name}`)

//     const course = courses.find((c) => c.id === parseInt(req.params.uuid))
//     if (!course) {
//         res.status(404).send('The course with given ID was not found')
//     } else {
//         res.send(course)
//     }
// })