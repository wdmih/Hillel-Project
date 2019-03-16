import View from './View';
import sessionsList from '../models/Sessions';
import ModalView from './Modal-view';

export default class ScheduleMovieView extends View {
  constructor(options) {
    super(options);

    this.sessionsGroups = sessionsList.getSessionsGroups(this.model.id);

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;
      if (target.nodeName === 'A') {
        let modalWindow = new ModalView({
          model: sessionsList.getSessionById(target.dataset.sesid),
          el: document.getElementById('modal-cart')
        });
        modalWindow.render();
      }
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
                                            <a class="session-time-item" href="#" data-sesid="${item.id}">
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
