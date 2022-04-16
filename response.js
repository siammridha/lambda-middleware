function Response(resolve) {
    let statusCode = 200;
    const headers = { "Content-Type": "application/json" }

    this.sendStatus = function (code) {
        resolve({ statusCode: code || statusCode })
    }

    this.send = function (body) {
        resolve({
            headers,
            statusCode,
            body: JSON.stringify(body, null, 2)
        })
    }

    this.status = (code) => {
        statusCode = code
        return { send: this.send };
    }

    this.redirect = (Location) => {
        resolve({
            statusCode: 301,
            headers: { Location }
        })
    }
}

module.exports = Response;