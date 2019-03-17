import Session from './Session';
import withoutTime from '../utils/without-time';
import hallList from './Hall-list';
import HallScheme from './Hall-scheme';
import moment from 'moment';

class Sessions {
  constructor() {
    this.sessions = [];
    this.actualSessions = [];
  }
  addSession(session) {
    this.sessions.push(session);
  }

  getSessionById(id) {
    return this.sessions.find(item => item.id === id);
  }

  getSessionMoviesId(dates) {
    let startDate = moment(dates.startDate).valueOf();
    let endDate = dates.endDate ? moment(dates.endDate).valueOf() : moment(dates.startDate).valueOf();

    this.actualSessions = this.sessions.filter(item => {
      let sessionDate = moment(item.sessionDate).valueOf();
      return (startDate <= sessionDate && sessionDate <= endDate);
    });

    return [...new Set(this.actualSessions.map(item => item.movieId))];
  }

  getSessionsbyParams(movieId, date) {
    let currDate = moment(date).valueOf();
    let endOfCurrDate = moment(date).endOf('day').valueOf();

    return this.sessions.filter(item => {
      let sessionDate = moment(item.sessionDate).valueOf();
      return (item.movieId === movieId && currDate <= sessionDate && sessionDate <= endOfCurrDate);
    });
  }

  getSessionsGroups(movieId) {
    let groups = this.actualSessions
      .filter(item => {
        return (item.movieId === movieId);
      })
      .reduce((groups, item) => {
        const date = withoutTime(item.sessionDate).valueOf();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});

    return Object.keys(groups).map((date) => {
      return groups[date];
    });
  }
}

let sessionsList = new Sessions();

// SOME SESSIONS EXAMPLE
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-17T9:30', hall: new HallScheme(hallList.getHallByName('cinetech')) }));
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-17T22:30', hall: new HallScheme(hallList.getHallByName('imax')) }));
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-18T14:10', hall: new HallScheme(hallList.getHallByName('cinetech')) }));

sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-17T14:10', hall: new HallScheme(hallList.getHallByName('cinetech')) }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-18T12:10', hall: new HallScheme(hallList.getHallByName('imax')) }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-18T22:20', hall: new HallScheme(hallList.getHallByName('cinetech')) }));

sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-17T19:13', hall: new HallScheme(hallList.getHallByName('cinetech')) }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-19T14:50', hall: new HallScheme(hallList.getHallByName('imax')) }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-21T17:35', hall: new HallScheme(hallList.getHallByName('cinetech')) }));

export default sessionsList;
