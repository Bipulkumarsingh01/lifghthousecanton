import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import fs from "fs";

const lambda = new LambdaClient({ region: "ap-southeast-1" });

const invokeLambdaAndListTestEvents = async () => {
  try {
    const eventsData = fs.readFileSync("/Users/vipulkumarsingh/Desktop/jenkin/event.json", "utf-8");
    const events = JSON.parse(eventsData);

    for (const event of events) {
      const invokeParams = {
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(event.payload),
      };

      const invokeResponse = await lambda.send(new InvokeCommand(invokeParams));
      const payload = JSON.parse(Buffer.from(invokeResponse.Payload).toString("utf-8"));

      console.log("Event:", event.eventName);
      console.log(`Expected Status: ${200}`);
      console.log(`Actual Status: ${payload.status}`);
      console.log(`Response: ${200 === payload.status ? 'Valid' : 'Invalid'}`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

const functionName = "AVI-ReportingModule";
invokeLambdaAndListTestEvents();

/*  it should write in one line   output event name  and second line expected status code and third line it should write acutal  output status code and then use if else loop if expcted equal to act *



Event: xyz
Expected Status: 200
Actual Status: 500
Response: Invalid

Event: abc
Expected Status: 200
Actual Status: 200
Response: Valid
*/