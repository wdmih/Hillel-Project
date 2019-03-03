import Session from './Session';
import withoutTime from '../utils/withoutTime';

class Sessions {
  constructor() {
    this.sessions = [];
  }
  addSession(session) {
    this.sessions.push(session);
  }
  getSessionMoviesId() {
    return [...new Set(this.sessions.map(item => item.movieId))];
  }
  getSessionsByParams(movieId, dateFrom, dateTo) {
    let startDate = withoutTime(dateFrom).getTime();
    let endDate = dateTo ? withoutTime(dateTo).getTime() : withoutTime(dateFrom).getTime();

    return this.sessions.filter(item => {
      let sessionDate = withoutTime(item.sessionDate).getTime();
      return (item.movieId === movieId && startDate <= sessionDate && sessionDate <= endDate);
    });
  }
}

let sessionsList = new Sessions();

// SOME SESSIONS EXAMPLE
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-03T9:30' }));
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-03T11:30' }));
sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-08T14:10' }));

sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-03T14:10' }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-04T12:10' }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-04T22:20' }));

sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-05T11:20' }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-05T14:50' }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-21T17:35' }));

// console.log(sessionsList.getSessionsByParams(480530, '2019-03-07T15:12:00', '2019-03-09T15:12:00'));

export default sessionsList;
