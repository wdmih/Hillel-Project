import View from './View';
import sessionsList from '../models/Sessions';
import moment from 'moment';
import ModalView from './Modal-view';

export default class MovieDetailsView extends View {
  constructor(options) {
    super(options);

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

  setMovie(movie) {
    this.model = movie;
    this.sessions = sessionsList.getSessionsbyParams(this.model.id, moment().format('YYYY-MM-DDTHH:mm'));
    this.render();
  }

  render() {
    const { title, poster_path, original_language, overview, release_date } = this.model;
    this.clear();
    this.element.classList.add('movie-page');
    this.element.innerHTML = `<div class="movie-img-wrapper">
                        <figure>
                          <img src="${poster_path}" alt="${title}">
                        </figure>
                      </div>
                      <div class="movie-info">
                        <ul>
                          <li>
                            <span class="info-title">Original Language:</span>
                            <span class="info-title-value">${original_language}</span>
                          </li>
                          <li>
                            <span class="info-title">Release date:</span>
                            <span class="info-title-value">${release_date}</span>
                          </li>
                          <li>
                            <span class="info-title">Overview:</span>
                            <span class="info-title-value">${overview}</span>
                          </li>
                        </ul>
                        ${this.sessions.length > 0 ? `
                          <div class="movie-sessions-time">
                            <p>Sessions today:</p>
                            <ul>
                              ${this.sessions.map(item => `
                                <li class="session-time-tag">
                                  <a href="#" data-sesid="${item.id}">
                                    ${item.sessionDate.getHours()}:${item.sessionDate.getMinutes()}
                                  </a>
                                </li>
                              `.trim()).join('')}
                            </ul>
                          </div>
                        ` : `
                            <div class="movie-info-no-sessions"><span>No sessions today</span></div>
                        `}
                      </div>`;
    return this;
  }
}
