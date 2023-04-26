import dynamoDb from "../../libs/dynamodb-lib";
import handler from "../../libs/handler-lib";

export const main = handler( async (event, context) => {
    let data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.idetity.cognitoIdentityId,
            transactionId: event.pathParameters.id,
        },
        UpdateExpression: "SET desciption = :description, amount = :amount, date = :date",
        ExpressionAttributeValues: {
            ":description": data.description,
            ":amount": data.amount,
            ":date": data.date,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);
    return { status: true };
});