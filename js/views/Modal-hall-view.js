import View from './View';

export default class ModalHallView extends View {
  constructor(options) {
    super(options);
  }
  render() {
    this.clear();
    this.element.classList.add('modal-col');
    this.element.innerHTML = ` <div class="screen-container">
                                  <img class="screen-img" src="./img/screen.svg"></img>
                                  <span>screen</span>
                                </div>
                                <div class="seats-schema">
                                  ${this.model.hall.schema.map((row, i) => `
                                  <div class="seat-row" data-rowid=${i}>
                                    ${row.seats.map((seat, i) => `
                                      <button class="seat ${seat.sold ? 'disabled' : ''} ${seat.reserved ? 'checked' : ''}" data-seatid="${i}"></button>
                                    `.trim()).join('')}
                                  </div>
                                  `.trim()).join('')}
                                </div>`;
    return this;
  }
}
