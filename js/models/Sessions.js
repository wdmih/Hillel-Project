import Session from './Session';

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
  getSessionsByDate(dateFrom, dateTo) {
    if (!dateTo) {
      console.log('unly one arg came', this.sessions);
    } else {
      console.log('all args is came');
    }
  }
}

let sessionsList = new Sessions();

sessionsList.addSession(new Session({ movieId: 399579, sessionTime: '2019-03-07T15:12:00' }));
sessionsList.addSession(new Session({ movieId: 490132, sessionTime: '2019-03-07T15:12:00' }));
sessionsList.addSession(new Session({ movieId: 480530, sessionTime: '2019-03-07T15:12:00' }));

export default sessionsList;
