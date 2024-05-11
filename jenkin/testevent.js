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
      console.log("Status:", payload.status);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

const functionName = "AVI-ReportingModule";
invokeLambdaAndListTestEvents();


/* import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import fs from "fs";

const lambda = new LambdaClient({ region: "ap-southeast-1" });

const invokeLambdaAndListTestEvents = async () => {
try {
   const eventsData = fs.readFileSync("D:/Users/trisha.hn/Documents/event.json", "utf-8");
  const events = JSON.parse(eventsData);

   for (const event of events) {
     const invokeParams = {
       FunctionName: functionName,
       InvocationType: "RequestResponse",
       Payload: JSON.stringify(event.payload),
     };

     const invokeResponse = await lambda.send(new InvokeCommand(invokeParams));
 const statusCode = invokeResponse.StatusCode;
 console.log("Event:", event.eventName);
 console.log("Status Code:", statusCode);
 }
} catch (err) {
 console.error("Error:", err);
}
};

const functionName = "AVI-ReportingModule";
invokeLambdaAndListTestEvents();


// this will give all the case sucess or failure in one short so it it called lambda testing

*/