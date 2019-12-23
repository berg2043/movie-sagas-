import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardMedia, CardContent, CardHeader} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: 'lightgray',
    margin: 'auto'
  },
  media: {
    width: '50%',
    marginTop:'0',
    marginLeft:'auto',
    marginRight:'auto'
  },
}));

const Movie = (props) => {
  
  const classes = useStyles();
  
  // Adds history for progamatic routing
  let history = useHistory();

  return(
    <Card key={props.movie.id} className={classes.card}>
      <CardHeader title={props.movie.title}/>
      <CardMedia 
        className={classes.media}
        component="img"
        image={props.movie.poster} 
        onClick={()=>history.push(`/details/${props.movie.title}`)}
        title={props.movie.title}
      />
      <CardContent>
        <p>{props.movie.description}</p>
      </CardContent>
    </Card>
  );
};

export default Movie;