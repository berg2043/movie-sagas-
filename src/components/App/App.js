import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';


const App = (props) => {
  // Adds dispatch
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({type: 'GET_MOVIES'})
  }, [dispatch])
  return (
    <div>
      <p>Empty Page</p>
    </div>
  );
}

export default App;
