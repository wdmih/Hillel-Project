import movies from '../models/Movies';

class Router {
  constructor() {
    this.routes = {};
  }
  add(route, callback) {
    this.routes[route] = callback;
  }
  init() {
    this._routes = [];
    for (let route in this.routes) {
      let methodName = this.routes[route];
      this._routes.push({
        pattern: new RegExp('^' + route.replace(/:[\w-]+/, '([\\w-]+)') + '$'),
        callback: methodName
      });
    }
  }
  nav(path) {
    movies.getMovies().then(result => {
      let i = this._routes.length;
      while (i--) {
        let args = path.match(this._routes[i].pattern);
        if (args) {
          this._routes[i].callback.apply(this, args.slice(1));
        }
      }
    });
  }
  showAllRoutes() {
    return this.routes;
  }
}

let router = new Router();
export default router;
