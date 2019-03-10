import View from './View';
import movies from '../models/Movies';

export default class ModalMovieView extends View {
  constructor(options) {
    super(options);

    this.orderMovie = movies.getMovieById(this.model.movieId);
  }
  render() {
    this.clear();
    this.element.classList.add('modal-movie', 'movie-session');
    this.element.innerHTML = `<figure class="movie-session__img" style="background-image: url('${this.orderMovie.poster_path}')"></figure>
                              <div class="movie-session__info">
                                <h3>${this.orderMovie.title}</h3>
                                <span>${this.model.sessionDate.getDate()}.${this.model.sessionDate.getMonth() + 1}.${this.model.sessionDate.getFullYear()}</span>
                                <span>Session: ${this.model.sessionDate.getHours()}:${this.model.sessionDate.getMinutes()}</span>
                              </div>`;
    return this;
  }
}
