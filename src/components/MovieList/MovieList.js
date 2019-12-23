import React from 'react';
import { useSelector } from 'react-redux';
import Movie from '../Movie/Movie';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root:{
    backgroundColor: 'gray',
  }
}));

const MovieList = (props) => {
  
  const classes = useStyles();

  // Adds movies reducer
  const movieList = useSelector(state => state.movies);

  return (
    <>
      <header>
        <h1>Movie List</h1>
      </header>
      <Grid 
        container 
        spacing={3} 
        className={classes.root} 
        direction="row"
        justify="center"
      >
        {movieList.map(movie=>{
          return(
            <Grid item key={movie.id} xs={12} md={6} lg={4}>
              <Movie movie={movie}/>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};

export default MovieList;
