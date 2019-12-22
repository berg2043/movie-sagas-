import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';


const App = (props) => {
  // Adds dispatch
  const dispatch = useDispatch();

  // Gets the list of movies from DB and puts movies reducer
  useEffect(()=>{
    dispatch({type: 'GET_MOVIES'})
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={MovieList}/>
        <Route exact path='/details/:name' component={Details}/>
      </Switch>
    </Router>
  );
};

export default App;
