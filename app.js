import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

/*** Middleware ***/
app.use(bodyParser.json());


/*** Routse ***/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

// get all people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e));
});
// Get person by record Id
// find one person by id
app.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.body)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                } else {
                    res.status(404).json({ error: 'Person Not Found' });
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});


//Create new person
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDb => {
            res.status(201).json({ person: personNewFromDb });
        })
        .catch(e => console.log(e));

});
//Delete
app.delete('/api/person/:id', (req, res) => {
    // models.Person.destroy({
    //     where: { id: req.params.id }
    // }).then(personDeleteFromDb => {
    //     res.status(204).json({ person: personDeleteFromDb });
    // })
    //     .catch(e => console.log(e));

    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(() => {
                res.status(200).json({
                    result: `Record ID ${req.params.id} Delete`,
                    success: true
                });
            })

        })
        .catch(e => console.log(e));
});

//Update an existing Person
// app.put('/api/person/:id', (req, res) => {
//     models.Person.findByPk(req.body)
//         .then(personUpdateFromDb => {
//             res.status(200).json({ person: personUpdateFromDb });
//         })
//         .catch(e => console.log(e));

// });



// Update an existing Person
http://localhost:3000/api/person/533
app.put('/api/person/:id', (req, res) => {
    // Find Person By ID sent to us by User in the URL
    models.Person.findByPk(req.params.id).then(person => {
        // Call the Update function on the Person the database sent us back.
        // Only update the fields I care about.
        person.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }).then(person => {
            // The database was able to update the user
            // And it sent us back an updated Record with the new information
            // We can now send back this new information to the user
            res.status(200).json({ person: person });
        }).catch(e => console.log(e));

    }).catch(e => console.log(e));
});




// localhost:3000/people.html 
// localhost:3000/api/people
// localhost:3000/api/person/2
// POST localhost:3000/api/person/2

app.listen(port, () => console.log(`express-api app listening on port ${port}!`));


