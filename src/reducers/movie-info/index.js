// Used to store movie info returned from the server
const defaultState = {
  title: '',
  poster: '',
  description: '',
  genres: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
      case 'SET_MOVIE_INFO':
          return action.payload;
      default:
          return state;
  }
}