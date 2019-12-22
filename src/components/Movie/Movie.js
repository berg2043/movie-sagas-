import React, { useState } from 'react';

const Movie = (props) => {
  return(
    <div key={props.movie.id}>
      <img src={props.movie.poster}/>
      <h1>{props.movie.title}</h1>
      <p>{props.movie.description}</p>
    </div>
  );
};

export default Movie;