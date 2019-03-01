import View from './View';
import sessionsList from '../models/Sessions';

export default class ScheduleMovieView extends View {
  constructor(options) {
    super(options);
    this.movieSessions = sessionsList.getSessionsByParams(this.model.id, '2019-03-07T15:12:00', '2019-03-09T15:12:00');
    console.log(this.movieSessions);
  }
  render() {
    this.element.innerHTML = `<div class="movie-session">
                                <figure class="movie-session__img" style="background-image: url(${this.model.poster_path})"></figure>
                                <div class="movie-session__info">
                                  <h3>${this.model.title}</h3>
                                  ${this.movieSessions.map(item => `
                                    <div class="movie-session__wrap">
                                      <span>${item.sessionDate.getDate()}.${item.sessionDate.getMonth() + 1}.${item.sessionDate.getFullYear()}</span>
                                      <div class="movie-sessions-time" data-sessionId="${item.sessionId}">
                                        <p>Sessions:</p>
                                        <ul>
                                          ${item.sessionTime.map((item, i) => `
                                          <li class="session-time-tag">
                                            <a href="/session/${i}">
                                              ${item}
                                            </a>
                                          </li>
                                          `.trim()).join('')}
                                        </ul>
                                      </div>
                                    </div>
                                  `.trim()).join('')}
                                </div>
                              </div>`;
    return this;
  }
}
