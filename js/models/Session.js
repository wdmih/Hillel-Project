export default class Session {
  constructor(options) {
    this.sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2); /// generate some UID for session object
    this.movieId = options.movieId;
    this.sessionTime = Date.parse(options.sessionTime);
  }
}
