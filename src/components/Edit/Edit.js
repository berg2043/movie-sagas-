import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Edit = (props) => {
  // State values
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
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

  // Updates state after movie info reducer is updated
  useEffect(()=>{
    setTitle(movieInfo.title)
    setDescription(movieInfo.description)
  }, [movieInfo])

  // Updates movie info on DB
  function saveInput(event){
    event.preventDefault();
    const payload = {
      id: movieInfo.id,
      title: title,
      description: description
    }
    dispatch({type: 'PUT_MOVIE', payload: payload})
    history.push('/details/'+title)
  }

  // Cancels edit and goes back to details page
  function cancel(){
    history.push('/details/'+movieInfo.title)
  }

  return (
    <div>
      <img 
        src={'/'+movieInfo.poster} //unsure why / is needed
        alt={movieInfo.title}
      />
      <form>
        <input 
          value={title}
          onChange={(event)=>setTitle(event.target.value)}
        />
        <textarea 
          value={description}
          onChange={(event)=>setDescription(event.target.value)}
        />
        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={saveInput}>Save</button>
      </form>
    </div>
  );
};

export default Edit;
