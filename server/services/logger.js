var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/accounts', ['logs']);

const logger = config => {
    const loggingApiHeaders = {
        Authorization: "Bearer " + config.apiKey
    };

    const log = (request, response, errorMessage, requestStart) => {
        const {
            rawHeaders,
            httpVersion,
            method,
            body,
            socket,
            url
        } = request;
        const {
            remoteAddress,
            remoteFamily
        } = socket;

        const {
            statusCode,
            statusMessage
        } = response;
        const responseHeaders = response.getHeaders();

        var newRecord = {
            timestamp: requestStart,
            processingTime: Date.now() - requestStart,
            rawHeaders,
            body,
            errorMessage,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url,
            response: {
                statusCode,
                statusMessage,
                headers: responseHeaders
            }
        };

        var response = {
            url,
            response: {
                statusCode,
                statusMessage
            }
        };
        // console.log(JSON.stringify(response));
        db.logs.save(newRecord, function (err, pResults) {
            if (err) {
                res.send(err);
            }
            
            // console.log(JSON.stringify(newRecord));
        });
    };

    return (request, response) => {
        const requestStart = Date.now();

        // ========== REQUEST HANLDING ==========
        let body = [];
        let requestErrorMessage = null;
        const getChunk = chunk => body.push(chunk);
        const assembleBody = () => {
            body = Buffer.concat(body).toString();
        };
        const getError = error => {
            requestErrorMessage = error.message;
        };
        request.on("data", getChunk);
        request.on("end", assembleBody);
        request.on("error", getError);

        // ========== RESPONSE HANLDING ==========
        const logClose = () => {
            removeHandlers();
            log(request, response, "Client aborted.", requestStart);
        };
        const logError = error => {
            removeHandlers();
            log(request, response, error.message, requestStart);
        };
        const logFinish = () => {
            removeHandlers();
            log(request, response, requestErrorMessage, requestStart);
        };
        response.on("close", logClose);
        response.on("error", logError);
        response.on("finish", logFinish);

        // ========== CLEANUP ==========
        const removeHandlers = () => {
            request.off("data", getChunk);
            request.off("end", assembleBody);
            request.off("error", getError);

            response.off("close", logClose);
            response.off("error", logError);
            response.off("finish", logFinish);
        };
    };
};


module.exports = logger;
