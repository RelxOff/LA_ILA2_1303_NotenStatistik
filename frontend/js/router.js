export class Router {
  constructor(routes) {
    this.routes = routes;
    this.navigate = function (hash) {
      const route = this.getRouteByHash(hash);
      history.pushState({}, "", hash);
      route.function();
    };

    this.urlResolve = function () {
      this.navigate(location.hash);
    };

    this.getRouteByHash = (hash) => {
      if (hash == "") {
        return routes.home;
      }
      let route = routes.error;
      Object.keys(routes).forEach((key) => {
        if (routes[key].hash == hash) {
          route = routes[key];
        }
      });
      return route;
    };
    addEventListener("hashchange", (event) => {
      event.preventDefault();
      this.urlResolve();
    });
  }
}

// keine Eigenleistung.
// https://itmodul.ch/m294/
