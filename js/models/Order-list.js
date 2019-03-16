export default class OrderList {
  constructor() {
    this.list = [];
  }
  addToList(item) {
    this.list.push(item);
  }
  removeFromList(item) {
    let index = this.list.findIndex(obj => {
      return Object.keys(item).every(key => item[key] === obj[key]);
    });
    this.list.splice(index, 1);
  }
  getList() {
    return this.list;
  }
  clear() {
    this.list.length = 0;
  }
}
