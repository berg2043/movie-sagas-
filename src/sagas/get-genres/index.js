import Axios from 'axios';
import { put } from 'redux-saga/effects'

function* getGenres (action){
  try {
    const response = yield Axios.get('/api/genres')
    yield put({type: 'SET_GENRES', payload: response.data})
  } catch (error) {
    console.log('Error getting genres',error);
  }
}

export default getGenres;