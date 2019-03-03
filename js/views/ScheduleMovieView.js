import View from './View';
import sessionsList from '../models/Sessions';
import withoutTime from '../utils/withoutTime';

export default class ScheduleMovieView extends View {
  constructor(options) {
    super(options);

    // Group sessions by date
    const groups = sessionsList.getSessionsByParams(this.model.id, '2019-03-02T15:12:00', '2019-03-21T15:12:00').reduce((groups, item) => {
      const date = withoutTime(item.sessionDate).valueOf();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

    this.sessionsGroups = Object.keys(groups).map((date) => {
      return groups[date];
    });
  }
  render() {
    this.element.innerHTML = `<div class="movie-session">
                                <figure class="movie-session__img" style="background-image: url(${this.model.poster_path})"></figure>
                                <div class="movie-session__info">
                                  <h3>${this.model.title}</h3>
                                  ${this.sessionsGroups.map(group => `
                                    <div class="movie-session__wrap">
                                      <span>${group[0].sessionDate.getDate()}.${group[0].sessionDate.getMonth() + 1}.${group[0].sessionDate.getFullYear()}</span>
                                      <div class="movie-sessions-time">
                                        <p>Sessions:</p>
                                        <ul>
                                          ${group.map(item => `
                                          <li class="session-time-tag">
                                            <a href="/schedule/${item.id}">
                                              ${item.sessionDate.getHours()}:${item.sessionDate.getMinutes()}
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
