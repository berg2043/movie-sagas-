import React from 'react';
import { useHistory } from 'react-router-dom';

const Movie = (props) => {
  // Adds history for progamatic routing
  let history = useHistory();

  return(
    <div key={props.movie.id}>
      <img 
        src={props.movie.poster} 
        onClick={()=>history.push(`/details/${props.movie.title}`)}
        alt={props.movie.title}
      />
      <h1>{props.movie.title}</h1>
      <p>{props.movie.description}</p>
    </div>
  );
};

export default Movie;