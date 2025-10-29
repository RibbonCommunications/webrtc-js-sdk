# Async APIs

The WebRTC JS SDK is introducing a new style of APIs that will greatly simplify handling feedback from the SDK. The term we are using for these APIs is "Async APIs".

These new APIs are being added as duplicates of the existing APIs, so that every API has an equivalent version using the new style. They are being added alongside the existing APIs (not replacing) to avoid any issues with the existing APIs being used. We encourage existing applications to migrate to the new style of APIs, as the long-term goal will be for them to replace the existing APIs. The underlying operation that the APIs perform is unchanged between the API styles; only how feedback is provided to the application is changed.

This tutorial will provide an explanation of the new API style, how it compares to the current API style, and a general view on what migration from old to new looks like.

## Current API Style

The SDK's current APIs provide event-based feedback to the application. When an API is called, the return value of the API itself does not provide the feedback from the operation being performed. Instead, after the operation completes, the SDK emits events to provide that feedback. An example of this is the API to subscribe a user:

```javascript
// Listen for when changes are made to the subscription state.
client.on('subscription:change', params => {
  ...
})

// Listen for when errors occur during a subscription operation.
client.on('subscription:error', params => {
  ...
})

// Invoke the SDK's API to subscribe the user.
function subscribeUser() {
  client.services.subscribe(services, options)
}
```

Feedback from the API is provided to the event listeners, rather than the function that invoked the API itself. This style of API feedback makes it easy to use common logic to handle feedback from different sources. For the above subscription example: all feedback for when the subscription state changes, no matter the source, is provided to the event listener specifically for that. This can include both the user subscribing or unsubscribing, as well as unexpected issues that cause the user to lose their subscription.

This style also has disadvantages, though. It can be convenient to handle all related feedback together, but it forces the application to follow an event-driven paradigm to manage the entire SDK. This can make managing feedback very complicated in some scenarios, such as when the application needs to understand what triggered that feedback. The goal of the new API style is to remove this complexity in managing the SDK and its feedback.

## New API Style

The SDK's new API style is to provide promise-based feedback from its APIs. Promises are the standard JavaScript method for providing asynchronous feedback, and is the basis for the new "Async API" style.

The new APIs are asynchronous functions, returning a promise that will provide the feedback when it is available. One purpose for this is to separate feedback about an API invocation from feedback from other sources. This allows the APIs to provide feedback in the same context that they were invoked in (instead of emitting an event for a listener to handle), so that logic for using that API can be kept together in the same context.

Re-using the subscription example from above, it looks like:

```javascript
function subscribeUser() {
  return client.services.subscribeAsync(services, options)
    .then(() => {
      // The operation successfully subscribed the user.
    })
    .catch(error => {
      // An error was encountered, failing the operation.
    })
}
```

Note: The above example uses promise-style syntax, but `async/await`-style syntax can also be used. The same code using `async/await`-style can be seen below, and will be used for examples.

```javascript
async function subscribeUser() {
  try {
    await client.services.subscribeAsync(services, options)
    // The operation successfully subscribed the user.
  } catch (error) {
    // An error was encountered, failing the operation.
  }
}
```

### Event Implications

