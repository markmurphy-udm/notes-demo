import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: "123", // TODO no hardcoding
      noteId: event.pathParameters.id,
    },
    /*
    * IMPORTANT
    * 'UpdateExpression' defines the attributes to be updated
    * 'ExpressionAttributeValues' defines the value in the update expression
    */
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    /*
    * IMPORTANT
    * 'ReturnValues' specifies if and how to return the item's attributes,
    * ALL_NEW returns all attributes of the item after the update
    */
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});