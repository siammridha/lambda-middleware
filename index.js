const Middleware = require('./middleware');
const middleware = new Middleware();

middleware.use((event, context, next) => {
    try {
        console.log("error_middleware");
        event['error_middleware'] = "error_middleware";
        return next();
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
})

middleware.use((event, context, next) => {
    console.log("middleware_1");
    event['middleware_1'] = "middleware_1";
    return next();
})

middleware.use(async (event, context) => {
    console.log("middleware_2");
    event['middleware_2'] = "middleware_2";
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => reject({ event, context }), [5000])
    })
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
})



middleware.handler({}, {}).then((res) => {
    console.log("res:", res)
}).catch((error) => {
    console.error("error:", error)
});

// exports.handler = middleware.handler
