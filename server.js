const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");
const inputCheck = require('./utils/inputCheck');

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your mysql username
        user: 'root',
        //your mysql password
        password: 'HelloWorld!',
        database: 'election'
    },
    console.log('Connected to the election database')
)
//db runs the query method, which means it runs the query 
//in the parentheses, and executes a callback with 
//resulting row that match the query
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });


//get a SINGLE candidate - note how "rows" is now "row"

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     } 
//     console.log(row);
// });

//delete a candidate

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     } 
//     console.log(result);
// });

//create a candidate

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//     VALUES (?, ?, ?, ?)`;
// const params = [1, 'Ronald', "Firbank", 1]   ;

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// })

//get all candidates, from this api route endpoint
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

//put the params into the query, and change api/candidates to api/candidate/:id (no "s")
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message})
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            })
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

//create a candidate
//Notice that we're using object destructuring to pull the body property out of the request object.
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
})


//default response for any other request (anything Not Found)
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// //test to make sure server is working
// app.get('/', (req, res) => {
//     res.json({
//         message: "Hello World!"
//     });
// });

