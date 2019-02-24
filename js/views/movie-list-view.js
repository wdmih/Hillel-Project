import router from '../router/Router';
import MovieView from './Movie';
import View from './View';

export default class MoviesListView extends View {
  constructor(options) {
    super(options);

    this.model.getMovies().then(result => {
      this.movieViews = [];

      this.model.movies.forEach((item) => {
        this.movieViews.push(new MovieView({
          model: item,
          tagName: 'article',
          className: 'movies-list__item'
        }));
      });
      this.delegateEvents();
    });
  }
  delegateEvents() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;
      while (target !== this.element) {
        if (target.tagName === 'A') {
          router.nav(target.attributes['href'].value);
        }
        target = target.parentNode;
      }
    });
  }
  render() {
    if (this.element.classList.contains('movie-page')) {
      this.element.classList.remove('movie-page');
    }
    this.element.classList.add('movies-list');
    this.clear();
    this.movieViews.forEach(view => {
      this.element.appendChild(view.render().element);
    });
    return this;
  }
}
