var mongojs = require('mongojs');

var config = require("../config");
var db = mongojs(config.database.host, ['logs']);

const logger = config => {
    const loggingApiHeaders = {
        Authorization: "Bearer " + config.apiKey
    };

    const log = (request, response, errorMessage, requestStart) => {
        const {
            statusCode,
            statusMessage,
        } = response;
        const responseHeaders = response.getHeaders();

        const newRecord = {
            timestamp: requestStart,
            processingTime: Date.now() - requestStart,
            rawHeaders: request.rawHeaders,
            body: request.body,
            errorMessage,
            httpVersion: request.httpVersion,
            method: request.method,
            remoteAddress: request.socket.remoteAddress,
            remoteFamily: request.socket.remoteFamily,
            url: request.url,
            response: {
                statusCode,
                statusMessage,
                headers: responseHeaders,
                body: response.body,
            }
        };

        // const response = {
        //     url: request.url,
        //     response: {
        //         statusCode,
        //         statusMessage
        //     }
        // };
        db.logs.save(newRecord, function (err, pResults) {
            if (err) {
                res.send(err);
            }
        });
    };

    return (request, response) => {
        const requestStart = Date.now();

        // ========== REQUEST HANDLING ==========
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

        // ========== RESPONSE HANDLING ==========
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
