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
      let sessionDate = withoutTime(item.sessionDate).getTime();
      return (item.movieId === movieId && startDate <= sessionDate && sessionDate <= endDate);
    });
  }
}

let sessionsList = new Sessions();

sessionsList.addSession(new Session({ movieId: 399579, sessionDate: '2019-03-07', sessionTime: ['11:00'] }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-07', sessionTime: ['09:30', '11:20', '14:50', '17:15', '22:00'] }));
sessionsList.addSession(new Session({ movieId: 490132, sessionDate: '2019-03-08', sessionTime: ['11:00'] }));
sessionsList.addSession(new Session({ movieId: 480530, sessionDate: '2019-03-07', sessionTime: ['11:00'] }));

// sessionsList.getSessionsByParams(490132, '2019-03-07T15:12:00', '2019-03-09T15:12:00');

export default sessionsList;
