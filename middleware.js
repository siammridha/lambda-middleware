export default function Middleware() {
    const middlewares = [];

    this.use = function (middleware) {
        if (typeof middleware === 'function') {
            return middlewares.push(middleware), this;
        } else {
            throw Error("middleware must be a function");
        }
    }

    this.handler = async function (event, context) {
        if (middlewares.length) {
            return executeMiddleware(event, context, middlewares);
        } else {
            throw Error("must pass at list one middleware function");
        }
    }

    const executeMiddleware = (event, context, [nextMiddleware, ...restOfMiddlewares]) => {
        const next = () => executeMiddleware(event, context, restOfMiddlewares);
        return nextMiddleware(event, context, next);
    }

    return this;
}
