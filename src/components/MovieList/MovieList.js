import React from 'react';
import { useSelector } from 'react-redux';
import Movie from '../Movie/Movie';
import {Grid} from '@material-ui/core'


const MovieList = (props) => {
  // Adds movies reducer
  const movieList = useSelector(state => state.movies);

  return (
    <Grid container>
      {movieList.map(movie=>{
        return(
          <Grid item key={movie.id} xs={12} md={6} lg={4}>
            <Movie movie={movie}/>
          </Grid>
        )
      })}
    </Grid>
  );
};

export default MovieList;
