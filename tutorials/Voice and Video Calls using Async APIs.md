[COPYRIGHT © 2025 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# Voice and Video Calls using Async APIs

In this quickstart, we will cover the basics of making calls with the WebRTC JS SDK's Async APIs. Code snippets will be used to demonstrate call usage of the SDK, and together these snippets will form a working demo application that can be viewed at the end.

For information about other call features, such as mid-call operations or screensharing, please refer to their respective quickstarts.

#### Async vs. non-Async APIs

The newly introduced Async APIs provide an alternate version of the SDK's APIs that provide feedback via promises instead of emitting events. Every API has an Async API equivalent, which performs the same underlying behaviours, but provides feedback in a friendlier way for applications to handle.

If you are interested in a more thorough comparison between the Async and non-Async versions of the SDK's APIs, we recommend also reading our [Async APIs Tutorial](Async%20APIs.md).

This quickstart is the Async API equivalent to our [Voice and Video Calls Quickstart](Voice%20and%20Video%20Calls.md). Some of this quickstart's explanations will reference the non-Async APIs, but familiarity of them is not required. Additionally, some portions of the quickstart that are unchanged between the Async and non-Async APIs (notably, the user interface and SDK configurations) are omitted here.

## User Subscription with Async APIs

The same flow of APIs is required whether using the regular or Async APIs: Set User Credentials, Subscribe, then eventually Unsubscribe.

#### Set Credentials

The `setCredentialsAsync` API behaves exactly as the `setCredentials` API except for one thing: On failure, the API will throw an error. This means that the application receives the feedback from the API immediately when called, instead of needing to listen for the `auth:change` event that would be emitted for the `setCredentials` API. So in this tutorial, we do not need any event listeners for setting user credentials.

```javascript
/*
 *  Set User Credentials.
 */
function setCredentialsAsync () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  try {
    client.setCredentialsAsync({ username, password })

    const user = client.getUserInfo()
    document.getElementById('current-user').innerHTML = user.username
    document.getElementById('subscribeBtn').disabled = false
    log('Credentials set as user: ' + user.username)
  } catch (error) {
    log('Failed to set credentials: ' + error.message + ' (' + error.code + ')')
  }
}
```

Note: Though this API's name is suffixed with "Async", it is not asynchronous and does not return a promise. The "Async" suffix is used to indicate the new APIs that provide feedback via return values instead of events, which are promise-based but have a few exceptions such as this API.

#### Subscribe & Unsubscribe

Similarly to the `setCredentialsAsync` API, the `subscribeAsync` and `unsubscribeAsync` APIs do not need event listeners. The `subscribe` and `unsubscribe` APIs would require the application to listen for the `subscription:change` event, but we do not need that here for _solicited_ subscription changes.

For `subscribeAsync` and `unsubscribeAsync`, handling the returned promise tells us everything we need to know: on resolve, the user is now subscribed, or on reject, the subscription failed.

```javascript
/*
 * Subscribe.
 */
async function subscribeAsync () {
  try {
    await client.services.subscribeAsync(['call'])
    setSubscribedUI(true)

    const services = client.services.getSubscriptions()
    log('Subscribed services: ' + services.subscribed)
  } catch (error) {
    log('Subscription error: ' + error.message + ' (' + error.code + ')')
  }
}

/*
 * Unsubscribe.
 */
async function unsubscribeAsync () {
  try {
    await client.services.unsubscribeAsync(['call'])
    setSubscribedUI(false)

    const services = client.services.getSubscriptions()
    log('User unsubscribed.')
  } catch (error) {
    log('Unsubscription error: ' + error.message + ' (' + error.code + ')')
  }
}
```

## Step 1: Making a Call

When making an outgoing call, the application needs to provide at least a `destination` and a `media` parameter. The `media` parameter indicates what local media should be included on the call, which will be audio and optionally video for this tutorial.

The `makeAsync` API's promise will resolve with the newly made call when it enters `Initiated` state. At this point, the call is waiting to be answered by the destination.

```javascript
// Variable to keep track of the current call.
let call

/*
 * Make an outgoing call.
 */
async function makeCallAsync () {
  const destination = document.getElementById('callee').value
  try {
    log('Making call to ' + destination)
    const withVideo = document.getElementById('make-with-video').checked

    // Track the current call with the global `call` variable.
    call = await client.call.makeAsync(destination, {
      audio: true,
      video: withVideo,
      videoOptions: withVideo ? { width: 400, height: 400 } : undefined
    })

    log('Call successfully started. Waiting for response.')
  } catch (error) {
    log('Failed to call: ' + error.message + + '(' + error.code + ')')
  }
}
```

As the call is being made, the SDK will emit `call:tracksAdded` events to indicate media is now available on the call and can be rendered. This application will render the tracks in the event listener for `call:tracksAdded`, since that event will be emitted for any scenario where new tracks are available, rather than only when making a call.

When the call is answered, a `call:stateChange` event will be emitted to indicate the call's state has changed to `Connected`. There is nothing this application needs to do in this scenario.

## Step 2: Responding to a Call

Just like in the [Voice and Video Calls Quickstart](Voice%20and%20Video%20Calls.md), an incoming call can be answered or rejected.

Similarly to making a call, answering a call requires a `media` parameter that indicates what local media should be included on the call. This quickstart will always include audio and conditionally include video.

```javascript
/*
 * Answer an incoming call.
 */
async function answerCallAsync () {
  try {
    // If the incoming call offered video and the local user indicates to also send video, then answer with video.
    const videoOffered = call.mediaOffered?.video
    const withVideo = videoOffered && document.getElementById('answer-with-video').checked

    await client.call.answerAsync(call.id, {
      audio: true,
      video: withVideo,
      videoOptions: withVideo ? { width: 400, height: 400 } : undefined
    })
    log('Call answered.')
  } catch (error) {
    log('Failed to answer call: ' + error.message)
  }
}
```

Similarly when making a call, the SDK will emit a `call:tracksAdded` event while it is being answered. The same event listener logic mentioned for the `makeAsync` API will handle rendering tracks for both the make and answer (and other) scenarios.

When the call is answered, a `call:stateChange` event will be emitted to indicate the call's state has changed to `Connected`. There is nothing this application needs to do in this scenario.

Rejecting a call is even simpler since it requires no extra parameters. Simply call the `rejectAsync` API:

```javascript
/*
 * Reject the call.
 */
async function rejectCallAsync () {
  try {
    await client.call.rejectAsync(call.id)
    log('Rejected call.')
  } catch (error) {
    log('Failed to reject call: ' + error.message)
  }
}
```

When the call is rejected, the SDK will also emit a `call:stateChange` event to indicate the call state has changed to `Ended`. We will use this event for call & UI clean-up, since it is emitted in all scenarios where the call is ended, not only when we call the `rejectAsync` API.

## Step 3: Ending a Call

To end a call, we simply need to call the `endAsync` API. The API's returned promise tells us when the call has been ended.

```javascript
// End call, asynchronously.
async function endCallAsync () {
  try {
    await client.call.endAsync(call.id)
    log('Ended call.')
  }  catch (error) {
    log('Failed to end call: ', error.message)
  }
}
```

Similarly when rejecting a call, the SDK will emit a `call:stateChange` event to indicate its state has changed to `Ended`. So the same event listener logic mentioned for the `rejectAsync` API will handle both reject and end scenarios.

## Step 4: Call Events

Though the Async APIs provide their feedback via promises instead of events, there are still events that are emitted to indicate state changes in the SDK or a specific call. The majority of these events are handled the same whether an Async or non-Async API was called, since they are not directly to an API. But there are a few events that are conceptually simpler when Async APIs are used, since they do not need to provide feedback for the APIs themselves anymore.

The call events where handling is unchanged between API types are:

1. `call:receive`: Indicates that a new incoming call has been received.
2. `call:tracksAdded`: Indicates the call has new media that can be rendered.
3. `call:tracksRemoved`: Indicates the call has media that is no longer available, and should be unrendered.

In contrast, the call event who's handling is simplified with Async APIs is the `call:stateChange` event. With Async APIs, it only indicates that the call's state has changed. So this quickstart will use the event to learn when the call ends

``` javascript
// Listen for when the call changes state.
client.on('call:stateChange', function (params) {
  call = client.call.getById(params.callId)
  log('Call state changed from ' + params.previous.state + ' to ' + call.state)

  // Clean-up the app state if the call is now ended.
  if (call.state === 'Ended') {
    call = null
    document.getElementById('answer-with-video').disabled = false
  }
})
```

When using the non-Async APIs, this event can also contain error feedback. The event no longer contains that for Async APIs since the feedback is provided via promises instead.

## Live Demo

Want to play around with this example for yourself? Feel free to edit this code on Codepen.

<form action="https://codepen.io/pen/define" method="POST" target="_blank" class="codepen-form"><input type="hidden" name="data" value=' {&quot;js&quot;:&quot;/**\n * The WebRTC JS SDK Voice and Video Async Call Demo\n */\n\nconst { create } = WebRTC\n\n// Optional: May want to remove some unnecessary codecs to keep the sdp size down\n//           This depends on backend support, and in this particular case we do\n//           need to restrict the supported codecs.\nconst removeCodecs = WebRTC.sdpHandlers.createCodecRemover([\n  &apos;VP9&apos;,\n  &apos;G722&apos;,\n  &apos;ISAC&apos;,\n  &apos;AV1&apos;,\n  {\n    name: &apos;H264&apos;,\n    fmtpParams: [&apos;packetization-mode=0&apos;]\n  },\n  &apos;H265&apos;\n])\n\nconst client = create({\n  authentication: {\n    server: { base: &apos;blue.rbbn.com&apos; }\n  },\n  subscription: {\n    websocket: { server: &apos;blue.rbbn.com&apos; }\n  },\n  call: {\n    sdpHandlers: [removeCodecs],\n    defaultPeerConfig: {\n      iceServers: [{ urls: [&apos;turns:turn-blue.rbbn.com:443?transport=tcp&apos;] }]\n    }\n  }\n})\n\n// Utility function for appending messages to the message div.\nfunction log (message) {\n  document.getElementById(&apos;messages&apos;).innerHTML += &apos;<div>&apos; + message + &apos;</div>&apos;\n}\n\n// Enable/disable all children of a given node\nfunction disableInput (elements, disable) {\n  for (let i = 0; i < elements.length; i++) {\n    let nodes = elements[i].getElementsByTagName(&apos;input&apos;)\n    for (let j = 0; j < nodes.length; j++) {\n      nodes[j].disabled = disable\n    }\n  }\n}\n\n/*\n * Update HTML buttons and text to reflect the subscription status of the user.\n */\nfunction setSubscribedUI(isSubscribed) {\n  document.getElementById(&apos;is-subscribed&apos;).innerHTML = isSubscribed ? &apos;Subscribed.&apos; : &apos;Not subscribed.&apos;\n  document.getElementById(&apos;subscribeBtn&apos;).disabled = isSubscribed\n  document.getElementById(&apos;unsubscribeBtn&apos;).disabled = !isSubscribed\n  document.getElementById(&apos;setCredentials&apos;).disabled = isSubscribed\n  disableInput(document.getElementsByClassName(&apos;call-control&apos;), !isSubscribed)\n}\n\n/*\n *  Set User Credentials.\n */\nfunction setCredentialsAsync () {\n  const username = document.getElementById(&apos;username&apos;).value\n  const password = document.getElementById(&apos;password&apos;).value\n  try {\n    client.setCredentialsAsync({ username, password })\n\n    const user = client.getUserInfo()\n    document.getElementById(&apos;current-user&apos;).innerHTML = user.username\n    document.getElementById(&apos;subscribeBtn&apos;).disabled = false\n    log(&apos;Credentials set as user: &apos; + user.username)\n  } catch (error) {\n    log(&apos;Failed to set credentials: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n/*\n * Subscribe.\n */\nasync function subscribeAsync () {\n  try {\n    await client.services.subscribeAsync([&apos;call&apos;])\n    setSubscribedUI(true)\n\n    const services = client.services.getSubscriptions()\n    log(&apos;Subscribed services: &apos; + services.subscribed)\n  } catch (error) {\n    log(&apos;Subscription error: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n/*\n * Unsubscribe.\n */\nasync function unsubscribeAsync () {\n  try {\n    await client.services.unsubscribeAsync([&apos;call&apos;])\n    setSubscribedUI(false)\n\n    const services = client.services.getSubscriptions()\n    log(&apos;User unsubscribed.&apos;)\n  } catch (error) {\n    log(&apos;Unsubscription error: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// Variable to keep track of the current call.\nlet call\n\n/*\n * Make an outgoing call.\n */\nasync function makeCallAsync () {\n  const destination = document.getElementById(&apos;callee&apos;).value\n  try {\n    log(&apos;Making call to &apos; + destination)\n    const withVideo = document.getElementById(&apos;make-with-video&apos;).checked\n\n    // Track the current call with the global `call` variable.\n    call = await client.call.makeAsync(destination, {\n      audio: true,\n      video: withVideo,\n      videoOptions: withVideo ? { width: 400, height: 400 } : undefined\n    })\n\n    log(&apos;Call successfully started. Waiting for response.&apos;)\n  } catch (error) {\n    log(&apos;Failed to call: &apos; + error.message + + &apos;(&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n/*\n * Answer an incoming call.\n */\nasync function answerCallAsync () {\n  try {\n    // If the incoming call offered video and the local user indicates to also send video, then answer with video.\n    const videoOffered = call.mediaOffered?.video\n    const withVideo = videoOffered && document.getElementById(&apos;answer-with-video&apos;).checked\n\n    await client.call.answerAsync(call.id, {\n      audio: true,\n      video: withVideo,\n      videoOptions: withVideo ? { width: 400, height: 400 } : undefined\n    })\n    log(&apos;Call answered.&apos;)\n  } catch (error) {\n    log(&apos;Failed to answer call: &apos; + error.message)\n  }\n}\n\n/*\n * Reject the call.\n */\nasync function rejectCallAsync () {\n  try {\n    await client.call.rejectAsync(call.id)\n    log(&apos;Rejected call.&apos;)\n  } catch (error) {\n    log(&apos;Failed to reject call: &apos; + error.message)\n  }\n}\n\n// End call, asynchronously.\nasync function endCallAsync () {\n  try {\n    await client.call.endAsync(call.id)\n    log(&apos;Ended call.&apos;)\n  }  catch (error) {\n    log(&apos;Failed to end call: &apos;, error.message)\n  }\n}\n\n/*\n * Event listeners.\n */\n\nclient.on(&apos;call:receive&apos;, function (params) {\n  // Retrieve call information & keep track of it.\n  call = client.call.getById(params.callId)\n  const videoOffered = call.mediaOffered?.video\n  log(&apos;Received incoming &apos; + (videoOffered ? &apos;audio+video&apos; : &apos;audio-only&apos;) + &apos; call from &apos; + call.from)\n})\n\nclient.on(&apos;call:tracksAdded&apos;, function (params) {\n  // Iterate over each trackId to determine how it should be rendered.\n  params.trackIds.forEach(trackId => {\n    const track = client.media.getTrackById(trackId)\n\n    if (track.isLocal) {\n      // Skip rendering local audio to avoid feedback.\n      if (track.kind === &apos;video&apos;) {\n        client.media.renderTracks([trackId], &apos;#local-container&apos;)\n      }\n    } else {\n      client.media.renderTracks([trackId], &apos;#remote-container&apos;)\n    }\n  })\n})\n\nclient.on(&apos;call:tracksRemoved&apos;, function (params) {\n  // Iterate over each trackId to determine how to unrender it.\n  params.trackIds.forEach(trackId => {\n    const track = client.media.getTrackById(trackId)\n\n    // Unrender the track from its container.\n    const container = track.isLocal ? &apos;#local-container&apos; : &apos;#remote-container&apos;\n    client.media.removeTracks([trackId], container)\n  })\n})\n\n// Listen for when the call changes state.\nclient.on(&apos;call:stateChange&apos;, function (params) {\n  call = client.call.getById(params.callId)\n  log(&apos;Call state changed from &apos; + params.previous.state + &apos; to &apos; + call.state)\n\n  // Clean-up the app state if the call is now ended.\n  if (call.state === &apos;Ended&apos;) {\n    call = null\n    document.getElementById(&apos;answer-with-video&apos;).disabled = false\n  }\n})\n\n&quot;,&quot;html&quot;:&quot;<script src=\&quot;https://unpkg.com/@rbbn/webrtc-js-sdk@7.11.0/dist/webrtc.js\&quot;></script>\n\n<div>\n  <fieldset>\n    <legend>Set Credentials using your account information</legend>\n    User Email: <input type=\&quot;text\&quot; id=\&quot;username\&quot; /> Password: <input type=\&quot;password\&quot; id=\&quot;password\&quot; />\n    <input type=\&quot;submit\&quot; id=\&quot;setCredentials\&quot; value=\&quot;setCredentials\&quot; onclick=\&quot;setCredentialsAsync();\&quot; />\n    Current user: <span id=\&quot;current-user\&quot;>None.</span>\n  </fieldset>\n  <fieldset>\n    <legend>Subscribe</legend>\n    <input type=\&quot;submit\&quot; id=\&quot;subscribeBtn\&quot; disabled value=\&quot;Subscribe\&quot; onclick=\&quot;subscribeAsync();\&quot; />\n    <input type=\&quot;submit\&quot; id=\&quot;unsubscribeBtn\&quot; disabled value=\&quot;Unsubscribe\&quot; onclick=\&quot;unsubscribeAsync();\&quot; />\n    Current status: <span id=\&quot;is-subscribed\&quot;>Not subscribed.</span>\n  </fieldset>\n  <div class=\&quot;call-control\&quot;>\n    <fieldset>\n      <legend>Make a Call</legend>\n      <!-- User input for making a call. -->\n      <input type=\&quot;button\&quot; value=\&quot;Make Call\&quot; onclick=\&quot;makeCallAsync();\&quot; disabled />\n      to <input type=\&quot;text\&quot; id=\&quot;callee\&quot; disabled /> with video <input type=\&quot;checkbox\&quot; id=\&quot;make-with-video\&quot; disabled />\n    </fieldset>\n\n    <fieldset>\n      <legend>Respond to a Call</legend>\n      <!-- User input for responding to an incoming call. -->\n      <input type=\&quot;button\&quot; value=\&quot;Answer Call\&quot; onclick=\&quot;answerCallAsync();\&quot; disabled />\n      with video <input type=\&quot;checkbox\&quot; id=\&quot;answer-with-video\&quot; disabled />\n      <input type=\&quot;button\&quot; value=\&quot;Reject Call\&quot; onclick=\&quot;rejectCallAsync();\&quot; disabled />\n    </fieldset>\n\n    <fieldset>\n      <legend>End a Call</legend>\n      <!-- User input for ending an ongoing call. -->\n      <input type=\&quot;button\&quot; value=\&quot;End Call\&quot; onclick=\&quot;endCallAsync();\&quot; disabled />\n    </fieldset>\n\n    <fieldset>\n      <!-- Message output container. -->\n      <legend>Messages</legend>\n      <div id=\&quot;messages\&quot;></div>\n    </fieldset>\n  </div>\n</div>\n\n<!-- Media containers. -->\nRemote video:\n<div id=\&quot;remote-container\&quot;></div>\n\nLocal video:\n<div id=\&quot;local-container\&quot;></div>\n\n&quot;,&quot;css&quot;:&quot;&quot;,&quot;title&quot;:&quot;The WebRTC JS SDK Voice and Video Async Call Demo&quot;,&quot;editors&quot;:101} '><input type="image" src="./TryItOn-CodePen.png"></form>

[COPYRIGHT © 2025 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

