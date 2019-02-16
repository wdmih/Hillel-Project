import slugify from '../utils/slugify.js';

export class MovieView {
  constructor(movieModel) {
    this.model = movieModel;
  }
  render() {
    let movieTemplate = document.createElement('article');
    movieTemplate.className = 'movies-list__item';
    movieTemplate.innerHTML = `<a href="/${slugify(this.model.title)}" data-id="${this.model.id}" style="background-image: url(${this.model.poster_path})">
                                <div class="movie-title">
                                  <h2>${this.model.title}</h2>
                                </div>
                              </a>`;
    return movieTemplate;
  }
}
