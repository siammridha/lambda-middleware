function Router() {
    let count = 0;
    const routes = [];

    this.add = function (path, route) {
        if (!(route instanceof Route)) {
            throw new Error("must pass instance of a Route as arg.");
        } else {
            route.setRouteKey(path);
            routes.push(route);
            return this;
        }
    }

    this.handler = (request) => new Promise((resolve) => {
        console.log("handler-executed: ", ++count);
        const response = new Response(resolve);
        // find the route that matches the request routeKey;
        const route = routes.find((route) => route.match(request.routeKey));
        if (route) route.execute(request, response);
        else response.status(500).send({ message: 'could not found matching route' });
    });
}

module.export = Router;