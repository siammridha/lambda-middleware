const logError = require("./error-logger");

function Route() {
    let routeKey, method, path, middlewares;

    const executeMiddleware = async (request, response, [middleware, ...restOfMiddlewares]) => {
        try {
            const next = () => executeMiddleware(request, response, restOfMiddlewares);
            await middleware(request, response, next);
        } catch (error) {
            logError(error, request);
            response.status(500).send({ message: error.message });
        }
    }
    const setPathAndMiddlewares = (_method, _path, _middlewares) => {
        method = _method;
        middlewares = _middlewares;
        path = _path !== '/' ? _path : '';
        // console.log("route created:", `${_method} ${_path}`);
        return this;
    }
    this.match = (_routeKey) => {
        return (routeKey === _routeKey);
    }
    this.setRouteKey = (prefix) => {
        // console.log("setRouteKey:", `${method} ${prefix}${path}`);
        routeKey = `${method} ${prefix}${path}`
    }
    this.get = (path, ...middlewares) => {
        return setPathAndMiddlewares("GET", path, middlewares);
    }
    this.put = (path, ...middlewares) => {
        return setPathAndMiddlewares("PUT", path, middlewares);
    }
    this.post = (path, ...middlewares) => {
        return setPathAndMiddlewares("POST", path, middlewares);
    }
    this.delete = (path, ...middlewares) => {
        return setPathAndMiddlewares("DELETE", path, middlewares);
    }
    this.execute = (request, response) => {
        return executeMiddleware(request, response, middlewares);
    };
}

module.export = Route;