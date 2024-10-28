export const createResponse = (type: any, bodyContent: any) => {
    return {
        statusCode: type,
        body: bodyContent
    }
}
