export class Section {
  constructor(items, renderer, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  createLayout() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
  //element = Card con el HTML
  additem(element) {
    this._container.prepend(element);
  }
}