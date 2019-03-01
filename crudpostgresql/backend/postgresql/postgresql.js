const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const db = require('./query')
const api = require('./routes/api');
const port = 4000

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/api',api);

///cabeceras aceptadas
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Access, Access-Control-Allow-Methods'); //, Access, Access-Control-Allow-Methods, X-API-KEY, Origin, X-Requested-With
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})