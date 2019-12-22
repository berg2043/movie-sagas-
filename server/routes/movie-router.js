const express = require('express');
const pool = require('./../modules/pool');

const router = express.Router();

// Get all movies from DB
router.get('/', (req,res)=>{
  const queryText = `SELECT * FROM "movies" ORDER BY "title";`;
  pool.query(queryText).then( results => {
    res.send(results.rows);
  }).catch(err=>{
    console.log('Error in get movies', err);
    res.sendStatus(500);
  });
});

// GET specific movie from DB
router.get('/:name', (req,res)=>{
  const queryText = 
      `SELECT 
        "movies"."title", 
        "movies"."poster", 
        "movies"."description", 
        array_agg("genres"."name") as "genres"
      FROM "movies" 
      LEFT JOIN "m_g" ON "movies"."id" = "m_g"."mov_id"
      LEFT JOIN "genres" ON "genres"."id" = "m_g"."gen_id"
      WHERE "movies"."title" = $1
      GROUP BY "movies"."id"
      ORDER BY "movies"."title";`;
  pool.query(queryText, [req.params.name]).then( results => {
    res.send(results.rows);
  }).catch(err=>{
    console.log('Error in get movies', err);
    res.sendStatus(500);
  });
});

module.exports = router;