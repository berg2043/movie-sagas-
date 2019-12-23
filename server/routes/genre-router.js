const express = require('express');
const pool = require('./../modules/pool');

const router = express.Router();

// Get all movies from DB
router.get('/', (req,res)=>{
  const queryText = `SELECT * FROM "genres" ORDER BY "name";`;
  pool.query(queryText).then( results => {
    res.send(results.rows);
  }).catch(err=>{
    console.log('Error in get movies', err);
    res.sendStatus(500);
  });
});

module.exports = router;