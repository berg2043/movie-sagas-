import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects'
// Reducers
import movies from './reducers/movies';
import genres from './reducers/genres';
import movieInfo from './reducers/movie-info'
// Sagas
import getMovies from './sagas/get-movies';
import getMovieInfo from './sagas/get-movie-info';
import putMovie from './sagas/put-movie';
import getGenres from './sagas/get-genres'

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovies);
    yield takeEvery('GET_MOVIE_INFO', getMovieInfo);
    yield takeEvery('PUT_MOVIE', putMovie);
    yield takeEvery('GET_GENRES', getGenres);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieInfo
    }),
    applyMiddleware(sagaMiddleware),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
