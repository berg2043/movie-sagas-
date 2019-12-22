import Axios from 'axios';
import { put } from 'redux-saga/effects'

function* getMovies (action){
  try {
    response = yield Axios.get('/api/movies')
    yield put({type: 'SET_MOVIES', payload: response.data})
  } catch (error) {
    console.log('Error getting movies',error);
  }
}

export default getMovies;