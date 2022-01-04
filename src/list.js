import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    /*
    * IMPORTANT 
    * 'KeyConditionExpression' defines the condition for the query
    * - 'userId = :userId': only return items with matching 'userId'
    */
    KeyConditionExpression: "userId = :userId",
    /*
    * IMPORTANT
    * 'ExpressionAttributeValues' defines the value in the condition
    * - ':userId': defines 'userId' to be the id of the author
    */
    ExpressionAttributeValues: {
      ":userId": "123", // TODO don't hardcode!
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});