An important change is that _solicited_ feedback, triggered by an API call, is no longer provided via events. With the Async APIs, events only represent a change in SDK state. This change can either be from an _unsolicited_ trigger (eg. a network issue caused the user to unexpectedly lose their subscription) or as an operation side-effect (eg. on success, the subscribe operation adds the subscription info to the user's subscription state). This allows an application to handle state changes separately from the APIs if desired.

## Async API Summary

The Async APIs return promises that will provide asynchronous feedback for the API, rather than it being emitted via an event. This can simplify how the SDK and its APIs need to be managed, with implications such as:

1. The result of an Async API can be managed in the same context as it was invoked in.
    - SDK operations do not need to be tracked across multiple contexts.
    - Calling multiple APIs in sequence can be done as a single asynchronous function.
2. With Async APIs, events are no longer the main source of feedback for SDK operations.
    - They always represent a change in SDK state.
    - They are never used to report an API failure.
    - They are triggered by either:
      1. an unsolicited trigger causing state to change.
      2. an on-going operation that changes state

## API Changes

The majority of Async APIs were implemented as exact duplicates of their existing APIs, but a few APIs have minor changes to further improve their usability.

### Resource Plurality

Some APIs that act on multiple resources at once have been changed to act on only one resource at a time. The intent of this change is to provide clearer (and simpler) feedback. When managing multiple resources, it is possible for scenarios that are not a clear success or failure if the operation succeeds for some but not all resources. Only acting on a single resource ensures that an operation's feedback is always a clear success or failure.

As an example, see below for how the `media.renderTracks` API has changed to be singular as `media.renderTrackAsync`:

```javascript

// Original version.
client.media.renderTracks([trackId1, trackId2], cssSelector)

// Async version, acting on a singular track.
const result = await client.media.renderTrackAsync(trackId1, cssSelector)
```

In this way, the `result` feedback is only about the singular track instead of the possibilty of mixed feedback for multiple tracks with `media.renderTracks`.

The APIs that have changed in this way are:

* `media.removeTracks` --> `media.removeTrackAsync`
* `media.muteTracks` --> `media.muteTrackAsync`
* `media.unmuteTracks` --> `media.unmuteTrackAsync`

## API Migration

Converting from the current APIs to the Async APIs will differ based on the APIs themselves. APIs that perform simpler operations, and hence have simpler feedback, will have a straight-forward migration. But some APIs' migration may be more involved depending on how its feedback is handled.

This section provides some general strategies for migration, alongside a few examples of scenarios with more complicated feedback.

### General Tips

#### Error Scenarios

When an Async API's operation fails, the error will only be reported via the API's promise. Events will no longer be used to communicate API error scenarios. Handling for that error scenario can be migrated to be alongside the API.

```javascript
client.on('subscription:error', params => {
  // This event will not be emitted when the `subscribeAsync` or `unsubscribeAsync`
  // APIs are used.
})

async function subscribeAsync() {
  try {
    await client.services.subscribeAsync(services, options)
    ...
  } catch (error) {
    const { code, message } = error
    // The error scenario should be handled via the promise instead of the event.
    // Logic from the 'subscription:error' event can be moved here.
  }
}

async function unsubscribeAsync() {
  try {
    await client.services.unsubscribeAsync(services)
    ...
  } catch (error) {
    const { code, message } = error
    // The error scenario should be handled via the promise instead of the event.
    // Logic from the 'subscription:error' event can be moved here.
  }
}
```

#### Queued APIs

For scenarios that require queueing APIs, the Async APIs' promises allow that to be done in a single context. The logic to wait for the second API, and any error handling, can be brought together, instead of needing to be managed in an event listener.

```javascript
client.on('call:stateChange', params => {
  // Events will still emitted, but are not necessary for queuing APIs.
})

/*
 * Perform a transfer operation on a Connected call. 
 * Requires the call to be put On Hold first.
 */
async function queueTransfer() {
  try {
    await client.call.hold(callId)
    // Hold successful; call is now On Hold. Continue with the transfer.
  } catch (error) {
    // Hold failed; call is still Connected. Do not continue with transfer.
    ...
  }

  try {
    await client.call.directTransfer(callId, destination)
    // Transfer successful; call is now Ended.
  } catch (error) {
    // Transfer failed; call is still On Hold.
    ...
  }
}
```

### Call Establishment

The below code examples focus on the events emitted while making an outgoing call. The `makeAsync` example shows which event scenarios can have their logic migrated out of the event listener, compared with the `make` example, to handle the feedback alongside the API.

```javascript
/**
 * This code examples shows making an outgoing call and managing it until it establishes.
 *
 * It uses the `call.make` API to start the call, then listens for events for changes.
 * Events:
 *    - `call:start`: The call is first available in SDK state, and is Initiating.
 *    - `call:stateChange`: The call has progressed and is in a new state.
 */

client.on('call:start', params => {
  // Though not necessary, `call:start` can be used to get the Call while it is still Initiating.
  const call = client.call.getById(params.callId)
  // call.state === 'Initiating'
})

client.on('call:stateChange', params => {
  const call = client.call.getById(params.callId)
  if (params.previous.state === 'Initiating' && call.state === 'Initiated') {
    // Call is in Initiated state; waiting for remote answer.
  } else if (params.previous.state === 'Initiating' && call.state === 'Ended') {
    // Call failed to Initiate and is now in Ended state.
  } else if (params.previous.state === 'Initiated' && call.state === 'Ringing') {
    // Call is in Ringing state; the destination has received the call and is Ringing too.
  } else if (params.previous.state === 'Ringing' && call.state === 'Connected') {
    // Call is now established with media.
  }
})

function makeCall () {
  const callId = client.call.make(destination, mediaOptions)
  const call = client.call.getById(callId)
  // call.state === 'Initiating'
}
```

```javascript
/**
 * This code examples shows making an outgoing call and managing it until it establishes.
 *
 * It uses the `call.makeAsync` API to start the call, then listens for events for changes.
 * Events:
 *    - `call:start`: The call is first available in SDK state, and is Initiating.
 *    - `call:stateChange`: The call has progressed and is in a new state.
 */

client.on('call:start', params => {
  /*
   * Scenario unchanged from make API:
   *    `call:start` can be used to get the Call while it is still Initiating.
   */
  const call = client.call.getById(params.callId)
  // call.state === 'Initiating'
})

client.on('call:stateChange', params => {
  const call = client.call.getById(params.callId)
  if (params.previous.state === 'Initiating' && call.state === 'Initiated') {
    /*
     * Same situation as the API's promise resolving:
     *    Call is in Initiated state; waiting for remote answer.
     * Logic to handle this event can be moved into the function that calls the API.
     */
  } else if (params.previous.state === 'Initiating' && call.state === 'Ended') {
    /*
     * Same situation as the API's promise rejecting:
     *    Call failed to Initiate and is now in Ended state.
     * Logic to handle this event can be moved into the function that calls the API.
     */
  } else if (params.previous.state === 'Initiated' && call.state === 'Ringing') {
    // Scenario unchanged from make API:
    //    Call is in Ringing state; the destination has received the call and is Ringing too.
  } else if (params.previous.state === 'Ringing' && call.state === 'Connected') {
    // Scenario unchanged from make API:
    //    Call is now established with media.
  }
})

// `makeAsync` using async/await syntax.
async function makeCallAsync() {
  try {
    const call = await client.call.makeAsync(destination, mediaOptions)
    // Call is in Initiated state; waiting for remote answer.
    // call.state === 'Initiated'
  } catch (error) {
    // Call failed to Initiate and is now in Ended state.
  }
}

// `makeAsync` using promise syntax.
function makeCallPromise() {
  const makePromise = client.call.makeAsync(destination, mediaOptions)
    .then(call => {
      // Call is in Initiated state; waiting for remote answer.
      // call.state === 'Initiated'
    })
    .catch(error => {
      // Call failed to Initiate and is now in Ended state.
    })

  // Before the promise resolves, the call can still be accessed in Initiating state if necessary.
  const call = client.call.getAll().at(-1)
  // call.state === 'Initiating

  return makePromise
}
```

### WebRTC Proxy Setup

When the SDK is used in a VDI environment, it requires special setup to be in "proxy mode". The below code example shows how that setup can take place by queuing the three APIs that are needed. Using the Async APIs allows for very clear code paths and error handling for each step of the process.

```javascript
/*
 * Setting up the SDK's Call Proxy is a 3-step process:
 *    1. Provide the channel to connect the SDK to the Remote SDK.
 *    2. Signal the Remote SDK to setup.
 *    3. Change the SDK to be in "proxy mode" for calls.
 */
async function setupProxy() {
  try {
    await client.proxy.setChannelAsync(channel)
    // Channel has been set; can continue with proxy setup.
  } catch (error) {
    // Channel could not be set; do not continue.
    ...
  }

  try {
    await client.proxy.initializeRemoteAsync()
    // The Remote SDK is ready; can continue with proxy setup.
  } catch (error) {
    // Remote SDK not ready; do not continue.
    ...
  }

  try {
    await client.proxy.setProxyModeAsync(true)
    // The SDK's calls will now be proxied.
  } catch (error) {
    // Failed to switch the SDK's calls to be proxied.
    ...
  }
}

client.on('proxy:change', params => {
  // Event will be emitted on every change in proxy state, but does not need
  //    to be handled as part of calling the proxy APIs.
})

client.on('proxy:error', params => {
  // The error event will not be emitted when the Async APIs are used; instead, the APIs' promises will reject.
})
```

