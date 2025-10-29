[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

<style scoped>
  table, td, th {
    font-size: 11px;
    border: 1px solid;
  }
</style>

# Subscription-Related Events

This tutorial will cover three subscription-related event categories: authentication, connectivity, and subscription.  This trail will list the events in each category , explain when they are emitted, explain what they mean, and provide information on how an application can/should handle them when encountered.

For more details on the error-specific events, see the other trail page titled [Handling Subscription Errors](Handling%20Subscription%20Errors).

## Authentication Events

The authentication events are relevant only for the setting of the user credentials. The following table lists the authentication events, a summary of their descriptions, and a recommendation on how to handle them.

| <b>Event</b>|<b>Event payload<b>|<b>Event description</b>|<b>Event Handling</b>|
| --------- | ---------- | ------------- | --------- |
|<b>auth:change</b>|N/A| The authentication credentials have been set. You can check the set user details with the `getUserInfo` API.|This event is emitted when setting user credentials. To see the updated user info, use the `getUserInfo` API.|
|<b>auth:error</b>|{<br>&nbsp;&nbsp;error: BasicError<br>}<br><br>|There was an error with authentication.<br><br>All "authentication:x" errors are documented in [Handling Subscription Errors](Handling%20Subscription%20Errors) tutorial trail.|For handling, refer to the <b>Handling Subscription Errors</b> tutorial trail.|

## Connectivity Events

The connectivity events are related to the WebSocket connection created with the server. The following table lists the connectivity events, a summary of their descriptions, and a recommendation on how to handle them.

| <b>Event</b>|<b>Event payload<b>|<b>Event description</b>|<b>Event Handling</b>|
| --------- | ---------- | ------------- | --------- |
|<b>ws:change</b>|{}|The websocket connection to the server has changed state.<br><br>This event is emitted when:<ol><li>The `WebSocket` has connected</li><li>The `WebSocket` lost connection</li></ol><br><br><b>Note</b>: this event is not emitted when the WS is closed|You can check the state of the `WebSocket` using the `connection.getSocketState` API.<br><br>You may also try resetting the connection using the `connection.resetConnection` API. This event could also be used by an application to show connection progress on a UI (e.g., from `connecting` to `connected`).|

## Subscription Events

Subscription events refer to the events surrounding subscription of a user to services. They cover when subscriptions are made, when subscriptions are lost, or when any errors occur. The following table lists the subscription events, a summary of their descriptions, and a recommendation on how to handle them.

| <b>Event</b>|<b>Event payload<b>|<b>Event description</b>|<b>Event Handling</b>|
| --------- | ---------- | ------------- | --------- |
|<b>subscription:change</b>|{<br>&nbsp;&nbsp;reason: String<br>}<br><br>Reasons can be:<br><ul><li>'PENDING'</li><li>'SUBSCRIBED'</li><li>'UNSUBSCRIBED'</li><li>'LOST_CONNECTION'</li><li>'GONE'</li><li>'WS_OVERRIDDEN'</li></ul>|The subscription information has changed.<br><br>`params.reason` - When solicited, the reason for the change. <br><ul><li>'PENDING' - The subscription request has been made.</li><li>'SUBSCRIBED' - The user has been subsribed to services.</li><li>'UNSUBSCRIBED' - The user has been unsubscribed from services.</li></ul><br>When you receive a `subscription:change` event outside of an explicit subscription request.<br><br>`params.reason` can have these values:<br><ul><li>'GONE' - When Connection was terminated by the server.</li><li>'LOST_CONNECTION' - When internet connection was lost.</li><li>'WS_OVERRIDDEN' - When websocket was overridden by the server.</li></ul>|The current subscription state can be fetched using the `services.getSubscriptions` API and then understood using the `isPending` and `subscribed` attributes.<br><br>Typically, upon making a subscription request there will be two subscription events emitted. The first event (`subscription:change`) will be emitted with a `reason` of `PENDING` which is to indicate that the `isPending` flag is now set to true. The second event `subscription:change` with `reason` `SUBSCRIBED` OR `UNSUBSCRIBED` if succesful or `subscription:error` if there was a problem, will indicate the result of the subscription request.<br><br>The `isPending` flag is set to true when a subscription request has been made (for example, to subscribe a user or unsubscribe a user). An application can make use of this event to update the UI to let users know that a request is made and currently pending.<br><br>When `isPending` is false, this means that the subscription change has completed, and the subscribed array will contain the list of services subscribed to. If the list is empty, this means the user is not subscribed.<br><br>In the event of an unsolicited error (e.g., server/internet issues),  the `reason` parameter in the event's payload will indicate the cause of the failure.<br><br>An application can attempt to re-subscribe a user if a reason argument is provided in the event payload with `GONE` or `LOST_CONNECTION`, similarly to instructors provided in the [Handling Subscription Errors](Handling%20Subscription%20Errors) tutorial.<br><br><b>NOTE</b>: This event is not emitted after a subscription request failure (see `subscription:error` event).|
|<b>subscription:error</b>|{<br>&nbsp;&nbsp;error: BasicError<br>}|An error occurred during a subscription operation.<br><br>The subscription information can be retrieved using the `services.getSubscriptions` API.<br><br>Some common errors related to service subscriptions are summarized in [Handling Subscription Errors](Handling%20Subscription%20Errors)|For handling, see the [Handling Subscription Errors](Handling%20Subscription%20Errors) tutorial.|
|<b>subscription:resub</b>|{<br>&nbsp;&nbsp;attemptNum: X,<br>&nbsp;&nbsp;isFailure:Boolean,<br>&nbsp;&nbsp;error: BasicError<br>}|An attempt to extend the current user's subscription was made.<br><br>In a failure scenario, the current user is still connected, and further resubscription attempts will be made, but may become disconnected if the session expires.|No handling required, the SDK is attempting to resubscribe.|

[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

