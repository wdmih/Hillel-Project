import { MovieView } from './movie.js';
import { View } from './view.js';
import { MovieDetailsView } from './movie-detail-view.js';
import doPushState from '../utils/do-push-state.js';

export class MoviesListView extends View {
  constructor(model, el) {
    super(el);
    this.model = model;
    this.detailElement = new MovieDetailsView(this.model.getMovies()[0], document.getElementById('content'));

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('.movies-list__item');
      this.detailElement.setMovie(this.model.getMovieById(Number(target.childNodes[0].dataset.id)));
    });
  }
  render() {
    let movies = this.model.getMovies();
    this.element.classList.remove('movie-page');
    this.element.classList.add('movies-list');
    movies.forEach(item => {
      let movie = new MovieView(item).render();
      this.element.appendChild(movie);
    });
    doPushState('Now Playing', '/');
    return this;
  }
}
