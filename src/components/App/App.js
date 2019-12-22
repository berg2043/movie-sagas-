import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';


const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={MovieList}/>
        <Route exact path='/details/:name' component={}/>
      </Switch>
    </Router>
  );
};

export default App;
