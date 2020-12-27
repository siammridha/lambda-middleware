module.exports = function Middleware() {
    const middlewares = [];

    function use(fn) {
        middlewares.push(fn);
        return { use, handler };
    }

    function handler(event, context) {
        return executeMiddleware(event, context, middlewares);
    }

    function executeMiddleware(event, context, [middleware, ...restOfMiddlewares]) {
        if (typeof middleware === 'function') {
            const next = () => executeMiddleware(event, context, restOfMiddlewares);
            return middleware(event, context, next);
        } else {
            throw Error("no more middleware to execute.");
        }
    }

    return { use, handler };
}
