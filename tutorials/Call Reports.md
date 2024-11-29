[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# Call Reports
A call report can be created for any call, in any state. The report is in JSON format and will contain the following information.

- Timeline of events that occured during the call.
- Operation timings and additional contextual data are recorded as metrics.

## Elements of a call report
- **type**: The type of report will always be `CALL`.
- **id**: This is the call id of the call associated with this report.
- **timeline**: This is an array of top level events that occured during the call. These events correspond to the operations that have been performed.
- **data**: This contains any meta data related to this call.
- **metrics**: This is an array of objects that contain calculated metrics for specific operations during the call.

## Events
An event represents some functionality that has been executed during a call. Top level events will be found in the call report's timeline array. Events can also have their own sub events. These sub events will be stored in an events timeline array and follow the same format as top level events. This is how we scope events so it is clear which events occurred as part of higher level events.

### Elements of an event
- **type**: The type of event.
- **id**: A unique id representing a specific event.
- **timeline**: This is an array of sub events that have occured as part of this event.
- **data**: This contains any meta data related to this event.
- **metrics**: This is an array of objects that contain calculated metrics specific to this event.
- **start**: This is a timestamp created when this event started.
- **end**: This is a timestamp created when this event ended.
- **error**: The error, if an error is encountered.

### Events that the SDK records
The SDK captures events for all operations performed on a call, including both locally triggered operations (e.g., local hold, replace track) or remotely triggered (e.g., remote hold, remote add media). Events for certain operations that involve negotiation or media creation will have sub-events for those steps. A complete list of events captured by the SDK can be found in the [`call.reportEvents`](https://ribboncommunications.github.io/webrtc-js-sdk/docs/#callreportevents) documentation.

## Metrics
A metric is a representation of computed data that provides statistical information about an event or series of events. Most of the metrics computed by the SDK will be simple numbers that represent a duration (in milliseconds), or how long it took for something to complete.

### Elements of a metric
- **type**: The type of metric being calculated.
- **data**: The computed data for a metric.
- **eventIds**: An array of id's that contributed to the calculation of this metric.

### Metrics that the SDK computes
Refer to the [`call.metrics`](https://ribboncommunications.github.io/webrtc-js-sdk/docs/#callmetrics) for a complete list of metrics computed by the SDK.

The data for most metrics computed by the SDK consists of a numerical value in milliseconds. However, there are a few metrics that return more data: `TIME_TO_COLLECT_ICE_CANDIDATES` and `TIME_TO_RELAY_CANDIDATES`.

**TIME_TO_COLLECT_ICE_CANDIDATES**

The amount of time it takes from when the local description is set to when all ICE candidates have been collected.
The data for this metric is an object in the following format:
```javascript
{
  operation: <string>, // The operation for which ice collection occurred.
  duration: <number> // The amount of time it took for the ice collection to complete.
}
```

**TIME_TO_RELAY_CANDIDATES**

The amount of time it takes from when the `ice collection` operation starts until each `relay candidate` has been recieved.
```javascript
{
  operation: <string>, // The operation for which ice collection occurred.
  candidates: { // Information about the relay candidates collected
    duration: <number>,
    address: <string>,
    port: <number>
  }
}
```

## Obtaining a call report
To get a call report for a call, you simply call the `client.call.getReport(callId)` API function. You must provide an existing `callId` and when called, it will return a javascript object containing all recorded call events and any metrics computed for the call. For this demo, we'll add a button to enable us to download the call report. You can use it once the call started, any time during the call and even after call ended.

```html
<input disabled type="submit" id="call-report" value="Download Call Stats" onclick="downloadCallReport()" /> <br />
<br />
```

```javascript
/**
 * Function for providing the call report to a user via a downloaded file.
 * @method downloadCallReport
 */
function downloadCallReport () {
  const callReport = client.call.getReport(callId)

  // Convert the saved call stats into a JSON blob.
  const blob = new Blob([JSON.stringify(callReport, null, 2)], { type: 'application/json' })

  // Create a button that will save the Blob as a file when clicked.
  const button = document.createElement('a')
  button.href = URL.createObjectURL(blob)
  // Give the file a name.
  button.download = Date.now().toString() + '_sdk' + client.getVersion() + '_call_report.json'

  // Auto-click the button.
  button.click()
}
```

## Live Demo

Want to try this example for yourself? Click the button below to get started.

<form action="https://codepen.io/pen/define" method="POST" target="_blank" class="codepen-form"><input type="hidden" name="data" value=' {&quot;js&quot;:&quot;/**\n * Javascript SDK Call Reports Demo\n */\n\nconst defaultConfig = {\n  authentication: {\n    server: {\n      base: &apos;blue.rbbn.com&apos;\n    }\n  },\n  subscription: {\n    websocket: {\n      server: &apos;blue.rbbn.com&apos;\n    }\n  },\n  call: {\n    defaultPeerConfig: {\n      iceServers: [\n        {\n          urls: [&apos;turns:turn-blue.rbbn.com:443?transport=tcp&apos;]\n        }\n      ]\n    }\n  }\n}\n\nconst { create } = WebRTC\n\n// Setup WebrtcSDK with default configuration.\n// As part of configuration, we&apos;ll further apply some customization for logging.\nconst config = {\n  ...defaultConfig,\n  logs: {\n    logLevel: &apos;debug&apos;,\n    logActions: {\n      actionOnly: false,\n      exposePayloads: true\n    }\n  }\n}\n\nconst client = create(config)\n\n/*\n *  Authentication functionality.\n */\nfunction setCredentials () {\n  const username = document.getElementById(&apos;username&apos;).value\n  const password = document.getElementById(&apos;password&apos;).value\n\n  client.setCredentials({ username, password })\n}\n\nfunction subscribe () {\n  client.services.subscribe([&apos;call&apos;, &apos;Presence&apos;, &apos;IM&apos;])\n}\n\nfunction unsubscribe () {\n  client.services.unsubscribe([&apos;call&apos;, &apos;Presence&apos;, &apos;IM&apos;])\n}\n\n// Enable/disable all children of a given node\nfunction disableInput (elements, disable) {\n  for (let i = 0; i < elements.length; i++) {\n    let nodes = elements[i].getElementsByTagName(&apos;input&apos;)\n    for (let j = 0; j < nodes.length; j++) {\n      nodes[j].disabled = disable\n    }\n  }\n}\n\n// Setup a listener for changes in the connection state.\nclient.on(&apos;auth:change&apos;, function () {\n  const user = client.getUserInfo()\n  document.getElementById(&apos;current-user&apos;).innerHTML = user.username || &apos;None.&apos;\n  document.getElementById(&apos;subscribeBtn&apos;).disabled = !Boolean(user.username)\n  log(&apos;Credentials &apos; + (user.username ? &apos;set&apos; : &apos;unset&apos;))\n})\n\n// Setup a listener for authentication errors.\nclient.on(&apos;auth:error&apos;, function (params) {\n  log(&apos;Connect error: &apos; + params.error.message + &apos; (&apos; + params.error.code + &apos;)&apos;)\n})\n\n// Setup a listener for subscription changes\nclient.on(&apos;subscription:change&apos;, function (params) {\n  const services = client.services.getSubscriptions()\n  const isSubscribed = services.subscribed.length > 0\n  document.getElementById(&apos;is-subscribed&apos;).innerHTML = isSubscribed ? &apos;Subscribed.&apos; : &apos;Not subscribed.&apos;\n  document.getElementById(&apos;subscribeBtn&apos;).disabled = isSubscribed\n  document.getElementById(&apos;unsubscribeBtn&apos;).disabled = !isSubscribed\n  document.getElementById(&apos;setCredentials&apos;).disabled = isSubscribed\n  disableInput(document.getElementsByClassName(&apos;call-control&apos;), !isSubscribed)\n  // If there is a reason parameter, there was an issue with the subscription.\n  if (params.reason) {\n    log(&apos;Subscription state changed due to reason: &apos; + params.reason + &apos;. Subscribed services: &apos; + services.subscribed)\n  } else {\n    log(&apos;Subscription state changed. isPending: &apos; + services.isPending + &apos;. Subscribed services: &apos; + services.subscribed)\n  }\n})\n\n// Setup a listener for resubscription events\nclient.on(&apos;subscription:resub&apos;, function (params) {\n  log(&apos;Subscribed services: &apos; + params.isFailure ? &apos;Failed to resubscribe to services&apos; : &apos;Resubscribed to services&apos;)\n})\n\n// Setup a listener for subscription errors\nclient.on(&apos;subscription:error&apos;, function (params) {\n  const { code, message } = params.error\n  if (message.toLowerCase().includes(&apos;status code: 4&apos;)) {\n    // At a minimum, display a message to the user that the\n    // credentials were invalid, as this is a common use case.\n    alert(&apos;Invalid credentials. Ensure you got the right credentials.&apos;)\n  } else {\n    // Refer to `Handling Subscription Error` tutorial trail on\n    // various strategies in handling the rest of errors.\n  }\n  log(&apos;Subscription error: &apos; + message + &apos; (&apos; + code + &apos;)&apos;)\n})\n\n// Utility function for appending messages to the message div.\nfunction log (message) {\n  document.getElementById(&apos;messages&apos;).innerHTML += &apos;<div>&apos; + message + &apos;</div>&apos;\n}\n\n// Variable to keep track of the call.\nlet callId\n\n// Get user input and make a call to the callee.\nfunction makeCall () {\n  // Gather call options.\n  const callee = document.getElementById(&apos;callee&apos;).value\n\n  const mediaConstraints = {\n    audio: true,\n    video: false\n  }\n  callId = client.call.make(callee, mediaConstraints)\n}\n\n// Answer an incoming call.\nfunction answerCall () {\n  // Retrieve call state.\n  const call = client.call.getById(callId)\n  log(&apos;Answering call from &apos; + call.from)\n\n  const mediaConstraints = {\n    audio: true,\n    video: false\n  }\n  client.call.answer(callId, mediaConstraints)\n}\n\n// End an ongoing call.\nfunction endCall () {\n  // Retrieve call state.\n  const call = client.call.getById(callId)\n\n  log(&apos;Ending call with &apos; + call.from)\n  client.call.end(callId)\n}\n\n// Set listener for changes in a call&apos;s state.\nclient.on(&apos;call:stateChange&apos;, function (params) {\n  // Retrieve call state.\n  const call = client.call.getById(params.callId)\n\n  if (call.state === \&quot;Initiated\&quot;) {\n    document.getElementById(&apos;call-report&apos;).disabled = false\n  }\n  if (params.error && params.error.message) {\n    log(&apos;Error: &apos; + params.error.message)\n  }\n  log(&apos;Call state changed from &apos; + params.previous.state + &apos; to &apos; + call.state)\n})\n\n// Set listener for successful call starts & triggering point for starting stats collection.\nclient.on(&apos;call:start&apos;, function (params) {\n  log(&apos;Call successfully started. Waiting for response.&apos;)\n})\n\n// Set listener for incoming calls.\nclient.on(&apos;call:receive&apos;, function (params) {\n  // Keep track of the callId.\n  callId = params.callId\n\n  // Retrieve call information.\n  const call = client.call.getById(params.callId)\n  log(&apos;Received incoming call from &apos; + call.from)\n})\n\n\n/**\n * Function for providing the call report to a user via a downloaded file.\n * @method downloadCallReport\n */\nfunction downloadCallReport () {\n  const callReport = client.call.getReport(callId)\n\n  // Convert the saved call stats into a JSON blob.\n  const blob = new Blob([JSON.stringify(callReport, null, 2)], { type: &apos;application/json&apos; })\n\n  // Create a button that will save the Blob as a file when clicked.\n  const button = document.createElement(&apos;a&apos;)\n  button.href = URL.createObjectURL(blob)\n  // Give the file a name.\n  button.download = Date.now().toString() + &apos;_sdk&apos; + client.getVersion() + &apos;_call_report.json&apos;\n\n  // Auto-click the button.\n  button.click()\n}\n\n&quot;,&quot;html&quot;:&quot;<script src=\&quot;https://unpkg.com/@rbbn/webrtc-js-sdk@7.0.0/dist/webrtc.js\&quot;></script>\n\n<div>\n  <fieldset>\n    <legend>Set Credentials using your account information</legend>\n    User Email: <input type=\&quot;text\&quot; id=\&quot;username\&quot; /> Password:<input type=\&quot;password\&quot; id=\&quot;password\&quot; />\n    <input type=\&quot;submit\&quot; id=\&quot;setCredentials\&quot; value=\&quot;setCredentials\&quot; onclick=\&quot;setCredentials();\&quot; />\n    Current user: <span id=\&quot;current-user\&quot;>None.</span>\n  </fieldset>\n  <fieldset>\n    <legend>Subscribe</legend>\n    <input type=\&quot;submit\&quot; id=\&quot;subscribeBtn\&quot; disabled value=\&quot;Subscribe\&quot; onclick=\&quot;subscribe();\&quot; />\n    <input type=\&quot;submit\&quot; id=\&quot;unsubscribeBtn\&quot; disabled value=\&quot;Unsubscribe\&quot; onclick=\&quot;unsubscribe();\&quot; />\n    Current status: <span id=\&quot;is-subscribed\&quot;>Not subscribed.</span>\n  </fieldset>\n  <div class=\&quot;call-control\&quot;>\n    <fieldset>\n      <legend>Make a Call</legend>\n      <!-- User input for making a call. -->\n      <input disabled type=\&quot;button\&quot; value=\&quot;Make Call\&quot; onclick=\&quot;makeCall();\&quot; />\n      to <input disabled type=\&quot;text\&quot; id=\&quot;callee\&quot; />\n    </fieldset>\n\n    <fieldset>\n      <legend>Respond to a Call</legend>\n      <!-- User input for responding to an incoming call. -->\n      <input disabled type=\&quot;button\&quot; value=\&quot;Answer Call\&quot; onclick=\&quot;answerCall();\&quot; />\n    </fieldset>\n\n    <fieldset>\n      <legend>End a Call</legend>\n      <!-- User input for ending an ongoing call. -->\n      <input disabled type=\&quot;button\&quot; value=\&quot;End Call\&quot; onclick=\&quot;endCall();\&quot; />\n    </fieldset>\n  </div>\n  <div id=\&quot;remote-container\&quot;></div>\n\n  <br />\n  <div>Call Reports</div>\n</div>\n\n<input disabled type=\&quot;submit\&quot; id=\&quot;call-report\&quot; value=\&quot;Download Call Stats\&quot; onclick=\&quot;downloadCallReport()\&quot; /> <br />\n<br />\n\n  <fieldset>\n    <!-- Message output container. -->\n    <legend>Application Messages</legend>\n    <div id=\&quot;messages\&quot;></div>\n  </fieldset>\n</div>\n\n&quot;,&quot;css&quot;:&quot;&quot;,&quot;title&quot;:&quot;Javascript SDK Call Reports Demo&quot;,&quot;editors&quot;:101} '><input type="image" src="./TryItOn-CodePen.png"></form>

_Note: You’ll be sent to an external website._

[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

