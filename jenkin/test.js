 import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"; // to invoke we are importing this 
import fs from "fs"; // to read the file system

const lambda = new LambdaClient({ region: "ap-southeast-1" }); //to define the resion

const invokeLambdaAndListTestEvents = async () => {
  try {
const eventsData = fs.readFileSync("/Users/vipulkumarsingh/Desktop/jenkin/event.json", "utf-8"); // reading the file from the particular adress
    const events = JSON.parse(eventsData);

    for (const event of events) {
      const invokeParams = {
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(event.payload),
      };

      const invokeResponse = await lambda.send(new InvokeCommand(invokeParams));
      const payload = Buffer.from(invokeResponse.Payload).toString("utf-8");
      
      console.log("Event:", event.eventName);
      console.log("Lambda response:", payload);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

const functionName = "AVI-ReportingModule";
invokeLambdaAndListTestEvents();

/*this will give all body of event case this is also lambda testing*/