export class View {
  constructor(el) {
    this.element = el;
  }
  render() {
    return this;
  }
  clear() {
    this.element.innerHTML = '';
    return this;
  }
}
