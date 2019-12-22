import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';


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
          <div key={movie.id}>
            <img src={movie.poster}/>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
