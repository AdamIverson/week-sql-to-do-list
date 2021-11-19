const pool = require('../modules/pool.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET /tasks');
    const sqlText = 'SELECT * FROM tasks;';
    pool.query(sqlText)
        .then((dbResult) => {
        console.log(`${dbResult.rows.length} rows to send.`)
        res.send(dbResult.rows);
    })
        .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log('POST /tasks');
    console.log('req.body:', req.body);
    const newTask = req.body;
    const sqlText = `
        INSERT INTO "tasks"
            ("task", "completed")
        VALUES
            ($1, $2);
    `;
    const sqlValues = [
        newTask.task,
        newTask.completed
    ];
    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        console.log('\tINSERT succeeded.');
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    });
});


module.exports = router;