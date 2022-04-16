module.exports = (error, request) => {
    let errorMessage = "ERROR-MESSAGE [message=null] [routeKey=null] [method=null] [path=null] [sourceIp=null] [stack=null] [requestBody=null] [request=null]"

    if (error.stack) errorMessage = errorMessage.replace("[stack=null]", `[stack=${error.stack}]`);
    if (error.message) errorMessage = errorMessage.replace("[message=null]", `[message=${error.message}]`);
    if (request) {
        errorMessage = errorMessage.replace("[path=null]", `[path=${request.requestContext.http.path}]`);
        errorMessage = errorMessage.replace("[method=null]", `[method=${request.requestContext.http.method}]`);
        errorMessage = errorMessage.replace("[request=null]", `[request=${JSON.stringify(request, null, 2)}]`);
        errorMessage = errorMessage.replace("[routeKey=null]", `[routeKey=${request.requestContext.routeKey}]`);
        errorMessage = errorMessage.replace("[sourceIp=null]", `[sourceIp=${request.requestContext.http.sourceIp}]`);
        if ("body" in request) errorMessage = errorMessage.replace("[requestBody=null]", `[requestBody=${JSON.stringify(request.body, null, 2)}]`);
    }

    console.error(errorMessage);
}