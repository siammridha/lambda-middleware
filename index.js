const Middleware = require('./middleware');
const middleware = new Middleware();

middleware.use(async (event, context, next) => {
    try {
        console.log("error_middleware");
        next();
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
}).use(async (event, context, next) => {
    console.log("middleware_1");
    event['middleware_1'] = "middleware_1";
    next();
}).use(async (event, context, next) => {
    console.log("middleware_2");
    event['middleware_2'] = "middleware_2";
    console.log({ event, context })
    return {
        statusCode: 200,
        body: JSON.stringify(event),
    };
})

const result = middleware.handler
console.log(result({}, {}))