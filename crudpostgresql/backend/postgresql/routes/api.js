const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../bdconfig/database');
var config = require('../config');
var bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    res.send("From API Router")
});

router.post('/register', (req, res) => {
    //const { name, username, email, password } = req.body
    let userData = req.body;
    var hashedPassword = bcrypt.hashSync(userData.password, 13);
    var hasedusername = bcrypt.hashSync(userData.username, 10)
    userData.password = hashedPassword;
    pool.query('INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)',
        [userData.name, userData.username, userData.email, userData.password],
        (error, results) => {
            if (error) {
                throw error
            }
            let payload = {
                subject: hasedusername                
            }
            let token = jwt.sign(payload, config.secret, {
                expiresIn: config.expiredtime
            });
            res.status(200).send({
                auth: true,
                status: "ok",
                token: token,
                msg: "User Added"
            });
        });

});


module.exports = router;