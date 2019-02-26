import movies from '../models/Movies';
import MoviesListView from '../views/Movie-list-view';
import MovieDetailsView from '../views/Movie-detail-view';
import ScheduleListView from '../views/ScheduleListView';
import slugify from '../utils/slugify';
import setPageTitle from '../utils/set-page-title';

const routeRootEl = document.getElementById('content');

let movieView = new MoviesListView({
  model: movies,
  el: routeRootEl
});

let scheduleView = new ScheduleListView({ model: movies, el: routeRootEl });

export default {
  indexPage: function() {
    movieView.render();
    history.pushState({ pageTitle: 'Now Playing' }, null, '/');
    setPageTitle(history.state.pageTitle);
  },
  detailPage: function(slug) {
    let detailElement = new MovieDetailsView({ el: routeRootEl });
    detailElement.setMovie(movies.getMovieBySlug(slug));
    history.pushState({ pageTitle: detailElement.model.title }, null, '/' + slugify(detailElement.model.title));
    setPageTitle(history.state.pageTitle);
  },
  schedule: function() {
    routeRootEl.innerHTML = 'FUCK';
    // scheduleView.render();
    history.pushState({ pageTitle: 'Schedule' }, null, '/schedule');
    setPageTitle(history.state.pageTitle);
  },
  adminPanel: function() {
    routeRootEl.innerHTML = 'Admin panel in progress';
    history.pushState({ pageTitle: 'Admin panel' }, null, '/admin-panel');
    setPageTitle(history.state.pageTitle);
  }
};
