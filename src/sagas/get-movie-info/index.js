import Axios from 'axios';
import { put } from 'redux-saga/effects'

function* getMovies (action){
  try {
    const response = yield Axios.get('/api/movies/:name')
    yield put({type: 'SET_MOVIE_INFO', payload: response.data[0]})
  } catch (error) {
    console.log('Error getting movie info',error);
  }
}

export default getMovies;