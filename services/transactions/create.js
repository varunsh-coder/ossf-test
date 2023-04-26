import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler( async (event, context) => {
  let data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      transactionId: uuid.v1(),
      description: data.description,
      amount: data.amount,
      date: Date.parse(data.date),
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);
  return params.Item;
});