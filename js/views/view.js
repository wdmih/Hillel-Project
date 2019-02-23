export default class View {
  constructor(options) {
    const { model, tagName = 'div', el, className } = options;
    this.tagName = tagName;
    this.element = el || document.createElement(this.tagName);
    this.element.classList.add(className);
    this.model = model;
  }
  render() {
    return this;
  }
  clear() {
    this.element.innerHTML = '';
    return this;
  }
}
