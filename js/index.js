import store from './data/data.js';
import { Movies } from './models/movies.js';
import { MoviesListView } from './views/movie-list-view.js';

store.getMovies().then(result => {
  let movies = new Movies(result);
  let element = document.getElementById('content');
  element.classList.add('movies-list');
  let movieView = new MoviesListView(movies, element);
  movieView.render();
});
