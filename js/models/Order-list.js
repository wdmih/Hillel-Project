export default class OrderList {
  constructor() {
    this.list = [];
  }
  addToList(item) {
    this.list.push(item);
  }
  updateList() {

  }
  getList() {
    return this.list;
  }
  clear() {
    this.list = [];
  }
}
