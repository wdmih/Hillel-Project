
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
    const { title, poster_path, original_language, overview, release_date } = this.model;
    this.clear();
    this.element.classList.add('movie-page');
    this.element.innerHTML = `<div class="movie-img-wrapper">
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
                        <div class="movie-sessions-time">
                          <p>Sessions today:</p>
                          <ul>
                            <li class="session-time-tag"><a href="#">07:30</a></li>
                            <li class="session-time-tag"><a href="#">11:20</a></li>
                            <li class="session-time-tag"><a href="#">13:40</a></li>
                            <li class="session-time-tag"><a href="#">15:30</a></li>
                            <li class="session-time-tag"><a href="#">17:45</a></li>
                            <li class="session-time-tag"><a href="#">22:10</a></li>
                          </ul>
                        </div>
                      </div>`;
    return this;
  }
}
