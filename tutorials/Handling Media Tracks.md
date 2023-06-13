[COPYRIGHT © 2023 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #
---
layout: page
categories: quickstarts-javascript
title: Handling Media Tracks
permalink: /quickstarts/javascript/link/Handling%20%26%20Media%20Tracks
---

# Handling Media Tracks

In this quickstart we will cover how to handle media during an ongoing call with the Javascript SDK. Code snippets will be used to demonstrate these features, and together these snippets will form a working demo application that can be viewed at the end.

For information about other call features, such as starting calls and mid-call operations, please refer to their respective quickstarts.

## User Interface

To interact with our demo application, we will have a UI that allows us to make outgoing calls and respond to incoming calls. For this tutorial, we will add the ability to do the following to the UI:

- Start / Stop Video
- Add / Remove media

```html
<div class="call-control">
  <fieldset>
    <legend>Start/Stop Video</legend>
    <div class="bottomSpacing">
      <!-- UI for starting a video during an ongoing call. -->
      <input type="button" value="Start Video" onclick="startVideo();" disabled />
    </div>
    <div>
      <!-- UI for stopping a video during an ongoing call. -->
      <input type="button" value="Stop Video" onclick="stopVideo();" disabled />
    </div>
  </fieldset>

  <fieldset>
    <legend>Add Media</legend>
    <div class="bottomSpacing">
      <!-- User input for adding media to a call. Allows a user to select which
            types of media they would like to be added in the operation. -->
      Audio: <input type="checkbox" id="make-with-audio" disabled /> Video:
      <input type="checkbox" id="make-with-video" disabled /> Screen:
      <input type="checkbox" id="make-with-screen" disabled />
      <input type="button" value="Add Media(s)" onclick="addMedia();" disabled />
    </div>
  </fieldset>

  <fieldset>
    <legend>Remove Media</legend>
    <!-- User input for removing local media from a call. As local media is added,
          they will be listed here with the option to remove them from the call. -->
    <input type="button" value="Remove Media(s)" onclick="removeMedia();" disabled />
    <div id="localTrack-controls"></div>
  </fieldset>

  <fieldset>
    <legend>Media containers</legend>
    Remote video:
    <div id="remote-container"></div>
    Local video:
    <div id="local-container"></div>
  </fieldset>
</div>
```

To display information to the user, a `log` function will be used to append new messages to the "messages" element shown above.

## Start / Stop Video

### Start Video

To add video to a call, we'll have the user click the 'Start Video' button. This will trigger the `startVideo` function shown below. This function does two simple steps to start the video:

1. Set the options for the video (e.g., dimensions) we want to send to the remote participant.
2. Use the `call.startVideo` API to start sending the video.

This can only be used in a basic media scenario, where the call does not have video. By default, calls will be made with audio-only.

```javascript
/*
 * Functionality for starting video on ongoing call.
 */
function startVideo () {
  log('Adding video to the ongoing call' + callId)

  client.call.startVideo(callId)
}
```

### Stop Video

Similar to starting a video, if we want to stop the video, the user can click the 'Stop Video' button, and our `stopVideo` function will remove the local video and stop it from being sent to the remote participant using the `call.stopVideo` API. This can also only be used in a basic media scenario, where the call has only one video track.

```javascript
/*
 *  Functionality for Stopping video on ongoing call.
 */
function stopVideo () {
  log('Removing the video from the ongoing call' + callId)

  client.call.stopVideo(callId)
}
```

## Add / Remove Media

### Add Media(s)

To add multiple media to an ongoing call, the `call.addMedia` API can be used. Our `addMedia` function shown below (triggered when the user clicks "Add Media"), adds the specified media track(s) to the Call and sends the media(s) to the remote participant(s) by using the `call.addMedia` API.

```javascript
/*
 *  Add media on ongoing Call functionality.
 */
function addMedia () {
  log('Adding media track(s) to ongoing call' + callId)

  const withAudioBox = document.getElementById('make-with-audio')
  const withVideoBox = document.getElementById('make-with-video')
  const withScreenBox = document.getElementById('make-with-screen')

  const media = {
    audio: withAudioBox.checked,
    video: withVideoBox.checked,
    screen: withScreenBox.checked
  }

  client.call.addMedia(callId, media)

  // Reset the checkboxes afterwards.
  withAudioBox.checked = false
  withVideoBox.checked = false
  withScreenBox.checked = false
}
```

### Remove Media(s)

To remove media from an ongoing, when the user clicks on the 'Remove Media' button, our `removeMedia` function will:

1. Retrieve the information of the ongoing call
2. Create a list of media track IDs that we want to remove.
3. Use the `call.removeMedia` API to remove the tracks from the call and stop being sent to the remote participant(s).

Similarly to the `call.addMedia` API, this API can also be used to remove multiple tracks

```javascript
/*
 *  Remove media(s) from ongoing Call functionality.
 */
function removeMedia () {
  log('Removing media track(s) to ongoing call' + callId)
  let checkBoxes = document.getElementsByName('removeMedia')
  // Get the list of IDs with checked checkboxes.
  const trackIds = getAllCheckedTracks()

  client.call.removeMedia(callId, trackIds)
}
```

## Events

The media events for handling tracks on a call fall into three categories:

1. Track Rendering: The `call:tracksAdded` and `call:tracksRemoved` events let the application know when tracks are available to be rendered or need to be unrendered.
2. Media Issues: The `media:sourceMuted` and `media:sourceUnmuted` events let the application know when a track is having a media interruption, such as a network issue.
3. Track Loss: The `media:trackEnded` event lets the application know when a track has unexpectedly ended and needs to be handled.

### Track Rendering

The `call:tracksAdded` and `call:tracksRemoved` events will be emitted once per call operation, either initiated locally or remotely, and will include the list of tracks that have been added or removed due to that operation. A track being added to a call means that its media is available to be rendered. A track being removed from a call means that it is no longer available to be rendered.

For our demo application, we will handle these events by rendering or unrendering the tracks as appropriate. For local tracks that are added to the call, we will also show a UI element that lets the user remove them from the call if desired. Below are the event listeners we will implement to handle the events and hand off the tracks to the functions to perform these actions.

```javascript
/**
 * When new tracks are added to the call, we want to render them.
 * For local tracks, we also want to add a UI element so we can remove them.
 */
client.on('call:tracksAdded', function (params) {
  const { trackIds } = params

  trackIds.forEach(trackId => {
    const track = client.media.getTrackById(trackId)

    // Render the track's media.
    renderTrack(track)

    // Add UI controls to remove local tracks from the call.
    if (track.isLocal) {
      addTrackControls(track)
    }
  })
})

/**
 * When tracks are removed from the call, we want to unrender them.
 * For local tracks, we also want to remove the UI element we previously added.
 */
client.on('call:tracksRemoved', function (params) {
  const { trackIds } = params

  // Iterate over each trackId to determine how to unrender it.
  trackIds.forEach(trackId => {
    const track = client.media.getTrackById(trackId)

    // Unrender the track from the page.
    removeTrack(track)

    // Remove the UI controls for the local track.
    if (track.isLocal) {
      removeTrackControls(track)
    }
  })
})
```

To render and unrender the tracks, we simply use the `media.renderTracks` and `media.removeTracks` APIs. We will render all tracks in either the local or remote HTML containers. It should be noted that we are not rendering local audio tracks since we do not want the user to hear themselves speaking.

```javascript
/*
 * Function that renders a track.
 * @param {Track} track The Track object retrieved from the SDK.
 */
function renderTrack (track) {
  if (track.isLocal) {
    // Only render local video into the local container. The user does not need
    //    to hear themselves speak.
    if (track.kind === 'video') {
      client.media.renderTracks([track.trackId], '#local-container')
    }
  } else {
    // Render all remote media into the remote container.
    client.media.renderTracks([track.trackId], '#remote-container')
  }
}

/*
 * Function that unrenders a track.
 * @param {Track} track The Track object retrieved from the SDK.
 */
function removeTrack (track) {
  // Check whether the ended track was a local track or not.
  if (track.isLocal) {
    if (track.kind === 'video') {
      // Remove the video track from the local container.
      //    Local audio tracks were not rendered by the renderTrack function.
      client.media.removeTracks([track.trackId], '#local-container')
    }
  } else {
    // Remove the track from the remote container.
    client.media.removeTracks([track.trackId], '#remote-container')
  }
}
```

For local tracks added to the call, we want the user to be able to remove them from the call. We will show a list of all local tracks, allowing the user to check the tracks they want to be removed before calling the `call.removeMedia` API. Below are the functions we will use to add the UI elements to the page, to remove the UI elements from the page afterwards, and to get the list of all selected tracks.

```javascript
/*
 * Function to add UI elements for removing a local track from the Call.
 * @param {Track} track The Track object retrieved from the SDK.
 */
function addTrackControls (track) {
  if (!track.isLocal) {
    // We only want to add controls for local tracks.
    return
  }

  const controlsId = 'controls-' + track.trackId
  if (document.getElementById(controlsId)) {
    // Controls already exist for this track.
    return
  }

  const controls = document.createElement('div')
  controls.id = controlsId

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = track.trackId
  checkbox.name = 'local-track'

  const label = document.createElement('label')
  label.innerHTML = track.kind + 'track (' + track.trackId + ')'

  controls.appendChild(checkbox)
  controls.appendChild(label)

  const trackList = document.getElementById('localTrack-controls')
  trackList.appendChild(controls)
}

/*
 * Function to remove UI elements used for removing a local track from the Call.
 * @param {Track} track The Track object retrieved from the SDK.
 */
function removeTrackControls (track) {
  if (!track.isLocal) {
    return
  }

  const controlsId = 'controls-' + track.trackId
  const controls = document.getElementById(controlsId)
  if (controls) {
    const trackList = document.getElementById('localTrack-controls')
    trackList.removeChild(controls)
  } else {
    // Track controls don't exist for this track.
  }
}

/*
 * Function to get the IDs of all checked checkboxes for local tracks.
 * @return {Array<string>} List of track IDs.
 */
function getAllCheckedTracks () {
  const checkedBoxes = document.querySelectorAll('input[name=local-track]:checked')
  const trackIds = Array.from(checkedBoxes).map(box => box.id)

  return trackIds
}
```

This is all of the code our demo application needs to handle media tracks being added and removed from a call.

### Media Issues

The `media:sourceMuted` and `media:sourceUnmuted` events are emitted when a track has stopped receiving media from its source. These events are emitted for individual tracks and are not tied to a call operation being performed. The predominant scenario where this will happen is for remote tracks during network issues, when they are not receiving a consistent flow of media and may flicker between being "source muted" and "source unmuted". It is also possible for these events to be emitted for a local track, but only by a local action, such as the browser preventing a track from receiving media based on an end-user action.

How these events should be handled is very subjective, but there are two main questions to help an application developer decide:

1. When should the events be handled? It is not known how long a track may be source muted for, or if it is a single occurrence or repeated, so these events may be seen to "flicker" back and forth. The main thoughts for an answer to this question are:

- Handle them immediately: The end-user should see immediate feedback when a media issue occurs.
- Handle them delayed (debounce): To prevent "flickering", a short delay before handling them can ensure the opposite event isn't immediately emitted as well.
- Don't handle them: Media issues will be obvious to an end-user with choppy remote audio or video, and extra handling may not be necessary.

2. How seriously should they be handled? Whether it is seen as a minor or major issue will affect how an application wants to handle these events. A few options for an answer to this question are:

- Provide UI feedback: The end-user should be shown some feedback (eg. buffering UI element) so they are aware of the issue, but the media can remain unchanged.
- Unrender media: The track can be unrendered from the UI while "source muted" to clearly indicate a temporary outage.
- Remove media: If a track is continuously having issues, a more drastic step could be to remove media from the call to reduce bandwidth needed. An audio&video call could be reduced to audio-only for both sides of the call, for example.

For our demo application, we will handle these events with a slight delay by showing a message to the end-user that a track has been "source muted".

```javascript
// Allow a debounce timeout to be stored per track.
const sourceMutedTimeouts = {}

/**
 * When a track which is available for rendering becomes source muted, we want
 *    to debounce the event to prevent "flickering" for short interruptions, but
 *    inform the end-user of longer interruptions.
 */
client.on('media:sourceMuted', function (params) {
  if (sourceMutedTimeouts[params.trackId]) {
    // We already have an event that this track has become source muted recently.
    //    That means the track's state is flickering between source muted/unmuted.
    //    Ignore this event.
  } else {
    // Setup a delay of 1 second before handling the event.
    sourceMutedTimeouts[params.trackId] = setTimeout(() => {
      const track = client.media.getTrackById(params.trackId)
      const call = client.call.getById(callId)
      const availableTracks = params.isLocal ? call.localTracks : call.remoteTracks
      // If the track is still source muted after the delay, log a message to
      //    inform the end-user.
      // We also check that the call is supposed to be available for rendering at
      //    this point in time. If the track is not part of the Call, then it is
      //    not expected to become source unmuted unless it becomes available again.
      if (track.sourceMuted && availableTracks.includes(params.trackId)) {
        const endpoint = params.isLocal ? 'Local' : 'Remote'
        log(endpoint + ' ' + track.kind + ' has been source muted for 1 second.')
      } else {
        // If the track is not source muted after the delay, then it was only a
        //    short media interruption.
      }

      // Remove the debounce timeout.
      sourceMutedTimeouts[params.trackId] = undefined
    }, 1000)
  }
})

/**
 * When a track which is available for rendering becomes source unmuted after a
 *    longer interruption, we want to inform the end-user that the interruption
 *    has ended.
 */
client.on('media:sourceUnmuted', function (params) {
  const call = client.call.getById(callId)
  const availableTracks = params.isLocal ? call.localTracks : call.remoteTracks

  if (sourceMutedTimeouts[params.trackId]) {
    // If there is a timeout for this track, that means the source muted state
    //    of the track has flickered within 1 second.
    // Ignore this event, since the timeout will check if the track was source
    //    unmuted during the delay.
  } else if (!availableTracks.includes(params.trackId)) {
    // If the track is not available as part of the Call at this point in time,
    //    then this event does not need to be handled.
    // This occurs for some browsers that simulate a new track becoming source
    //    unmuted immediately as they are first created.
  } else {
    // If there is no timeout, then the track had been source muted for too long.
    //    Log a message saying it has been source unmuted.
    const track = client.media.getTrackById(params.trackId)
    const endpoint = params.isLocal ? 'Local' : 'Remote'
    log(endpoint + ' ' + track.kind + ' has been source unmuted.')
  }
})
```

### Track Loss

When a track is removed from the call by an SDK operation, the `call:tracksRemoved` event will be emitted for that track. When a track ends unexpectedly, but is still part of the call, the `media:trackEnded` event will instead be emitted to let the application know about the problem. The predominant scenario where this will happen is for a local track whose device has been disconnected. For example, if a bluetooth headset or USB camera is disconnected from the machine, any local tracks retrieved from those devices will end. Some browsers also allow an end-user to end screensharing directly through the browser UI, which will also cause that local screenshare track to end.

When a track ends in this way, an application needs to decide how the track should be handled. The two most common methods are:

1. Remove the track: The track has ended and should be removed from the Call so that the remote side of the call knows that it is no longer available for rendering.

- The `call.removeMedia` API can be used to remove a track from the call.

2. Replace the track: The track has ended but it can be replaced with a new track of the same type to prevent any call interruptions.

- The `call.replaceTrack` API can be used to replace a track with a new one.

A scenario where you may want to remove the track is when it is a video (or screenshare) track. Replacing a video track with media from a different camera may not be desired by the end-user, depending what other cameras they have connected to their machine (and where they are pointing). Automatically removing the track would "re-synchronize" the call, so that both users know the video was removed.

A scenario where you may want to replace the track is when it is an audio track. Removing an ended audio track could result in the user not having audio, interrupting the call until the user can fix it. Automatically replacing an audio track with a new track could prevent the audio interruption.

For our demo application, we will follow the above scenarios: replace audio and remove video.

```javascript
/**
 * When a local track ends unexpectedly, minimize the interruption to the call it
 *    causes by either removing or replacing it.
 */
client.on('media:trackEnded', function (params) {
  const { trackId, callId } = params
  const track = client.media.getTrackById(trackId)

  if (track.isLocal) {
    if (track.kind === 'video') {
      // For a local video track that ended unexpectedly, clean up the call by
      //    unrendering it then removing it from the call.
      client.media.removeTrack([trackId], '#local-container')
      client.call.removeMedia(callId, [trackId])
    } else if (track.kind === 'audio') {
      // For a local audio track that ended unexpectedly, replace it with a new
      //    audio track.
      client.call.replaceTrack(callId, trackId, { audio: true })
    }
  }
})
```

## Live Demo

Want to play around with this example for yourself? Feel free to edit this code on Codepen.

