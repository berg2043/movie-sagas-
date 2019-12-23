import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, List, ListItem, ListItemText} from '@material-ui/core'

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
  button: {
    margin: theme.spacing(1),
  }
}));

const Details = (props) => {
  
  const classes = useStyles();
  
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
    <Grid container className={classes.root}>
      <Grid item xs={6} className={classes.image}>
        <img 
          src={'/'+movieInfo.poster} //unsure why / is needed
          alt={movieInfo.title}
        />
      </Grid>
      <Grid item xs={6}>
        <h2>Genres</h2>
        <List>
          {movieInfo.genres.map((genre, i)=>{
            return(
              <ListItem key={i}>
                <ListItemText primary={genre}/>
              </ListItem>
              )})}
        </List>
      </Grid>
      <Grid item className={classes.content} xs={12}>
        <h1>{movieInfo.title}</h1>
        <p>{movieInfo.description}</p>
      </Grid>
      <Grid item xs={12}>
        <Button 
          className={classes.button}
          variant="contained" 
          color="secondary" 
          onClick={()=>history.push('/')}
        >
          Back to List
        </Button>
        <Button 
          className={classes.button}
          variant="contained" 
          color="primary" 
          onClick={()=>history.push('/edit/'+movieInfo.title)}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Details;
