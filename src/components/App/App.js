import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Movie from '../Movie/Movie';


const App = (props) => {
  // Adds dispatch
  const dispatch = useDispatch();
  
  // Adds movies reducer
  const movieList = useSelector(state => state.movies);
  
  // Gets the list of movies from DB and puts movieList
  useEffect(()=>{
    dispatch({type: 'GET_MOVIES'})
  }, [dispatch]);
  
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

export default App;
