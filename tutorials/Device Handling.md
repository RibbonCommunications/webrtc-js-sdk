[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# Device Handling

In this quickstart we will cover how to handle devices with the Javascript SDK. Handling devices is not a required functionality in the sdk. This tutorial helps give an understanding on how devices work with calls or non-related call operations and retrieving information about the available devices. Code snippets will be used to demonstrate these features, and together these snippets will form a working demo application that can be viewed at the end.

For information about other call features, such as starting calls and mid-call operations, please refer to their respective quickstarts.

Note: This quickstart uses the SDK's Async APIs, which are the promise-based equivalent APIs. For more information about the difference between APIs, please see our [Async APIs Tutorial](Async%20APIs.md).

## Get Devices

To get the list of available devices and information, you simply call the `client.media.getDevices()` API function. When called, it will return an Object with a list for each device type i.e microphone, cameras, speakers. Device lists can be different based on the browser used. For instance, a device in the list can also be added by the browser again as a default device. Included in the device information is the `deviceId` and the `label` of the device, which are both strings. If this list is empty, there can be the possibility of no device present or you don't have permission to access the user's devices and due to this, the label property for the device can be an empty string.

```javascript 
function getDevices () {
  // Get the media devices currently available for use.
  const devices = client.media.getDevices()

  // They are organized in arrays by their device type.
  const { microphone, camera, speaker } = devices

  // Each device has details to identify it, notably a label and unique ID.
  const { label, deviceId } = microphone[0]

  // For some browsers, the details won't be provided unless the end-user has
  //    granted permission to access the devices. That is why we need to
  //    initialize the devices in some cases.
}
```

## Initializing Devices

The `client.media.initializeDevicesAsync` API is not required during call setup and will trigger the browser to ask the end-user for permission to access their camera and/or microphone. This gives the browser/application access to the device early, so that the end-user doesn't need to be prompted when they make a call. The API function takes parameters and the application will still need to specify the deviceId when making/answering a call. These permissions could be denied by the end-user and if denied, the list would not have that device using the `client.media.getDevices()` API to get the list of devices.

```javascript
/*
 * Call the API to initialize media devices. The browser may prompt the end-user
 *    with a pop-up to grant device permission, if not already allowed.
 */
async function initializeDevices () {
  // Can request permission for audio and/or video input devices.
  const initAudio = document.getElementById('init-audio').checked
  const initVideo = document.getElementById('init-video').checked

  try {
    await client.media.initializeDevicesAsync({ audio: initAudio, video: initVideo })
    log('Device initialization completed.')
  } catch (error) {
    log('Failed to initialize devices: ' + error.message + ' (' + error.code + ')')
  }
}
```

## Selecting Your Device on Call Setup

To learn how to start or answer a call, refer to the [Voice and Video Calls tutorial](Voice%20and%20Video%20Calls). The microphone and/or camera can be chosen when starting a call. The IDs for each device in the media object can be passed as parameters to the `client.call.makeAsync` or `client.call.answerAsync` call APIs, see below. Those IDs determine which microphone or camera will be used when starting the call. In the case of the speakers, this will be chosen when the audio track is rendered with the `client.media.renderTracks` API by passing the speaker's `deviceId` to use for audio tracks.

During a call setup, the `client.call.makeAsync` API has a different parameter for media options. Included in the media options is the `call.MediaConstraints` object, which defines the format for configuring the media options, see the `Call` API documentation.

Note: The constraints can use either the ideal or exact property. If the exact value cannot be used, the constraint will be considered an error. But in the case of the ideal property, the closest acceptable value will be used instead.

See below for how the media options should be formatted and how to make/answer call with a device.

```javascript
// Make a call with the selected devices.
async function makeCall () {
  // Gather call options from UI.
  const callee = document.getElementById('callee').value
  const withAudio = document.getElementById('make-with-audio').checked
  const withVideo = document.getElementById('make-with-video').checked
  const microphone = getSelectedDeviceId('microphone')
  const camera = getSelectedDeviceId('camera')

  // Determine the media options to provide to the API.
  const audioOptions = withAudio ? { deviceId: microphone } : undefined
  const videoOptions = withVideo ? { deviceId: camera } : undefined

  try {
    log('Making call to ' + callee)
    call = await client.call.makeAsync(callee, {
      audio: withAudio,
      audioOptions,
      video: withVideo,
      videoOptions
    })
    log('Call successfully started. Waiting for response.')
  } catch (error) {
    log('Failed to call: ' + error.message + ' (' + error.code + ')')
  }
}

// Answer an incoming call using the selected devices.
async function answerCall () {
  if (!call) {
    log('No incoming call to answer.')
    return
  }

  // Gather call options from UI.
  const withAudio = document.getElementById('answer-with-audio').checked
  const withVideo = document.getElementById('answer-with-video').checked
  const microphone = getSelectedDeviceId('microphone')
  const camera = getSelectedDeviceId('camera')

  // Determine the media options to provide to the API.
  const audioOptions = withAudio ? { deviceId: microphone } : undefined
  const videoOptions = withVideo ? { deviceId: camera } : undefined

  try {
    log('Answering call from ' + call.from)
    await client.call.answerAsync(call.id, {
      audio: withAudio,
      audioOptions,
      video: withVideo,
      videoOptions
    })
    log('Call answered.')
  } catch (error) {
    log('Failed to answer call: ' + error.message + ' (' + error.code + ')')
  }
}
```

## Changing Devices during a Call

To learn how to perform midcall operations, refer to the[Handling Media tutorial](Handling%20Media%20Tracks).

When adding a device (e.g. microphone and/or a camera) during an ongoing call, the `deviceId` for each device will need to be passed into the media object with the `client.call.addMediaAsync` API. However, removing the device will require specifying the `trackId` and the `deviceId` in the media Object to the `client.call.replaceTrackAsync` API as parameters.

The `client.call.replaceTrackAsync` API completely replaces an old track with a new one, therefore old track's state characteristics are not carried over in the new track's state. (e.g. if an old track's state was 'muted' and replacement of this track has occured, the new track's state will be 'unmuted', as this is its default state)

To learn how to add/remove media, refer to [Handling Media Tracks](Handling%20Media%20Tracks). Changing the output device (i.e speakers) requires unrendering the the tracks using the `client.media.removeTracks` and re-rendering the track with `client.media.renderTracks` API by passing the speaker's `deviceId` to use for audio tracks.

Note: The `client.call.replaceTrackAsync` API is the recommended way to change a device during a call but if that can't be done, the application should remove using `client.call.removeMediaAsync` and then re-add a track in order to change its device.

```javascript
/**
 * Changes the device, of the specified type, being used on the call with
 *    the selected device of that type.
 */
async function replaceDevice (type) {
  if (!call) {
    log('No active call to update devices.')
    return
  }

  const newDevice = getSelectedDeviceId(type)

  /*
   * Important: The method to change input devices vs. output devices is different.
   * For input devices (microphone, camera), you need to replace the track being
   *    used with a new track that is getting media from the new device.
   * For output devices (speakers), you simply need to re-render the existing
   *    track and specify the new device to use.
   */
  if (type === 'microphone' || type === 'camera') {
    // Determine whether its an audio or video track we are replacing based
    //    on the device type specified.
    const mediaType = type === 'microphone' ? 'audio' : 'video'

    // Determine the media options to be provided to the API.
    const mediaOptions =
      mediaType === 'audio'
        ? { audio: true, audioOptions: { deviceId: newDevice } }
        : { video: true, videoOptions: { deviceId: newDevice } }

    // Find the ID of the track we are replacing. For input devices, we act
    //    on our local tracks.
    const trackId = call.localTracks.find(id => {
      const track = client.media.getTrackById(id)
      return track.kind === mediaType
    })

    try {
      await client.call.replaceTrackAsync(call.id, trackId, mediaOptions)
      log('Replaced ' + mediaType + ' track with selected device.')
    } catch (error) {
      log('Failed to replace track: ' + error.message + ' (' + error.code + ')')
    }
  } else if (type === 'speaker') {
    // Find the ID of the track we want to change the speaker for. For output
    //    devices, we act on the remote tracks.
    const trackId = call.remoteTracks.find(id => {
      const track = client.media.getTrackById(id)
      return track.kind === 'audio'
    })

    // Unrender the remote audio track, then re-render it with the desired
    //    speaker device.
    await client.media.removeTrackAsync(trackId, '#remote-audio-container')
    await client.media.renderTrackAsync(trackId, '#remote-audio-container', {
      speakerId: newDevice
    })
  }
}
```

## Events

### devices:change

The `devices:change` event informs us when the media devices have changed and multiple things can also trigger this event. For instance, when initializing devices or connecting/disconnecting devices to the end-user's machine.

This would also be emitted during an ongoing call, if media devices changed. The `devices:error` event will be triggered when an error is encountered when using media devices. For instance, initializing devices or connecting/disconnecting devices to the end-user's machine could trigger these if an error occurs. Also when the browser cannot find a media device that fulfills the `call.MediaConstraint` provided.

```javascript
/*
 * Listen for changes to the device lists. This will happen after devices have
 *    been initialized or if a device is added/removed from the end-user's machine.
 * When emitted, we want to updated our HTML device selectors using the
 *    updated lists.
 */
client.on('devices:change', () => {
  const devices = client.media.getDevices()
  log('Media devices have changed.')
  console.log('Full devices list: ', devices)

  const types = ['microphone', 'camera', 'speaker']
  types.forEach(type => {
    // Update our HTML select elements with the updated devices.
    updateSelector(type, devices[type])
  })
})

/*
 * Listen for device errors. This will happen either if permission is denied
 *   by the end-user when initializing devices, or if the SDK cannot get access
 *   to a device using the specified options when adding media to a call.
 */
client.on('devices:error', function (params) {
  log('An error occurred:' + params.error.message)
})
```

## Live Demo

Want to play around with this example for yourself? Feel free to edit this code on Codepen.

<form action="https://codepen.io/pen/define" method="POST" target="_blank" class="codepen-form"><input type="hidden" name="data" value=' {&quot;js&quot;:&quot;/**\n * Javascript SDK Device Handling Demo\n */\n\nconst defaultConfig = {\n  authentication: {\n    server: {\n      base: &apos;blue.rbbn.com&apos;\n    }\n  },\n  subscription: {\n    websocket: {\n      server: &apos;blue.rbbn.com&apos;\n    }\n  },\n  call: {\n    defaultPeerConfig: {\n      iceServers: [\n        {\n          urls: [&apos;turns:turn-blue.rbbn.com:443?transport=tcp&apos;]\n        }\n      ]\n    }\n  }\n}\n\nconst { create } = WebRTC\n\n// Setup the SDK with default configurations, except for debug level logging.\nconst config = {\n  ...defaultConfig,\n  logs: { logLevel: &apos;debug&apos; }\n}\nconst client = create(config)\n\n/*\n * User subscription code.\n */\n\n// Enable/disable all children of a given node\nfunction disableInput (elements, disable) {\n  for (let i = 0; i < elements.length; i++) {\n    let nodes = elements[i].getElementsByTagName(&apos;input&apos;)\n    for (let j = 0; j < nodes.length; j++) {\n      nodes[j].disabled = disable\n    }\n  }\n}\n\nfunction setSubscribedUI (isSubscribed) {\n  document.getElementById(&apos;is-subscribed&apos;).innerHTML = isSubscribed ? &apos;Subscribed.&apos; : &apos;Not subscribed.&apos;\n  document.getElementById(&apos;subscribeBtn&apos;).disabled = isSubscribed\n  document.getElementById(&apos;unsubscribeBtn&apos;).disabled = !isSubscribed\n  document.getElementById(&apos;setCredentials&apos;).disabled = isSubscribed\n  disableInput(document.getElementsByClassName(&apos;call-control&apos;), !isSubscribed)\n}\n\n// Provide the user credentials to the SDK.\nasync function setCredentials () {\n  const username = document.getElementById(&apos;username&apos;).value\n  const password = document.getElementById(&apos;password&apos;).value\n\n  try {\n    await client.setCredentialsAsync({ username, password })\n    const user = client.getUserInfo()\n    document.getElementById(&apos;current-user&apos;).innerHTML = user.username || &apos;None.&apos;\n    document.getElementById(&apos;subscribeBtn&apos;).disabled = !Boolean(user.username)\n    log(&apos;Credentials set as user: &apos; + user.username)\n  } catch (error) {\n    log(&apos;Failed to set credentials: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// Subscribe for call notifications, using the previously set user credentials.\nasync function subscribe () {\n  try {\n    await client.services.subscribeAsync([&apos;call&apos;])\n    setSubscribedUI(true)\n    const services = client.services.getSubscriptions()\n    log(&apos;Subscription successful. Subscribed services: &apos; + services.subscribed)\n  } catch (error) {\n    log(&apos;Subscription error: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// Unsubscribe for call notifications\nasync function unsubscribe () {\n  try {\n    await client.services.unsubscribeAsync([&apos;call&apos;])\n    setSubscribedUI(false)\n    log(&apos;User unsubscribed.&apos;)\n  } catch (error) {\n    log(&apos;Unsubscription error: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// Setup a listener for changes in the connection state.\nclient.on(&apos;auth:change&apos;, function () {\n  const user = client.getUserInfo()\n  document.getElementById(&apos;current-user&apos;).innerHTML = user.username || &apos;None.&apos;\n  document.getElementById(&apos;subscribeBtn&apos;).disabled = !Boolean(user.username)\n  log(&apos;Credentials &apos; + (user.username ? &apos;set&apos; : &apos;unset&apos;))\n})\n\n// Setup a listener for subscription changes\nclient.on(&apos;subscription:change&apos;, function (params) {\n  const services = client.services.getSubscriptions()\n  setSubscribedUI(services.subscribed.length > 0)\n  log(&apos;Subscription state changed due to reason: &apos; + params.reason + &apos;. Subscribed services: &apos; + services.subscribed)\n})\n\n// Utility function for appending messages to the message div.\nfunction log (message) {\n  document.getElementById(&apos;messages&apos;).innerHTML += &apos;<div>&apos; + message + &apos;</div>&apos;\n}\n\n/*\n * Helper functions for managing changes to the HTML.\n */\n\n// Function to update the HTML <select> elements of device lists.\nfunction updateSelector (deviceType, devices) {\n  const selector = document.getElementById(deviceType + &apos;-selector&apos;)\n\n  // Clear the previous options, then re-add the default \&quot;no selection\&quot; option.\n  selector.innerHTML = &apos;&apos;\n  const defaultOption = document.createElement(&apos;option&apos;)\n  defaultOption.value = undefined\n  defaultOption.textContent = &apos;No device selected.&apos;\n  selector.appendChild(defaultOption)\n\n  // Add each device of this type to the select element.\n  devices.forEach(device => {\n    const option = document.createElement(&apos;option&apos;)\n    option.value = device.deviceId\n\n    // Important: Device labels are not always available.\n    // This is generally because the SDK does not have permission to access\n    //    identifiable information about the devices. This is where we need\n    //    to prompt the end-user for permission by initializing the devices.\n    option.textContent = device.label ? device.label : &apos;Label not available - Media permission required!&apos;\n\n    selector.appendChild(option)\n  })\n}\n\n// Function to get the ID of the specified type&apos;s selected device.\nfunction getSelectedDeviceId (type) {\n  const device = document.getElementById(type + &apos;-selector&apos;).value\n\n  // If the selected device is the default option, return undefined.\n  // The system default device will be used if no deviceId is specified when\n  //    adding media to a call.\n  if (device === &apos;undefined&apos;) {\n    return undefined\n  }\n\n  return device\n}\n\n/*\n * Call related code.\n */\nlet call\n\n/*\n * Call the API to initialize media devices. The browser may prompt the end-user\n *    with a pop-up to grant device permission, if not already allowed.\n */\nasync function initializeDevices () {\n  // Can request permission for audio and/or video input devices.\n  const initAudio = document.getElementById(&apos;init-audio&apos;).checked\n  const initVideo = document.getElementById(&apos;init-video&apos;).checked\n\n  try {\n    await client.media.initializeDevicesAsync({ audio: initAudio, video: initVideo })\n    log(&apos;Device initialization completed.&apos;)\n  } catch (error) {\n    log(&apos;Failed to initialize devices: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// Make a call with the selected devices.\nasync function makeCall () {\n  // Gather call options from UI.\n  const callee = document.getElementById(&apos;callee&apos;).value\n  const withAudio = document.getElementById(&apos;make-with-audio&apos;).checked\n  const withVideo = document.getElementById(&apos;make-with-video&apos;).checked\n  const microphone = getSelectedDeviceId(&apos;microphone&apos;)\n  const camera = getSelectedDeviceId(&apos;camera&apos;)\n\n  // Determine the media options to provide to the API.\n  const audioOptions = withAudio ? { deviceId: microphone } : undefined\n  const videoOptions = withVideo ? { deviceId: camera } : undefined\n\n  try {\n    log(&apos;Making call to &apos; + callee)\n    call = await client.call.makeAsync(callee, {\n      audio: withAudio,\n      audioOptions,\n      video: withVideo,\n      videoOptions\n    })\n    log(&apos;Call successfully started. Waiting for response.&apos;)\n  } catch (error) {\n    log(&apos;Failed to call: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// Answer an incoming call using the selected devices.\nasync function answerCall () {\n  if (!call) {\n    log(&apos;No incoming call to answer.&apos;)\n    return\n  }\n\n  // Gather call options from UI.\n  const withAudio = document.getElementById(&apos;answer-with-audio&apos;).checked\n  const withVideo = document.getElementById(&apos;answer-with-video&apos;).checked\n  const microphone = getSelectedDeviceId(&apos;microphone&apos;)\n  const camera = getSelectedDeviceId(&apos;camera&apos;)\n\n  // Determine the media options to provide to the API.\n  const audioOptions = withAudio ? { deviceId: microphone } : undefined\n  const videoOptions = withVideo ? { deviceId: camera } : undefined\n\n  try {\n    log(&apos;Answering call from &apos; + call.from)\n    await client.call.answerAsync(call.id, {\n      audio: withAudio,\n      audioOptions,\n      video: withVideo,\n      videoOptions\n    })\n    log(&apos;Call answered.&apos;)\n  } catch (error) {\n    log(&apos;Failed to answer call: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n// End an ongoing call.\nasync function endCall () {\n  if (!call) {\n    log(&apos;No active call to end.&apos;)\n    return\n  }\n\n  try {\n    log(&apos;Ending call with &apos; + call.from)\n    await client.call.endAsync(call.id)\n    log(&apos;Call ended.&apos;)\n    call = null\n  } catch (error) {\n    log(&apos;Failed to end call: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n  }\n}\n\n/**\n * Changes the device, of the specified type, being used on the call with\n *    the selected device of that type.\n */\nasync function replaceDevice (type) {\n  if (!call) {\n    log(&apos;No active call to update devices.&apos;)\n    return\n  }\n\n  const newDevice = getSelectedDeviceId(type)\n\n  /*\n   * Important: The method to change input devices vs. output devices is different.\n   * For input devices (microphone, camera), you need to replace the track being\n   *    used with a new track that is getting media from the new device.\n   * For output devices (speakers), you simply need to re-render the existing\n   *    track and specify the new device to use.\n   */\n  if (type === &apos;microphone&apos; || type === &apos;camera&apos;) {\n    // Determine whether its an audio or video track we are replacing based\n    //    on the device type specified.\n    const mediaType = type === &apos;microphone&apos; ? &apos;audio&apos; : &apos;video&apos;\n\n    // Determine the media options to be provided to the API.\n    const mediaOptions =\n      mediaType === &apos;audio&apos;\n        ? { audio: true, audioOptions: { deviceId: newDevice } }\n        : { video: true, videoOptions: { deviceId: newDevice } }\n\n    // Find the ID of the track we are replacing. For input devices, we act\n    //    on our local tracks.\n    const trackId = call.localTracks.find(id => {\n      const track = client.media.getTrackById(id)\n      return track.kind === mediaType\n    })\n\n    try {\n      await client.call.replaceTrackAsync(call.id, trackId, mediaOptions)\n      log(&apos;Replaced &apos; + mediaType + &apos; track with selected device.&apos;)\n    } catch (error) {\n      log(&apos;Failed to replace track: &apos; + error.message + &apos; (&apos; + error.code + &apos;)&apos;)\n    }\n  } else if (type === &apos;speaker&apos;) {\n    // Find the ID of the track we want to change the speaker for. For output\n    //    devices, we act on the remote tracks.\n    const trackId = call.remoteTracks.find(id => {\n      const track = client.media.getTrackById(id)\n      return track.kind === &apos;audio&apos;\n    })\n\n    // Unrender the remote audio track, then re-render it with the desired\n    //    speaker device.\n    await client.media.removeTrackAsync(trackId, &apos;#remote-audio-container&apos;)\n    await client.media.renderTrackAsync(trackId, &apos;#remote-audio-container&apos;, {\n      speakerId: newDevice\n    })\n  }\n}\n\n/*\n * Listen for changes to the device lists. This will happen after devices have\n *    been initialized or if a device is added/removed from the end-user&apos;s machine.\n * When emitted, we want to updated our HTML device selectors using the\n *    updated lists.\n */\nclient.on(&apos;devices:change&apos;, () => {\n  const devices = client.media.getDevices()\n  log(&apos;Media devices have changed.&apos;)\n  console.log(&apos;Full devices list: &apos;, devices)\n\n  const types = [&apos;microphone&apos;, &apos;camera&apos;, &apos;speaker&apos;]\n  types.forEach(type => {\n    // Update our HTML select elements with the updated devices.\n    updateSelector(type, devices[type])\n  })\n})\n\n/*\n * Listen for device errors. This will happen either if permission is denied\n *   by the end-user when initializing devices, or if the SDK cannot get access\n *   to a device using the specified options when adding media to a call.\n */\nclient.on(&apos;devices:error&apos;, function (params) {\n  log(&apos;An error occurred:&apos; + params.error.message)\n})\n\n// Set listener for changes in a call&apos;s state.\nclient.on(&apos;call:stateChange&apos;, function (params) {\n  call = client.call.getById(params.callId)\n\n  if (params.error && params.error.message) {\n    log(&apos;Error: &apos; + params.error.message)\n  }\n  log(&apos;Call state changed from &apos; + params.previous.state + &apos; to &apos; + call.state)\n\n  if (params.state === client.call.states.ENDED) {\n    call = null\n  }\n})\n\n// Set listener for incoming calls.\nclient.on(&apos;call:receive&apos;, function (params) {\n  // Retrieve call information.\n  call = client.call.getById(params.callId)\n  log(&apos;Received incoming call from &apos; + call.from)\n})\n\n// Set listener for new tracks.\nclient.on(&apos;call:tracksAdded&apos;, function (params) {\n  params.trackIds.forEach(async trackId => {\n    const track = client.media.getTrackById(trackId)\n\n    // Check whether the new track was a local track or not.\n    if (track.isLocal) {\n      // Don&apos;t render the local audio track so the end-user doesn&apos;t hear themselves.\n      if (track.kind === &apos;video&apos;) {\n        await client.media.renderTrackAsync(trackId, &apos;#local-container&apos;)\n      }\n    } else {\n      // Render the remote media into the remote container.\n      if (track.kind === &apos;audio&apos;) {\n        // Specify the speaker we want to use if it is an audio track.\n        const speakerId = getSelectedDeviceId(&apos;speaker&apos;)\n        await client.media.renderTrackAsync(trackId, &apos;#remote-container&apos;, {\n          speakerId\n        })\n      } else {\n        await client.media.renderTrackAsync(trackId, &apos;#remote-container&apos;)\n      }\n    }\n  })\n})\n\n// Set listener for ended tracks.\nclient.on(&apos;call:trackEnded&apos;, async function (params) {\n  // Check whether the ended track was a local track or not.\n  if (params.local) {\n    const localTrack = client.media.getTrackById(params.trackId)\n\n    // Remove the track from the local container.\n    // It is expected that we only remove video tracks,\n    // because we never added local audio tracks to begin with...\n    if (localTrack.kind === &apos;video&apos;) {\n      await client.media.removeTrackAsync(params.trackId, &apos;#local-video-container&apos;)\n    }\n  } else {\n    const remoteTrack = client.media.getTrackById(params.trackId)\n    if (remoteTrack.kind === &apos;audio&apos;) {\n      // Remove the track from the remote audio container.\n      await client.media.removeTrackAsync(params.trackId, &apos;#remote-audio-container&apos;)\n    } else {\n      // Remove the track from the remote video container.\n      await client.media.removeTrackAsync(params.trackId, &apos;#remote-video-container&apos;)\n    }\n  }\n})\n\n&quot;,&quot;html&quot;:&quot;<script src=\&quot;https://unpkg.com/@rbbn/webrtc-js-sdk@7.14.0/dist/webrtc.js\&quot;></script>\n\n<div>\n  <fieldset>\n    <legend>Media Devices</legend>\n    <div>\n      <input type=\&quot;button\&quot; onclick=\&quot;initializeDevices()\&quot; value=\&quot;Initialize Devices\&quot;></input>\n      with audio: <input type=\&quot;checkbox\&quot; checked id=\&quot;init-audio\&quot;/>\n      with video: <input type=\&quot;checkbox\&quot; id=\&quot;init-video\&quot;/>\n    <div>\n      Microphones:\n      <select id=\&quot;microphone-selector\&quot;>\n        <option>No device selected.</option>\n      </select>\n    </div>\n     <div>\n      Cameras:\n      <select id=\&quot;camera-selector\&quot;>\n        <option>No device selected.</option>\n      </select>\n    </div>\n     <div>\n      Speakers:\n      <select id=\&quot;speaker-selector\&quot;>\n        <option>No device selected.</option>\n      </select>\n    </div>\n  </fieldset>\n</div>\n\n<div>\n  <fieldset>\n    <legend>Set Credentials using your account information</legend>\n    User Email: <input type=\&quot;text\&quot; id=\&quot;username\&quot; /> Password:<input type=\&quot;password\&quot; id=\&quot;password\&quot; />\n    <input type=\&quot;submit\&quot; id=\&quot;setCredentials\&quot; value=\&quot;setCredentials\&quot; onclick=\&quot;setCredentials();\&quot; />\n    Current user: <span id=\&quot;current-user\&quot;>None.</span>\n  </fieldset>\n\n  <fieldset>\n    <legend>Subscribe</legend>\n    <input type=\&quot;submit\&quot; id=\&quot;subscribeBtn\&quot; disabled value=\&quot;Subscribe\&quot; onclick=\&quot;subscribe();\&quot; />\n    <input type=\&quot;submit\&quot; id=\&quot;unsubscribeBtn\&quot; disabled value=\&quot;Unsubscribe\&quot; onclick=\&quot;unsubscribe();\&quot; />\n    Current status: <span id=\&quot;is-subscribed\&quot;>Not subscribed.</span>\n  </fieldset>\n\n<div class=\&quot;call-control\&quot;>\n  <fieldset style=\&quot;background-color: WhiteSmoke\&quot;>\n    <legend>Call </legend>\n\n    <div style=\&quot;margin-bottom: 15px\&quot;>\n      <!-- User input for making a call. -->\n      <input disabled type=\&quot;button\&quot; value=\&quot; Make Call \&quot; onclick=\&quot;makeCall();\&quot; />\n      with audio: <input disabled type=\&quot;checkbox\&quot; checked id=\&quot;make-with-audio\&quot; />\n      with video: <input disabled type=\&quot;checkbox\&quot; id=\&quot;make-with-video\&quot; />\n      to: <input disabled type=\&quot;text\&quot; id=\&quot;callee\&quot; />\n      using input devices selected above.\n    </div>\n\n    <div style=\&quot;margin-bottom: 15px\&quot;>\n      <!-- User input for responding to an incoming call. -->\n      <input disabled type=\&quot;button\&quot; value=\&quot;Answer Call\&quot; onclick=\&quot;answerCall();\&quot; />\n      with audio: <input disabled type=\&quot;checkbox\&quot; checked id=\&quot;answer-with-audio\&quot; />\n      with video: <input disabled type=\&quot;checkbox\&quot; id=\&quot;answer-with-video\&quot; />\n      using input devices selected above.\n    </div>\n\n    <div>\n      <input disabled type=\&quot;button\&quot; value=\&quot;Change Microphone with selected device.\&quot; onclick=\&quot;replaceDevice(&apos;microphone&apos;);\&quot;/>\n      <input disabled type=\&quot;button\&quot; value=\&quot;Change Camera with selected device.\&quot; onclick=\&quot;replaceDevice(&apos;camera&apos;);\&quot;/>\n      <input disabled type=\&quot;button\&quot; value=\&quot;Change Speaker with selected device.\&quot; onclick=\&quot;replaceDevice(&apos;speaker&apos;);\&quot;/>\n    </div>\n\n    <div>\n      <!-- User input for ending an ongoing call. -->\n      <input disabled type=\&quot;button\&quot; value=\&quot;End Call\&quot; onclick=\&quot;endCall();\&quot; />\n    </div>\n\n    <br/>\n    <fieldset>\n      <!-- Message output container. -->\n      <legend>Messages</legend>\n      <div id=\&quot;messages\&quot;></div>\n    </fieldset>\n\n    <br/>\n    Remote Tracks:\n    <div id=\&quot;remote-audio-container\&quot; />\n    <div id=\&quot;remote-video-container\&quot; />\n    Local Tracks:\n    <div id=\&quot;local-audio-container\&quot; />\n    <div id=\&quot;local-video-container\&quot; />\n  </fieldset>\n</div>\n\n&quot;,&quot;css&quot;:&quot;video {\n  width: 50% !important;\n}\n\n&quot;,&quot;title&quot;:&quot;Javascript SDK Device Handling Demo&quot;,&quot;editors&quot;:101} '><input type="image" src="./TryItOn-CodePen.png"></form>

[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

