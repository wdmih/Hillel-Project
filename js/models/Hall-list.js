class HallsList {
  constructor() {
    this.list = [];
  }
  addHall(item) {
    this.list.push(item);
  }
  getHallByName(hallName) {
    return this.list.find(hall => hall.name === hallName);
  }
}

let hallList = new HallsList();
hallList.addHall({ name: 'cinetech', type: '2D', rows: 4, seats: 8 });
hallList.addHall({ name: 'imax', type: '3D', rows: 6, seats: 12 });

export default hallList;
