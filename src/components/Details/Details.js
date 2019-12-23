import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Details = (props) => {
  // Adds dispatch
  const dispatch = useDispatch();

  // Adds history for progamatic routing
  let history = useHistory();

  // Gets specific movie info from DB and puts it on movie reducer
  useEffect(()=>{
    dispatch({type: 'GET_MOVIE_INFO', payload: props.match.params.title})
  }, [dispatch, props.match.params.title]);
  
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
      <p>{movieInfo.genres.map((genre, i)=>{return(<span key={i}>{genre}</span>)})}</p>
      <button onClick={()=>history.push('/')}>Back to List</button>
      <button onClick={()=>history.push('/edit/'+movieInfo.title)}>Edit</button>
    </div>
  );
};

export default Details;
