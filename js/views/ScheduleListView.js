import View from './View';
import sessionsList from '../models/Sessions';
import ScheduleMovieView from './ScheduleMovieView';
import moment from 'moment';

const dateFilters = document.getElementById('date-filter');

export default class ScheduleListView extends View {
  constructor(options) {
    super(options);
    this.filterDates = {
      startDate: moment().format('YYYY-MM-DDTHH:mm'),
      endDate: null
    };

    this.model.getMovies().then(result => {
      this.getMoviesSessions();
      this.prepareViews(this.moviesWithSessions);
    });

    window.addEventListener('load', e => {
      let radioFilterDate = document.getElementsByName('date-filter');
      for (let i = 0; i < radioFilterDate.length; i++) {
        if (radioFilterDate[i].checked) {
          this.filterDateHelper(radioFilterDate[i]);
        }
      }
    });

    dateFilters.addEventListener('input', e => {
      let target = e.target;
      if (target.nodeName === 'INPUT') {
        this.filterDateHelper(target);
      }
      this.getMoviesSessions();
      this.prepareViews(this.moviesWithSessions);
      this.render();
    });
  }

  getMoviesSessions() {
    this.moviesWithSessions = [];
    this.moviesWithSessionsView = [];

    sessionsList.getSessionMoviesId(this.filterDates).forEach(item => {
      this.moviesWithSessions.push(this.model.getMovieById(item));
    });
  }

  prepareViews(arr) {
    arr.forEach(item => {
      this.moviesWithSessionsView.push(new ScheduleMovieView({
        model: item,
        tagName: 'article',
        className: 'session-list__item'
      }));
    });
  }

  filterDateHelper(target) {
    switch (target.value) {
      case 'today':
        this.filterDates.startDate = moment().format('YYYY-MM-DDTHH:mm');
        this.filterDates.endDate = null;
        break;
      case 'tomorrow':
        this.filterDates.startDate = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');
        this.filterDates.endDate = null;
        break;
      case 'week':
        this.filterDates.startDate = moment().format('YYYY-MM-DDTHH:mm');
        this.filterDates.endDate = moment().endOf('isoweek').format('YYYY-MM-DDTHH:mm');
        break;
      case 'month':
        this.filterDates.startDate = moment().format('YYYY-MM-DDTHH:mm');
        this.filterDates.endDate = moment().endOf('month').format('YYYY-MM-DDTHH:mm');
        break;
      default:
        break;
    }
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
