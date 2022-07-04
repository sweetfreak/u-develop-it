const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

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

