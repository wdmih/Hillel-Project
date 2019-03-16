export default class CinemaHall {
  constructor(options) {
    this.name = options.name;
    this.rows = options.rows;
    this.seats = options.seats;
    this.schema = this.init();
  }
  init() {
    let tempSchema = [];
    for (let i = 0; i < this.rows; i++) {
      let row = {};
      row.number = i + 1;
      row.seats = [];

      for (let j = 0; j < this.seats; j++) {
        let seat = row.seats[j] = {};
        seat.number = j + 1;
        seat.sold = false;
        seat.reserved = false;
      }

      tempSchema.push(row);
    }
    return tempSchema;
  }

  setReservation(row, seat, status) {
    this.schema[row].seats[seat].reserved = status;
  }
  clearReservation() {
    this.schema.forEach(row => {
      row.seats.forEach(seat => seat.reserved = false);
    });
  }
  setPurchase(order) {
    let listOrder = order.list;
    listOrder.forEach(item => {
      this.schema[item.row].seats[item.seat].sold = true;
    });
  }
}
