import Axios from 'axios';
import { put } from 'redux-saga/effects'

function* putMovie (action){
  try {
    yield Axios.put('/api/movies/', action.payload)
    yield put({type: 'GET_MOVIES'})
    yield put({type: 'GET_MOVIE_INFO', payload: action.payload.title})
  } catch (error) {
    console.log('Error putting movies',error);
  }
}

export default putMovie;