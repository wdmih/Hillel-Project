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
    return this.sessions.map(item => item.movieId);
  }
  getSessionsByParams(movieId, dateFrom, dateTo) {
    let startDate = withoutTime(dateFrom).getTime();
    let endDate = dateTo ? withoutTime(dateTo).getTime() : withoutTime(dateFrom).getTime();

    return this.sessions.filter(item => {
      let sessionTime = withoutTime(item.sessionTime).getTime();
      return (item.movieId === movieId && startDate <= sessionTime && sessionTime <= endDate);
    });
  }
}

let sessionsList = new Sessions();

sessionsList.addSession(new Session({ movieId: 399579, sessionTime: '2019-03-07T09:22:00' }));
sessionsList.addSession(new Session({ movieId: 490132, sessionTime: '2019-03-07T11:30:00' }));
sessionsList.addSession(new Session({ movieId: 490132, sessionTime: '2019-03-07T17:12:00' }));
sessionsList.addSession(new Session({ movieId: 480530, sessionTime: '2019-03-07T22:10:00' }));

// sessionsList.getSessionsByParams(490132, '2019-03-07T15:12:00', '2019-03-09T15:12:00');

export default sessionsList;
