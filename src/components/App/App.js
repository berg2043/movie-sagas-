import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';


const App = (props) => {
  return (
    <Router>
      <Route component={MovieList}/>
    </Router>
  );
};

export default App;
