const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Colombia2018',
    port: 5432,
});

//const connectionString = 'postgresql://postgres:postgres@localhost:5432/postgres'

//const pool = new Pool({
//  connectionString: connectionString,
//})

/**
 * Get All Users un db
 * @param {*} request 
 * @param {*} response 
 */
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Get user by Id
 * @param {*} request 
 * @param {*} response 
 */
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Create a New user
 * @param {*} request 
 * @param {*} response 
 */
const createUser = (request, response) => {
    const { name, username, email, password } = request.body

    pool.query('INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)', [name, username, email, password], (error, results) => {
        if (error) {
            throw error
        }        
        response.status(201).send({ "msg": "User added" });
    })
}

/**
 * Update a User exists
 * @param {*} request 
 * @param {*} response 
 */
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, username, email, password } = request.body

    pool.query(
        'UPDATE users SET name = $1, username=$2,email = $3, password = $4 WHERE id = $5',
        [name, username, email, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ "msg": `User modified with ID: ${id}` });
        }
    )
}

/**
 * Delete User Exists
 * @param {*} request 
 * @param {*} response 
 */
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ "msg": `User deleted with ID: ${id}` });
    })
}

/**
 * Export methods User Ws
 */
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}