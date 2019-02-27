import View from './View';
import sessionsList from '../models/Sessions';

export default class MovieSessionView extends View {
  constructor(options) {
    super(options);
    this.movieSessions = sessionsList.getSessionsByParams(this.model.id, '2019-03-07T15:12:00', '2019-03-09T15:12:00');
  }
  render() {
    this.element.innerHTML = `<div class="movie-session">
                                <figure class="movie-session__img" style="background-image: url(${this.model.poster_path})"></figure>
                                <div class="movie-session__info">
                                  <h3>${this.model.title}</h3>
                                  <span>25.03.2019</span>
                                  <div class="movie-sessions-time">
                                    <p>Sessions:</p>
                                    <ul>
                                      ${this.movieSessions.map(item => `
                                        <li class="session-time-tag">
                                          <a href="#${item.sessionId}">
                                            ${item.sessionTime.getHours()}:${item.sessionTime.getMinutes()}
                                          </a>
                                        </li>
                                      `.trim()).join('')}
                                    </ul>
                                  </div>
                                </div>
                              </div>`;
    return this;
  }
}
