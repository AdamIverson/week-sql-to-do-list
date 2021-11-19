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

// :id is a ROUTE PARAMETER
  // the entire path of this route is
  // /songs/:id
  // To hit this route, we'd need a request like:
    // GET /songs/123
router.get('/:id', (req, res) => {
    console.log('GET /tasks/:id')
    console.log('req.params:', req.params);
    const taskId = req.params.id;
    console.log('taskId:', taskId);
        // // We want to use the value that comes in through
        // // :id in a SQL query, so we can do something like:
        // // SELECT * FROM "songs" WHERE id=$1 ($1 will get
        // // the value that comes in on :id)
    const sqlText = `
        SELECT * FROM "tasks"
        WHERE "id"=$1;
        `;
    const sqlValues = [ taskId ];
    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
        // Note that dbResult.rows is an ARRAY with
        // a single OBJECT inside of it:
        console.log('dbResult.rows:', dbResult.rows);
        res.send(dbResult.rows);
    })
        .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    });
})

router.put('/:id', (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    const taskToUpdate = req.params.id;
    let currentStatus = req.body.transferStatus;
    currentStatus = true;
    const sqlText = `
    UPDATE "tasks"
        SET "completed"=$1
        WHERE "id"=$2;
    `;
    const sqlValues = [
    currentStatus,
    taskToUpdate
    ]

    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    console.log('DELETE /tasks/:id');
    console.log('req.params:', req.params);
    const taskIdToDelete = req.params.id;
    const sqlText = `
        DELETE FROM "tasks"
            WHERE "id"=$1;
    `;
    const sqlValues = [ taskIdToDelete ];

    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
        res.sendStatus(200);
    })
        .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    })
});

module.exports = router;