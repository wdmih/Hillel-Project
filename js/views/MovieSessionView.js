import View from './View';

export default class MovieSessionView extends View {
  constructor(options) {
    super(options);
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
                                      <li class="session-time-tag"><a href="#">07:30</a></li>
                                      <li class="session-time-tag"><a href="#">07:30</a></li>
                                      <li class="session-time-tag"><a href="#">07:30</a></li>
                                      <li class="session-time-tag"><a href="#">07:30</a></li>
                                      <li class="session-time-tag"><a href="#">07:30</a></li>
                                      <li class="session-time-tag"><a href="#">07:30</a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>`;
    return this;
  }
}
