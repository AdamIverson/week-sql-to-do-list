const pool = require('../modules/pool.js');
const express = require('express');
const router = express.Router();

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