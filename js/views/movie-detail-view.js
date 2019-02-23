
import View from './View';

export default class MovieDetailsView extends View {
  constructor(options) {
    super(options);
  }

  setMovie(movie) {
    this.model = movie;
    this.render();
  }
  render() {
    const { id, title, poster_path, original_language, overview, release_date } = this.model;
    this.clear();
    let movie = this.element;
    this.element.classList.remove('movies-list');
    this.element.classList.add('movie-page');
    movie.innerHTML = `<div class="movie-img-wrapper">
                        <figure>
                          <img src="${poster_path}" alt="${title}">
                        </figure>
                      </div>
                      <div class="movie-info">
                        <ul>
                          <li>
                            <span class="info-title">Original Language:</span>
                            <span class="info-title-value">${original_language}</span>
                          </li>
                          <li>
                            <span class="info-title">Release date:</span>
                            <span class="info-title-value">${release_date}</span>
                          </li>
                          <li>
                            <span class="info-title">Overview:</span>
                            <span class="info-title-value">${overview}</span>
                          </li>
                        </ul>
                        <button class="button" data-id="${id}">book now</button>
                      </div>`;
    return this;
  }
}
