import View from './View';
import movies from '../models/Movies';
import ModalMovieView from './Modal-movie-view';
import ModalHallView from './Modal-hall-view';
import OrderList from '../models/Order-list';
import ModalOrderView from './Modal-order-view';

export default class ModalView extends View {
  constructor(options) {
    super(options);

    this.orderList = new OrderList();

    this.modalMovieView = new ModalMovieView({
      model: this.model
    });

    this.modalOrderView = new ModalOrderView({
      model: this.orderList,
      className: 'order-container'
    });

    this.modalHallView = new ModalHallView({
      model: this.model
    });

    this.element.addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('seat') && !target.classList.contains('disabled')) {
        let rowId = target.parentNode.dataset.rowid;
        let seatId = target.dataset.seatid;

        if (!target.classList.contains('checked')) {
          this.model.hall.setReservation(rowId, seatId, true);
          this.modalHallView.render();
          this.orderList.addToList({ row: rowId, seat: seatId });
          this.modalOrderView.render();
        } else {
          this.model.hall.setReservation(rowId, seatId, false);
          this.modalHallView.render();
          this.orderList.removeFromList({ row: rowId, seat: seatId });
          this.modalOrderView.render();
        }
      } else if ((target.id === 'button-buy') && !(target.classList.contains('button-disabled'))) {
        let order = {
          movie: movies.getMovieById(this.model.movieId),
          sessionId: this.model.id,
          sessionTime: this.model.sessionDate,
          orderList: this.orderList
        };
        console.log(JSON.stringify(order));
        this.model.hall.setPurchase(this.orderList);
        this.orderList.clear();
        this.modalHallView.render();
        this.modalOrderView.render();
      }
    });

    window.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.clearAllOnClose();
      }
    });
  }

  clearAllOnClose() {
    this.model.hall.clearReservation();
    this.modalHallView.render();
    this.clear();
    this.element.style.display = 'none';
  }

  render() {
    this.clear();
    this.element.classList.add('modal');
    this.element.style.display = 'block';

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    let closeBtn = document.createElement('span');
    closeBtn.classList.add('close', 'close--modal');
    closeBtn.addEventListener('click', (e) => {
      this.clearAllOnClose();
    });

    let modalContentInner = document.createElement('div');
    modalContentInner.classList.add('modal-content__inner');

    let modalColLeft = document.createElement('div');
    modalColLeft.classList.add('modal-col');
    modalColLeft.appendChild(this.modalMovieView.render().element);
    modalColLeft.appendChild(this.modalOrderView.render().element);

    modalContentInner.appendChild(modalColLeft);
    modalContentInner.appendChild(this.modalHallView.render().element);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalContentInner);

    this.element.appendChild(modalContent);
    return this;
  }
}
