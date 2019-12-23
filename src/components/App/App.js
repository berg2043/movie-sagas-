import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';


const App = (props) => {
  // Adds dispatch
  const dispatch = useDispatch();

  // Gets the list of movies from DB and puts it on movies reducer
  useEffect(()=>{
    dispatch({type: 'GET_MOVIES'});
    dispatch({type: 'GET_GENRES'});
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={MovieList}/>
        <Route exact path='/details/:title' component={Details}/>
        <Route exact path='/edit/:title' component={Edit}/>
      </Switch>
    </Router>
  );
};

export default App;
