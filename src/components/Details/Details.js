import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Details = (props) => {
  // Adds dispatch
  const dispatch = useDispatch();

  // Gets specific movie info from DB and puts it on movie reducer
  useEffect(()=>{
    dispatch({type: 'GET_MOVIE_INFO', payload: props.match.params.name})
  }, [dispatch, props.match.params.name]);
  
  // Gets movie info from reducer
  const movieInfo = useSelector(state => state.movieInfo);

  return (
    <div>
      <img 
        src={'/'+movieInfo.poster} //unsure why / is needed
        alt={movieInfo.title}
      />
      <h1>{movieInfo.title}</h1>
      <p>{movieInfo.description}</p>
    </div>
  );
};

export default Details;
