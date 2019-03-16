import Session from './Session';
import withoutTime from '../utils/without-time';
import CinemaHall from './Cinema-hall';

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
    let startDate = withoutTime(dates.startDate).getTime();
    let endDate = dates.endDate ? withoutTime(dates.endDate).getTime() : withoutTime(dates.startDate).getTime();

    this.actualSessions = this.sessions.filter(item => {
      let sessionDate = withoutTime(item.sessionDate).getTime();
      return (startDate <= sessionDate && sessionDate <= endDate);
    });

    return [...new Set(this.actualSessions.map(item => item.movieId))];
  }

  getSessionsbyParams(movieId, date) {
    let currDate = withoutTime(date).getTime();

    return this.sessions.filter(item => {
      let sessionDate = withoutTime(item.sessionDate).getTime();
      return (item.movieId === movieId && currDate <= sessionDate && sessionDate <= currDate);
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
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-16T9:30', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-16T11:30', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-17T14:10', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));

sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-16T14:10', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-17T12:10', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-17T22:20', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));

sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-16T11:20', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-18T14:50', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-21T17:35', hall: new CinemaHall({ name: 'Standart', rows: 4, seats: 8 }) }));

// console.log(sessionsList.getSessionsByParams(480530, '2019-03-07T15:12:00', '2019-03-09T15:12:00'));

export default sessionsList;
