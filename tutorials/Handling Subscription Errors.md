---
layout: page
categories: quickstarts-javascript
title: Handling Subscription Errors
permalink: /quickstarts/javascript/link/Handling%20Subscription%20Errors
---

# Subscription Errors

This tutorial will go over the different types of errors that may be encountered during subscription, and also provide recommendations for handling them through some examples.

The SDK reports errors from subscription attempts to the application via the `subscription:error` event. These errors are can be handled with an event handler for the error event:

```javascript
client.on('subscription:error', function (params) {
  const { code, message } = params.error
  // Handle error
})
```

## Common Subscription Errors

The following table lists some common error codes related to subscription and their meanings.

| Error code         | Error message                                                                | Explanation                                                               |
| ------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `authentication:1` | “Authorization failed with server. Please check credentials. Status code: 4" | Invalid credentials. Check credentials, and re-try.                       |
| `authentication:3` | “No subscription found for "X", can't unsubscribe.”                          | Requested service for unsubscription isn't subscribed.                    |
| `authentication:3` | “No subscription found, can't unsubscribe.”                                  | No active subscriptions to unsubscribe from.                              |
| `authentication:4` | “Failed to subscribe user. Status Code: 19”                                  | Too many active sessions for this user and subscription.                  |
| `authentication:4` | “Failed to subscribe user. Status Code: 37”                                  | Invalid subscription service string OR user is not assigned such service. |
| `authentication:4` | “Failed to subscribe user. Status Code: 38”                                  | Invalid client correlator (no special characters).                        |
| `authentication:4` | “Failed to subscribe user. Status Code: 39”                                  | Subscription session does not exist anymore.                              |

### Handling Common Subscription Errors

The general flow for handling common subscription errors would be to use an event handler for logging and/or displaying the error, depending on the type of error (i.e., application-related vs. user-related). For example, for the common user-related error where a user inputs invalid credentials, a simple way to handle this would be to display a message to the user to let them know that the credentials inputted were invalid. Similarly, for session not found error (`Status Code: 39`), a message could be displayed to the user telling them that their subscription has expired.

```javascript
client.on('subscription:error', function (params) {
  const { code, message } = params.error
  log('There was an error during subscription: ', code, '-', message)

  if (message.toLowerCase().includes('status code: 4')) {
    // Status Code 4 refers to an invalid credentials error
    // Display a message to the user that the credentials were invalid
  }
})
```

For application-related errors, a log of the error in the handler (like shown above) will allow application developers to see the type of error and act accordingly. Errors relating to the service subscription and client correlator strings will likely require action to correct in the application internally.

Another error that may be handled by the application is the `Status Code: 19` (too many active sessions) error. This can be mitigated by manging currently active sessions of the requested user subscription with `/GET` and `/DELETE` requests to the server, or by overriding active subscriptions by subscribing with a client correlator already in use by an active subscription. Lastly, some errors may require correction with the user account. For example the `Status Code: 37` error could mean that the user account does not have the requested subscription service assigned to it.

## Uncommon Subscription Errors

The following list of status codes in the subscription error messages refer to uncommon errors that an application may encounter during subscription attempts: `9`, `17`, `26`, `27`, `54`, `62`, `63`. These errors don't necessarily require any end-user action to correct, nor do they necessarily correlate to an issue with the application. The errors may arise from either backend server issues or user account issues.

### Handling Uncommon Subscription Errors

The recommended approach for handling uncommon subscription errors would be to repeatedly re-try subscription attempts in successive intervals until either a timeout is reached or subscription is successful. Depending on how robust the application needs to be, the timer intervals and timeout can be configured accordingly. The following section outlines a simple algorithm for re-trying subscription requests. This approach can be especially useful for accomodating untimely network failures, or for applcations that need to be long-lasting / continuously subscribed without much user interaction.

For the user-account related subscription errors above, those will require correction of the user account before subscriptions can work. If the uncommon subscription errors persist after exhausting these approaches to mitigate the errors, the best course of action would be to contact support for further help.

### Re-trying Subscriptions using Timers

First, let's use two different timers for this algorithm: `SHORT_TIMER` and `LONG_TIMER` (defined below the table). Depending on which of the uncommon errors is encountered, it is typically recommended to use / start with a short timer in between subscription requests before re-trying the request with a long timer (especially if short timer requests have been failing). The table below summarizes which timer is recommended for each of the uncommon errors.

| Error code          | Error message                               | Timer                                                                                                                             |
| ------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `authentication:4`  | “Failed to subscribe user. Status Code: 4"  | Common error, but could also result from subscription attempt timeouts. If you know credentials are correct, use a `SHORT_TIMER`. |
| `authentication:4`  | “Failed to subscribe user. Status Code: 9"  | `SHORT_TIMER`                                                                                                                     |
| `authentication:4`  | “Failed to subscribe user. Status Code: 17" | `LONG_TIMER`                                                                                                                      |
| `authentication:4`  | “Failed to subscribe user. Status Code: 19" | Common error code for "too many sessions." If not managing using techniques in the above section, re-try after a `LONG_TIMER`.    |
| `authentication:4`  | “Failed to subscribe user. Status Code: 26" | `SHORT_TIMER`                                                                                                                     |
| `authentication:4`  | “Failed to subscribe user. Status Code: 27" | Account-related issue.                                                                                                            |
| `authentication:4`  | “Failed to subscribe user. Status Code: 54" | `SHORT_TIMER`                                                                                                                     |
| `authentication:4`  | “Failed to subscribe user. Status Code: 62" | Account-related issue.                                                                                                            |
| `authentication:4`  | “Failed to subscribe user. Status Code: 17" | Account-related issue.                                                                                                            |
| `authentication:13` | “Failed to subscribe user. Status Code: 53" | `LONG_TIMER`                                                                                                                      |

Let's define these timers:

`SHORT_TIMER` - A short timer value to be used for subsequent subscription attempts following a subscription interruption. Example: a 30 or 60 second timer.

`LONG_TIMER` - A longer timer value to be used when subsequent subscription attempts with SHORT_TIMER are failing. Example: a 300 second timer.

Additional recommendations for the timers:

1. Subsequent re-try attempts with `SHORT_TIMER` should have a decaying element rather than a consistent timer value. This will ensure that short timer re-tries are exhausted before switching to using a long timer. E.g., re-try attempts upon subscription failure occur after 30 seconds for the first try, 45 seconds for the next, then 75 seconds, and so on.
2. All timeout values have a random element to ensure network failures will not trigger multiple clients to act and send re-try attempts all at once. For example the `LONG_TIMER` value can be defined as:

   `(300 * 0.8) + (300 * 0.4 * Math.random())`

The following code snippet shows a very basic example of re-trying subscription using the above timer recommendations.

```javascript
// Create a short timer of 30 seconds and a long timer of 300 seconds
//  Also add an an element of randomness to both timers
const SHORT_TIMER = 30000 * 0.8 + 3000 * 0.4 * Math.random()
const LONG_TIMER = 300000 * 0.8 + 300000 * 0.4 * Math.random()
let shortTimerAttempts = 0

function subscribe (service) {
  client.services.subscribe([service])
}

client.on('subscription:error', function (params) {
  const { code, message } = params.error
  if (message.toLowerCase().includes('status code: 54')) {
    if (shortTimerAttempts === 5) {
      // Switch to a long timer after 5 short timer re-tries
      setTimeout(() => subscribe('call'), LONG_TIMER)
    } else {
      // Decay the next subscription re-try by 15 seconds
      setTimeout(() => subscribe('call'), SHORT_TIMER + 15000)
    }
  }
})
```

