import View from './View';

export default class ModalOrderView extends View {
  constructor(options) {
    super(options);
    this.list = this.model.getList();
  }

  render() {
    this.clear();
    this.element.innerHTML = `${this.list.map(item => `
                                <div class="order-item">
                                  <span class="order-item__row">Row: ${Number(item.row) + 1}</span>
                                  <span class="order-item__seat">Seat: ${Number(item.seat) + 1}</span>
                                  <span class="close order-item--del"></span>
                                </div>
                              `.trim()).join('')}
                              <button id="button-buy" class="button ${this.list.length === 0 ? 'button-disabled' : ''}">Book now</button>`;
    return this;
  }
}
