import Axios from 'axios';
import { put } from 'redux-saga/effects'

function* getMovieInfo (action){
  try {
    const response = yield Axios.get('/api/movies/' + action.payload)
    yield put({type: 'SET_MOVIE_INFO', payload: response.data[0]})
  } catch (error) {
    console.log('Error getting movie info',error);
  }
}

export default getMovieInfo;