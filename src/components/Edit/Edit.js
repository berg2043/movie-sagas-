import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Edit = (props) => {
  // State values
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [genres, setGenres] = useState({})

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
  
  // Gets genres from reducer
  const genreList = useSelector(state => state.genres);

  // Sets up default genre state
  useEffect(()=>{
    const holder = {}
    for(let genre of genreList){
      const value = movieInfo.genres.includes(genre.name) // Marks genres already there
      holder[genre.name] = {id: genre.id, checked: value};
    }
    setGenres(holder)
  },[genreList, movieInfo.genres])

  // Handles the changes to checkboxes
  function checkboxes(event){
    const value = event.target.checked;
    setGenres({
      ...genres,
      [event.target.name]: {
        id: genres[event.target.name].id,
        checked: value
      }})
  }
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
      description: description,
      genres: genres
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
        {Object.entries(genres).map((genre, i)=>{
          return(
            <span key={i}>
              <input
                type="checkbox"
                name={genre[0]} 
                checked={genres[genre[0]].checked}
                onChange={checkboxes}
              /> 
              <span>{genre[0]}</span>
            </span>
          )
        })}
        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={saveInput}>Save</button>
      </form>
    </div>
  );
};

export default Edit;
