import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import fs from "fs";

const lambda = new LambdaClient({ region: "ap-southeast-1" });

const eventMetadata = {
  "version": "2.0",
  "routeKey": "ANY /reporting-module",
  "rawPath": "/reporting-module",
  "rawQueryString": "getAllTickets=true%0A",
  "headers": {
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "content-length": "0",
    "host": "5jg01ylkhd.execute-api.ap-southeast-1.amazonaws.com",
    "postman-token": "0cbb72d5-7e0b-4789-b671-a535aa7904bb",
    "user-agent": "PostmanRuntime/7.32.2",
    "x-amzn-trace-id": "Root=1-646da1ad-60acf67b4a98c3e117568827",
    "x-forwarded-for": "52.221.94.206",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https"
  },
  "queryStringParameters": {
    "getAllTickets": "true\n"
  },
  "requestContext": {
    "accountId": "398668967408",
    "apiId": "5jg01ylkhd",
    "domainName": "5jg01ylkhd.execute-api.ap-southeast-1.amazonaws.com",
    "domainPrefix": "5jg01ylkhd",
    "http": {
      "method": "GET",
      "path": "/reporting-module",
      "protocol": "HTTP/1.1",
      "sourceIp": "52.221.94.206",
      "userAgent": "PostmanRuntime/7.32.2"
    },
    "requestId": "FaYzJhztyQ0EMVQ=",
    "routeKey": "ANY /reporting-module",
    "stage": "$default",
    "time": "24/May/2023:05:33:33 +0000",
    "timeEpoch": 1684906413401
  },
  "isBase64Encoded": false
};

const invokeLambdaAndListTestEvents = async () => {
  try {
   
    const events = JSON.parse(eventsData);

    for (const event of events) {
      const invokeParams = {
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({ ...event, metadata: eventMetadata }),
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
/* this will give particular one event in bodyv   add event.json metadata in one file no need to copy the pathe of event.jso and this the event.json data modify the above ccode and give  

 import { LambdaClient, InvokeCommand, ListEventSourceMappingsCommand } from "@aws-sdk/client-lambda";
import https from "https";
const lambda = new LambdaClient({ region: "ap-southeast-1" });

const invokeLambdaAndListTestEvents = async (functionName) => {
// Invoke the Lambda function
const invokeParams = {
 FunctionName: functionName,
 InvocationType: "RequestResponse",
 Payload: JSON.stringify({
  "version": "2.0",
  "routeKey": "ANY /reporting-module",
  "rawPath": "/reporting-module",
  "rawQueryString": "ticketId=ojers",
  "headers": {
    "accept": "/",
    "accept-encoding": "gzip, deflate, br",
    "content-length": "369",
    "content-type": "application/json",
    "host": "5jg01ylkhd.execute-api.ap-southeast-1.amazonaws.com",
    "postman-token": "2a93edbf-cf6b-4044-9415-a286f2f1866d",
    "user-agent": "PostmanRuntime/7.32.2",
    "x-amzn-trace-id": "Root=1-64645d0c-5807b1856cad22c77b21a818",
    "x-forwarded-for": "52.221.94.206",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https"
  },
  "queryStringParameters": {
    "ticketId": "vqgql"
  },
  "requestContext": {
    "accountId": "398668967408",
    "apiId": "5jg01ylkhd",
    "domainName": "5jg01ylkhd.execute-api.ap-southeast-1.amazonaws.com",
    "domainPrefix": "5jg01ylkhd",
    "http": {
      "method": "PUT",
      "path": "/reporting-module",
      "protocol": "HTTP/1.1",
      "sourceIp": "52.221.94.206",
      "userAgent": "PostmanRuntime/7.32.2"
    },
    "requestId": "FDN6BgHHSQ0EJ9g=",
    "routeKey": "ANY /reporting-module",
    "stage": "$default",
    "time": "17/May/2023:04:50:20 +0000",
    "timeEpoch": 1684299020619
  },
  "body": "{\r\n    \"user_id\": \"9999999999999999999\",\r\n    \"departmentCode\": \"marketing\",\r\n    \"ticketId\": \"v27yo\",\r\n    \"status\": \"pending\",\r\n     \"updatedBy\": \"sangam\",\r\n     \"assignto\":\"ravi\",\r\n    \"category\": \"Technical Support\",\r\n    \"priority\": \"high\",\r\n    \"description\": \"My computer won't start\",\r\n    \"postedTimeEpoch\": 1684298148305,\r\n    \"resolutiondate\":\"12=2020-12\"\r\n}",
  "isBase64Encoded": false
})
};

try {
const invokeResponse = await lambda.send(new InvokeCommand(invokeParams));
 const payload = Buffer.from(invokeResponse.Payload).toString("utf-8");
 console.log("Lambda response:", payload);

// List the test events associated with the Lambda function
const listEventsParams = {
 FunctionName: functionName
 };

 const listEventsResponse = await lambda.send(new ListEventSourceMappingsCommand(listEventsParams));
 const eventMappings = listEventsResponse.EventSourceMappings;

 console.log("Test Events for Lambda Function:", functionName);
 eventMappings.forEach((eventMapping, index) => {
 const testEvent = eventMapping.EventSourceArn;
 console.log(`Test Event ${index + 1}: ${testEvent}`);
});
} catch (err) {
 console.error("Error:", err);
}
};

const functionName = "AVI-ReportingModule";
invokeLambdaAndListTestEvents(functionName); */




