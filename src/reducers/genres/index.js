// Used to store the movie genres
export default (state = [], action) => {
  switch (action.type) {
      case 'SET_GENRES':
          return action.payload;
      default:
          return state;
  }
}
