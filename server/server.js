const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const movieRouter = require('./routes/movie-router')
const genreRouter = require('./routes/genre-router')

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/movies', movieRouter);
app.use('/api/genres', genreRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});