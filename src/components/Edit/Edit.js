import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, margin, TextField, FormGroup, FormLabel, FormControl, Button, FormControlLabel, Checkbox} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root:{
    backgroundColor: 'gray',
    maxWidth: 800,
    margin:'auto'
  },
  image:{
    maxWidth: 1,
    margin:'auto'
  },
  content:{
    maxWidth: 800
  },
  multiline:{
    margin: theme.spacing(1),
    width:'100%'
  },
  margins: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Edit = (props) => {

  const classes = useStyles();

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
    <Grid container className={classes.root} alignItems="flex-start">
      <Grid item xs={6} className={classes.image}>
        <img 
          src={'/'+movieInfo.poster} //unsure why / is needed
          alt={movieInfo.title}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <FormLabel>Genres</FormLabel>
          <FormGroup>
            {Object.entries(genres).map((genre, i)=>{
              return(
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      name={genre[0]} 
                      checked={genres[genre[0]].checked}
                      onChange={checkboxes}
                    /> 
                  }
                  label={genre[0]}  
                >
              </FormControlLabel>
              )
            })}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <form>
          <TextField 
            className={classes.margins}
            label="Title"
            variant="filled"
            value={title}
            onChange={(event)=>setTitle(event.target.value)}
          />
          <TextField 
            label="Description"
            variant="filled"
            multiline
            value={description}
            onChange={(event)=>setDescription(event.target.value)}
            className={classes.multiline}
          />

          <Button 
            className={classes.margins}
            type="margin" 
            onClick={cancel}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button 
            className={classes.margins}
            type="submit" 
            onClick={saveInput}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Edit;
