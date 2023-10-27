const express = require('express');
const app = express();
const pool = require('./config');
const router = require('./routes/index');
const port = 3000;

pool.connect(err => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Connected")
    }
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.listen(port, () => {
    console.log('App Listening on port ' + port);
})