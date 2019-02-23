import View from './View';
import slugify from '../utils/slugify';

export default class MovieView extends View {
  constructor(options) {
    super(options);
  }
  render() {
    this.element.innerHTML = `<a href="/${slugify(this.model.title)}" data-id="${this.model.id}" style="background-image: url(${this.model.poster_path})">
                                <div class="movie-title">
                                  <h2>${this.model.title}</h2>
                                </div>
                              </a>`;
    return this;
  }
}
