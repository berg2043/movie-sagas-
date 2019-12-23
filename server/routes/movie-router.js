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
        "movies"."id",
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

// Update a movie
router.put('/', (req,res)=>{
  const queryText = 
      `UPDATE "movies" 
      SET title = $1, description = $2 
      WHERE "id" = $3;`;
  const queryParams = [req.body.title, req.body.description, req.body.id]
  pool.query(queryText, queryParams).then( results => {
    const deleteText = `DELETE FROM "m_g" WHERE "mov_id" = $1;`;
    pool.query(deleteText, [req.body.id]).then( result => {
      let count = 2;
      let holderStr = '';
      let holderArr = [];
      for(genre in req.body.genres){ // Loops through genres to see if any are true
        if(req.body.genres[genre].checked){
          holderStr += (`($1, $${count})`);
          holderArr.push(req.body.genres[genre].id);
          count ++;
        }
      }
      if(holderArr.length){ // if any of the genres are true, it creates a query to add them
        holderArr.unshift(req.body.id)
        holderStr = holderStr.split(')(');
        holderStr = holderStr.join('), (');
        let holderQuery = 'INSERT INTO "m_g" ("mov_id", "gen_id") VALUES ' + holderStr +';';
        pool.query(holderQuery, holderArr);
        res.sendStatus(200);
      } else {
        res.sendStatus(200);
      }
    });
  }).catch(err=>{
    console.log('Error in get movies', err);
    res.sendStatus(500);
  });
});

module.exports = router;