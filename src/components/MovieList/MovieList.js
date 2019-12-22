import React from 'react';
import { useSelector } from 'react-redux';
import Movie from '../Movie/Movie';


const MovieList = (props) => {
  // Adds movies reducer
  const movieList = useSelector(state => state.movies);

  return (
    <div>
      {movieList.map(movie=>{
        return(
          <Movie key={movie.id} movie={movie}/>
        )
      })}
    </div>
  );
};

export default MovieList;
