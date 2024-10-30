export const CREATE_RESPONSE_CONST = (type: any, bodyContent: any) => {
    return {
        statusCode: type,
        body: bodyContent
    }
}
