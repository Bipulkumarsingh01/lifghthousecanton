const fs = require("fs");
const fetch = require("node-fetch");

 
const invokeAPIEvents = async () => {
  try {
    const eventFilePath = process.argv[2];

 
    if (!eventFilePath) {
      throw new Error("Event file path is missing.");
    }

 
    const eventsData = fs.readFileSync(eventFilePath, { encoding: "utf-8" });
    const events = JSON.parse(eventsData);

 
    for (const event of events) {
      if (event.type === "api") {
        await invokeAPI(event.endpoint, event.method, event.headers, event.payload, event.expectedStatusCode, event.eventName);
      } else {
        console.log("Invalid event type:", event.type);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

 
async function invokeAPI(endpoint, method, headers, payload, expectedStatusCode, eventName) {
  const options = {
    method: method,
    headers: headers,
    body: method === "POST" ? JSON.stringify(payload) : undefined,
  };

 
  const response = await fetch(endpoint, options);
  console.log("API Event:", eventName);
  console.log("Actual Status Code:", response.status);
  console.log("Expected Status Code:", expectedStatusCode);
  const isValid = compareStatusCode(response.status, expectedStatusCode);
  console.log("Validity:", isValid ? "Valid" : "Invalid");
  console.log("==========================");
}

 
function compareStatusCode(actualStatusCode, expectedStatusCode) {
  return actualStatusCode === expectedStatusCode;
}

 
invokeAPIEvents();