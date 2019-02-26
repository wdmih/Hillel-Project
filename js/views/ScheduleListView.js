import View from './View';
import sessionsList from '../models/Sessions';
import MovieSessionView from './MovieSessionView';

export default class ScheduleListView extends View {
  constructor(options) {
    super(options);
    this.moviesWithSessions = [];
    this.moviesWithSessionsView = [];
    this.model.getMovies().then(result => {
      sessionsList.getSessionMoviesId().forEach(item => {
        this.moviesWithSessions.push(this.model.getMovieById(item));
      });

      this.moviesWithSessions.forEach(item => {
        this.moviesWithSessionsView.push(new MovieSessionView({
          model: item,
          tagName: 'article',
          className: 'session-list__item'
        }));
      });
    });
  }
  render() {
    this.clear();
    this.element.classList.add('schedule-page');
    this.moviesWithSessionsView.forEach(view => {
      this.element.appendChild(view.render().element);
    });
    return this;
  }
}
