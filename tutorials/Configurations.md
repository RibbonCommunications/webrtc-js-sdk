[COPYRIGHT © 2023 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# The WebRTC JS SDK Configurations

The first step for any application is to initialize the SDK. When doing this, you can customize certain features by providing a configurations object.

The WebRTC JS SDK's configuration object is separated by feature, and is provided to the WebRTC Factory as seen in the example below, as a sample.

```javascript 
// Initialize an instance of the SDK.
import { create } from WebRTC

// Sample configuration object.
const configuration = {
    authentication: {
      server: {
        base: 'webrtc-blue.rbbn.com'
      }
    },
    subscription: {
      websocket: {
        server: 'webrtc-blue.rbbn.com',
      },
    },
    call: {
        serverTurnCredentials: true,
        defaultPeerConfig: {
          // A key-value dictionary that corresponds to the available RTCPeerConfiguration which is normally
          // passed when creating an RTCPeerConnection.
          // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#parameters RTCPeerConnection's
          // configuration parameters} for more information.
          // Specify the TURN/STUN servers that should be used.
          // Note that starting with Chromium 110, TURN(S) urls must only contain a transport
          // parameter in the query section and STUN urls must not specify any query section.
          iceServers:[
              {
                  url: 'turns:turn-blue.rbbn.com:443?transport=tcp'
              },
              {
                  url: 'stun:turn-blue.rbbn.com:3478'
              }
          ]
        },
    },
    logs: {
        // Log output configs.
    },
    // Other feature configs.
    ...
}

// Invoke the factory create to instantiate the SDK by providing the configuration object.
const client = create(configuration)
```

In most cases, the default values will suffice for an application, but specifying your own configurations allows you to customize certain behaviours. The exception is the authentication configurations, which are always required. This quickstart will showcase a few samples of why you may want to use certain configurations. For a full list of the possible configurations, see the documentation for `configuration` API.

## Example Configurations

The following sections describe various properties within the configuration object in more detail.

Each section refers to a specific SDK feature that in general maps to that configuration property.
For example, modifying the value of `config.logs` property in your configuration object will affect how the 'Logs' feature will behave at runtime.

### Logs

The Logs configs are used to change the SDK's internal logging behaviour. The SDK will generate logs that provide information about what it is doing, such as info and debug messages, warnings, and errors. These configurations allow an application to select which levels they would like to see logs for, and how those logs should be handled.

By default, the SDK will include logs for all levels (the default `logLevel` is 'debug') and will print the logs to the browser's console (via the default `handler` function) at their appropriate level (for example, 'info' logs will use `console.info` and 'debug' logs will use `console.debug`).

These defaults work well for development purposes, but may conflict with browser or other behaviours. For example, since the default Log Handler uses the browser's console, the browser may also filter logs based on its own settings. Many browsers do not show the 'debug' level by default, so it would be an extra step for a user to enable those logs in their browser. A custom Log Handler can be used to avoid this behaviour conflict, by always using the same level for the browser's console. For this reason, it is recommended that all applications actively set the `logLevel` and `handler` configurations for logs, to ensure the SDK's logging behaviour is well suited for your application and its users.

```javascript
logs: {
  // Set the log level to 'debug' to output more detailed logs.
  logLevel: 'debug',
  // Provide a custom Log Handler function.
  handler: function yourLogHandler (logEntry) { ... }
}
```

### Call

The Call configs are used to initialize call/network settings. This can customize how the library interacts with the network or provide the library with resources for low-level network operations.

```javascript
call: {
  defaultPeerConfig: {
    // A key-value dictionary that corresponds to the available RTCPeerConfiguration which is normally
    // passed when creating an RTCPeerConnection.
    // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#parameters RTCPeerConnection's
    // configuration parameters} for more information.
    // Specify the TURN/STUN servers that should be used.
    // Note that starting with Chromium 110, TURN(S) urls must only contain a transport
    // parameter in the query section and STUN urls must not specify any query section.
    iceServers: [
      {
        urls: 'turns:...',
        // ...
      },
      // ...
    ]
  },
  // Specify that credentials should be fetched from the server.
  serverTurnCredentials: true
}
```

### Authentication

The Authentication configs are used to specify the backend service that the SDK should connect to. The value provided is the host for the WebRTC Gateway that the application is targeting.
Also if the WebRTC Gateway is deployed on-premise, it will be up to the user to define the host.
Note: It is important to always include these configurations.

```javascript
authentication: {
  server: {
    base: 'webrtc-blue.rbbn.com'
  }
}
```

### Subscription

The Subscription config is used to specify websocket that the SDK should connect to. The value provided is the host for the WebRTC Gateway that the application is targeting.
Also if the WebRTC Gateway is deployed on-premise, it will be up to the user to define the host.
Note: It is important to always include these configurations.

```javascript
subscription: {
  websocket: {
    server: 'webrtc-blue.rbbn.com',
  },
}
```

Besides the `websocket` parameter, the user can also specify the maximum number of times a client will retry in order to subscribe for a given service, while getting 'Service Unavailable' from backend. This is done by using the `serviceUnavailableMaxRetries` parameter. If not provided, its default value is `3`.
Likewise, the user can specify the amount of time (in seconds) for which to keep subscription up and alive. This is done by using the `expires` parameter. If not provided, its default value is `3600`.

### Connectivity

The Connectivity configs are used to customize the behaviour of the websocket and connectivity checks. These settings should only be needed if the default configs are not sufficient, and you want to tweak the behaviour for your application's scenario.

```javascript
connectivity: {
    // Specify that a keepAlive ping should be sent every 30 seconds,
    // and an error should be reported after 3 missed pong responses.
    pingInterval: 30000, // milliseconds
    maxMissedPings: 3
}
```

```javascript
connectivity: {
    // Specify that a keepAlive ping should be sent every 60 seconds,
    // and if unable to connect should try to reconnect 3 times before
    // throwing an error. Specify to wait 10 seconds before attempting
    // to connect, and double that time every connection attempt, while
    // keeping maximum wait time under 300 seconds.
    pingInterval: 60000, // milliseconds
    reconnectLimit: 3,
    reconnectDelay: 10000, // milliseconds
    reconnectTimeMultiplier: 2,
    reconnectTimeLimit: 300000, // milliseconds
    autoReconnect: true,
    maxMissedPings: 3,
    checkConnectivity: true
}
```

[COPYRIGHT © 2023 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

