const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//get voters
router.get('/voters', (req, res) => {
    const sql = `SELECT * FROM voters ORDER BY last_name`;
    
    db.query(sql, (err, rows)=> {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

//GET single vote
router.get('/voter/:id', (req, res) => {



  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

//POST or add a voter
router.post ('/voter', ({body}, res) => {

    //data validation
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        } res.json({
            message: 'sucess',
            data: body
        });
    });
});

//PUT method - to update with email address
router.put('/voter/:id', (req, res) => {
    //data validation
    const errors = inputCheck(req.body, 'email');
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Voter cannot be found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                change: result.affectedRows
            });
        }
    });
});

//DELETE voter from database (is... this even LEGAL!?)
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Voter cannot be found, thus not deleted'
            });
        } else {
            res.json({
                message: 'DELETED!!',
                change: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;