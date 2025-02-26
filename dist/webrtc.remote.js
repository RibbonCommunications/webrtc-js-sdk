/**
 * COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED.
 * This publication and the information contained herein is the property of Ribbon
 * and may not be copied, reproduced or distributed in any form or by any means without
 * the prior written permission of Ribbon.
 *
 * THIS PUBLICATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE PUBLICATION OR ITS USE.
 *
 * WebRTC.js
 * webrtc.remote.js
 * Version: 6.16.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WebRTC"] = factory();
	else
		root["WebRTC"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 719:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getVersion = getVersion;
/**
 * Returns the version of the currently running SDK.
 *
 * It must be used by any plugins (including the factory) as the unique source of truth when it comes to determine the current SDK version.
 * The actual version value is provided by the build process scripts (aka webpack.config.***.js) which simply do a string substitution
 * for the @@ tag below with actual version value.
 */
function getVersion() {
  return '6.16.1';
}

/***/ }),

/***/ 1011:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.autoRestart = autoRestart;
exports.defer = defer;
exports.delay = delay;
exports.forwardAction = forwardAction;
exports.logCssSelector = logCssSelector;
exports.mergeValues = mergeValues;
exports.normalizeServices = normalizeServices;
exports.toQueryString = toQueryString;
var _isElement2 = _interopRequireDefault(__webpack_require__(2202));
var _isPlainObject2 = _interopRequireDefault(__webpack_require__(6705));
var _isArray2 = _interopRequireDefault(__webpack_require__(283));
var _mergeAllWith2 = _interopRequireDefault(__webpack_require__(1175));
var _queryString = _interopRequireDefault(__webpack_require__(8032));
var _effects = __webpack_require__(5860);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/**
 * Deeply merges the values of multiple objects. Objects on the left receive the values from objects on their right.
 * Unlike lodash's default merge behavior this doesn't merge arrays.
 *
 * @name mergeValues
 * @param {...Object} objects - Objects to merge
 * @return {Object} A new object containing the merged values.
 */
function mergeValues() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }
  return (0, _mergeAllWith2.default)((leftValue, rightValue) => {
    // Overwrite the default behavior of lodash's merge for arrays and simply
    // clobber what's on the left so we don't end up with merged arrays.
    if ((0, _isArray2.default)(leftValue)) {
      return rightValue;
    }
  }, objects);
}

/**
 * Utility function to convert an object to a query string.
 *
 * @param {Object} params An object of query parameters to be parsed and converted for use in a URL string
 * @param {Object} [options] Options to be passed to the query-string library
 * * @param {String} [options.arrayFormat] Format in which to compose array values which were passed as query parameters
 */
function toQueryString() {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (Object.keys(params).length > 0) {
    const stringifiedParams = _queryString.default.stringify(params, options);
    return '?' + stringifiedParams;
  }
  return '';
}

/**
 * Higher-order function to auto-restart sagas when they crash.
 * Based on: https://github.com/redux-saga/redux-saga/pull/644#issuecomment-266454875
 * @method autoRestart
 * @param  {Generator} saga The saga to wrap.
 * @return {Generator} Wrapped saga.
 */
function autoRestart(saga) {
  return function* autoRestarting() {
    // Only restart the saga if it crashed; avoid restarting it if
    //      it returned normally.
    let shouldRestart = false;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    do {
      try {
        yield (0, _effects.call)(saga, ...args);
        shouldRestart = false;
      } catch (e) {
        // TODO: Re-add this log line.
        // Importing the LogManager in this file breaks tests for an unknown
        //    reason. Should find out why so that we can log in our utils.
        // log.error(`Unhandled error in saga ${saga.name}.`, e)
        // eslint-disable-next-line no-console
        console.log(`Unhandled error in saga ${saga.name}.`, e);
        shouldRestart = true;
      }
    } while (shouldRestart);
  };
}

/**
 * Forwards the actions by directly dispatching them.
 * For example, this can be used with a takeEvery effect to grab actions from a channel and dispatch them.
 * @param {Object} action The action to be forwarded.
 * @example
 * const channel = eventChannel(...)
 * yield takeEvery(channel, forwardAction)
 */
function* forwardAction(action) {
  yield (0, _effects.put)(action);
}

/**
 * Ensures that services are in the same format understood by the server regardless,
 * of whether the client provides services as strings or objects.
 * @param {Array} services The list of services requested by the client.
 * @return {Array} A normalized list of services requested by the client.
 */
function normalizeServices() {
  let services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return services.map(service => {
    if ((0, _isPlainObject2.default)(service) && service.hasOwnProperty('service')) {
      return service;
    }
    return {
      service: service
    };
  });
}

/**
 * A deferred promise
 * Don't use this unless you know what you are doing:
 *  <https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern>
 * @returns An object a with promise property and functions to resolve and reject
 */
function defer() {
  const d = {};
  d.promise = new Promise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
  });
  return d;
}

/**
 * Delay execution.
 * @param {number} duration in milleseconds.
 */
function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

/**
 * Returns a log-safe CSS selector string.
 * This is needed because applications that may try to stringify logs that output an HTML element may run
 *   into a circular structure exceptions.
 * @param {*} selector CSS Selector.
 * @returns A log-safe string.
 */
function logCssSelector(selector) {
  return (0, _isElement2.default)(selector) ? selector.id : selector;
}

/***/ }),

/***/ 8058:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.webrtcCodes = exports.usersCodes = exports.subscriptionCodes = exports.sipEventCodes = exports.proxyCodes = exports.presenceCodes = exports.mwiCodes = exports.messagingCodes = exports.groupsCodes = exports.connectivityCodes = exports.clickToCallCodes = exports.callHistoryCodes = exports.callCodes = exports.bridgeCodes = exports.authCodes = void 0;
/**
 * Error codes for the Auth plugin.
 * @name authCodes
 */
const authCodes = exports.authCodes = {
  INVALID_CREDENTIALS: 'authentication:1',
  CONNECT_FAIL_WS_ERROR: 'authentication:2',
  LINK_UNSUBSCRIBE_FAIL: 'authentication:3',
  LINK_SUBSCRIBE_FAIL: 'authentication:4',
  LINK_EXTEND_SUBSCRIPTION_FAIL: 'authentication:5',
  LINK_UPDATE_SUBSCRIPTION_FAIL: 'authentication:6',
  INVALID_STATE: 'authentication:7',
  MISSING_SERVICE: 'authentication:12',
  LINK_SUBSCRIBE_UNAVAILABLE: 'authentication:13'
};

/**
 * Error codes for the Call plugin.
 * @name callCodes
 */
const callCodes = exports.callCodes = {
  UNKNOWN_ERROR: 'call:1',
  GENERIC_ERROR: 'call:2',
  INIT_MEDIA_FAILED: 'call:3',
  USER_MEDIA_ERROR: 'call:4',
  NOT_SUPPORTED: 'call:5',
  // The call is in the wrong state.
  INVALID_STATE: 'call:6',
  // A provided parameter is not valid.
  INVALID_PARAM: 'call:7',
  // There is a desync between components' state.
  STATE_DESYNC: 'call:8',
  // Offer could not be generated
  INVALID_OFFER: 'call:9',
  // No ICE candidates found
  NO_ICE_CANDIDATES: 'call:10',
  // Failed to recieve answer due to media mismatch
  SESSION_MISMATCH: 'call:11',
  GLARE: 'call:12'
};

/**
 * Error codes for the Call History plugin.
 * @name callHistoryCodes
 */
const callHistoryCodes = exports.callHistoryCodes = {
  UNKNOWN_ERROR: 'callHistory:1',
  BAD_REQUEST: 'callHistory:2',
  NOT_FOUND: 'callHistory:3',
  NOT_AUTHENTICATED: 'callHistory:4',
  FORBIDDEN: 'callHistory:5'
};
/**
 * @name clickToCallCodes
 */
const clickToCallCodes = exports.clickToCallCodes = {
  MISSING_ARGS: 'clickToCall:1',
  RESPONSE_ERROR: 'clickToCall:2'
};
/**
 * Error codes for the Groups plugin.
 * @name groupsCodes
 */
const groupsCodes = exports.groupsCodes = {
  UNKNOWN_ERROR: 'groups:1',
  GENERIC_ERROR: 'groups:2',
  MISSING_PARAMETERS: 'groups:3'
};

/**
 * Error codes for the Message plugin.
 * @name messagingCodes
 */
const messagingCodes = exports.messagingCodes = {
  SEND_MESSAGE_FAIL: 'messaging:5'
};

/**
 * Error codes for the Message Waiting Indicator plugin.
 * @name mwiCodes
 */
const mwiCodes = exports.mwiCodes = {
  FETCH_MWI_FAIL: 'mwi:1'
};

/**
 * Error codes from the Sip Events plugin.
 * @name sipEventCodes
 */
const sipEventCodes = exports.sipEventCodes = {
  UNKNOWN_ERROR: 'sipEvents:1',
  // The user did not subscribe/connect for the specified sip event service.
  NOT_PROVISIONED: 'sipEvents:2',
  // The user is not subscribed for the specified sip event.
  NOT_SUBSCRIBED: 'sipEvents:3'
};

/**
 * Error codes for the audio bridge portion of the call plugin.
 * @name bridgeCodes
 */
const bridgeCodes = exports.bridgeCodes = {
  UNKNOWN_ERROR: 'audioBridge:1',
  // TODO: Make "invalid input" (and others) a generic code.
  INVALID_INPUT: 'audioBridge:2',
  ALREADY_EXISTS: 'audioBridge:3',
  NOT_FOUND: 'audioBridge:4',
  NOT_SUPPORTED: 'audioBridge:5',
  MEDIA_NOT_FOUND: 'audioBridge:6',
  INVALID_STATE: 'audioBridge:7'
};

/**
 * Error codes for the subscription plugin.
 * @name subscriptionCodes
 */
const subscriptionCodes = exports.subscriptionCodes = {
  WS_CONNECTION_ERROR: 'subscription:1',
  NO_SERVICE_PROVIDED: 'subscription:2',
  GENERIC_ERROR: 'subscription:3',
  INVALID_STATE: 'subscription:4'
};

/**
 * Error codes for the connectivity plugin
 * @name connectivityCodes
 */
const connectivityCodes = exports.connectivityCodes = {
  WS_MESSAGE_ERROR: 'connectivity:1'
};

/**
 * Error codes for the Presence plugin.
 * @name presenceCodes
 */
const presenceCodes = exports.presenceCodes = {
  INVALID_STATUS: 'presence:1',
  INVALID_ACTIVITY: 'presence:2',
  INVALID_REQUEST: 'presence:3',
  INVALID_PARAM: 'presence:4'
};

/**
 * Error codes for the Users plugin
 * @name usersCodes
 */
const usersCodes = exports.usersCodes = {
  UNKNOWN: 'users:1',
  REFRESH_CONTACTS_FAIL: 'users:2',
  DIRECTORY_REQUEST_FAIL: 'users:3',
  INVALID_PARAM: 'users:4'
};

/**
 * Error codes for the Webrtc plugin
 * @name webrtcCodes
 */
const webrtcCodes = exports.webrtcCodes = {
  INVALID_PARAM: 'webrtc:1',
  INVALID_TRACK_ID: 'webrtc:2',
  TRACK_IN_USE: 'webrtc:3',
  TRACK_NOT_LOCAL: 'webrtc:4'
};

/**
 * Error codes for the Proxy plugin
 * @name proxyCodes
 */
const proxyCodes = exports.proxyCodes = {
  INVALID_PARAM: 'proxy:1',
  SET_PROXY_CHANNEL_FAIL: 'proxy:2',
  IN_ACTIVE_CALL: 'proxy:3',
  VERSION_MISMATCH: 'proxy:4',
  INVALID_STATE: 'proxy:5',
  TIMEOUT: 'proxy:6',
  UNKNOWN: 'proxy:7'
};

/***/ }),

/***/ 5412:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NO_CODE = void 0;
Object.defineProperty(exports, "authCodes", ({
  enumerable: true,
  get: function () {
    return _codes.authCodes;
  }
}));
Object.defineProperty(exports, "bridgeCodes", ({
  enumerable: true,
  get: function () {
    return _codes.bridgeCodes;
  }
}));
Object.defineProperty(exports, "callCodes", ({
  enumerable: true,
  get: function () {
    return _codes.callCodes;
  }
}));
Object.defineProperty(exports, "callHistoryCodes", ({
  enumerable: true,
  get: function () {
    return _codes.callHistoryCodes;
  }
}));
Object.defineProperty(exports, "clickToCallCodes", ({
  enumerable: true,
  get: function () {
    return _codes.clickToCallCodes;
  }
}));
exports["default"] = void 0;
Object.defineProperty(exports, "groupsCodes", ({
  enumerable: true,
  get: function () {
    return _codes.groupsCodes;
  }
}));
Object.defineProperty(exports, "messagingCodes", ({
  enumerable: true,
  get: function () {
    return _codes.messagingCodes;
  }
}));
Object.defineProperty(exports, "mwiCodes", ({
  enumerable: true,
  get: function () {
    return _codes.mwiCodes;
  }
}));
Object.defineProperty(exports, "presenceCodes", ({
  enumerable: true,
  get: function () {
    return _codes.presenceCodes;
  }
}));
Object.defineProperty(exports, "proxyCodes", ({
  enumerable: true,
  get: function () {
    return _codes.proxyCodes;
  }
}));
Object.defineProperty(exports, "sipEventCodes", ({
  enumerable: true,
  get: function () {
    return _codes.sipEventCodes;
  }
}));
Object.defineProperty(exports, "subscriptionCodes", ({
  enumerable: true,
  get: function () {
    return _codes.subscriptionCodes;
  }
}));
Object.defineProperty(exports, "usersCodes", ({
  enumerable: true,
  get: function () {
    return _codes.usersCodes;
  }
}));
Object.defineProperty(exports, "webrtcCodes", ({
  enumerable: true,
  get: function () {
    return _codes.webrtcCodes;
  }
}));
var _codes = __webpack_require__(8058);
const NO_CODE = exports.NO_CODE = 'NO_CODE';

/**
 * The Basic Error object. Provides information about an error that occurred in the SDK.
 * @public
 * @static
 * @typedef {Object} BasicError
 * @memberof api
 * @property {string} code The code of the error. If no code is known, this will be 'NO_CODE'.
 * @property {string} message A human-readable message to describe the error. If no message is known, this will be 'An error occurred'.
 */

class BasicError {
  constructor(_ref) {
    let {
      message,
      code
    } = _ref;
    this.name = 'BasicError';
    this.code = code || NO_CODE;
    this.message = message ? `${message}` : 'An error occurred.';
  }
}
exports["default"] = BasicError;

/***/ }),

/***/ 5422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = eventEmitter;
__webpack_require__(7107);
__webpack_require__(9375);
/*
 * Event emitter module. Can be used as a standalone factory or as a mixin.
 *
 * @private
 * @class emitter
 * @example
 * ``` javascript
 * var eventEmitter = emitter(); // Create a new emitter.
 * emitter(myEmittingObject.prototype); // Mixin to an existing object.
 * ```
 */
function eventEmitter() {
  let prototype = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var eventMap = [];
  var subscribeMap = [];
  var strictMode = false;

  /*
   * Check if the event is a valid event type.
   */
  function checkEvent(type) {
    if (strictMode && !eventMap[type]) {
      throw new Error('Invalid event type: ' + type);
    }
  }
  return Object.assign(prototype, {
    /*
     * Define an event type with the event emitter.
     *
     * @method define
     * @param {String} type The name for the event type.
     */
    define: function (type) {
      eventMap[type] = eventMap[type] || [];
    },
    /*
     * Define an alias for an event type.
     *
     * @method alias
     * @param {String} type The event type for which to add an alias.
     * @param {String} alias The alias name for the event type.
     * @throws {Error} Invalid event type
     */
    alias: function (type, alias) {
      checkEvent(type);
      eventMap[alias] = eventMap[type] = eventMap[type] || [];
    },
    /*
     * Add an event listener for the specified event type.
     *
     * @method on
     * @param {String} type The event type for which to add the listener.
     * @param {Function} listener The listener for the event type. The parameters
     *                            of the listener depend on the event type.
     * @throws {Error} Invalid event type
     */
    on: function (type, listener) {
      checkEvent(type);
      (eventMap[type] = eventMap[type] || []).push(listener);
    },
    /*
     * Removes an event listener for the specified event type.
     *
     * @method off
     * @param {String} type The event type for which to remote the listener.
     * @param {Function} listener The listener to remove.
     * @throws {Error} Invalid event type
     */
    off: function (type, listener) {
      checkEvent(type);
      var list = eventMap[type] || [];
      var i = list.length;
      while (i--) {
        if (listener === list[i]) {
          list.splice(i, 1);
        }
      }
    },
    /*
     * Emits an event of the specified type.
     *
     * @method emit
     * @param {String} type The event type to emit.
     * @param {any} [...args] The arguments to pass to the listeners of the event.
     * @throws {Error} Invalid event type
     */
    emit: function (type) {
      checkEvent(type);
      var args = Array.prototype.slice.call(arguments, 1);
      var list = eventMap[type] || [];
      var i = 0;
      for (; i < list.length; i++) {
        list[i].apply(undefined, args);
      }
      for (var j = 0; j < subscribeMap.length; j++) {
        subscribeMap[j].call(undefined, type, args);
      }
    },
    /*
     * Add a subscription for all event types.
     *
     * @method subscribe
     * @param {Function} listener The listener for all event types.
     * @throws {Error} Listener not a function
     */
    subscribe: function (listener) {
      if (typeof listener === 'function') {
        subscribeMap.push(listener);
      } else {
        throw new Error('Listener not a function');
      }
    },
    /*
     * Remove a subscription for all event types.
     *
     * @method unsubscribe
     * @param {Function} listener The listener for all event types.
     * @throws {Error} Listener not a function
     */
    unsubscribe: function (listener) {
      if (typeof listener === 'function') {
        var i = subscribeMap.length;
        while (i--) {
          if (listener === subscribeMap[i]) {
            subscribeMap.splice(i, 1);
          }
        }
      } else {
        throw new Error('Listener not a function');
      }
    },
    /*
     * Sets the emitter in strict mode where it only allows events that have been defined or aliases.
     *
     * @method setStrictMode
     * @param {Boolean} strict Whether to set strict mode for the emitter.
     */
    setStrictMode: function (strict) {
      strictMode = strict;
    }
  });
}

/***/ }),

/***/ 7186:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = defaultActionHandler;
__webpack_require__(2234);
/* Helper function for styling logs based on the log type.
 * This function will inspect the log entry and format the log
 * accordingly.
 */
function styleLog(entry) {
  const {
    timestamp,
    level
  } = entry;
  const logInfo = `${timestamp} - ACTION - ${level}`;
  let [logType, payload] = entry.messages;
  let prefix;
  let style = '';
  if (logType.includes('state')) {
    // If the log is for prev state / next state, display that in the prefix.
    prefix = `${logInfo} - ${logType.toUpperCase()}`;
  } else if (logType.includes('ADDED') || logType.includes('DELETED') || logType.includes('ARRAY')) {
    // If the log has added or removed keys from state, log the operation, keys affected and new values.
    prefix = `${entry.messages[0]}: ${entry.messages[2]}`;
    style = entry.messages[1];
    payload = entry.messages[3];
  } else if (logType.includes('CHANGED')) {
    // If the log has changed keys in state, log the operation, keys, old and new values.
    prefix = `${entry.messages[0]}: ${entry.messages[2]}`;
    style = entry.messages[1];
    payload = `${entry.messages[3]} ${entry.messages[4]} ${entry.messages[5]}`;
  } else if (logType.includes('no diff')) {
    // If action results in no change in state, just log no diff.
    prefix = `${logInfo} - NO DIFF`;
    payload = '';
  } else {
    // Else the log is the action itself, so use the action type.
    prefix = `${logInfo} - ${payload.type} - ${logType}`;
  }
  return {
    prefix,
    style,
    payload
  };
}

/**
 * Default function for the SDK to use for logging actions.
 * Action entries come in 4 different types:
 *    1. start: Log the message directly and "open the group".
 *    2. state: Log a prefix, state type, and state itself.
 *      (prev state and next state)
 *    3. payload: Log a prefix, action type, and payload.
 *    4. end: Close the group.
 * @method defaultActionHandler
 * @param  {LogEntry} entry
 */
function defaultActionHandler(entry) {
  // Handle the "start" and "stop" action log entries specifically.
  if (['group', 'groupCollapsed'].includes(entry.method)) {
    // eslint-disable-next-line no-console
    console[entry.method](...entry.messages);
    return;
  } else if (entry.method === 'groupEnd') {
    // eslint-disable-next-line no-console
    console.groupEnd();
    return;
  }
  const {
    prefix,
    style,
    payload
  } = styleLog(entry);
  // eslint-disable-next-line no-console
  console[entry.method](prefix, style, payload);
}

/***/ }),

/***/ 1360:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.partialDefaultLogActions = exports.defaultOptions = void 0;
var _actionHandler = _interopRequireDefault(__webpack_require__(7186));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Configuration options for the Logs feature.
 *
 * The SDK will log information about the operations it is performing. The
 *    amount of information will depend on how the Logs feature is configured.
 *
 * The format of logs can also be customized by providing a
 *    {@link logger.LogHandler LogHandler}. This function will receive a
 *    {@link logger.LogEntry LogEntry} which it can handle as it sees fit. By
 *    default, the SDK will log information to the console. For more
 *    information, see the {@link logger Logs feature} description.
 *
 * @public
 * @static
 * @name config.logs
 * @memberof config
 * @requires logs
 * @instance
 * @param {Object} logs Logs configs.
 * @param {string} [logs.logLevel='debug'] Log level to be set. See {@link logger.levels}.
 * @param {logger.LogHandler} [logs.handler] The function to receive log entries from the
 *    SDK. If not provided, a default handler will be used that logs entries
 *    to the console.
 * @param {Object|boolean} [logs.logActions=false] Options specifically for action logs when
 *    logLevel is at DEBUG+ levels. Set this to false to not output action logs.
 * @param {logger.LogHandler} [logs.logActions.handler] The function to receive action
 *    log entries from the SDK. If not provided, a default handler will be used
 *    that logs actions to the console.
 * @param {boolean} [logs.logActions.actionOnly=false] Only output information
 *    about the action itself. Omits the SDK context for when it occurred.
 * @param {boolean} [logs.logActions.collapsed=false] Whether logs should be
 *    minimized when initially output. The full log is still output and can be
 *    inspected on the console.
 * @param {boolean} [logs.logActions.diff=false] Include a diff of what SDK
 *    context was changed by the action.
 * @param {string}  [logs.logActions.level='debug'] Log level to be set
 *    on the action logs
 * @param {boolean} [logs.logActions.exposePayloads=true] Allow action payloads
 *    to be exposed in the logs, potentially displaying sensitive information.
 */
const defaultOptions = exports.defaultOptions = {
  logLevel: 'debug',
  handler: undefined,
  logActions: false
};
const partialDefaultLogActions = exports.partialDefaultLogActions = {
  handler: _actionHandler.default,
  actionOnly: false,
  collapsed: false,
  diff: false,
  level: 'debug',
  exposePayloads: true
};
/*
 * TODO: Figure out a way to work around this.
 * Can't use validation in logging because validation uses logging to output errors.
 * Circular dependency, have to refactor.
 * Code:
 ```javascript
// Parse and/or Validate
// import { enums, validation as v8n, parse } from '../common/validation'
const defaultValidation = v8n.schema({
  logLevel: enums(['silent', 'error', 'warn', 'info', 'debug']),
  handler: v8n.optional(v8n.function()),
  logActions: v8n.optional(
    v8n.passesAnyOf(
      v8n.schema({
        handler: v8n.optional(v8n.function()),
        actionOnly: v8n.boolean(),
        collapsed: v8n.boolean(),
        diff: v8n.boolean(),
        exposePayloads: v8n.boolean()
      }),
      // OR
      v8n.boolean()
    )
  )
})

export const parseLogConfig = parse('logger', defaultValidation)
```
*/

/***/ }),

/***/ 9932:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.logManager = exports.API_LOG_TAG = void 0;
var _kandyLogger = _interopRequireDefault(__webpack_require__(671));
var _config = __webpack_require__(1360);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Logs generated as a result of invoking the public API will contain this tag
const API_LOG_TAG = exports.API_LOG_TAG = 'API invoked: ';

/**
 * Create the LogManager right away so that it is available. The SDK has not
 *    been instantiated yet, so we have to use the default options until we get
 *    the application's configs.
 */
/**
 * TODO: There is a technical debt associated with having a loggerManager along with it's
 * loggers created at the global scope. Multiple instances of the SDK would end up sharing
 * the log manager and therefore loggers.
 */
const manager = (0, _kandyLogger.default)(_config.defaultOptions);
const logManager = exports.logManager = manager;

/***/ }),

/***/ 2140:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchDeviceEvents;
var _actions = __webpack_require__(6446);
var eventTypes = _interopRequireWildcard(__webpack_require__(1709));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Webrtc plugin.

/**
 * Sets up listeners for events emitted from the Webrtc-stack's Device Manager.
 *
 * Events received from the Webrtc-stack are used to:
 *    1) Create actions to update SDK state about Webrtc-layer changes.
 *    2) Sometimes create events to emit to the application to reflect the changes
 *        to SDK state.
 *
 * The actions and events are passed to a "handler" which knows what to do with
 *    them in the current context (ie. not always direct dispatch/emit).
 * @method watchDeviceEvents
 * @param {Object} manager The WebRTC Device Manager.
 * @param {Function} handler Function for handling actions and events.
 */
function watchDeviceEvents(manager, handler) {
  // Manager event handlers.
  /**
   * @method change
   * @param {boolean} [actionOnly] True if this event should not be emitted to the application.
   */
  const change = actionOnly => {
    // Get the latest devices after they changed, then emit the device list
    //  upwards.
    manager.checkDevices().then(devices => {
      const devicesChangedAction = _actions.deviceActions.devicesChanged(devices);
      const devicesChangedEvent = actionOnly ? undefined : {
        type: eventTypes.DEVICES_CHANGED,
        args: {}
      };
      handler(devicesChangedAction, devicesChangedEvent);
    });
  };
  manager.on('change', change);

  // Return an unsubscribe function that removes all event listeners.
  const unsubscribe = () => {
    manager.off('change', change);
  };
  return unsubscribe;
}

/***/ }),

/***/ 8487:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchMediaEvents;
var _actions = __webpack_require__(6446);
// Webrtc plugin.

/**
 * Sets up event listeners for a Media's events.
 * The events are turned into actions and dispatched
 *    to be handled by redux.
 * @method watchMediaEvents
 * @param {Object} media A Media object.
 * @param {Object} handler Handler function for handling actions and events.
 */
function watchMediaEvents(media, handler) {
  // Media received a new track.
  const newTrack = _ref => {
    let {
      mediaId,
      trackId
    } = _ref;
    // Pass the action to the handler to be handled as appropriate
    const mediaNewTrackAction = _actions.mediaActions.mediaNewTrack(mediaId, {
      trackId
    });
    handler(mediaNewTrackAction);
  };
  const trackEnded = _ref2 => {
    let {
      mediaId,
      trackId
    } = _ref2;
    // Pass the action to the handler to be handled as appropriate
    const mediaTrackEndedAction = _actions.mediaActions.mediaTrackEnded(mediaId, {
      trackId
    });
    handler(mediaTrackEndedAction);
  };
  const unsubscribe = () => {
    media.off('media:stopped', unsubscribe);
    media.off('track:new', newTrack);
    media.off('track:ended', trackEnded);
  };

  // If the media is stopped we will turn off event listeners for this media.
  //  The Media Manager will handle updating state with the media "remove" event that gets emitted
  //  following media "stopped" events.
  media.on('media:stopped', unsubscribe);
  media.on('track:new', newTrack);
  media.on('track:ended', trackEnded);
  return unsubscribe;
}

/***/ }),

/***/ 620:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchMediaManagerEvents;
var _actions = __webpack_require__(6446);
var _media = _interopRequireDefault(__webpack_require__(8487));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Webrtc plugin.

/**
 * Sets up event listeners for Media Manager events. The events are turned into
 *    actions and dispatched to be handled by redux.
 * @method watchMediaManagerEvents
 * @param {Object} manager The Media Manager.
 * @param {Object} handler Handler function for handling actions and events.
 */
function watchMediaManagerEvents(manager, handler) {
  const newMedia = id => {
    const media = manager.get(id);

    // If it is a new Media, watch for its events.
    (0, _media.default)(media, handler);

    // Pass the action to the handler to be handled as appropriate
    const detached = media.getTracks().some(track => track.isDetached());
    const newMediaAction = _actions.mediaActions.newMedia(id, {
      local: media.getState().isLocal,
      detached,
      tracks: media.getTracks().map(track => track.id)
    });
    handler(newMediaAction);
  };
  const removedMedia = id => {
    // Pass the action to the handler to be handled as appropriate
    const removedMediaAction = _actions.mediaActions.removedMedia(id);
    handler(removedMediaAction);
  };
  manager.on('media:new', newMedia);
  manager.on('media:removed', removedMedia);
  const unsubscribe = () => {
    manager.off('media:new', newMedia);
    manager.off('media:removed', removedMedia);
  };
  return unsubscribe;
}

/***/ }),

/***/ 975:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchSessionEvents;
var _actions = __webpack_require__(6446);
// Webrtc plugin.

/**
 * Sets up event listeners for a Session's events.
 * The events are turned into actions and dispatched
 *    to be handled by redux elsewhere.
 * @method watchSessionEvents
 * @param {Object} session The Session object.
 * @param {Object} handler Handler function for handling actions and events.
 */
function watchSessionEvents(session, handler) {
  // Session received a new track.
  const newTrack = _ref => {
    let {
      local,
      trackId
    } = _ref;
    // Pass the action to the handler to be handled as appropriate
    const newTrackAction = _actions.sessionActions.sessionNewTrack(session.id, {
      local,
      trackId
    });
    handler(newTrackAction);
  };
  const trackEnded = _ref2 => {
    let {
      local,
      trackId,
      isUnsolicited
    } = _ref2;
    /**
     * When a track has ended,
     * update redux state's webrtc.session.localTracks/remoteTracks array
     * by removing the specified trackId.
     * ('local' boolean will determine whether to update localTracks or remoteTracks)
     */
    handler(_actions.sessionActions.sessionTrackEnded(session.id, {
      local,
      trackId,
      isUnsolicited
    }));
  };
  const trackReplaced = _ref3 => {
    let {
      oldTrackId,
      trackId
    } = _ref3;
    // Pass the action to the handler to be handled as appropriate
    const trackReplacedAction = _actions.sessionActions.sessionTrackReplaced(session.id, {
      oldTrackId,
      trackId
    });
    handler(trackReplacedAction);
  };
  const iceConnectionStateChange = obj => {
    // Pass the action to the handler to be handled as appropriate
    const iceConnectionStateChangeAction = _actions.sessionActions.sessionIceConnectionStateChange(session.id, {
      iceConnectionState: obj.iceConnectionState
    });
    handler(iceConnectionStateChangeAction);
  };
  const iceCandidateCollected = obj => {
    // Pass the action to the handler to be handled as appropriate
    const iceCandidateCollectedAction = _actions.sessionActions.sessionIceCandidateCollected(session.id, obj);
    handler(iceCandidateCollectedAction);
  };
  const iceGatheringStateChange = obj => {
    // Pass the action to the handler to be handled as appropriate
    const iceGatheringStateChangeAction = _actions.sessionActions.sessionIceGatheringStateChange(session.id, obj);
    handler(iceGatheringStateChangeAction);
  };
  const iceCollectionScheduledCheck = obj => {
    // Pass the action to the handler to be handled as appropriate
    const iceCollectionScheduledCheckAction = _actions.sessionActions.sessionIceCollectionScheduledCheck(session.id, obj);
    handler(iceCollectionScheduledCheckAction);
  };

  // Listen for when audio files end (from `insertAudio` API).
  const audioFileEnded = isSuccess => {
    handler(_actions.sessionActions.sessionAudioEnded(session.id, {
      error: !isSuccess
    }));
  };
  session.on('new:track', newTrack);
  session.on('track:ended', trackEnded);
  session.on('track:replaced', trackReplaced);
  session.on('peer:iceConnectionStateChange', iceConnectionStateChange);
  session.on('peer:iceGatheringStateChange', iceGatheringStateChange);
  session.on('peer:iceCandidateCollected', iceCandidateCollected);
  session.on('peer:iceCollectionScheduledCheck', iceCollectionScheduledCheck);
  session.on('audioFileEnded', audioFileEnded);
  const unsubscribe = () => {
    session.off('new:track', newTrack);
    session.off('track:ended', trackEnded);
    session.off('track:replaced', trackReplaced);
    session.off('peer:iceConnectionStateChange', iceConnectionStateChange);
    session.off('peer:iceGatheringStateChange', iceGatheringStateChange);
    session.off('peer:iceCandidateCollected', iceCandidateCollected);
    session.off('peer:iceCollectionScheduledCheck', iceCollectionScheduledCheck);
    session.off('audioFileEnded', audioFileEnded);
  };
  return unsubscribe;
}

/***/ }),

/***/ 5863:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchSessionManagerEvents;
var _actions = __webpack_require__(6446);
var _session = _interopRequireDefault(__webpack_require__(975));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Webrtc plugin.

/**
 * Sets up event listeners for Session Manager Events.
 * The events are turned into actions and dispatched
 *    to be handled by redux elsewhere.
 * @method watchSessionManagerEvents
 * @param {Object} manager The webRTC Session Manager.
 * @param {Object} handler Handler function for handling actions and events.
 */
function watchSessionManagerEvents(manager, handler) {
  // Handle new Session.
  const sessionAdded = id => {
    const session = manager.get(id);
    const state = session.getState();
    delete state.id;

    // If it is a new Session, watch for its events.
    (0, _session.default)(session, handler);

    // Pass the action to the handler to be handled as appropriate
    const sessionAddedAction = _actions.sessionActions.sessionAdded(id, state);
    handler(sessionAddedAction);
  };

  // Handle Sessions ending.
  const sessionRemoved = id => {
    // Pass the action to the handler to be handled as appropriate
    const sessionRemovedAction = _actions.sessionActions.sessionRemoved(id);
    handler(sessionRemovedAction);
  };
  manager.on('session:new', sessionAdded);
  manager.on('session:removed', sessionRemoved);
  const unsubscribe = () => {
    manager.off('session:new', sessionAdded);
    manager.off('session:removed', sessionRemoved);
  };
  return unsubscribe;
}

/***/ }),

/***/ 8240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchTrackEvents;
var _actions = __webpack_require__(6446);
var eventTypes = _interopRequireWildcard(__webpack_require__(1709));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Libraries.

/**
 * Sets up event listeners for a Track object's events.
 * The events simply dispatch actions to be handled by redux.
 * @method watchTrackEvents
 * @param {Object} track A Track object.
 * @param {Object} handler Handler function for handling actions and events.
 */
function watchTrackEvents(track, handler) {
  // The track source (which affected the track identified by trackId) was muted.
  // An example of a track source is a physical media device such as:
  // microphone or camera.
  const trackSourceMuted = trackData => {
    const trackSourceMutedAction = _actions.trackActions.trackSourceMuted([trackData.trackId], {
      mediaId: trackData.mediaId,
      isLocal: trackData.isLocal
    });
    const trackSourceMutedEvent = {
      type: eventTypes.TRACK_SOURCE_MUTED,
      args: {
        trackIds: [trackData.trackId],
        trackId: trackData.trackId,
        isLocal: trackData.isLocal,
        id: trackData.mediaId
      }
    };
    // Pass the action and event to the handler to be handled as appropriate
    handler(trackSourceMutedAction, trackSourceMutedEvent);
  };

  // The track source (which affected the track identified by trackId) was unmuted.
  const trackSourceUnmuted = trackData => {
    const trackSourceUnmutedAction = _actions.trackActions.trackSourceUnmuted([trackData.trackId], {
      mediaId: trackData.mediaId,
      isLocal: trackData.isLocal
    });
    const trackSourceUnmutedEvent = {
      type: eventTypes.TRACK_SOURCE_UNMUTED,
      args: {
        trackIds: [trackData.trackId],
        trackId: trackData.trackId,
        isLocal: trackData.isLocal,
        id: trackData.mediaId
      }
    };
    // Pass the action and event to the handler to be handled as appropriate
    handler(trackSourceUnmutedAction, trackSourceUnmutedEvent);
  };
  const unsubscribe = () => {
    track.off('ended', unsubscribe);
    track.off('muted', trackSourceMuted);
    track.off('unmuted', trackSourceUnmuted);
  };

  // If the track is ended we will turn off event listeners for the track object.
  //  The trackManager will handle updating state with the track "remove" event that gets emitted
  //  following track "ended" events.
  track.on('ended', unsubscribe);
  track.on('muted', trackSourceMuted);
  track.on('unmuted', trackSourceUnmuted);
  return unsubscribe;
}

/***/ }),

/***/ 1173:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = watchTrackManagerEvents;
var _actions = __webpack_require__(6446);
var _eventTypes = __webpack_require__(1709);
var _track = _interopRequireDefault(__webpack_require__(8240));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Call plugin.

/**
 * Sets up event listeners for Track Manager Events.
 * The events are turned into actions and dispatched
 *    to be handled by redux.
 * @method watchTrackManagerEvents
 * @param {Object} manager The webRTC Track Manager.
 * @param {Object} handler Handler function for handling actions and events.
 */
function watchTrackManagerEvents(manager, handler) {
  // Handler for new tracks
  const trackAdded = id => {
    const track = manager.get(id);
    const state = track.getState();

    // Translate the track state from native WebRTC to SDK style.
    // This is to change the "muted" property to be what people generally know
    //    "muted" to be.
    state.sourceMuted = state.muted;
    state.muted = !state.enabled;
    delete state.enabled;
    delete state.id;

    // Set up event listeners for the added track
    (0, _track.default)(track, handler);

    // Pass the action to the handler to be handled as appropriate
    const trackAddedAction = _actions.trackActions.trackAdded(id, state);
    handler(trackAddedAction);
  };

  // Handler for removed/ended tracks
  const trackRemoved = id => {
    // Pass the action to the handler to be handled as appropriate
    const trackRemovedAction = _actions.trackActions.trackRemoved(id);
    // Check if track is detached and emit a 'track ended' event if it is
    const track = manager.get(id);
    const trackEndedEvent = track.isDetached() ? {
      type: _eventTypes.TRACK_ENDED,
      args: {
        trackId: id,
        isLocal: true,
        detached: true
      }
    } : undefined;
    handler(trackRemovedAction, trackEndedEvent);
  };

  // Listen for track add or remove events
  manager.on('add', trackAdded);
  manager.on('remove', trackRemoved);

  // Return an unsubscribe function that removes all event listeners.
  const unsubscribe = () => {
    manager.off('add', trackAdded);
    manager.off('remove', trackRemoved);
  };
  return unsubscribe;
}

/***/ }),

/***/ 1997:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UNMUTE_TRACKS_FINISH = exports.UNMUTE_TRACKS = exports.TRACK_SOURCE_UNMUTED = exports.TRACK_SOURCE_MUTED = exports.TRACK_REMOVED = exports.TRACK_ADDED = exports.SET_BROWSER_DETAILS = exports.SESSION_TRACK_REPLACED = exports.SESSION_TRACK_ENDED = exports.SESSION_REMOVED = exports.SESSION_NEW_TRACK = exports.SESSION_ICE_GATHERING_STATE_CHANGE = exports.SESSION_ICE_CONNECTION_STATE_CHANGE = exports.SESSION_ICE_COLLECTION_SCHEDULED_CHECK = exports.SESSION_ICE_CANDIDATE_COLLECTED = exports.SESSION_AUDIO_ENDED = exports.SESSION_ADDED = exports.RENDER_TRACKS_FINISH = exports.RENDER_TRACKS = exports.REMOVE_TRACKS_FINISH = exports.REMOVE_TRACKS = exports.MUTE_TRACKS_FINISH = exports.MUTE_TRACKS = exports.MEDIA_TRACK_ENDED = exports.MEDIA_REMOVED = exports.MEDIA_NEW_TRACK = exports.MEDIA_NEW = exports.MEDIA_CHANGE = exports.INITIALIZE_DEVICES_FINISH = exports.INITIALIZE_DEVICES = exports.DEVICES_CHANGE = void 0;
const prefix = '@@KANDY/WEBRTC/';

/**
 * Device action types.
 */
const DEVICES_CHANGE = exports.DEVICES_CHANGE = prefix + 'DEVICES/CHANGE';
const INITIALIZE_DEVICES = exports.INITIALIZE_DEVICES = prefix + 'INITIALIZE_DEVICES';
const INITIALIZE_DEVICES_FINISH = exports.INITIALIZE_DEVICES_FINISH = prefix + 'INITIALIZE_DEVICES_FINISH';

/**
 * Track action types.
 */
const trackPrefix = prefix + 'TRACK/';
const TRACK_ADDED = exports.TRACK_ADDED = trackPrefix + 'ADDED';
const TRACK_REMOVED = exports.TRACK_REMOVED = trackPrefix + 'REMOVED';
const RENDER_TRACKS = exports.RENDER_TRACKS = trackPrefix + 'RENDER';
const RENDER_TRACKS_FINISH = exports.RENDER_TRACKS_FINISH = trackPrefix + 'RENDER_FINISH';
const REMOVE_TRACKS = exports.REMOVE_TRACKS = trackPrefix + 'REMOVE';
const REMOVE_TRACKS_FINISH = exports.REMOVE_TRACKS_FINISH = trackPrefix + 'REMOVE_FINISH';
const MUTE_TRACKS = exports.MUTE_TRACKS = trackPrefix + 'MUTE';
const MUTE_TRACKS_FINISH = exports.MUTE_TRACKS_FINISH = trackPrefix + 'MUTE_FINISH';
const UNMUTE_TRACKS = exports.UNMUTE_TRACKS = trackPrefix + 'UNMUTE';
const UNMUTE_TRACKS_FINISH = exports.UNMUTE_TRACKS_FINISH = trackPrefix + 'UNMUTE_FINISH';
const TRACK_SOURCE_MUTED = exports.TRACK_SOURCE_MUTED = trackPrefix + 'SOURCE_MUTED';
const TRACK_SOURCE_UNMUTED = exports.TRACK_SOURCE_UNMUTED = trackPrefix + 'SOURCE_UNMUTED';

/**
 * Session action types.
 */
const sessionPrefix = prefix + 'SESSION/';
const SESSION_ADDED = exports.SESSION_ADDED = sessionPrefix + 'ADDED';
const SESSION_REMOVED = exports.SESSION_REMOVED = sessionPrefix + 'REMOVED';
const SESSION_NEW_TRACK = exports.SESSION_NEW_TRACK = sessionPrefix + 'NEW_TRACK';
const SESSION_TRACK_ENDED = exports.SESSION_TRACK_ENDED = sessionPrefix + 'TRACK_ENDED';
const SESSION_TRACK_REPLACED = exports.SESSION_TRACK_REPLACED = sessionPrefix + 'TRACK_REPLACED';

// Audio file from the `insertAudio` API has ended.
const SESSION_AUDIO_ENDED = exports.SESSION_AUDIO_ENDED = sessionPrefix + 'AUDIO_ENDED';

// Peer events
const SESSION_ICE_CONNECTION_STATE_CHANGE = exports.SESSION_ICE_CONNECTION_STATE_CHANGE = sessionPrefix + 'ICE_CONNECTION_STATE_CHANGE';
const SESSION_ICE_GATHERING_STATE_CHANGE = exports.SESSION_ICE_GATHERING_STATE_CHANGE = sessionPrefix + 'ICE_GATHERING_STATE_CHANGE';
const SESSION_ICE_CANDIDATE_COLLECTED = exports.SESSION_ICE_CANDIDATE_COLLECTED = sessionPrefix + 'ICE_CANDIDATE_COLLECTED';
const SESSION_ICE_COLLECTION_SCHEDULED_CHECK = exports.SESSION_ICE_COLLECTION_SCHEDULED_CHECK = sessionPrefix + 'ICE_CANDIDATE_SCHEDULED_CHECK';

/**
 * Media action types.
 */
const mediaPrefix = prefix + 'MEDIA/';
const MEDIA_NEW = exports.MEDIA_NEW = mediaPrefix + 'NEW';
const MEDIA_REMOVED = exports.MEDIA_REMOVED = mediaPrefix + 'REMOVED';
const MEDIA_CHANGE = exports.MEDIA_CHANGE = mediaPrefix + 'CHANGE';
const MEDIA_NEW_TRACK = exports.MEDIA_NEW_TRACK = mediaPrefix + 'NEW_TRACK';
const MEDIA_TRACK_ENDED = exports.MEDIA_TRACK_ENDED = mediaPrefix + 'TRACK_ENDED';

/**
 * Misc. action types.
 */
const SET_BROWSER_DETAILS = exports.SET_BROWSER_DETAILS = prefix + 'SET_BROWSER_DETAILS';

/***/ }),

/***/ 3269:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.devicesChanged = devicesChanged;
exports.initializeDevice = initializeDevice;
exports.initializeDeviceFinish = initializeDeviceFinish;
var actionTypes = _interopRequireWildcard(__webpack_require__(1997));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Webrtc plugin.

function devicesChanged(devices) {
  return {
    type: actionTypes.DEVICES_CHANGE,
    payload: devices
  };
}
function initializeDevice(browserConstraints) {
  return {
    type: actionTypes.INITIALIZE_DEVICES,
    payload: browserConstraints
  };
}

/**
 * The finishing action which follows the INITIALIZE_DEVICES action
 * @param {Object} $0
 * @param {Object} [$0.devices] The device object.
 * @param {Object} [$0.error] An error object. Only present if an error occurred.
 * @returns {Object} A flux standard action representing the INITIALIZE_DEVICES_FINISH action.
 */
function initializeDeviceFinish(_ref) {
  let {
    devices,
    error
  } = _ref;
  return {
    payload: error || devices,
    error: Boolean(error),
    type: actionTypes.INITIALIZE_DEVICES_FINISH
  };
}

/***/ }),

/***/ 6446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.trackActions = exports.sessionActions = exports.miscActions = exports.mediaActions = exports.deviceActions = void 0;
var deviceActionsImport = _interopRequireWildcard(__webpack_require__(3269));
var trackActionsImport = _interopRequireWildcard(__webpack_require__(7524));
var sessionActionsImport = _interopRequireWildcard(__webpack_require__(8377));
var mediaActionsImport = _interopRequireWildcard(__webpack_require__(850));
var miscActionsImport = _interopRequireWildcard(__webpack_require__(9616));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Apparently the following doesn't work:
//      export * as newName from './place';
// So import everything from each file, then re-export.
const deviceActions = exports.deviceActions = deviceActionsImport;
const trackActions = exports.trackActions = trackActionsImport;
const sessionActions = exports.sessionActions = sessionActionsImport;
const mediaActions = exports.mediaActions = mediaActionsImport;
const miscActions = exports.miscActions = miscActionsImport;

/***/ }),

/***/ 850:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mediaNewTrack = mediaNewTrack;
exports.mediaTrackEnded = mediaTrackEnded;
exports.newMedia = newMedia;
exports.removedMedia = removedMedia;
var _isEmpty2 = _interopRequireDefault(__webpack_require__(4499));
var actionTypes = _interopRequireWildcard(__webpack_require__(1997));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Webrtc plugin.

// Libraries.

function mediaActionHelper(type, id) {
  let payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let meta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const action = {
    type,
    payload: {
      ...payload,
      id
    }
  };

  // Only have meta and error properties on the action if they're needed.
  if (!(0, _isEmpty2.default)(meta)) {
    action.meta = meta;
  }
  if (payload.error) {
    action.error = true;
  }
  return action;
}
function newMedia(id, params) {
  return mediaActionHelper(actionTypes.MEDIA_NEW, id, params);
}
function removedMedia(id, params) {
  return mediaActionHelper(actionTypes.MEDIA_REMOVED, id, params);
}
function mediaNewTrack(id, params) {
  return mediaActionHelper(actionTypes.MEDIA_NEW_TRACK, id, params);
}
function mediaTrackEnded(id, params) {
  return mediaActionHelper(actionTypes.MEDIA_TRACK_ENDED, id, params);
}

/***/ }),

/***/ 9616:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setBrowserDetails = setBrowserDetails;
var actionTypes = _interopRequireWildcard(__webpack_require__(1997));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Webrtc plugin.

/**
 * Action creator
 * @method setBrowserDetails
 * @param  {Object} details
 * @param  {string} details.browser
 * @param  {number} details.version
 * @return {Object} A Flux-Standard-action.
 */
function setBrowserDetails(details) {
  return {
    type: actionTypes.SET_BROWSER_DETAILS,
    payload: details
  };
}

/***/ }),

/***/ 8377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sessionAdded = sessionAdded;
exports.sessionAudioEnded = sessionAudioEnded;
exports.sessionIceCandidateCollected = sessionIceCandidateCollected;
exports.sessionIceCollectionScheduledCheck = sessionIceCollectionScheduledCheck;
exports.sessionIceConnectionStateChange = sessionIceConnectionStateChange;
exports.sessionIceGatheringStateChange = sessionIceGatheringStateChange;
exports.sessionNewTrack = sessionNewTrack;
exports.sessionRemoved = sessionRemoved;
exports.sessionTrackEnded = sessionTrackEnded;
exports.sessionTrackReplaced = sessionTrackReplaced;
var _isEmpty2 = _interopRequireDefault(__webpack_require__(4499));
var actionTypes = _interopRequireWildcard(__webpack_require__(1997));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Call plugin.

// Libraries.

function sessionActionHelper(type, id) {
  let payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let meta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const action = {
    type,
    payload: {
      ...payload,
      id
    }
  };

  // Only have meta and error properties on the action if they're needed.
  if (!(0, _isEmpty2.default)(meta)) {
    action.meta = meta;
  }
  if (payload.error) {
    action.error = true;
  }
  return action;
}
function sessionAdded(id, params) {
  return sessionActionHelper(actionTypes.SESSION_ADDED, id, params);
}
function sessionRemoved(id, params) {
  return sessionActionHelper(actionTypes.SESSION_REMOVED, id, params);
}
function sessionNewTrack(id, params) {
  return sessionActionHelper(actionTypes.SESSION_NEW_TRACK, id, params);
}
function sessionTrackEnded(id, params) {
  return sessionActionHelper(actionTypes.SESSION_TRACK_ENDED, id, params);
}
function sessionTrackReplaced(id, params) {
  return sessionActionHelper(actionTypes.SESSION_TRACK_REPLACED, id, params);
}
function sessionIceConnectionStateChange(id, params) {
  return sessionActionHelper(actionTypes.SESSION_ICE_CONNECTION_STATE_CHANGE, id, params);
}
function sessionIceGatheringStateChange(id, params) {
  return sessionActionHelper(actionTypes.SESSION_ICE_GATHERING_STATE_CHANGE, id, params);
}
function sessionIceCandidateCollected(id, params) {
  return sessionActionHelper(actionTypes.SESSION_ICE_CANDIDATE_COLLECTED, id, params);
}
function sessionIceCollectionScheduledCheck(id, params) {
  return sessionActionHelper(actionTypes.SESSION_ICE_COLLECTION_SCHEDULED_CHECK, id, params);
}

/*
 * Action to signify that an audio file has ended. Dispatched at the end of the
 *    `insertAudio` Session method.
 */
function sessionAudioEnded(id, params) {
  return {
    type: actionTypes.SESSION_AUDIO_ENDED,
    payload: {
      id,
      ...params
    },
    error: Boolean(params.error)
  };
}

/***/ }),

/***/ 7524:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.muteTracks = muteTracks;
exports.muteTracksFinish = muteTracksFinish;
exports.removeTracks = removeTracks;
exports.removeTracksFinish = removeTracksFinish;
exports.renderTracks = renderTracks;
exports.renderTracksFinish = renderTracksFinish;
exports.trackAdded = trackAdded;
exports.trackRemoved = trackRemoved;
exports.trackSourceMuted = trackSourceMuted;
exports.trackSourceUnmuted = trackSourceUnmuted;
exports.unmuteTracks = unmuteTracks;
exports.unmuteTracksFinish = unmuteTracksFinish;
var actionTypes = _interopRequireWildcard(__webpack_require__(1997));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Call plugin.

function trackManagerHelper(type, trackId) {
  let payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let meta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return {
    type,
    payload: {
      ...payload,
      trackId
    },
    meta
  };
}
function trackAdded(trackId, params) {
  return trackManagerHelper(actionTypes.TRACK_ADDED, trackId, params);
}
function trackRemoved(trackId, params) {
  return trackManagerHelper(actionTypes.TRACK_REMOVED, trackId, params);
}
function trackHelper(type) {
  let payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const action = {
    type,
    payload,
    meta
  };
  if (payload.error) {
    action.error = true;
  }
  return action;
}
function muteTracks(trackIds) {
  return trackHelper(actionTypes.MUTE_TRACKS, trackIds);
}
function muteTracksFinish(trackIds, params) {
  return trackHelper(actionTypes.MUTE_TRACKS_FINISH, {
    trackIds: trackIds,
    ...params
  });
}
function unmuteTracks(trackIds) {
  return trackHelper(actionTypes.UNMUTE_TRACKS, trackIds);
}
function unmuteTracksFinish(trackIds, params) {
  return trackHelper(actionTypes.UNMUTE_TRACKS_FINISH, {
    trackIds: trackIds,
    ...params
  });
}
function trackSourceMuted(trackIds, params) {
  return trackHelper(actionTypes.TRACK_SOURCE_MUTED, {
    trackIds: trackIds,
    ...params
  });
}
function trackSourceUnmuted(trackIds, params) {
  return trackHelper(actionTypes.TRACK_SOURCE_UNMUTED, {
    trackIds: trackIds,
    ...params
  });
}
function renderTracks(trackIds, params) {
  return trackHelper(actionTypes.RENDER_TRACKS, {
    trackIds,
    ...params
  });
}
function renderTracksFinish(trackIds, params) {
  return trackHelper(actionTypes.RENDER_TRACKS_FINISH, {
    trackIds,
    ...params
  });
}
function removeTracks(trackIds, params) {
  return trackHelper(actionTypes.REMOVE_TRACKS, {
    trackIds,
    ...params
  });
}
function removeTracksFinish(trackIds, params) {
  return trackHelper(actionTypes.REMOVE_TRACKS_FINISH, {
    trackIds,
    ...params
  });
}

/***/ }),

/***/ 1709:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TRACK_SOURCE_UNMUTED = exports.TRACK_SOURCE_MUTED = exports.TRACK_RENDERED = exports.TRACK_ENDED = exports.TRACKS_UNMUTED = exports.TRACKS_MUTED = exports.INITIALIZE_DEVICES_ERROR = exports.DEVICES_CHANGED = void 0;
/**
 * The media devices available for use have changed.
 *
 * Information about the available media devices can be retrieved using the
 *    {@link media.getDevices} API.
 *
 * @public
 * @static
 * @memberof media
 * @event devices:change
 * @example
 * // Listen for changes to available media devices.
 * client.on('devices:change', function () {
 *    // Retrieve the latest media device lists.
 *    const devices = client.media.getDevices()
 * })
 */
const DEVICES_CHANGED = exports.DEVICES_CHANGED = 'devices:change';

/**
 * An error occurred while trying to access media devices.
 *
 * The most common causes of this error are when the browser does not have
 *    permission from the end-user to access the devices, or when the browser
 *    cannot find a media device that fulfills the
 *    {@link call.MediaConstraint MediaConstraint(s)} that was provided.
 *
 * @public
 * @static
 * @memberof media
 * @event devices:error
 * @param {Object} params
 * @param {Error} params.error The Basic error object.
 */
const INITIALIZE_DEVICES_ERROR = exports.INITIALIZE_DEVICES_ERROR = 'devices:error';

/**
 * The specified Tracks have been muted.
 *
 * A Track can be muted using the {@link media.muteTracks} API.
 * @public
 * @memberof media
 * @event media:muted
 * @param {Object} params
 * @param {Array<string>} params.tracks The list of Tracks that were muted.
 */
const TRACKS_MUTED = exports.TRACKS_MUTED = 'media:muted';

/**
 * The specified Tracks have been unmuted.
 *
 * A Track can be unmuted using the {@link media.unmuteTracks}
 *    API.
 * @public
 * @memberof media
 * @event media:unmuted
 * @param {Object} params
 * @param {Array<string>} params.tracks The list of Tracks that were unmuted.
 */
const TRACKS_UNMUTED = exports.TRACKS_UNMUTED = 'media:unmuted';

/**
 * The specified Track has had its media source muted.
 *
 * The Track is still active, but is not receiving media any longer. An audio
 *    track will be silent and a video track will be a black frame. It is
 *    possible for the track to start receiving media again (see the
 *    {@link media.event:media:sourceUnmuted media:sourceUnmuted} event).
 *
 * This event is generated outside the control of the SDK. This will predominantly
 *    happen for a remote track during network issues, where media will lose frames
 *    and be "choppy". This may also happen for a local track if the browser or
 *    end-user stops allowing the SDK to access the media device, for example.
 * @public
 * @static
 * @memberof media
 * @event media:sourceMuted
 * @param {Object} params
 * @param {string} params.trackId The track that is affected as a result of media source being muted.
 */
const TRACK_SOURCE_MUTED = exports.TRACK_SOURCE_MUTED = 'media:sourceMuted';

/**
 * The specified Track has started receiving media from its source once again.
 *
 * The Track returns to the state before it was muted (see the
 *    {@link media.event:media:sourceMuted media:sourceMuted} event), and will
 *    be able to display video or play audio once again.
 *
 * This event is generated outside the control of the SDK, when the cause of the
 *    media source being muted had been undone.
 * @public
 * @static
 * @memberof media
 * @event media:sourceUnmuted
 * @param {Object} params
 * @param {string} params.trackId The track that is affected as a result of media source being unmuted.
 */
const TRACK_SOURCE_UNMUTED = exports.TRACK_SOURCE_UNMUTED = 'media:sourceUnmuted';

/**
 * The specified Track has been rendered into an element.
 *
 * @public
 * @static
 * @memberof media
 * @event media:trackRendered
 * @param {Object} params
 * @param {Array<string>} params.trackIds The list of track id's that were rendered.
 * @param {string} params.selector The css selector used to identify the element the track is rendered into.
 * @param {api.BasicError} [params.error] An error object, if the operation was not successful.
 */
const TRACK_RENDERED = exports.TRACK_RENDERED = 'media:trackRendered';

/**
 * A local Track has ended unexpectedly. The Track may still be part of a Call but
 *    has become disconnected from its media source and is not recoverable.
 *
 * This event is emitted when an action other than an SDK operation stops the
 *    track. The most comon scenarios are when a device being used for a Call
 *    disconnects, any local tracks (such as audio from a bluetooth headset's
 *    microphone or video from a USB camera) from that device will be ended.
 *    Another scenario is for screensharing, where some browsers provide the
 *    ability to stop screensharing directly rather than through an SDK operation.
 *
 * When a local track ends this way, it will still be part of the Call but will
 *    not have any media. The track can be removed from the call with the
 *    {@link call.removeMedia} API so the remote side of the Call knows the track
 *    has stopped, or the track can be replaced with a new track using the
 *    {@link call.replaceTrack} API to prevent any interruption.
 * @public
 * @static
 * @memberof media
 * @event media:trackEnded
 * @param {Object} params
 * @param {Object} params.trackId The Track that has ended.
 * @param {Object} params.callId The ID of the Call the Track is used in.
 */
const TRACK_ENDED = exports.TRACK_ENDED = 'media:trackEnded';

/***/ }),

/***/ 6937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.jsonChannel = jsonChannel;
exports.replyChannel = replyChannel;
__webpack_require__(7107);
var _logs = __webpack_require__(9932);
// Other plugins.

const log = _logs.logManager.getLogger('CHANNEL');

/**
 * Converts a channel's send and receive to serialize messages in JSON before sending and after receiving.
 *
 * @param {Object} innerChannel The channel to convert
 */
function jsonChannel(innerChannel) {
  const jsonChannel = {
    receive: undefined,
    send(message) {
      try {
        innerChannel.send(JSON.stringify(message));
      } catch (err) {
        log.error('Failed to send JSON message over channel: ', err);
      }
    }
  };
  innerChannel.receive = function receiveJSONMessage(message) {
    try {
      if (jsonChannel.receive) {
        jsonChannel.receive(JSON.parse(message));
      }
    } catch (err) {
      log.error('Failed to receive JSON message on channel: ', err);
    }
  };
  return jsonChannel;
}

/**
 * Converts a channel with only `send` and `receive` functionality into one that
 *    also has `reply` functionality.
 * This is required by the Proxy Plugin to convert asynchronous code into
 *    synchronous code. The Proxy needs to return a value synchronously when
 *    sending data over the channel.
 * @method replyChannel
 * @param  {Object} channel
 * @return {Object} The same channel, but with a `reply` method as well.
 */
function replyChannel(channel) {
  /**
   * Track sent messages by their ID.
   * @type {Object}
   */
  const sentMessages = {};
  channel.receive = function receiveMessage(message) {
    const {
      messageId,
      data
    } = message;

    // Determine how the message needs to be handled.
    if (messageId && sentMessages[messageId]) {
      if (sentMessages[messageId].isExpired) {
        // If the reply came after the time-out, ignore the message.
        log.debug(`Received reply from timed-out message ${messageId}. Ignoring.`);
        delete sentMessages[messageId];
      } else {
        // If the message has an ID from a sent message, then it is a reply to
        //    that message. Resolve the promise associated with it.
        log.debug(`Received reply from message ${messageId}.`);
        sentMessages[messageId].resolve(data);
      }
    } else if (messageId && !sentMessages[messageId]) {
      // If the message has an ID that we don't know about, then the application
      //    will need to handle it.
      if (api.receive) {
        log.debug(`Received new message ${messageId}.`);
        api.receive(messageId, data);
      } else {
        log.error('No listener set for handling received messages.', data);
      }
    } else {
      // If the message didn't have an ID, then it wasn't from our test channel.
      log.warn('Received message without an ID on the channel; ignoring.', message);
    }
  };

  /*
   * The interface that the Proxy Plugin will use.
   */
  const api = {};

  /**
   * Send a message over the channel.
   * @method send
   * @param {string} messageId A unique ID to track the sent message.
   * @param {Object} data
   * @param {Function} [callback] Function called when a reply is received.
   */
  api.send = (messageId, data, callback) => {
    if (sentMessages[messageId]) {
      // The ID has already been used for sending a message.
      callback(null, new Error('Cannot send message; ID already used.'));
      return;
    }

    // Attach a messageId to the message.
    // This lets the remote side reply to this message by using the messageId.
    const message = {
      data,
      messageId
    };
    if (callback) {
      // If there is a callback function, then a reply is expected.
      // Wrap `send` is a promise so that we can correlate receiving a reply
      //    to the callback.
      new Promise(resolve => {
        // Race receiving the reply against a time-out.
        // 12s was chosen to be slightly longer than a valid WebRTC operation
        //    timeout (collecting ICE candidates can take 10s).
        const timeoutId = setTimeout(() => {
          log.debug(`Message ${messageId} timed-out. Failing operation.`);
          sentMessages[messageId].isExpired = true;
          callback(null, new Error('Operation timed-out; no reply from other side of channel.'));
        }, 12000);

        // Store `resolve` so we can call it call it when we receive a reply.
        sentMessages[messageId] = {
          resolve,
          timeoutId,
          isExpired: false
        };

        // Send the message over the channel.
        log.debug(`Sending new message ${messageId} with reply expected.`);
        channel.send(message);
      }).then(data => {
        // The message received a reply, so remove the reference.
        clearTimeout(sentMessages[messageId].timeoutId);
        delete sentMessages[messageId];
        if (typeof callback === 'function') {
          callback(data);
        }
      });
    } else {
      // Send the message over the channel.
      log.debug(`Sending new message ${messageId}.`);
      channel.send(message);
    }
  };

  /**
   * Listener for receiving a message from the channel.
   * @method receive
   * @param {string} messageId
   * @param {Object} data
   */
  // eslint-disable-next-line
  api.receive = undefined;

  /**
   * Send a reply to a specific received message over the channel.
   * @method reply
   * @param {string} messageId
   * @param {Object} data
   */
  api.reply = (messageId, data) => {
    // Attach the messageId to the message.
    const message = {
      data,
      messageId
    };
    log.debug(`Replying to message ${messageId}.`);
    channel.send(message);
  };
  return api;
}

/***/ }),

/***/ 3779:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = deviceManager;
/**
 * Device Manager "converter".
 * Receives a webRTC command intended for the Device Manager, performs the webRTC
 *\
 \
 *    operation and returns/resolves a proxy response.
 * @method deviceManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function deviceManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.devices;
  if (operation === 'setupDeviceInitialization') {
    try {
      const devices = await manager.setupDeviceInitialization(...params);
      return devices;
    } catch (err) {
      let error = {
        name: err.name,
        message: err.message,
        error: true
      };
      if (err.name === 'OverconstrainedError' && err.constraint) {
        error = {
          ...error,
          constraint: err.constraint
        };
      }
      return error;
    }
  } else {
    // General case: Don't convert the return.
    return manager[operation](...params);
  }
}

/***/ }),

/***/ 2046:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convertLogger = convertLogger;
exports.convertMedia = convertMedia;
exports.convertSession = convertSession;
exports.convertTrack = convertTrack;
exports["default"] = convertCommand;
var _deviceManager = _interopRequireDefault(__webpack_require__(3779));
var _mediaManager = _interopRequireDefault(__webpack_require__(1119));
var _sessionManager = _interopRequireDefault(__webpack_require__(4503));
var _trackManager = _interopRequireDefault(__webpack_require__(3550));
var _logManager = _interopRequireDefault(__webpack_require__(6561));
var _webrtcManager = _interopRequireDefault(__webpack_require__(6422));
var _renderer = _interopRequireDefault(__webpack_require__(2831));
var _media = _interopRequireDefault(__webpack_require__(2802));
var _session = _interopRequireDefault(__webpack_require__(5066));
var _track = _interopRequireDefault(__webpack_require__(7921));
var _logger = _interopRequireDefault(__webpack_require__(7740));
var _logs = __webpack_require__(9932);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Proxy plugin.

// Other plugins.

const log = _logs.logManager.getLogger('PROXY');

// Converters for the webRTC managers.
const managers = {
  media: _mediaManager.default,
  sessionManager: _sessionManager.default,
  track: _trackManager.default,
  devices: _deviceManager.default,
  logs: _logManager.default,
  webrtcManager: _webrtcManager.default,
  renderer: _renderer.default
};

// Converters for the webRTC models.
const models = {
  media: _media.default,
  session: _session.default,
  track: _track.default,
  logger: _logger.default
};

/**
 * Forwards a webRTC command to the appropriate "converter".
 * The converter will perform the webRTC operation and return
 *    a response that can be returned over the channel.
 * @method convertCommand
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command The webRTC command.
 * @return {Promise} Promise resolving with the operation result.
 */
function convertCommand(webRTC, command) {
  if (command.id === 'manager') {
    // Forward the command to the appropriate manager converter.
    log.debug(`Performing ${command.modelType} manager operation ${command.operation}.`, command.params);
    const result = managers[command.modelType](webRTC, command);

    // The result is a Promise. Add a .then for debugging after it completes.
    result.then(data => {
      log.debug(`Completed ${command.modelType} manager operation ${command.operation}.`, data);
    });
    return result;
  } else {
    // Forward the command to the appropriate model converter.
    log.debug(`Performing ${command.modelType} model operation ${command.operation}.`, command.params);
    const result = models[command.modelType](webRTC, command);

    // The result is a Promise. Add a .then for debugging after it completes.
    result.then(data => {
      log.debug(`Completed ${command.modelType} model operation ${command.operation}.`, data);
    });
    return result;
  }
}

/**
 * Converts a Track object into a serializable object
 *    that the Proxy Plugin can use.
 * @method convertTrack
 * @param  {Track} track
 * @return {Object}  A serializable object.
 */
function convertTrack(track) {
  if (track) {
    return {
      modelType: 'track',
      ...track.getState()
    };
  }
}

/**
 * Converts a Media object into something that can be
 *    returned over the channel.
 * @method convertMedia
 * @param {Media} media
 * @return {Object} A serializable object.
 */
function convertMedia(media) {
  if (media) {
    return {
      modelType: 'media',
      id: media.id
    };
  }
}

/**
 * Converts a Session object into a serializable object
 *    that the Proxy Plugin can use.
 * @method convertSession
 * @param  {Session} session
 * @return {Object}  A serializable object.
 */
function convertSession(session) {
  if (session) {
    const sessionState = session.getState();
    return {
      modelType: 'session',
      ...sessionState,
      localTracks: sessionState.localTracks.map(convertTrack),
      allLocalTracks: sessionState.allLocalTracks.map(convertTrack),
      remoteTracks: sessionState.remoteTracks.map(convertTrack)
    };
  }
}

/**
 * Converts a Logger object into a serializable object.
 * @method convertLogger
 * @param  {Logger} logger A WebRTC logger.
 * @return {Object}  A serializable object.
 */
function convertLogger(logger) {
  if (logger) {
    return {
      modelType: 'logger',
      // Use the name as the unique Logger ID (which is what it is).
      id: logger.name
    };
  }
}

/***/ }),

/***/ 6561:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = logManager;
var _index = __webpack_require__(2046);
/**
 * Log Manager "converter".
 * Defines how received Log Manager commands are performed, and how any data is
 *    returned over the channel (if needed).
 * @method logManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the operation has completed.
 */
async function logManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.logs;

  // Handle different APIs differently, depending on what they return.
  if (operation === 'getLogger') {
    const logger = manager.getLogger(...params);
    return (0, _index.convertLogger)(logger);
  } else if (operation === 'getLoggers') {
    const loggers = manager.getLoggers(...params);
    return loggers.map(_index.convertLogger);
  } else if (operation === 'getHandler') {
    // We can't send a function over the channel; return nothing.
    return undefined;
  } else if (operation === 'setLevel') {
    // Set the level on the LogManager itself.
    manager.setLevel(...params);

    // Signature was either setLevel(type, level) or setLevel(level).
    const level = params[1] || params[0];
    // Set the level on all already-created Loggers.
    manager.getLoggers().forEach(logger => logger.setLevel(level));
  } else {
    // General case: Don't convert the return.
    return manager[operation](...params);
  }
}

/***/ }),

/***/ 7740:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = logger;
var _logs = __webpack_require__(9932);
/**
 * Logger "converter".
 *
 * Defines how received Logger commands are performed, and how any data is
 *    returned over the channel (if needed).
 * @method logger
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the Logger operation has completed.
 */
async function logger(webRTC, command) {
  const {
    id,
    operation,
    params
  } = command;

  /**
   * Special-case: If the operation is for the PROXY or CHANNEL Logger, that is
   *    actually the Remote SDK's own Logger, not the WebRTC stack's Logger.
   */
  if (id === 'PROXY' || id === 'CHANNEL') {
    // Get the logger from the SDK's log manager.
    const logger = _logs.logManager.getLogger(id);
    return logger[operation](...params);
  }

  // Get the logger from the WebRTC Stack's log manager.
  const logger = webRTC.managers.logs.getLogger(id);
  if (operation === 'getHandler') {
    // We can't send a function over the channel; return nothing.
    return undefined;
  } else {
    // General case: Don't convert the return.
    return logger[operation](...params);
  }
}

/***/ }),

/***/ 2802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = media;
var _index = __webpack_require__(2046);
/**
 * Media "converter".
 * Receives webRTC commands intended for a Media object.
 * Converts the command into the actual operation, and converts
 *    the operation's return value into a format that the Proxy
 *    Stack can use.
 * @method media
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function media(webRTC, command) {
  const {
    id,
    operation,
    params
  } = command;
  const media = webRTC.managers.media.get(id);
  if (!media) {
    // Media not found.
    return;
  }
  if (operation === 'getTracks') {
    return media.getTracks().map(_index.convertTrack);
  } else {
    // General case: Don't convert the return.
    return media[operation](...params);
  }
}

/***/ }),

/***/ 1119:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = mediaManager;
exports.stringifyError = stringifyError;
var _index = __webpack_require__(2046);
function stringifyError(err) {
  // Convert the Error into a format that can be stringified for the channel.
  //    This will need to be reconstructed on the other side.
  let error = {
    name: err.name,
    message: err.message
  };
  if (err.name === 'OverconstrainedError' && err.constraint) {
    error = {
      ...error,
      constraint: err.constraint
    };
  }
  return {
    error
  };
}

/**
 * Media Manager "converter".
 * Receives a webRTC command intended for the Media Manager, performs the webRTC
 *    operation and returns/resolves a proxy response.
 * @method mediaManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function mediaManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.media;

  // Handle different APIs differently, depending on what they return.
  if (operation === 'get') {
    const media = manager.get(...params);
    return (0, _index.convertMedia)(media);
  } else if (operation === 'createLocal') {
    try {
      const media = await manager.createLocal(...params);
      return (0, _index.convertMedia)(media);
    } catch (err) {
      return stringifyError(err);
    }
  } else if (operation === 'createLocalScreen') {
    try {
      const media = await manager.createLocalScreen(...params);
      return (0, _index.convertMedia)(media);
    } catch (err) {
      return stringifyError(err);
    }
  } else {
    // General case: Don't convert the return.
    return manager[operation](...params);
  }
}

/***/ }),

/***/ 2831:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rendererManager;
/**
 * Rendering Manager "converter".
 * Receives a webRTC command intended for the Renderer, performs the webRTC
 *    operation and returns/resolves a proxy response.
 * @method rendererManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function rendererManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.renderer;
  if (operation === 'renderTrack') {
    // Get the actual Track object using the serialized-track object.
    const track = webRTC.managers.track.get(params[0].id);
    if (track) {
      return manager.renderTrack(track, params[1], params[2]);
    }
  } else {
    // General case: Don't convert the return.
    return manager[operation](...params);
  }
}

/***/ }),

/***/ 5066:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = session;
/**
 * Session "converter".
 * Receives webRTC commands intended for a Session object.
 * Converts the command into the actual operation, and converts
 *    the operation's return value into a format that the Proxy
 *    Stack can use.
 * @method session
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function session(webRTC, command) {
  const {
    id,
    operation,
    params
  } = command;
  const session = webRTC.managers.sessionManager.get(id);
  if (!session) {
    // Session not found.
    return;
  }
  if (operation === 'addTracks') {
    const trackIds = params[0].map(track => track.id);
    const tracks = webRTC.managers.track.getTracks(trackIds);
    const dscpTrackMapping = params.length === 2 ? params[1] : {};
    return session.addTracks(tracks, dscpTrackMapping);
  }
  if (operation === 'getStats') {
    const getStats = session.getStats(...params);
    return getStats.then(stats => Array.from(stats.entries()));
  }

  // General case: Don't convert the return.
  return session[operation](...params);
}

/***/ }),

/***/ 4503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = sessionManager;
var _index = __webpack_require__(2046);
var _mediaManager = __webpack_require__(1119);
/**
 * Session Manager "converter".
 * Receives webRTC commands intended for the Session Manager.
 * Converts the command into the actual operation, and converts
 *    the operation's return value into a format that the Proxy
 *    Stack can use.
 * @method sessionManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function sessionManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.sessionManager;

  // Handle different APIs differently, depending on what they return.
  if (operation === 'create') {
    const session = manager.create(...params);
    return (0, _index.convertSession)(session);
  } else if (operation === 'get') {
    const session = manager.get(...params);
    return (0, _index.convertSession)(session);
  } else if (operation === 'getAll') {
    const sessions = manager.getAll(...params);
    return sessions.map(_index.convertSession);
  } else if (operation === 'getWithMedia') {
    try {
      const objs = await manager.getWithMedia(...params);
      return {
        modelType: 'multiple',
        session: (0, _index.convertSession)(objs.session),
        medias: objs.medias.map(_index.convertMedia)
      };
    } catch (err) {
      return (0, _mediaManager.stringifyError)(err);
    }
  } else {
    // General case: Don't convert the return.
    return manager[operation](...params);
  }
}

/***/ }),

/***/ 7921:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = track;
/**
 * Track "converter".
 * Receives webRTC commands intended for a Track object.
 * Handles performing the operation and converting the operation's
 *    return value into a format the Proxy Stack can use.
 * @method track
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function track(webRTC, command) {
  const {
    id,
    operation,
    params
  } = command;
  const track = webRTC.managers.track.get(id);
  if (!track) {
    // Track not found.
    return;
  }

  // Handle different APIs differently, depending on what they return.
  if (operation === 'getContainers') {
    return track.getContainers().map(ele => ele.id);
  } else {
    // General case: Don't handle the return.
    return track[operation](...params);
  }
}

/***/ }),

/***/ 3550:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = trackManager;
var _index = __webpack_require__(2046);
/**
 * Track Manager "converter".
 * Receives webRTC commands intended for the Track Manager.
 * Converts the command into the actual operation, and converts
 *    the operation's return value into a format that the Proxy
 *    Stack can use.
 * @method trackManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function trackManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.track;

  // Handle different APIs differently, depending on what the return.
  if (operation === 'get') {
    const track = manager.get(...params);
    return (0, _index.convertTrack)(track);
  } else if (operation === 'getTracks') {
    const tracks = manager.getTracks(...params);
    return tracks.map(_index.convertTrack);
  } else {
    // General case: Don't convert the return.
    return manager[operation](...params);
  }
}

/***/ }),

/***/ 6422:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = webrtcManager;
/**
 * WebRTC Manager "converter".
 * Receives a webRTC command intended for the WebRTC Manager, performs the webRTC
 *    operation and returns/resolves a proxy response.
 * @method webrtcManager
 * @param {Object} webRTC The local webRTC stack.
 * @param {Object} command A webRTC command.
 * @return {Promise} Resolves when the webRTC operation has completed.
 */
async function webrtcManager(webRTC, command) {
  const {
    operation,
    params
  } = command;
  const manager = webRTC.managers.webrtcManager;

  // General case: Don't convert the return.
  return manager[operation](...params);
}

/***/ }),

/***/ 7216:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = clientProxy;
var _converters = _interopRequireDefault(__webpack_require__(2046));
var _webrtcEvents = _interopRequireDefault(__webpack_require__(1336));
var _channel = __webpack_require__(6937);
var _logs = __webpack_require__(9932);
var _version = __webpack_require__(719);
var _errors = _interopRequireWildcard(__webpack_require__(5412));
var _uuid = __webpack_require__(4596);
var _kandyWebrtc = _interopRequireDefault(__webpack_require__(7654));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Proxy Plugin.

// Other plugins.

// Libraries.

const log = _logs.logManager.getLogger('PROXY');

/**
 * The Remote SDK's Proxy module provides the connection point for the remote end of the channel. After being provide with a channel, the Remote SDK will use it to receive and reply to messages from the main SDK on the other end.
 *
 * @public
 * @module Proxy
 */

/**
 * The Channel object that needs to be provided to the the Proxy module.
 *
 * @public
 * @module Channel
 * @example
 * // The channel the application uses for communicating with a remote endpoint.
 * const appChannel = ...
 *
 * // The channel the application will provide to the Proxy module for use.
 * const channel = {
 *    send: function (data) {
 *      // Any encoding / wrapping needed for a Proxy message being sent
 *      //    over the channel.
 *      appChannel.sendMessage(data)
 *    },
 *    // The Proxy module will set this function.
 *    receive: undefined
 * }
 * appChannel.on('message', data => {
 *    // Any decoding / unwrapping needed for the received message.
 *    channel.receive(data)
 * })
 *
 * client.proxy.setChannel(channel)
 */

/**
 * Creates the Client side of the Proxy.
 * The Client Proxy handles the remote side of the proxy channel. It contains
 *    the local webRTC stack, and is provided a channel by the application. It
 *    handles receiving SDK messages from the channel and performing any
 *    webRTC operations needed (and replying).
 * @method clientProxy
 * @return {Object} The Client Proxy.
 */
function clientProxy() {
  const base = {
    // Whether the Client Proxy is ready for use.
    isReady: false,
    // The local webRTC stack.
    webRTC: _kandyWebrtc.default,
    // The channel to use for proxying operations.
    channel: undefined
  };

  /*
   * The interface for an application to use the Client Proxy.
   */
  const api = {};

  /**
   * Provides the Channel to the Remote SDK.
   * The SDK will use this channel to communicate with the main SDK.
   * @public
   * @memberof Proxy
   * @method setChannel
   * @param {Channel} channel See the `Channel` module for information.
   */
  api.setChannel = channel => {
    log.debug(`${_logs.API_LOG_TAG}proxy.setChannel`);
    const remoteVersion = (0, _version.getVersion)();
    base.channel = (0, _channel.replyChannel)((0, _channel.jsonChannel)(channel));
    base.channel.receive = (id, data) => {
      /*
       * Expected message types:
       *    - initialize command
       *    - webrtc command
       */
      if (data.initialize) {
        /*
         * Initialization message received.
         *    - if Remote SDK is already initialized, then respond with an error.
         *    - if Remote SDK is not initialized, then initialize it.
         */
        if (base.isReady) {
          log.warn('Local WebRTC stack is already initialized; responding as error.');
          const response = {
            initialized: true,
            error: new _errors.default({
              code: _errors.proxyCodes.INVALID_STATE,
              message: 'Remote SDK has already been initialized.'
            })
          };
          base.channel.reply(id, response);
        } else {
          log.info('Initializing local webRTC stack.', data.config);
          log.info(`SDK version received from remote end: ${data.version}.`);
          if (data.version !== remoteVersion) {
            // Make sure the two SDKs have the same version.
            log.error('SDK versions do not match; initialization failed.');
            const response = {
              initialized: false,
              remoteVersion,
              error: new _errors.default({
                code: _errors.proxyCodes.VERSION_MISMATCH,
                message: 'SDK versions do not match; initialization failed.'
              })
            };
            base.channel.reply(id, response);
            return;
          }
          base.webRTC = base.webRTC(data.config);

          // Set the initial log levels if they were provided.
          if (data.logLevels) {
            const {
              WEBRTC,
              PROXY,
              CHANNEL
            } = data.logLevels;
            // Set the log level in the WebRTC stack's Log Manager.
            base.webRTC.managers.logs.setLevel(WEBRTC);
            // Also set the log level in the Remote SDK's PROXY logger.
            log.setLevel(PROXY);
            // Also also set the log level in the Remote SDK's CHANNEL logger.
            _logs.logManager.getLogger('CHANNEL').setLevel(CHANNEL);
          }
          base.isReady = true;

          /*
           * Setup listeners for events from the Webrtc-stack. If the events are
           *    actions (and events), we need to send them across the channel to
           *    be handled by the SDK. The function passed-in is the "remote side"
           *    of the `contextHelper` for how the SDK should handle Webrtc-stack
           *    events. The "local side" of this handler is defined in the
           *    WebrtcProxy operations.
           */
          (0, _webrtcEvents.default)(base.webRTC, (action, event) => {
            // When an event is received (and has already been parsed into an
            //    action), send it over the channel.
            if (typeof action === 'object' && action.type) {
              // Make sure that the action is an actual action, though.
              log.info(`Sending event over channel: ${action.type}.`);
              const messageId = (0, _uuid.v4)().substring(0, 8);
              base.channel.send(messageId, {
                action,
                event
              });
            } else {
              log.debug('Proxy event listeners received unexpected format; ignoring.', action);
            }
          });

          // When responding to the initialize command, include browser details.
          const browser = base.webRTC.getBrowserDetails();
          log.info(`Browser details: ${browser.browser}, version ${browser.version}.`);
          if (api.onInit) {
            api.onInit(base.webRTC);
          }
          base.channel.reply(id, {
            initialized: true,
            browser,
            remoteVersion
          });
          log.info('Finished initializing local webRTC stack.');
        }
      } else if (isWebrtcCommand(data)) {
        /*
         * Webrtc command received.
         *    - if Remote SDK is initialized, process it.
         *    - if not inititalized, respond with an error.
         */
        if (base.isReady) {
          const startOpTime = Date.now();
          log.info(`Received ${data.modelType} ${data.operation} operation, performing...`);
          // WebRTC operations may be async. Need to ensure that
          //    they finish before replying to the command.
          (0, _converters.default)(base.webRTC, data).then(result => {
            log.info(`Finished ${data.modelType} ${data.operation} operation in, replying with result.`);

            // Create a reply and include the original result with timing data.
            const reply = {
              result,
              opTiming: {
                start: startOpTime,
                end: Date.now()
              }
            };
            base.channel.reply(id, reply);
          });
        } else {
          log.info('Client not ready! Still needs to be initialized.');
          base.channel.reply(id, {
            initialized: false,
            error: new _errors.default({
              code: _errors.proxyCodes.INVALID_STATE,
              message: 'Remote client not initialized.'
            })
          });
        }
      } else {
        /*
         * Unknown message received. Respond with an error.
         */
        log.error('Unknown data format; ignoring.', data);
        base.channel.reply(id, {
          data,
          remoteVersion,
          error: new _errors.default({
            message: 'Unknown format.',
            code: _errors.proxyCodes.UNKNOWN
          })
        });
      }
    };
  };

  /**
   * Retrieves the current channel being used.
   * @method getChannel
   * @return {Channel}
   */
  api.getChannel = () => {
    log.debug(`${_logs.API_LOG_TAG}proxy.getChannel`);
    return base.channel;
  };

  /**
   * Sends data, over the channel, to the remote side.
   * @method send
   * @param {Any} args Depends on channel used.
   */
  api.send = function () {
    log.debug(`${_logs.API_LOG_TAG}proxy.send`);
    if (base.channel && base.channel.send) {
      base.channel.send(...arguments);
    } else {
      log.error('Cannot send without a channel to use.');
    }
  };

  /**
   * Listener for the webRTC stack is initialized.
   * @method onInit
   * @param {Object} webRTC The initialized webRTC stack.
   */
  api.onInit = undefined;
  return api;
}

/**
 * Ensures that an object represents a webRTC command.
 * @method isWebrtcCommand
 * @param {Object} data
 * @return {boolean}
 */
function isWebrtcCommand(data) {
  return data.modelType && data.id && data.operation;
}

/***/ }),

/***/ 6880:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setupEvents;
var _eventEmitter = _interopRequireDefault(__webpack_require__(5422));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Sets up an Event Emitter for the Remote SDK.
 * @method setupEvents
 * @return {Emitter}
 */
function setupEvents() {
  const emitter = (0, _eventEmitter.default)();

  /**
   * Sets up listeners for webRTC events.
   * @method setWebrtcListeners
   * @param  {Object} webRTC The initialized webRTC stack.
   */
  function setWebrtcListeners(webRTC) {
    const mediaMan = webRTC.managers.media;
    const deviceMan = webRTC.managers.devices;

    /**
     * Media devices available for use have changed.
     * Use the {@link media.getDevices} API to retrieve the lists of devices.
     * @public
     * @memberof media
     * @event devices:change
     * @param {Object} params
     * @param {Array<string>}  microphone The list of available audio input devices.
     * @param {Array<string>}  camera     The list of available video input devices.
     * @param {Array<string>}  speaker    The list of available audio output devices.
     * @example
     * // Listen for changes to available media devices.
     * remoteClient.on('devices:change', function () {
     *    // Retrieve the latest media device lists.
     *    const devices = remoteClient.media.getDevices()
     * })
     */
    deviceMan.on('change', () => {
      deviceMan.checkDevices().then(devices => {
        emitter.emit('devices:change', devices);
      });
    });

    /**
     * A new Media object is available.
     * It may represent either the local or remote media for a call.
     * @public
     * @memberof media
     * @event media:new
     * @param {Object} params
     * @param {string} params.mediaId The ID of the new Media object.
     */
    mediaMan.on('media:new', mediaId => {
      const media = mediaMan.get(mediaId);

      /**
       * A new Track object is available.
       * The Track will be within a Media object that is already available.
       * @public
       * @memberof media
       * @event track:new
       * @param {Object} params
       * @param {string} params.trackId The ID of the new Track object.
       * @param {string} params.mediaId The ID of the Media object the Track belongs to.
       */
      media.on('track:new', _ref => {
        let {
          mediaId,
          trackId
        } = _ref;
        emitter.emit('track:new', {
          mediaId,
          trackId
        });
      });
      emitter.emit('media:new', mediaId);
    });

    /**
     * An existing Media object has stopped being available.
     * @public
     * @memberof media
     * @event media:removed
     * @param {Object} params
     * @param {string} params.mediaId The ID of the removed Media object.
     */
    mediaMan.on('media:removed', mediaId => {
      emitter.emit('media:removed', {
        mediaId
      });
    });
  }
  return {
    ...emitter,
    setWebrtcListeners
  };
}

/***/ }),

/***/ 3629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _clientProxy = _interopRequireDefault(__webpack_require__(7216));
var mediaApis = _interopRequireWildcard(__webpack_require__(1937));
var _events = _interopRequireDefault(__webpack_require__(6880));
var _logs = __webpack_require__(9932);
var _version = __webpack_require__(719);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Other plugins.

const log = _logs.logManager.getLogger('PROXY');

/**
 * The Remote SDK creation factory. Create an instance of the Remote SDK by calling this factory with the desired configurations.
 * @public
 * @method create
 * @example
 * // Instantiate the Remote SDK.
 * const remoteClient = remoteKandy.create();
 *
 * // Use the SDK's APIs.
 * remoteClient.on( ... );
 */

/**
 * Entrypoint for the "Remote SDK".
 * Is equivalent to an `webrtc.remote.js` file.
 * @method remoteClient
 * @return {Object} The remote SDK's API.
 */
function remoteClient() {
  // Log the SDK's version (templated by webpack) on initialization.
  const version = (0, _version.getVersion)();
  log.info(`Remote SDK version: ${version}`);

  // Setup the Client Proxy.
  const proxy = (0, _clientProxy.default)();
  // The webRTC stack ...when initialized.
  let webRTC;
  // Event emitter.
  const emitter = (0, _events.default)();

  // When Client Proxy is initialized, finish setting up
  //    for webRTC events and notify the application.
  proxy.onInit = function (stack) {
    webRTC = stack;
    emitter.setWebrtcListeners(stack);
    // Emit the stack for backwards compatibility until
    //    the example is updated to use the APIs.
    emitter.emit('initialize', stack);
  };

  // Exclude onInit from the public Proxy API.
  const {
    onInit,
    ...proxyApi
  } = proxy;

  /**
   * Wrapper function to ensure that Media APIs aren't used before the webRTC
   *    has been initialized.
   * @method hasDefinedStack
   * @param  {Function} api The API function to wrap.
   * @return {Function} The wrapped API function.
   */
  function hasDefinedStack(api) {
    return function stackCheck() {
      if (webRTC) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return api(webRTC, ...args);
      } else {
        log.info('Remote Proxy not yet initialized; cannot use media APIs yet.');
      }
    };
  }
  const mediaApi = {};
  // Wrap each Media API before adding it to the public API.
  for (const name in mediaApis) {
    mediaApi[name] = hasDefinedStack(mediaApis[name]);
  }

  /**
   * The Remote SDK is comprised of three APIs:
   *   - proxy: Interface to the Client Proxy (the channel).
   *   - media: API interface to the webRTC stack.
   *   - events: Event interface to the webRTC stack.
   */
  return {
    proxy: proxyApi,
    media: mediaApi,
    on: emitter.on,
    off: emitter.off,
    getCapabilities: () => [],
    getVersion: () => version
  };
}

// Alias 'create' to be equal to the root function
remoteClient.create = remoteClient;

// Export this way as a work-around, so it can be used as `<export>();`.
// See: https://github.com/webpack/webpack/issues/706
module.exports = remoteClient;

/***/ }),

/***/ 1937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getDevices = getDevices;
exports.getMedia = getMedia;
exports.getMediaById = getMediaById;
exports.getTrackById = getTrackById;
exports.removeTracks = removeTracks;
exports.renderTracks = renderTracks;
var _utils = __webpack_require__(1011);
var _logs = __webpack_require__(9932);
/**
 * The Remote SDK's public Media APIs.
 * As similar as possible to the webRTC plugin's Media APIs.
 */

/**
 * The media features are used to interact with media that the SDK is
 * currently using.
 *
 * Media functions are all part of the 'media' namespace.
 *
 * @public
 * @module Media
 */

/**
 * The state representation of a Media object.
 * Media is a collection of Track objects.
 *
 * @public
 * @module MediaObject
 * @property {string} id The ID of the Media object.
 * @property {boolean} local Indicator on whether this media is local or remote.
 * @property {Array<TrackObject>} tracks A list of Track objects that are contained in this Media object.
 */

/**
 * A Track is a stream of audio or video media from a single source.
 * Tracks can be retrieved using the Media module's `getTrackById` API.
 *
 * @public
 * @module TrackObject
 * @property {Array<string>} containers The list of CSS selectors that were used to render this Track.
 * @property {boolean} disabled Indicator of whether this Track is disabled or not. If disabled, it cannot be re-enabled.
 * @property {string} id The ID of the Track.
 * @property {string} kind The kind of Track this is (audio, video).
 * @property {string} label The label of the device this Track uses.
 * @property {boolean} muted Indicator on whether this Track is muted or not.
 * @property {string} state The state of this Track. Can be 'live' or 'ended'.
 * @property {string} streamId The ID of the Media object that includes this Track.
 */

// Other plugins.

const log = _logs.logManager.getLogger('PROXY');

/**
 * Retrieves the available media devices for use.
 * @public
 * @memberof media
 * @method getDevices
 * @return {Object} The lists of camera, microphone, and speaker devices.
 */
function getDevices(webRTC) {
  log.debug(`${_logs.API_LOG_TAG}media.getDevices`);
  const manager = webRTC.managers.devices;
  return manager.get();
}

/**
 * Retrieves a list of all existing Media object's IDs.
 * Use the `getMediaById` API to retrieve a specific Media object.
 * @public
 * @memberof media
 * @method getMedia
 * @return {Array} List of Media IDs.
 */
function getMedia(webRTC) {
  log.debug(`${_logs.API_LOG_TAG}media.getMedia`);
  const manager = webRTC.managers.media;
  return manager.getAll();
}

/**
 * Retrieves a media object from state with a specific media ID.
 * @public
 * @memberof media
 * @method getMediaById
 * @param  {string} mediaId The ID of the media to retrieve.
 * @return {MediaObject} A media object.
 */
function getMediaById(webRTC, mediaId) {
  log.debug(`${_logs.API_LOG_TAG}media.getMediaById: ${mediaId}`);
  const manager = webRTC.managers.media;
  return manager.get(mediaId).getState();
}

/**
 * Retrieves a Track object from state with a specific ID.
 * @public
 * @memberof media
 * @method getTrackById
 * @param  {string} trackId The ID of the track to retrieve.
 * @return {TrackObject} A track object.
 */
function getTrackById(webRTC, trackId) {
  log.debug(`${_logs.API_LOG_TAG}media.getTrackById: ${trackId}`);
  const manager = webRTC.managers.track;
  return manager.get(trackId);
}

/**
 * Render media Tracks in a container.
 * The container is specified by providing a CSS selector string that corresponds to the HTMLElement to act as the container.
 * @public
 * @memberof media
 * @method renderTracks
 * @param  {Array}  tracks List of Track IDs to be rendered.
 * @param  {string} cssSelector A CSS selector string that uniquely identifies an element. Ensure that special characters are properly escaped.
 * @example
 * // When a new track is available, render it in specific container.
 * remoteClient.on('track:new', function (params) {
 *     // Render the new track.
 *     remoteClient.media.renderTracks([ params.trackId ], container)
 * })
 */
function renderTracks(webRTC, trackIds, cssSelector) {
  log.debug(`${_logs.API_LOG_TAG}media.renderTracks: ${trackIds}, ${(0, _utils.logCssSelector)(cssSelector)}`);
  const trackManager = webRTC.managers.track;
  const renderer = webRTC.managers.renderer;
  const tracks = trackIds.map(trackManager.get);
  const container = document.querySelector(cssSelector);
  if (!container) {
    log.debug('HTML container not found.');
    return false;
  }
  tracks.forEach(track => {
    if (track) {
      renderer.renderTrack(track, container);
    }
  });
}

/**
 * Remove media Tracks from a container.
 * The container is specified by providing a CSS selector string that corresponds to the HTMLElement to act as the container.
 * @public
 * @memberof media
 * @method removeTracks
 * @param  {Array}  tracks List of Track IDs to stop being rendered.
 * @param  {string} cssSelector A CSS selector string that uniquely identifies an element. Ensure that special characters are properly escaped.
 */
function removeTracks(webRTC, trackIds, cssSelector) {
  log.debug(`${_logs.API_LOG_TAG}media.removeTracks: ${trackIds}, ${(0, _utils.logCssSelector)(cssSelector)}`);
  const renderer = webRTC.managers.renderer;
  const container = document.querySelector(cssSelector);
  if (!container) {
    log.debug('HTML container not found.');
    return false;
  }
  trackIds.forEach(id => {
    renderer.unrenderTrack(id, container);
  });
}

/***/ }),

/***/ 1336:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setupListeners;
var _mediaManager = _interopRequireDefault(__webpack_require__(620));
var _sessionManager = _interopRequireDefault(__webpack_require__(5863));
var _trackManager = _interopRequireDefault(__webpack_require__(1173));
var _devices = _interopRequireDefault(__webpack_require__(2140));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Webrtc plugin.

/**
 * Function that connects the Webrtc-stack's events to the ProxyStack.
 *
 * Sets up all of the "manager channels" to listen for Webrtc-stack events
 *   and passes in a "handler" for what the manager channels should do with
 *   actions/events generated from the Webrtc-stack events.
 *
 * This function is the Proxy-version of the Webrtc plugin's `watchManagers`
 *    function (/webrtc/channels/index.js).
 * @method setupListeners
 * @param  {Object} webRTC The webRTC stack.
 * @param  {Function} handler Function that receives the parsed actions and events.
 */
function setupListeners(webRTC, handler) {
  // Setup listeners for each Manager and pass the action and event handler.
  (0, _mediaManager.default)(webRTC.managers.media, handler);
  (0, _sessionManager.default)(webRTC.managers.sessionManager, handler);
  (0, _trackManager.default)(webRTC.managers.track, handler);
  (0, _devices.default)(webRTC.managers.devices, handler);
}

/***/ }),

/***/ 5378:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.timeLevel = exports.logMethods = exports.logLevels = exports.levelValues = void 0;
/**
 * Log levels supported by Loggers.
 * When a level is set, all logs of that level and higher will be logged.
 * @type {Object}
 */
const logLevels = exports.logLevels = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  SILENT: 'SILENT'
};

/**
 * Numeric values for each log level.
 * When a level is set, all logs of that level and higher will be logged.
 * @type {Object}
 */
const levelValues = exports.levelValues = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
};

/**
 * Supported Log methods and their set log level; `<logMethod>: <logLevel>`
 * Used to construct the logging methods on a Logger.
 * @type {Object}
 */
const logMethods = exports.logMethods = {
  // Standard methods.
  trace: logLevels.TRACE,
  debug: logLevels.DEBUG,
  info: logLevels.INFO,
  warn: logLevels.WARN,
  error: logLevels.ERROR,
  // Extra console methods.
  log: logLevels.DEBUG,
  group: logLevels.DEBUG,
  groupEnd: logLevels.DEBUG,
  groupCollapsed: logLevels.DEBUG
};

/**
 * The log level for all timer methods.
 * @type {string}
 */
const timeLevel = exports.timeLevel = logLevels.DEBUG;

/***/ }),

/***/ 671:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.logLevels = exports.logFormatter = exports["default"] = void 0;
var _logManager = _interopRequireDefault(__webpack_require__(7198));
var _logFormatter = _interopRequireDefault(__webpack_require__(7671));
var _constants = __webpack_require__(5378);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Package main.
 */
// Main export is the manager's factory function.
var _default = exports["default"] = _logManager.default; // Named export for the log level constants the package uses / expects.
const logLevels = exports.logLevels = _constants.logLevels;

// Default log formatter used by the defaultLogHandler
const logFormatter = exports.logFormatter = _logFormatter.default;

/***/ }),

/***/ 7671:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = defaultLogFormatter;
/**
 * Default function for the SDK to use for log formatting.
 *    Uses entry information to form a prefix.
 * @method defaultLogFormatter
 * @param  {LogEntry} entry
 */
function defaultLogFormatter(entry) {
  // Compile the meta info of the log for a prefix.
  const {
    timestamp,
    level,
    target
  } = entry;

  // Find a short name to reference which Logger this log is from.
  //    This is mostly to cut down the ID if it's too long for a human to read.
  const shortId = target.id && target.id.length > 8 ? target.id.substring(0, 6) : target.id;
  const shortName = shortId ? `${target.type}/${shortId}` : target.type;
  const logInfo = `${timestamp} - ${shortName} - ${level}`;

  // Assume that the first message parameter is a string.
  const log = entry.messages[0];
  return `${logInfo} - ${log}`;
}

/***/ }),

/***/ 7145:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = defaultLogHandler;
__webpack_require__(2234);
var _logFormatter = _interopRequireDefault(__webpack_require__(7671));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Default function for the SDK to use for logging.
 *    Uses entry information to form a prefix, then logs to console.
 * @method defaultLogHandler
 * @param  {LogEntry} entry
 */
function defaultLogHandler(entry) {
  let {
    method
  } = entry;

  // For the time-related methods, don't actually use the console methods.
  //    The Logger already did the timing, so simply log out the info.
  if (method.includes('time')) {
    method = 'debug';
  }
  const formattedString = (0, _logFormatter.default)(entry);
  const tail = entry.messages.slice(1);
  // eslint-disable-next-line no-console
  console[method](formattedString, ...tail);
}

/***/ }),

/***/ 7198:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createManager;
var _logger = _interopRequireDefault(__webpack_require__(2983));
var _logHandler = _interopRequireDefault(__webpack_require__(7145));
var _constants = __webpack_require__(5378);
var _validation = __webpack_require__(6836);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultType = Symbol('Default');

/**
 * Creates a Log Manager.
 * @method createManager
 * @param  {Object}     [options={}]
 * @param  {Function}   [options.handler]      The default log handler used for
 *    Loggers that don't have a handler set.
 * @param  {string}     [options.level='INFO'] The default log level used for
 *    Loggers that don't have a level set.
 * @return {LogManager}
 */
function createManager() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const loggers = {};

  /**
   * Mapping between a Logger `type` and their default settings. Created Loggers
   *    will use their `type` settings if they exist. Otherwise the "global"
   *    options provided during Manager creation.
   * @type {Object}
   */
  const settings = {
    [defaultType]: {
      handler: options.handler ? (0, _validation.checkHandler)(options.handler) : _logHandler.default,
      level: options.level ? (0, _validation.checkLevel)(options.level) : _constants.logLevels.INFO
    }
  };

  /**
   * Gets a specific logger. If the logger doesn't exist, a new one will be
   *    created.
   * @method getLogger
   * @param  {string} type Human-readable type/name for the logger.
   * @param  {string} [id] A unique identifier for the logger.
   * @return {Logger}
   */
  function getLogger(type) {
    let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    id = String(id);

    // Combine the name and ID to create the "full" logger name.
    const loggerName = id ? `${type}-${id}` : type;
    let logger = loggers[loggerName];
    // If the logger does not exist, create a new one.
    if (!logger) {
      // This logger logs items from a specific "target".
      const target = {
        type,
        id,
        name: loggerName
      };
      const options = {
        level: getLevel(type),
        handler: getHandler(type)
      };
      logger = (0, _logger.default)(target, options);

      // Save the new logger to be returned by future getter calls.
      loggers[loggerName] = logger;
    }
    return logger;
  }

  /**
   * Gets all created loggers, or Loggers of a specific type.
   * @method getLoggers
   * @param {string} [type] The type of Loggers to retrieve.
   * @return {Array<Logger>} List of Loggers.
   */
  function getLoggers(type) {
    if (type) {
      return Object.values(loggers).filter(logger => logger.type === type);
    } else {
      return Object.values(loggers);
    }
  }

  /**
   * Sets the default `level` to be used when creating Loggers.
   *
   * Can set the level "globally" or per `type`, depending if `type` is provided
   *    or not. When set for a specific type, only Loggers of that type will use
   *    the set level. When set "globally", all Loggers without a set type will
   *    use the level as a default.
   *
   * Setting the level only affects Loggers created after that point.
   * @method setLevel
   * @param  {string} type  The type of Logger to set the option for.
   * @param  {string} level The logLevel to be set.
   * @throws Throws an error if level is not a valid log level.
   * @example
   * const manager = createManager({ level: logLevels.WARN })
   *
   * // Setting the level for a type sets it for created Loggers of that type.
   * manager.setLevel('Call', logLevels.DEBUG)
   * const logger1 = manager.getLogger('Call')
   * // logger1.getLevel() === logLevels.DEBUG
   *
   * // Loggers created of types without a set level uses the Manager's level.
   * const logger2 = manager.getLogger('Auth')
   * // logger2.getLevel() === logLevels.WARN
   *
   * // Setting the level without a type changes the Manager's level.
   * manager.setLevel(logLevels.INFO)
   * const logger3 = manager.getLogger('Messaging')
   * // logger3.getLevel() === logLevels.INFO
   *
   * // Setting the level for a type does not affect previously created Loggers.
   * manager.setLevel('Auth', logLevels.INFO)
   * // logger2.getLevel() !== logLevels.INFO
   * // logger2.getLevel() === logLevels.WARN
   */
  function setLevel(type, level) {
    // Signature can be: `setLevel(type, level)` or `setLevel(level)`.
    // Normalize the parameters to always be consistent.
    if (level === undefined) {
      level = type;
      type = defaultType;
    }

    // Ensure `settings[type]` is an object.
    if (!settings[type]) {
      settings[type] = {};
    }

    // Set the level.
    settings[type].level = (0, _validation.checkLevel)(level);
  }

  /**
   * Gets the default `level` that is used when creating Loggers.
   *
   * Can get the level used "globally" or per `type`, depending if `type` is
   *    provided or not.
   *
   * See the `setLevel` API for setting these values.
   * See the Logger APIs for getting this value for an already created Logger.
   * @method getLevel
   * @param  {string} [type] A type of Logger.
   * @return {LogLevel}
   * @example
   * const manager = createManager({ level: logLevels.WARN })
   *
   * // If a type's level has not been set, gets the "global" level.
   * // manager.getLevel('Call') === logLevels.WARN
   *
   * // If a type's level has been set, gets its level.
   * manager.setLevel('Auth', logLevels.DEBUG)
   * // manager.getLevel('Auth') === logLevels.DEBUG
   *
   * // Can get the "global" level.
   * manager.setLevel(logLevels.INFO)
   * // manager.getLevel() === logLevels.INFO
   */
  function getLevel(type) {
    // Signature can be: `getLevel(type)` or `getLevel()`.
    // Normalize the parameters to always be consistent.
    type = type || defaultType;
    return settings[type] && settings[type].level || settings[defaultType].level;
  }

  /**
   * Sets the default `handler` to be used when creating Loggers.
   *
   * Can set the handler "globally" or per `type`, depending if `type` is
   *    provided or not. When set for a specific type, only Loggers of that type
   *    will use the set handler. When set "globally", all Loggers without a set
   *    type will use the handler as a default.
   *
   * Setting the handler only affects Loggers created after that point.
   * @method setHandler
   * @param  {string}     type    The type of Logger to set the option for.
   * @param  {LogHandler} handler The log handler to be set.
   * @throws Throws an error if handler is not a function.
   * @example
   * const manager = createManager({ handler: managerHandler })
   *
   * // Setting the handler for a type sets it for created Loggers of that type.
   * manager.setHandler('Call', callHandler)
   * const logger1 = manager.getLogger('Call')
   * // logger1.getHandler() === callHandler
   *
   * // Loggers created of types without a set handler uses the Manager's handler.
   * const logger2 = manager.getLogger('Auth')
   * // logger2.getHandler() === managerHandler
   *
   * // Setting the handler without a type changes the Manager's handler.
   * manager.setHandler(newHandler)
   * const logger3 = manager.getLogger('Messaging')
   * // logger3.getHandler() === newHandler
   *
   * // Setting the handler for a type does not affect previously created Loggers.
   * manager.setHandler('Auth', authHandler)
   * // logger2.getHandler() !== authHandler
   * // logger2.getHandler() === managerHandler
   */
  function setHandler(type, handler) {
    // Signature can be: `setHandler(type, handler)` or `setHandler(handler)`.
    // Normalize the parameters to always be consistent.
    if (typeof type === 'function' && handler === undefined) {
      handler = type;
      type = defaultType;
    }

    // Ensure `settings[type]` is an object.
    if (!settings[type]) {
      settings[type] = {};
    }

    // Set the handler.
    settings[type].handler = (0, _validation.checkHandler)(handler);
  }

  /**
   * Gets the default `handler` that is used when creating Loggers.
   *
   * Can get the handler used "globally" or per `type`, depending if `type` is
   *    provided or not.
   *
   * See the `setHandler` API for setting these values.
   * See the Logger APIs for getting this value for an already created Logger.
   * @method getHandler
   * @param  {string} [type] A type of Logger.
   * @return {LogHandler}
   * @example
   * const manager = createManager({ handler: managerHandler })
   *
   * // If a type's handler has not been set, gets the "global" handler.
   * // manager.getHandler('Call') === managerHandler
   *
   * // If a type's handler has been set, gets its handler.
   * manager.setHandler('Auth', authHandler)
   * // manager.getHandler('Auth') === authHandler
   *
   * // Can get the "global" handler.
   * manager.setHandler(newHandler)
   * // manager.getHandler() === newHandler
   */
  function getHandler(type) {
    // Signature can be: `getHandler(type)` or `getHandler()`.
    // Normalize the parameters to always be consistent.
    type = type || defaultType;
    return settings[type] && settings[type].handler || settings[defaultType].handler;
  }
  return {
    getLogger,
    getLoggers,
    setLevel,
    getLevel,
    setHandler,
    getHandler
  };
}

/***/ }),

/***/ 2983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createLogger;
var _constants = __webpack_require__(5378);
var _validation = __webpack_require__(6836);
var _timer = _interopRequireDefault(__webpack_require__(2630));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Creates a Logger.
 * @method createLogger
 * @param  {Object}   target          The subject of the logs from this logger.
 * @param  {Object}   options
 * @param  {Function} options.handler The function to receive/handle log entries.
 * @param  {string}   options.level   The log level to be set.
 * @return {Logger}
 */
function createLogger(target) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Validate provided options. Do not let invalid options be set.
  const level = (0, _validation.checkLevel)(options.level);
  const handler = (0, _validation.checkHandler)(options.handler);

  /**
   * Logger data.
   * @type {Object}
   * @property {Object}   target  Metadata about the "target" of the Logger.
   * @property {LogLevel} level   The currently set log level.
   * @property {Function} handler The currently set Log Handler.
   */
  const logger = {
    target,
    level,
    handler
  };

  /**
   * Currying function to dynamically create the Logger's logging methods.
   * @method logFunc
   * @param  {string} method   Name of the logger method to create.
   * @param  {string} logLevel The log level for the method.
   * @param  {Object} [injectables] Other values to include in the LogEntry.
   * @return {Function} A log method.
   */
  function logFunc(method, logLevel, injectables) {
    /*
     * Return the function that will be used as `log.<method>`.
     */
    return function () {
      // Compare the logged level and the configured level.
      const shouldLog = _constants.levelValues[logLevel] >= _constants.levelValues[logger.level];
      // If this entry shouldn't be logged, don't do anything.
      if (!shouldLog) {
        return;
      }

      // Create the Log Entry to be handed off to the handler.
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const entry = {
        // Extra data to be added to the LogEntry.
        ...injectables,
        // Meta-info about the log.
        method,
        timestamp: Date.now(),
        level: logLevel,
        target: logger.target,
        // The actual arguments logged.
        messages: [...args]
      };
      logger.handler(entry);
    };
  }

  /**
   * Sets the Logger's current log level.
   * @method setLevel
   * @param  {string} level The logLevel to be set.
   * @throws Throws an error if level is not a valid log level.
   * @example
   * logger.setLevel(logLevels.INFO)
   * logger.info('This will be logged.')
   * logger.debug('This will not be logged.')
   */
  function setLevel(level) {
    logger.level = (0, _validation.checkLevel)(level);
  }

  /**
   * Gets the Logger's current log level.
   * @method getLevel
   * @return {string} The log level.
   * @example
   * logger.setLevel(logLevels.DEBUG)
   * const level = logger.getLevel()
   * // level === logLevels.DEBUG
   */
  function getLevel() {
    return logger.level;
  }

  /**
   * Sets the Logger's current log handler.
   * @method setHandler
   * @param  {Function} handler The log handler to be set.
   * @throws Throws an error if handler is not a function.
   * @example
   * const logger = manager.getLogger('Test', '123')
   * logger.setHandler((logEntry) => {
   *    console.log(logEntry.target.name, ...logEntry.messages)
   * })
   * logger.info('I am a logged message.')
   * // logs: "Test-123 I am a logged message."
   */
  function setHandler(handler) {
    logger.handler = (0, _validation.checkHandler)(handler);
  }

  /**
   * Gets the Logger's current log handler.
   * @method getHandler
   * @return {Function} The log handler.
   * @example
   * logger.setHandler(customHandler)
   * const handler = logger.getHandler()
   * // handler === customHandler.DEBUG
   */
  function getHandler() {
    return logger.handler;
  }
  const api = {
    getHandler,
    setHandler,
    getLevel,
    setLevel,
    get type() {
      return logger.target.type;
    },
    get id() {
      return logger.target.id;
    },
    get name() {
      return logger.target.name;
    }
  };

  // For all supported log methods, create a function on the Logger for it.
  for (const method in _constants.logMethods) {
    api[method] = logFunc(method, _constants.logMethods[method]);
  }

  // Create log functions for the Timer to use.
  // Follows the same style as above logMethods, but curries it once more
  //    to align the timer parameters as needed.
  const timeLog = (message, data) => logFunc(data.event, _constants.timeLevel, {
    timer: data
  })(message);
  const timeWarn = (message, data) => logFunc('warn', _constants.logLevels.WARN, {
    timer: data
  })(message);
  const timer = (0, _timer.default)(timeLog, timeWarn);
  return {
    ...api,
    ...timer
  };
}

/***/ }),

/***/ 2630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createTimer;
var _validation = __webpack_require__(6836);
/**
 * Timer factory function.
 * The Timer imitates the Console's Time APIs.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/console#Timers
 * @method createTimer
 * @param  {Function} log  Function for logging timer information.
 * @param  {Function} warn Function for warning about timer misuse.
 * @return {Timer}
 */
function createTimer(log, warn) {
  // Validate that params are a function.
  //    Uses functions as `log(message, data)`.
  (0, _validation.checkHandler)(log);
  (0, _validation.checkHandler)(warn);

  /**
   * Mapping of on-going timers; <name>: <start>.
   * @type {Object}
   */
  const timers = {};

  /**
   * Starts a timer. Logs a message to indicate it was started.
   * Logs a warning if the timer has already been started.
   * @method timeStart
   * @param  {string} name Name to identify the timer.
   */
  function time(name) {
    const now = Date.now();
    // Base info about this timer call.
    const data = {
      event: 'time',
      name
    };
    if (timers.hasOwnProperty(name)) {
      data.start = timers[name];
      warn(`Timer ${name} already started.`, data);
    } else {
      // Set the new timer.
      timers[name] = now;
      data.start = now;
      log(`Timer ${name} started.`, data);
    }
  }

  /**
   * Ends a timer. Logs a message with the elapsed time.
   * @method timeEnd
   * @param  {string} name Name to identify the timer.
   */
  function timeEnd(name) {
    const now = Date.now();
    // Base info about this timer call.
    const data = {
      event: 'timeEnd',
      name,
      start: timers[name]
    };
    if (timers.hasOwnProperty(name)) {
      const start = timers[name];
      // End the timer.
      delete timers[name];
      const elapsed = now - start;
      data.end = now;
      data.elapsed = elapsed;
      log(`Timer ${name} ended, taking ${elapsed}ms.`, data);
    } else {
      warn(`Timer ${name} has not been started.`, data);
    }
  }

  /**
   * Adds a split to the timer. Logs a message with the elapsed time so far.
   * Logs a warning if the timer has not been started.
   * @method timeSplit
   * @param  {string} name Name to identify the timer.
   */
  function timeLog(name) {
    const now = Date.now();
    // Base info about this timer call.
    const data = {
      event: 'timeLog',
      name,
      start: timers[name]
    };
    if (timers.hasOwnProperty(name)) {
      const elapsed = now - timers[name];
      data.split = now;
      data.elapsed = elapsed;
      log(`Timer ${name} split, at ${elapsed}ms so far.`, data);
    } else {
      warn(`Timer ${name} has not been started.`, data);
    }
  }
  return {
    time,
    timeEnd,
    timeLog
  };
}

/***/ }),

/***/ 6836:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.checkHandler = checkHandler;
exports.checkLevel = checkLevel;
__webpack_require__(7107);
var _constants = __webpack_require__(5378);
/**
 * Helper function to validate a "log level" string before its used in the library.
 * @method checkLevel
 * @param  {string} level A log level provided by a user.
 * @return {string}       The log level as expected by the library.
 * @throws Will throw an error if the `level` parameter is invalid.
 */
function checkLevel(level) {
  // Ensure: is defined and is a string.
  const upperLevel = level && level.toUpperCase && level.toUpperCase();

  // Ensure: is a supported log level.
  if (upperLevel && _constants.logLevels[upperLevel]) {
    return _constants.logLevels[upperLevel];
  } else {
    throw new Error('Provided level is not a valid log level.');
  }
}

/**
 * Helper function to validate a "log handler".
 * Basically just "is function" that throws an error if false.
 * @method checkHandler
 * @param  {Function} handler A log handler function, ideally.
 * @return {Function}         The same log handler function, ideally.
 * @throws Will throw an error if the `handler` provided is not a function.
 */
function checkHandler(handler) {
  if (handler && typeof handler === 'function') {
    return handler;
  } else {
    throw new Error('Provided log handler is not a function.');
  }
}

/***/ }),

/***/ 3453:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _constants = __webpack_require__(4507);
/**
 * Configuration object for a Peer.
 * @typedef {Object} PeerConfig
 * @property {Object} [rtcConfig] Configuration for the native RTCPeerConnection.
 * @property {String} [trickleIceMode=FULL] The initial mode the Peer will use when receiving ICE candidates.
 * @property {Boolean} [removeBundling=false] Remove the a=group attribute to stop media bundling
 * @property {Function} [halfTrickleThreshold] Function that determines whether the threshold has been met when in HALF trickle mode.
 */
var _default = exports["default"] = {
  trickleIceMode: _constants.PEER.TRICKLE_ICE.FULL,
  removeBundling: false,
  halfTrickleThreshold: isPassedHalfTrickleThreshold
};
/**
 * Default function for determining whether the HALF trickle ICE threshold has
 *    been met, to start trickling ICE candidates.
 * Defines the threshold as one relay candidate being gathered.
 * @method isPassedHalfTrickleThreshold
 * @param  {String}             sdp          The local SDP of the Peer.
 * @param  {RTCIceCandidate}    iceCandidate The native candidate object that triggered this check.
 * @param  {Number}             time         The amount of time (ms) since ICE collection began.
 * @return {Boolean} Whether the "half trickle" threshold has been passed.
 */
function isPassedHalfTrickleThreshold(_ref) {
  let {
    sdp,
    iceCandidate,
    time
  } = _ref;
  const passedHalf = iceCandidate.candidate.indexOf('relay') !== -1;
  return passedHalf;
}

/***/ }),

/***/ 9957:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = onicecandidate;
__webpack_require__(9375);
var _constants = __webpack_require__(4507);
/**
 * Event wrapper for `icecandidate` event.
 * Reference: developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate
 * @method onicecandidate
 * @param  {Function} listener The listener function for the event.
 * @return {Boolean}  Whether the assignment succeeded or not.
 */
function onicecandidate(listener) {
  const {
    nativePeer,
    proxyPeer,
    config,
    iceTimer,
    emitter,
    iceCandidates,
    log
  } = this;

  /**
   * Intercept the PeerConnection onicecandidate event.
   * Handle the candidate as defined by the current trickle ICE mode config.
   * Trickle ICE scenarios:
   *   - FULL: Trickle.
   *   - HALF, pre-half: Wait for "half" or null candidate.
   *   - HALF, post-half: Trickle.
   *   - NONE: Wait for null candidate.
   */
  nativePeer.onicecandidate = event => {
    log.debug(`ICE candidate received (trickling?: ${config.trickleIceMode === _constants.PEER.TRICKLE_ICE.FULL}): `, event.candidate);

    // Keep track of all candidates gathered by this collection process.
    if (event.candidate !== null) {
      iceCandidates.push(event.candidate);
    }

    // Emit an event for the session to pick up for the ice collection check
    const elapsedTime = iceTimer.timeFromStart();
    emitter.emit('iceCandidateCollected', {
      iceCollectionDuration: elapsedTime,
      iceCandidates,
      iceGatheringState: proxyPeer.iceGatheringState,
      rtcPeerConnectionConfig: config,
      rtcLocalSessionDescription: proxyPeer.localDescription
    });
    if (config.trickleIceMode === _constants.PEER.TRICKLE_ICE.FULL) {
      // If trickling is enabled, emit an event for every ICE candidate. The
      //    Peer is already ready for negotiation at this point.
      if (event.candidate) {
        // Only trickle non-null (ie. actual) candidates.
        listener(event);
      }
    } else if (config.trickleIceMode === _constants.PEER.TRICKLE_ICE.HALF) {
      // For half trickle, only start trickling after a certain threshold.
      //    Peer will be considered ready for negotiation after that point.
      const haveHalf = config.halfTrickleThreshold({
        sdp: proxyPeer.localDescription.sdp,
        iceCandidate: event.candidate,
        time: elapsedTime
      });
      if (haveHalf) {
        log.debug('Half ICE collection process complete; ready for negotiation.');
        config.trickleIceMode = _constants.PEER.TRICKLE_ICE.FULL;
        emitter.emit('onnegotiationready');
      } else {
        log.debug("Peer's half trickle threshold not reached.");
      }
    }
  };
  return true;
}

/***/ }),

/***/ 9518:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = oniceconnectionstatechange;
/**
 * Event wrapper for `iceconnectionstatechange` event.
 * Reference: developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/oniceconnectionstatechange
 * @method oniceconnectionstatechange
 * @param  {Function} listener The listener function for the event.
 * @return {Boolean}  Whether the assignment succeeded or not.
 */
function oniceconnectionstatechange(listener) {
  const {
    nativePeer,
    log
  } = this;
  nativePeer.oniceconnectionstatechange = function (event) {
    log.debug(`Peer received iceconnectionstatechange event: ${nativePeer.iceConnectionState}`);
    listener(event);
  };
  return true;
}

/***/ }),

/***/ 2988:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = onicegatheringstatechange;
var _constants = __webpack_require__(4507);
/**
 * Event wrapper for `icegatheringstatechange` event.
 * Reference: developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange
 * @method onicegatheringstatechange
 * @param  {Function} listener The listener function for the event.
 * @return {Boolean}  Whether the assignment succeeded or not.
 */
function onicegatheringstatechange(listener) {
  const {
    nativePeer,
    iceTimer,
    log
  } = this;

  /**
   * Intercept the PeerConnection onicegatheringstatechange event.
   * Time how long ICE collection takes and handles scenarios when it takes
   *    too long.
   */
  nativePeer.onicegatheringstatechange = event => {
    const gatheringState = event.target.iceGatheringState;
    log.debug(`Peer iceGatheringState changed to ${gatheringState}.`);
    if (gatheringState === _constants.PEER.ICE_GATHERING_STATE.GATHERING) {
      iceTimer.start();
      // TODO: Handle "ICE collection taking too long" scenario.
    } else if (gatheringState === _constants.PEER.ICE_GATHERING_STATE.COMPLETE) {
      log.debug(`Peer took ${iceTimer.timeFromStart()}ms to collect ICE candidates.`);
      iceTimer.stop();
    }
    // Bubble the event up.
    listener(event);
  };
  return true;
}

/***/ }),

/***/ 1725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _icecandidate = _interopRequireDefault(__webpack_require__(9957));
var _iceconnectionstatechange = _interopRequireDefault(__webpack_require__(9518));
var _icegatheringstatechange = _interopRequireDefault(__webpack_require__(2988));
var _negotiationneeded = _interopRequireDefault(__webpack_require__(7989));
var _signalingstatechange = _interopRequireDefault(__webpack_require__(1280));
var _track = _interopRequireDefault(__webpack_require__(5094));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports["default"] = {
  onicecandidate: _icecandidate.default,
  oniceconnectionstatechange: _iceconnectionstatechange.default,
  onicegatheringstatechange: _icegatheringstatechange.default,
  onnegotiationneeded: _negotiationneeded.default,
  onsignalingstatechange: _signalingstatechange.default,
  ontrack: _track.default
};

/***/ }),

/***/ 7989:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = onnegotiationneeded;
/**
 * Event wrapper for `negotiationneeded` event.
 * Reference: developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onnegotiationneeded
 * @method onnegotiationneeded
 * @param  {Function} listener The listener function for the event.
 * @return {Boolean}  Whether the assignment succeeded or not.
 */
function onnegotiationneeded(listener) {
  const {
    nativePeer,
    log
  } = this;
  nativePeer.onnegotiationneeded = function (event) {
    log.debug('Peer received negotiationneeded event.');
    listener(event);
  };
  return true;
}

/***/ }),

/***/ 1280:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = onsignalingstatechange;
/**
 * Event wrapper for `signalingstatechange` event.
 * Reference: developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange
 * @method onsignalingstatechange
 * @param  {Function} listener The listener function for the event.
 * @return {Boolean}  Whether the assignment succeeded or not.
 */
function onsignalingstatechange(listener) {
  const {
    nativePeer,
    log
  } = this;
  nativePeer.onsignalingstatechange = function (event) {
    log.debug(`Peer received signalingstatechange event: ${nativePeer.signalingState}`);
    listener(event);
  };
  return true;
}

/***/ }),

/***/ 5094:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = ontrack;
__webpack_require__(9375);
/**
 * Event wrapper for `track` event.
 * Reference: developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack
 * @method ontrack
 * @param  {Function} listener The listener function for the event.
 * @return {Boolean}  Whether the assignment succeeded or not.
 */
function ontrack(listener) {
  const {
    proxyPeer,
    nativePeer,
    trackManager,
    log
  } = this;
  nativePeer.ontrack = async event => {
    /**
     * transceiver: The RTCRtpTransceiver for this remote track. (Available in unified-plan)
     * receiver: The RTCRtpReceiver for this remote track.
     * track: The remote MediaStreamTrack.
     * streams: Array of MediaStreams the track is in.
     */
    // event object contains transceiver which already has track attached to its receiver
    const {
      track: nativeTrack,
      streams,
      transceiver
    } = event;
    log.debug(`Peer received ${nativeTrack.kind} Track ${nativeTrack.id}.`);
    if (!proxyPeer.transceivers.find(tran => tran.mid === transceiver.mid)) {
      // If we are not already tracking this Transceiver in the Peer model, then add it.
      proxyPeer.transceivers.push(transceiver);
    }

    /*
     * When the remote side adds a track, it should have an associated MediaStream
     *    which we get access to here. This allows us to listen for events on that
     *    MediaStream (important for knowing when the track has ended).
     * It's possible that the remote Sender does not have a Stream set, so we create
     *    a Stream for it. This should be considered a problematic scenario, since
     *    we rely on the remote Stream for certain events.
     * Reference: KAA-2628
     */
    let targetStream;
    if (streams.length === 0) {
      targetStream = await new MediaStream([nativeTrack]);
      log.debug('New Track is not associated with remote Stream.');
    } else {
      targetStream = streams[0];
      log.debug(`New Track is associated with remote Stream ${targetStream.id}.`);
    }

    // Convert the native MediaStreamTrack into a Track object.
    // Specify that this is not a local one (i.e. it's a remote track)
    const track = trackManager.add(nativeTrack, nativeTrack.kind, targetStream, false);
    listener(track);
  };
  return true;
}

/***/ }),

/***/ 1655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = peer;
exports.setPeerProxies = setPeerProxies;
__webpack_require__(2234);
var _events = _interopRequireDefault(__webpack_require__(1725));
var _methods = _interopRequireDefault(__webpack_require__(2254));
var _properties = _interopRequireDefault(__webpack_require__(217));
var _utils = __webpack_require__(6555);
var _config = _interopRequireDefault(__webpack_require__(3453));
var _logs = __webpack_require__(271);
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
var _timer = __webpack_require__(7208);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
 * Wrapper imports.
 * Events, methods, and properties that we want to wrap/add to the native Peer.
 */

// Libraries.

// EXTERNAL PROXY CODE
let proxies;
/**
 * Function used to apply proxied functionality on top of the peer. Typically triggered by an
 * external proxy SDK.
 */
function setPeerProxies(peerProxies) {
  proxies = peerProxies;
}

/**
 * Create a Proxied Peer.
 * This Peer is a native PeerConnection that has had some new functionality
 *    added and some existing functionality "augmented". Where an event, a
 *    method, or a property has been defined (see folders), we intercept/add
 *    that functionality.
 * @method peer
 * @return {Peer}
 */
function peer(id) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let trackManager = arguments.length > 2 ? arguments[2] : undefined;
  const log = _logs.logManager.getLogger('Peer', id);
  config = (0, _utils.mergeValues)(_config.default, config);
  log.info('Creating new Peer.');
  const iceTimer = (0, _timer.createTimer)();
  const emitter = new _eventemitter.default();

  // Create the native Peer.
  log.debug('Creating native PeerConnection.', config.rtcConfig);
  const nativePeer = new RTCPeerConnection(config.rtcConfig, {
    optional: [{
      googDscp: true
    }]
  });

  // Add the event emitter methods to the wrapped methods as well.
  const customMethods = {
    ..._methods.default,
    ...proxies,
    // EXTERNAL PROXY CODE
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter),
    once: emitter.once.bind(emitter)
  };

  /**
   * The Peer model.
   * @typedef {Peer}
   * @property {RTCPeerConnection} peer     The native PeerConnection.
   * @property {string}            id       The unique identifier for the Peer.
   * @property {boolean}           dtlsRole The DTLS role selected for this PeerConnection. Set after the initial negotiation is completed.
   * @property {Object}            trackManager Manager that tracks all MediaStreamTracks.
   * @property {Object}            log      Logger specific to this Peer.
   * @property {Object}            iceTimer Timer tool (specifically for ICE collection).
   * @property {EventEmitter}      emitter
   * @property {Array<RTCIceCandidate>} iceCandidates Gathered candidates.
   * @property {timeoutID} [iceLoop] Reference to the on-going ICE collection loop.
   * @property {Array<RTCRtpTransceiver>} transceivers List of transceivers on the peer.
   */
  const base = {
    nativePeer,
    proxyPeer: undefined,
    id,
    dtlsRole: null,
    config,
    trackManager,
    log,
    iceTimer,
    emitter,
    iceCandidates: [],
    iceLoop: undefined,
    transceivers: []
  };

  /**
   * Create the Proxy object that will be used as the PeerConnection.
   *
   * This will intercept all `get` and `set` operations and either forward them
   *    directly to the real PeerConnection or to our wrapped operations.
   * This allows us to shim part or all of the PeerConnection's API. We can
   *    decide which operations we want to intercept while allowing others to
   *    pass through unchanged.
   */
  base.proxyPeer = new Proxy(base, {
    /**
     * Intercept "get" calls on the Proxy.
     * This function is called anytime a property on `base` is accessed,
     *    eg. `base.someProp`
     * @param {Object} target    base
     * @param {string} prop      Property being accessed.
     * @param {Object} receiver  The Proxy object.
     */
    get: function (target, prop, receiver) {
      if (typeof base.nativePeer[prop] === 'function') {
        /*
         * If a function is being accessed, determine whether we want to
         *    return the native function or our own.
         */
        if (Object.keys(customMethods).includes(prop)) {
          // Return our wrapped version of the original function.
          return customMethods[prop].bind(base);
        } else {
          // Return the original function, bound to have the original context.
          return base.nativePeer[prop].bind(base.nativePeer);
        }
      } else if (customMethods[prop] && typeof customMethods[prop] === 'function') {
        /*
         * If a non-native function is being accessed, return our custom method.
         * These are methods that are not on the native RTCPeerConnection
         *    object, but we added to the old Peer model.
         */
        // TODO: Move all of this functionality to a higher level of abstraction.
        return customMethods[prop].bind(base);
      } else if (_properties.default[prop]) {
        /*
         * If a PeerConnection property is being accessed, and we have a
         *    wrapping for it, return our wrapper property.
         */
        if (typeof _properties.default[prop] === 'function') {
          // If our property wrapper is a function, call the function and return
          //    the results.
          return _properties.default[prop].bind(base)();
        } else {
          // Otherwise, just return the original results.
          return base.nativePeer[prop];
        }
      } else if (prop !== 'nativePeer' && base[prop]) {
        /*
         * If a Peer model property, other than the peer, is being accessed,
         *    return it. The Peer model shouldn't have any properties that the
         *    PeerConnection also has (to avoid conflicts).
         */
        return base[prop];
      } else {
        // Otherwise, return the property from the PeerConnection itself.
        return base.nativePeer[prop];
      }
    },
    /**
     * Intercept "set" calls on the Proxy.
     * This function is called anytime a property on `base` is assigned,
     *    eg. `base.someProp = value`
     * @method
     * @param  {Object} target   base
     * @param  {string} prop     Property being set.
     * @param  {Any}    value    The value being set.
     * @param  {Proxy}  receiver The Proxy object.
     * @return {boolean}         Whether the assignment succeeded or not.
     */
    set: function (target, prop, value, receiver) {
      if (_events.default[prop]) {
        // If a value is being set on one of our "wrapped events", then call
        //    the "event function".
        return _events.default[prop].bind(base)(value);
      } else if (prop === 'dtlsRole') {
        /**
         * Only allow the `dtlsRole` property of the Peer model be set. The
         *    Session needs to be able to get/set this property, in the case
         *    where it recreates the Peer multiple times, so it needs to set the
         *    role to something specific.
         * Reference: KAA-1816
         */
        base.dtlsRole = value;
        return true;
      } else {
        // Otherwise, try to set the value on the native Peer.
        return Reflect.set(base.nativePeer, prop, value);
      }
    }
  });

  /**
   * For event debugging purposes, start with a dummy listener for every event.
   *    This ensures our Proxy is listening for the events (in the case nothing
   *    else is listening), so that debug information from the event wrappers
   *    are logged.
   */
  for (const eventName in _events.default) {
    base.proxyPeer[eventName] = () => {};
  }
  return base.proxyPeer;
}

/***/ }),

/***/ 6353:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = addIceCandidate;
__webpack_require__(7107);
/**
 * Add an ICE candidate to the connection.
 * @method addIceCandidate
 * @param  {RTCIceCandidate} candidate A native candidate object.
 * @return {Promise} Resolves when the candidate is successfully added.
 */
function addIceCandidate(candidate) {
  const {
    nativePeer,
    proxyPeer,
    id,
    log
  } = this;
  log.info('Adding ICE candidate.');
  return new Promise((resolve, reject) => {
    if (proxyPeer.remoteDescription.type && proxyPeer.remoteDescription.sdp) {
      nativePeer.addIceCandidate(candidate).then(resolve).catch(reject);
    } else {
      log.info('Cannot set remote ICE candidate without a remote description.');
      // TODO: Better error.
      reject(new Error(`Peer ${id} cannot set remote ICE candidate without a remote description.`));
    }
  });
}

/***/ }),

/***/ 3331:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = addTransceiver;
__webpack_require__(9375);
/**
 * Add a Transceiver to the connection.
 * @method addTransceiver
 * @param  {Track} track A Track object.
 * @return {RTCRtpTransceiver}
 */
function addTransceiver(track) {
  const {
    proxyPeer,
    nativePeer,
    log
  } = this;
  log.info(`Adding new ${track.track.kind} track.`);
  let transceiver;
  try {
    transceiver = nativePeer.addTransceiver(track.track, {
      direction: 'sendrecv',
      streams: [track.getStream()]
    });
    // Store the reference to the Transceiver on our Peer as well.
    proxyPeer.transceivers.push(transceiver);
  } catch (err) {
    // TODO: Better error handling.
    log.info(`Failed to add track: ${err.message}`);
  }

  // TODO: What to return here? Probably shouldn't expose the transceiver itself.
  return transceiver;
}

/***/ }),

/***/ 8478:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = close;
/**
 * Clean the Peer by closing the RTCPeerConnection.
 * @method close
 */
function close() {
  const {
    nativePeer,
    id,
    emitter,
    iceLoop,
    log
  } = this;
  log.info('Closing Peer.');
  if (iceLoop) {
    // Clear the ICE collection loop timeout if it exists.
    clearTimeout(iceLoop);
  }
  nativePeer.close();
  emitter.emit('peer:closed', id);
}

/***/ }),

/***/ 3570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createAnswer;
__webpack_require__(9375);
var _constants = __webpack_require__(4507);
var _pipeline = __webpack_require__(8851);
var _handlers = __webpack_require__(5424);
/**
 * Creates an SDP answer, given that a remote offer has been set.
 * @method createAnswer
 * @param  {RTCAnswerOptions} [options={}] Options used to customize the answer.
 * @param  {Object} [options.mediaDirections] Directions to use for media.
 * @param  {string} [options.mediaDirections.audio]
 * @param  {string} [options.mediaDirections.video]
 * @return {Promise} Resolves with the answer.
 */
function createAnswer() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    nativePeer,
    config,
    dtlsRole,
    log
  } = this;
  log.info('Creating local answer.');

  // Remove options.mediaDirections.
  // This is because directions are now set in transceivers.
  delete options.mediaDirections;
  return new Promise((resolve, reject) => {
    nativePeer.createAnswer(options).then(answer => {
      const sdpHandlers = [];

      /*
       * Always include the `preventDtlsRoleChange` handler. This ensures
       *    that the SDP's DTLS role does not change during a renegotiation.
       */
      sdpHandlers.push(_handlers.preventDtlsRoleChange);
      if (config.trickleIceMode === _constants.PEER.TRICKLE_ICE.NONE) {
        // Modify the answer to claim the Peer doesn't support trickle ICE.
        sdpHandlers.push(_handlers.removeTrickleIce);
      }
      if (config.removeBundling) {
        // Modify the offer to remove media bundling
        sdpHandlers.push(_handlers.removeBundling);
      }
      if (options.mediaDirections) {
        // Modify the answer to set media directions as desired.
        sdpHandlers.push((0, _handlers.changeMediaDirection)(options.mediaDirections));
      }
      if (sdpHandlers.length > 0) {
        // Run the SDP pipeline with only these handlers.
        answer.sdp = (0, _pipeline.runPipeline)(sdpHandlers, answer.sdp, {
          type: answer.type,
          endpoint: _constants.PEER.ENDPOINT.LOCAL,
          dtlsRole: dtlsRole
        });
      }
      log.info('Finished creating local answer.');
      resolve(answer);
    }).catch(reject);
  });
}

/***/ }),

/***/ 8016:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createOffer;
__webpack_require__(9375);
var _constants = __webpack_require__(4507);
var _pipeline = __webpack_require__(8851);
var _handlers = __webpack_require__(5424);
/**
 * Creates an SDP offer.
 * @method createOffer
 * @param  {RTCOfferOptions} [options={}] Options used to customize the offer.
 * @param  {Object} [options.mediaDirections] Directions to use for media.
 * @param  {string} [options.mediaDirections.audio]
 * @param  {string} [options.mediaDirections.video]
 * @return {Promise} Resolves with the offer.
 */
function createOffer() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    nativePeer,
    config,
    log
  } = this;
  log.info('Creating local offer.');

  // Remove options.mediaDirections.
  // This is because directions are now set in transceivers.
  delete options.mediaDirections;
  return new Promise((resolve, reject) => {
    nativePeer.createOffer(options).then(offer => {
      const sdpHandlers = [];
      if (config.trickleIceMode === _constants.PEER.TRICKLE_ICE.NONE) {
        // Modify the offer to claim the Peer doesn't support trickle ICE.
        sdpHandlers.push(_handlers.removeTrickleIce);
      }
      if (config.removeBundling) {
        // Modify the offer to remove media bundling
        sdpHandlers.push(_handlers.removeBundling);
      }
      if (options.mediaDirections) {
        // Modify the offer to set media directions as desired.
        sdpHandlers.push((0, _handlers.changeMediaDirection)(options.mediaDirections));
      }
      if (sdpHandlers.length > 0) {
        // Run the SDP pipeline with only these handlers.
        offer.sdp = (0, _pipeline.runPipeline)(sdpHandlers, offer.sdp, {
          type: offer.type,
          endpoint: _constants.PEER.ENDPOINT.LOCAL
        });
      }
      log.info('Finished creating local offer.');
      resolve(offer);
    }).catch(reject);
  });
}

/***/ }),

/***/ 412:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = findReusableTransceiver;
/**
 * Finds a transceiver that can be reused.
 * A transceiver can be reused if it satisfies the following conditions:
 *   - it does not have a track on its sender
 *   - it has the same kind (audio or video) as what we specified
 *   - it has been used before (if it has not been used then we are not "reusing" it)
 * @method findReusableTransceiver
 * @param {string} kind The kind of transceiver to find (audio or video)
 * @returns {Object} Transceiver object that matches kind, has no sender track, and has currentDirection. Otherwise undefined.
 */
function findReusableTransceiver(kind) {
  const {
    proxyPeer
  } = this;
  const transceivers = proxyPeer.getTransceivers();
  return transceivers.find(transceiver => transceiver.sender.track == null && transceiver.receiver && transceiver.receiver.track && transceiver.receiver.track.kind === kind &&
  // Ensure the transceiver is not stopped, it could be null if negotiation has not yet complete.
  transceiver.currentDirection !== 'stopped');
}

/***/ }),

/***/ 6949:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getState;
/**
 * Retrieve a snapshot of the Peer object's current state.
 * @method getState
 * @return {Object}
 */
function getState() {
  const {
    proxyPeer,
    config,
    id
  } = this;
  return {
    id,
    config: config,
    localDesc: proxyPeer.localDescription,
    signalingState: proxyPeer.signalingState,
    localTracks: proxyPeer.localTracks,
    remoteTracks: proxyPeer.remoteTracks,
    senderTracks: proxyPeer.senderTracks
  };
}

/***/ }),

/***/ 503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getStats;
__webpack_require__(7107);
/**
 * Retrieve RTCStatsReport for a sender or the peerConnection.
 * @method getStats
 * @param {string} [TrackId] Return stats for peerConnection if trackId is not provided
 * @return {Promise} Resolves with the RTCStatsReport
 */
function getStats(trackId) {
  const {
    nativePeer,
    proxyPeer,
    log
  } = this;
  log.info(`Getting stats ${trackId ? 'for track.' : '.'}`);
  // If no trackId is supplied, get the stats from the RTCPeerConnection. Otherwise, find an RTCSender
  // associated with the trackId and get the stats from it.

  // Use the trackId if it was provided
  if (trackId) {
    return new Promise((resolve, reject) => {
      const senders = proxyPeer.getSenders();
      // search for a sender associated with the trackId
      const sender = senders.find(sender => sender.track.id === trackId);
      if (sender) {
        sender.getStats().then(resolve).catch(reject);
      } else {
        const errMsg = `Cannot find sender with trackId: ${trackId}`;
        log.info(errMsg);
        reject(new Error(errMsg));
      }
    });
  } else {
    // get the stats associated with the peerConnection if no trackId is supplied
    return nativePeer.getStats();
  }
}

/***/ }),

/***/ 8729:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getTransceivers;
/**
 * Retrieve the list of Transceivers on the Peer.
 * @method getTransceivers
 * @return {Array<RTCRtpTransceiver>}
 */
function getTransceivers() {
  const {
    proxyPeer
  } = this;

  // Return our Peer's saved list of transceivers instead of using the native
  //    getTransceivers API. This is for "proxied webrtc" mode, where a native
  //    API call causes delays.
  return proxyPeer.transceivers;
}

/***/ }),

/***/ 2254:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _addIceCandidate = _interopRequireDefault(__webpack_require__(6353));
var _addTransceiver = _interopRequireDefault(__webpack_require__(3331));
var _close = _interopRequireDefault(__webpack_require__(8478));
var _createAnswer = _interopRequireDefault(__webpack_require__(3570));
var _createOffer = _interopRequireDefault(__webpack_require__(8016));
var _findReusableTransceiver = _interopRequireDefault(__webpack_require__(412));
var _getState = _interopRequireDefault(__webpack_require__(6949));
var _getStats = _interopRequireDefault(__webpack_require__(503));
var _getTransceivers = _interopRequireDefault(__webpack_require__(8729));
var _removeTrack = _interopRequireDefault(__webpack_require__(4069));
var _replaceTrack = _interopRequireDefault(__webpack_require__(7111));
var _sendDTMF = _interopRequireDefault(__webpack_require__(4825));
var _setLocalDescription = _interopRequireDefault(__webpack_require__(5349));
var _setRemoteDescription = _interopRequireDefault(__webpack_require__(1404));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const methods = {
  addIceCandidate: _addIceCandidate.default,
  addTransceiver: _addTransceiver.default,
  close: _close.default,
  createAnswer: _createAnswer.default,
  createOffer: _createOffer.default,
  findReusableTransceiver: _findReusableTransceiver.default,
  getState: _getState.default,
  getStats: _getStats.default,
  getTransceivers: _getTransceivers.default,
  removeTrack: _removeTrack.default,
  replaceTrack: _replaceTrack.default,
  sendDTMF: _sendDTMF.default,
  setLocalDescription: _setLocalDescription.default,
  setRemoteDescription: _setRemoteDescription.default
};
var _default = exports["default"] = methods;

/***/ }),

/***/ 4069:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removeTrack;
/**
 * Remove a Track from the connection.
 * @method removeTrack
 * @param  {string} trackId An id for a Track object.
 */
function removeTrack(trackId) {
  const {
    nativePeer,
    proxyPeer,
    log
  } = this;
  log.info(`Removing track ${trackId}.`);
  const track = proxyPeer.senderTracks.find(track => track.id === trackId);
  if (!track) {
    log.info(`Invalid track ID ${trackId}; no such track found.`);
    return;
  } else if (proxyPeer.signalingState === ' closed') {
    log.info('Peer is closed; cannot remove track.');
    return;
  }

  // Get the RtpSender for the Track we want to remove.
  const sender = proxyPeer.getSenders().filter(sender => sender.track !== null).find(sender => sender.track.id === trackId);
  nativePeer.removeTrack(sender);
}

/***/ }),

/***/ 7111:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = replaceTrack;
__webpack_require__(7107);
/**
 * Replaces a specified transceiver's sender.track.
 * @method replaceTrack
 * @param {Object} newTrack The MediaStreamTrack we want to place into the sender.
 * @param {Object} options Options for specifying which transceiver's sender should be replaced. They are ordered by priority.
 * @param {Array} [options.trackId] The track id whose transceivers we want to set the direction of.
 * @return {Object} A Promise object which is fulfilled once the track has been replaced
 */
function replaceTrack(newTrack, options) {
  const {
    proxyPeer,
    log
  } = this;
  log.info(`Replacing track ${options.trackId} with new ${newTrack.kind} track.`);
  return new Promise((resolve, reject) => {
    // Find the transceiver related to the provided track ID.
    const targetTransceiver = proxyPeer.getTransceivers().find(transceiver => transceiver.sender.track && transceiver.sender.track.id === options.trackId);
    const sender = targetTransceiver ? targetTransceiver.sender : undefined;
    if (sender) {
      sender.replaceTrack(newTrack).then(resolve).catch(error => {
        log.info(`Failed to replace track; ${error.message}`);
        reject(error);
      });
    } else {
      log.info(`Failed to replace track; could not find track ${options.trackId}.`);
      reject(new Error(`Sender for track ${options.trackId} not found.`));
    }
  });
}

/***/ }),

/***/ 4825:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = sendDTMF;
/**
 * Send DTMF tones.
 * @method sendDTMF
 * @param {Object} DTMFOptions The DTMF options.
 * @param {string} DTMFOptions.tone DTMF tone to send. Valid values are [0,1,2,3,4,5,6,7,8,9,#].
 * @param {number} DTMFOptions.duration=100 The amount of time, in milliseconds, that each DTMF tone should last.
 * @param {number} DTMFOptions.intertoneGap=70 The length of time, in milliseconds, to wait between tones.
 * @param {Object} [sendOptions] The send options.
 * @param {func} [sendOptions.callback] Optional callback for tone event .
 * @param {string} [sendOptions.trackId] The trackId of the sender to use.
 * @return {Boolean} Whether the DTMF tones were inserted
 */
function sendDTMF(_ref, _ref2) {
  let {
    tone,
    duration = 100,
    intertoneGap = 70
  } = _ref;
  let {
    callback,
    trackId
  } = _ref2;
  const {
    proxyPeer,
    log
  } = this;
  log.info('Sending DTMF tones.', tone);
  if (!proxyPeer.getSenders) {
    log.info('Failed to send tones; getSenders is not supported by this browser.');
    return false;
  }
  const senders = proxyPeer.getSenders();
  // Use the trackId if it was provided
  if (trackId) {
    const sender = senders.find(sender => sender.track.id === trackId);
    if (!sender) {
      log.info(`Failed to send tones; could not find track ${trackId}.`);
      return false;
    }
    insertDTMF(sender, tone, duration, intertoneGap, callback, log);
    return true;
  } else {
    let result;
    for (let i = 0; i < senders.length; i++) {
      result = insertDTMF(senders[i], tone, duration, intertoneGap, callback, log);
      if (result) {
        return true;
      }
    }
    log.info('Failed to send tones; could not find an appropriate track.');
    return false;
  }
}

/**
 * Helper function to sendDTMF tones .
 * @private
 * @method insertDTMF
 * @param {sender} object
 * @param {string} tone
 * @param {number} duration
 * @param {number} intertoneGap
 * @param {Function} callback
 */
function insertDTMF(sender, tone, duration, intertoneGap, callback, log) {
  /**
   * Event handler when tone is played.
   * @private
   * @method handleToneChangeEvent
   * @param  {event} event
   */
  function handleToneChangeEvent(event) {
    if (event.tone !== '') {
      log.debug('Tone played: ' + event.tone);
    } else {
      log.debug('All tones have played.');
    }
  }
  if (sender.dtmf) {
    const dtmfSender = sender.dtmf;
    if (callback) {
      dtmfSender.ontonechange = callback;
    } else {
      dtmfSender.ontonechange = handleToneChangeEvent;
    }
    try {
      dtmfSender.insertDTMF(tone, duration, intertoneGap);
      return true;
    } catch (err) {
      log.debug(err.message);
      return false;
    }
  } else {
    log.debug('The sender requires DTMF which is not support by this browser.');
    return false;
  }
}

/***/ }),

/***/ 5349:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setLocalDescription;
var _constants = __webpack_require__(4507);
var _iceCollectionScheduledCheck = _interopRequireDefault(__webpack_require__(4839));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Utils.

/**
 * Sets an SDP as the local description of the connection.
 * The returned Promise will resolve when the Peer is ready for negotiation,
 *    taking into account the Peer's `trickleIceMode` configuration.
 * @method setLocalDescription
 * @param  {RTCSessionDescription} sessionDesc
 * @return {Promise}
 */
function setLocalDescription(desc) {
  const {
    nativePeer,
    proxyPeer,
    config,
    id,
    emitter,
    iceTimer,
    log
  } = this;

  // TODO: SDP pipeline here.
  log.info(`Setting local description ${desc.type} in ${proxyPeer.signalingState} state.`);
  log.debug(`Setting local description ${desc.type}:`, desc.sdp);

  /**
   * Scenario: A local answer SDP is being applied to the Peer, but it does
   *    not have a selected DTLS role yet. This should occur during initial
   *    negotiation, before responding with this Peer's answer.
   * Set the local Peer's DTLS role depending on what role was generated. This
   *    role will be kept throughout all renegotiations.
   */
  if (!this.dtlsRole && desc.type === 'answer') {
    const dtlsMatch = desc.sdp.match(/a=setup:(\w*?)[\r\n]/);
    if (dtlsMatch) {
      log.debug(`Selecting DTLS role ${dtlsMatch[1]}.`);
      this.dtlsRole = dtlsMatch[1];
    }
  }
  return new Promise((resolve, reject) => {
    // We always want to wait for the PeerConnection to be ready for
    //    negotiation before resolving setLocalDescription.
    // Each trickle ICE option (FULL/HALF/NONE) emits "negotiation ready" event once.
    emitter.once('onnegotiationready', () => {
      if (iceTimer.isStarted()) {
        // In a HALF trickle scenario, the Peer will be ready for negotiation
        //    before ICE collection has completed. Log that timing.
        log.debug(`Took ${iceTimer.timeFromStart()}ms to collect ICE candidates before negotiation.`);
      }
      resolve();
    });
    nativePeer.setLocalDescription(desc).then(() => {
      log.info('Finished setting local description.');
      log.debug(`State is now ${proxyPeer.signalingState}.`);
      if (config.trickleIceMode === _constants.PEER.TRICKLE_ICE.FULL) {
        // Trickling ICE candidates means that we can begin negotiation immediately.
        log.debug('Ready for negotiation (full trickleICE).');
        emitter.emit('onnegotiationready');
      } else {
        // ICE candidates aren't always gathered (only initially and when something
        //    changes), but we rely on "gathering complete" to know when the Peer is
        //    ready for negotiation. Give the Peer some time to start gathering
        //    before deciding if we need to wait for gathering to complete or not.
        // The timeout is needed because of a bug in Chrome:
        //    https://bugs.chromium.org/p/webrtc/issues/detail?id=1873
        // Known issue: If candidate collection takes less time than this timeout,
        //    the logged message will be incorrect, but will functionally still work.
        setTimeout(() => {
          if (proxyPeer.iceGatheringState === 'complete') {
            // Gathering is "complete", so we are ready for negotiation.
            log.debug('Ready for negotiation; ICE candidate collection not needed.');
            emitter.emit('onnegotiationready');
          } else {
            log.debug(`Waiting for ICE collection process (${config.trickleIceMode}).`);
            // Register the ice collection check function callback to start the candidate collection
            //  looping process
            proxyPeer.isIceCollectionCheckOngoing = true;
            (0, _iceCollectionScheduledCheck.default)(this);
          }
        }, 25);
      }
    }).catch(err => {
      log.info('Failed to set local description.');
      log.debug(`Peer ${id}: ${err}`);
      // Parse native error. Make it more understand and/or
      //    provide a better log about what went wrong.
      reject(err);
    });
  });
}

/***/ }),

/***/ 1404:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setRemoteDescription;
/**
 * Sets an SDP as the remote description of the connection.
 * @method setRemoteDescription
 * @param  {RTCSessionDescription} sessionDesc
 */
function setRemoteDescription(desc) {
  const {
    nativePeer,
    proxyPeer,
    id,
    log
  } = this;

  // TODO: SDP pipeline here.
  log.info(`Setting remote description ${desc.type} in ${proxyPeer.signalingState} state.`);
  log.debug(`Setting remote description ${desc.type}:`, desc.sdp);

  /**
   * Scenario: A remote answer SDP is being applied to the Peer, but it does
   *    not have a selected DTLS role yet. This should occur only when the
   *    initial negotiation is being completed.
   * Set the local Peer's DTLS role depending on what the remote Peer
   *    selected. This role will be kept throughout all renegotiations.
   */
  if (!this.dtlsRole && desc.type === 'answer') {
    const dtlsMatch = desc.sdp.match(/a=setup:(\w*?)[\r\n]/);
    if (dtlsMatch) {
      const localRole = dtlsMatch[1] === 'active' ? 'passive' : 'active';
      log.debug(`Selecting DTLS role ${localRole}. Remote Peer selected ${dtlsMatch[1]} DTLS role.`);
      this.dtlsRole = localRole;
    }
  }

  // TODO: Update `config.trickleIceMode` to either NONE or FULL (from HALF)
  //    depending on remote support, since HALF is only needed for initial.
  return new Promise((resolve, reject) => {
    nativePeer.setRemoteDescription(desc).then(() => {
      log.info('Finished setting remote description.');
      log.debug(`State is now ${proxyPeer.signalingState}.`);
      resolve();
    }).catch(err => {
      log.info('Failed to set remote description.');
      log.debug(`Peer ${id}: ${err}`);
      // Parse native error. Make it more understand and/or
      //    provide a better log about what went wrong.
      reject(err);
    });
  });
}

/***/ }),

/***/ 217:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _localDescription = _interopRequireDefault(__webpack_require__(406));
var _localTracks = _interopRequireDefault(__webpack_require__(9890));
var _remoteDescription = _interopRequireDefault(__webpack_require__(5397));
var _remoteTracksActive = _interopRequireDefault(__webpack_require__(8545));
var _remoteTracks = _interopRequireDefault(__webpack_require__(1203));
var _senderTracks = _interopRequireDefault(__webpack_require__(3692));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports["default"] = {
  localDescription: _localDescription.default,
  localTracks: _localTracks.default,
  remoteDescription: _remoteDescription.default,
  remoteTracks: _remoteTracksActive.default,
  remoteTracksAll: _remoteTracks.default,
  senderTracks: _senderTracks.default
};

/***/ }),

/***/ 406:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getLocalDescription;
/**
 * The SDP for the local end of the connection.
 * @method getLocalDescription
 */
function getLocalDescription() {
  const {
    nativePeer,
    log
  } = this;
  log.info('Getting local description.');
  const localDesc = nativePeer.localDescription;
  /*
   * Ensure it is a RTCSessionDescription object.
   * In some scenarios (based on browser?), it may return an empty object
   *    instead of undefined when there is no local description.
   * TODO: Determine if this is still needed, or if we can use the native
   *    property directly.
   */
  if (localDesc && localDesc.sdp && localDesc.type) {
    return localDesc;
  } else {
    return undefined;
  }
}

/***/ }),

/***/ 9890:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = localTracks;
/**
 * @method getLocalTracks
 * @return {Array} List of active Track objects added to the Peer locally.
 */
function localTracks() {
  const {
    proxyPeer,
    trackManager,
    log
  } = this;
  log.info('Getting local tracks.');

  // Return the list of Tracks from active senders.
  return proxyPeer.getSenders()
  /**
   * Remove any Senders that do not have an associated track.
   * We only want to retrieve Senders that do have tracks, because those are
   *    the local tracks that have been added to the Peer.
   * Senders without tracks are part of a Transceiver where the Receiver has
   *    a remote track, but no local track has been added to it. We don't
   *    care about this for the "get local tracks" operation.
   */.filter(sender => Boolean(sender.track)).map(sender => trackManager.get(sender.track.id)).filter(track => {
    // Make sure the trackManager has the track and that its active.
    // It's possible that Peer has the sender but not the actual track yet.
    return track && track.getState().state === 'live' && track.getStream().active;
  });
}

/***/ }),

/***/ 5397:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getRemoteDescription;
/**
 * The SDP for the remote end of the connection.
 * @method getRemoteDescription
 */
function getRemoteDescription() {
  const {
    nativePeer,
    log
  } = this;
  log.info('Getting remote description.');
  const remoteDesc = nativePeer.remoteDescription;
  /*
   * Ensure it is a RTCSessionDescription object.
   * In some scenarios (based on browser?), it may return an empty object
   *    instead of undefined when there is no local description.
   * TODO: Determine if this is still needed, or if we can use the native
   *    property directly.
   */
  if (remoteDesc && remoteDesc.sdp && remoteDesc.type) {
    return remoteDesc;
  } else {
    return undefined;
  }
}

/***/ }),

/***/ 1203:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getRemoteTracks;
/**
 * @method getRemoteTracks
 * @return {Array} List of active Track objects the Peer has received remotely.
 */
function getRemoteTracks() {
  const {
    proxyPeer,
    trackManager,
    log
  } = this;
  log.info('Getting remote tracks.');

  // Return the list of Tracks from active receivers.
  return proxyPeer.getReceivers()
  /**
   * Remove any Receivers that do not have an associated track.
   * We only want to retrieve Receivers that do have tracks, because those are
   *    the remote tracks that have been added to the Peer.
   * Receivers without tracks are part of a Transceiver where the Sender has
   *    a local track, but no remote track has been added to it. We don't
   *    care about this for the "get remote tracks" operation.
   */.filter(receiver => Boolean(receiver.track)).map(receiver => trackManager.get(receiver.track.id)).filter(track => {
    // Make sure the trackManager has the track
    return track && track.getState().state === 'live';
  });
}

/***/ }),

/***/ 8545:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getRemoteTracks;
/**
 * @method getRemoteTracks
 * @return {Array} List of active Track objects the Peer has received remotely.
 */
function getRemoteTracks() {
  const {
    proxyPeer,
    trackManager,
    log
  } = this;
  log.info('Getting remote tracks.');

  // Return the list of Tracks from active receivers.
  return proxyPeer.getReceivers()
  /**
   * Remove any Receivers that do not have an associated track.
   * We only want to retrieve Receivers that do have tracks, because those are
   *    the remote tracks that have been added to the Peer.
   * Receivers without tracks are part of a Transceiver where the Sender has
   *    a local track, but no remote track has been added to it. We don't
   *    care about this for the "get remote tracks" operation.
   */.filter(receiver => Boolean(receiver.track)).map(receiver => trackManager.get(receiver.track.id)).filter(track => {
    // Make sure the trackManager has the track and that its active.
    // It's possible that Peer has the receiver but not the actual track yet.
    return track && track.getState().state === 'live' && track.getStream().active;
  });
}

/***/ }),

/***/ 3692:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = senderTracks;
/**
 * This method is similar to the `localTracks` method, however this method returns
 *  all of the sender's tracks (ended or not) rather than just the active/live ones.
 *
 * @method senderTracks
 * @return {Array} List of Track objects added to the Peer locally.
 */
function senderTracks() {
  const {
    proxyPeer,
    log
  } = this;
  log.info('Getting sender tracks.');

  // Return the list of Tracks from senders.
  return proxyPeer.getSenders()
  /**
   * Remove any Senders that do not have an associated track.
   * We only want to retrieve Senders that do have tracks, because those are
   *    the local tracks that have been added to the Peer.
   * Senders without tracks are part of a Transceiver where the Receiver has
   *    a remote track, but no local track has been added to it. We don't
   *    care about this for the "get local tracks" operation.
   */.filter(sender => Boolean(sender.track)).map(sender => sender.track);
}

/***/ }),

/***/ 4839:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = iceCollectionScheduledCheck;
/**
 *
 * Util for emitting an event with the necessary peer information for the ice
 * collection scheduled check.
 * @method iceCollectionScheduledCheck
 * @param {Object} proxyBase The "base" of the Proxy Peer object.
 */
function iceCollectionScheduledCheck(proxyBase) {
  const {
    proxyPeer,
    iceTimer,
    iceCandidates,
    emitter,
    config
  } = proxyBase;

  // The time, in milliseconds, that ICE collection has taken so far.
  const elapsedTime = iceTimer.timeFromStart();
  emitter.emit('scheduledCheck', {
    iceCollectionDuration: elapsedTime,
    iceCandidates,
    iceGatheringState: proxyPeer.iceGatheringState,
    rtcPeerConnectionConfig: config,
    rtcLocalSessionDescription: proxyPeer.localDescription
  });
}

/***/ }),

/***/ 7208:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createTimer = createTimer;
/**
 * Prototype for a timer object that can keep time and be stopped and started.
 */
const timerPrototype = {
  /**
   * Start the timer
   * @returns {boolean} True if the timer was successfully started, false if it was already started.
   */
  start() {
    if (!this.isStarted()) {
      this._startTime = now();
      return true;
    }
    return false;
  },
  /**
   * Stops the timer
   * @returns {boolean} True if the timer was successfully stopped, false if it was already stopped.
   */
  stop() {
    if (this.isStarted()) {
      this._startTime = undefined;
      return true;
    }
    return false;
  },
  /**
   * @returns {boolean} True if the timer is started, false otherwise.
   */
  isStarted() {
    return Boolean(this._startTime);
  },
  /**
   * @returns {number} The time in milliseconds since the timer was started, or 0 if it wasn't started.
   */
  timeFromStart() {
    return this.isStarted() ? now() - this._startTime : 0;
  }
};

/**
 * @returns A timestamp in milliseconds since the unix-epoch
 */
function now() {
  return new Date().getTime();
}

/**
 * Create a new timer object. Timers are not started when created and need to be started manually.
 *
 * @returns {Object} The timer object that supports the timer interface.
 */
function createTimer() {
  return Object.create(timerPrototype);
}

/***/ }),

/***/ 4507:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PEER = exports.MEDIA_DIR = exports.ICE_COLLECTION_RESULT_TYPES = exports.ICE_COLLECTION_CHECK_REASONS = void 0;
/**
 * Constants relating to the Peer model.
 */
const PEER = exports.PEER = {
  TRICKLE_ICE: {
    FULL: 'FULL',
    HALF: 'HALF',
    NONE: 'NONE'
  },
  // Defined by the RTCPeerConnection.iceGatheringState spec.
  ICE_GATHERING_STATE: {
    NEW: 'new',
    GATHERING: 'gathering',
    COMPLETE: 'complete'
  },
  ENDPOINT: {
    LOCAL: 'local',
    REMOTE: 'remote'
  }
};

/**
 * SDP constants for media direction.
 * @type {Object}
 */
const MEDIA_DIR = exports.MEDIA_DIR = {
  INACTIVE: 'inactive',
  SEND_ONLY: 'sendonly',
  RECV_ONLY: 'recvonly',
  SEND_RECV: 'sendrecv'
};

/**
 * Reasons for calling the Ice Collection Check function.
 * @name ICE_COLLECTION_CHECK_REASONS
 */
const ICE_COLLECTION_CHECK_REASONS = exports.ICE_COLLECTION_CHECK_REASONS = {
  ICE_GATHERING_STATE_CHANGE: 'IceGatheringStateChanged',
  NEW_CANDIDATE: 'NewCandidate',
  SCHEDULED: 'Scheduled'
};

/**
 * Result types for the Ice Collection Check Function.
 * @name ICE_COLLECTION_RESULT_TYPES
 */
const ICE_COLLECTION_RESULT_TYPES = exports.ICE_COLLECTION_RESULT_TYPES = {
  START_CALL: 'StartCall',
  WAIT: 'Wait',
  ERROR: 'Error'
};

/***/ }),

/***/ 7654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = initialize;
exports.getBrowserDetails = void 0;
exports.getWebRTCSupportCapabilities = getWebRTCSupportCapabilities;
var _track = _interopRequireDefault(__webpack_require__(5626));
var _media = _interopRequireDefault(__webpack_require__(7237));
var _Peer = _interopRequireDefault(__webpack_require__(1655));
var _mediaManager = _interopRequireDefault(__webpack_require__(276));
var _peerManager = _interopRequireDefault(__webpack_require__(9908));
var _sessionManager = _interopRequireDefault(__webpack_require__(8876));
var _deviceManager = _interopRequireDefault(__webpack_require__(5902));
var _trackManager = _interopRequireDefault(__webpack_require__(5469));
var _webrtcManager = _interopRequireDefault(__webpack_require__(6371));
var _renderer = _interopRequireDefault(__webpack_require__(7707));
var _logs = __webpack_require__(271);
var _pipeline = _interopRequireDefault(__webpack_require__(8851));
var sdpHandlers = _interopRequireWildcard(__webpack_require__(5424));
var _utils = __webpack_require__(6555);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Models.

// Managers.

// SDP helpers.

// Utils

// Re-export this function so it can be used directly instead of through the
//    initialized WebrtcStack. It is renamed because of weird import/export behaviour.
const getBrowserDetails = exports.getBrowserDetails = _utils.getBrowserDetails;

/**
 * @returns An dictionary of features that are supported on this platform.
 */
function getWebRTCSupportCapabilities() {
  return {
    mediaDevices: Boolean(navigator.mediaDevices),
    peerConnection: Boolean(window.RTCPeerConnection)
  };
}
function initialize() {
  const log = _logs.logManager.getLogger('WebRTC');
  const browserDetails = getBrowserDetails();
  if (browserDetails.version) {
    log.debug(`Browser details: ${browserDetails.browser}, version ${browserDetails.version}.`);
  } else {
    log.debug('Browser details: Not supported by webRTC adapter.');
  }
  const renderer = new _renderer.default();
  const deviceManager = new _deviceManager.default();
  const trackManager = new _trackManager.default();
  const mediaManager = new _mediaManager.default({
    trackManager
  });
  const peerManager = new _peerManager.default({
    trackManager
  });
  const sessionManager = new _sessionManager.default({
    peerManager,
    mediaManager,
    trackManager,
    deviceManager
  });
  const webrtcManager = new _webrtcManager.default();
  return {
    models: {
      Track: _track.default,
      Media: _media.default,
      Peer: _Peer.default
    },
    // TODO: Make naming consistent.
    managers: {
      devices: deviceManager,
      media: mediaManager,
      peerManager: peerManager,
      sessionManager,
      track: trackManager,
      // Give access to the Log Manager.
      // TODO: Don't include it under managers. It's here now because of
      //    ProxyStack annoyingness.
      logs: _logs.logManager,
      webrtcManager,
      renderer
    },
    sdp: {
      pipeline: _pipeline.default,
      handlers: sdpHandlers
    },
    // Export this on the webRTC stack for backwards compatibility.
    getBrowserDetails
  };
}

/***/ }),

/***/ 271:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.logManager = void 0;
var _kandyLogger = _interopRequireDefault(__webpack_require__(671));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const manager = (0, _kandyLogger.default)({
  level: 'DEBUG'
});
const logManager = exports.logManager = manager;

/***/ }),

/***/ 5902:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WEBRTC_DEVICE_KINDS = void 0;
exports["default"] = DeviceManager;
__webpack_require__(9375);
var _logs = __webpack_require__(271);
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/*
 * A conversion from MediaDeviceInfo.kind values to their more common terms.
 * See: https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/kind
 * @enum {String}
 */
const WEBRTC_DEVICE_KINDS = exports.WEBRTC_DEVICE_KINDS = {
  audioinput: 'microphone',
  videoinput: 'camera',
  audiooutput: 'speaker'
};

/**
 * Manager for connected devices.
 * Keeps an up-to-date list of all devices.
 * @class DeviceManager
 */
function DeviceManager() {
  const log = _logs.logManager.getLogger('Manager', 'Device');

  // Internal variables.
  const emitter = new _eventemitter.default();
  // Store each device type separately, so that `deviceId` is unique
  //    per kind (there is a `default` deviceId per kind).
  let microphone = [];
  let camera = [];
  let speaker = [];

  // Check devices on initialization.
  checkDevices().then(() => {
    if (isListening) {
      // Emit an initial event to notify that devices are available.
      emitter.emit('change');
    } else {
      log.info('Initial media device discovery ignored.');
    }
  });

  // Check devices whenever they change.
  let isListening = true;
  let recentDeviceChange = false;
  navigator.mediaDevices.addEventListener('devicechange', () => {
    // A physical device change results in one event per
    //    device "kind". Group the events together.
    // Only emit an event if the Manager is supposed to
    //    be listening for changes.
    if (!recentDeviceChange && isListening) {
      log.info('Media device change detected.');
      recentDeviceChange = true;
      setTimeout(() => {
        recentDeviceChange = false;
        checkDevices().then(() => {
          if (isListening) {
            // Emit an event to notify of the change.
            emitter.emit('change');
          } else {
            log.info('Media device change ignored after being detected.');
          }
        });
      }, 50);
    } else {
      log.info(`Media device change detected, but ${!isListening ? 'ignoring' : 'throttling'}.`);
    }
  });

  /**
   * Sets the Manager to watch or ignore the "device change"
   *    events from the browser.
   * @method setListening
   * @param {Boolean} flag Whether to watch for events.
   * @return {undefined}
   */
  function setListening(flag) {
    log.debug(`Listening for device changes: ${flag}`);
    isListening = flag;
  }

  /**
   * Updates the stored device lists with the latest devices.
   * @method checkDevices
   * @return {Promise}
   */
  function checkDevices() {
    log.info('Checking media devices.');
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        // Clear the stored devices, to prevent duplicates.
        microphone = [];
        camera = [];
        speaker = [];
        devices.forEach(device => {
          const kind = WEBRTC_DEVICE_KINDS[device.kind];
          switch (kind) {
            case 'microphone':
              microphone.push(device);
              break;
            case 'camera':
              camera.push(device);
              break;
            case 'speaker':
              speaker.push(device);
              break;
          }
        });
        resolve(get());
      }).catch(reject);
    });
  }

  /**
   * Ask for permission and gets the list of available device(s) available from the end-user's devices.
   * @method setupDeviceInitialization
   * @param browserConstraints
   * @return {Object}
   */
  function setupDeviceInitialization(browserConstraints) {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(browserConstraints).then(mediaStream => {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
        const devices = checkDevices();
        resolve(devices);
      }).catch(reject);
    });
  }

  /**
   * Retrieves the stored device lists.
   * @method get
   * @return {Object}
   */
  function get() {
    return {
      microphone,
      camera,
      speaker
    };
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }
  function emit() {
    return emitter.emit(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    setListening,
    checkDevices,
    setupDeviceInitialization,
    get,
    on,
    once,
    off,
    emit
  };
}

/***/ }),

/***/ 276:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = MediaManager;
var _logs = __webpack_require__(271);
var _media = _interopRequireDefault(__webpack_require__(7237));
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Models that this manager directly manages.

// Libraries.

/**
 * Manager for Media objects.
 * Allows the creation and retrieval of media objects.
 * @class MediaManager
 */
function MediaManager(managers) {
  const log = _logs.logManager.getLogger('Manager', 'Media');

  // Internal variables.
  const trackManager = managers.trackManager;
  const medias = new Map();
  const emitter = new _eventemitter.default();

  /**
   * Retrieve a snapshot of all Media objects' current state.
   * @method getState
   * @return {Array}
   */
  function getState() {
    return getAll().map(id => get(id).getState());
  }

  /**
   * Workaround to get Firefox to behave similarly to Chrome regarding device permission prompts.
   * @method browserConstraintsWorkaround
   * @param  {MediaStreamConstraints}  constraints
   * @return {Object}  media constraints
   */
  function browserConstraintsWorkaround(constraints) {
    /**
     * Firefox workaround.
     *
     * Issue Summary: Browser behaviour for prompting the user for device
     *    permissions is not consistent for consecutive gUM calls. The following
     *    workaround makes it consistent if the less-specific constraint is
     *    provided.
     *
     * Context: The `deviceId` constraint format can be either a string or an
     *    object. The object format allows precise control over how the browser
     *    should try to get the track. It can be specified to fail if it can't
     *    fulfill the constraint (exact), or whether the constraint is "best
     *    effort" (ideal). When the string format is given, it follows the
     *    "ideal" behaviour.
     * See: https://developer.mozilla.org/en-US/docs/Web/API/ConstrainDOMString
     *
     *  - When the "ideal" behaviour is followed and the user has not given
     *      permission (and not disallowed), the browser will prompt the user
     *      for permission.
     *  - [Issue] When the "ideal" behaviour is followed and the user has given
     *      permission previously, the browser will not prompt the user for
     *      permission.
     *
     * Problem: When gUM is called for a different device (ideal behaviour) than
     *    permission was granted for previously, the browser will not prompt the
     *    user to give permission for the (new) device. This results in gUM
     *    using the original device for the new track.
     *
     * This happens on Firefox because the prompt for media permissions is
     *    specific to a single device. For Chrome, the prompt is generic to any
     *    device.
     * If permissions are always allowed ("remember my decision" on Firefox or
     *    default on Chrome), this issue wouldn't be seen.
     *
     * Workaround: When the behaviour (idea / exact) isn't specified, default
     *    to exact (instead of letting the browser default to ideal; as per the
     *    specification).
     *
     * This ensures that the browser always prompts the user to give permissions
     *    for the device (if not already granted). It is also more in-line with
     *    what might be expected when you ask for a certain device (ie. don't
     *    return a different device unless it was specified that it's okay).
     */
    for (const kind in constraints) {
      if (constraints[kind] && typeof constraints[kind] === 'object' && typeof constraints[kind].deviceId === 'string') {
        // Don't allow a "bare" value be provided for deviceId. Change it to use
        //    "exact".
        const id = constraints[kind].deviceId;
        constraints[kind].deviceId = {
          exact: id
        };
      }
    }
    return constraints;
  }

  /**
   * Wraps native mediaStream, adds tracks to trackManager and Media, and sets up event handlers on a given media.
   * @method setupMedia
   * @param {MediaStream} mediaStream Creating a Media object with it.
   * @param {string} type The media type to use when creating tracks.
   * @param {boolean} isDetached Specifies if the track is detached and can be used with or without a call.
   * @return {Media}
   */
  function setupMedia(mediaStream, type, isDetached) {
    const media = new _media.default(mediaStream, true);
    log.debug(`Creating Media with ID: ${media.id}.`);

    // Only add tracks to a Media objects using the `addTrack` method.
    // Specify that this is a local track we're adding
    mediaStream.getTracks().forEach(nativeTrack => {
      const wrappedTrack = trackManager.add(nativeTrack, type ? type : nativeTrack.kind, mediaStream, true, isDetached);
      media.addTrack(wrappedTrack);
    });
    media.once('media:stopped', mediaId => {
      remove(mediaId);
    });
    media.on('track:ended', _ref => {
      let {
        mediaId,
        trackId
      } = _ref;
      if (media.getTracks().length === 0) {
        remove(mediaId);
      }
    });
    media.on('track:muted', _ref2 => {
      let {
        mediaId,
        trackId
      } = _ref2;
    } // TBD: Add any extra behaviour (if needed) here
    );
    return media;
  }

  /**
   * Create a new local Media object.
   * Use the provided constraints to get user media as the base MediaStream.
   * @method createLocal
   * @param  {MediaStreamConstraints}  constraints
   * @param  {boolean} isDetached Specifies if the track is detached and can be used with or without a call.
   * @return {Promise}
   */
  function createLocal(constraints, isDetached) {
    const constraintsWorkaround = browserConstraintsWorkaround(constraints);

    // Get user media, ...
    return new Promise((resolve, reject) => {
      // TODO: Proper error checking.
      // TODO: Use the WebAPI directly here? Probably not.
      navigator.mediaDevices.getUserMedia(constraintsWorkaround).then(mediaStream => {
        // Only pass the type if it's screenshare, otherwise, let the media kind determine the type
        const media = setupMedia(mediaStream, undefined, isDetached);
        medias.set(media.id, media);
        // TODO: Better event. Include metadata?
        emitter.emit('media:new', media.id);
        resolve(media);
      }).catch(reject);
    });
  }

  /**
   * Creates a new local Screen Media object.
   * Use the provided constraints to get user media as the base MediaStream.
   * @method createLocalScreen
   * @param {MediaStreamConstraints} constraints
   * @param  {boolean} isDetached Specifies if the track is detached and can be used with or without a call.
   * @return {promise}
   */
  function createLocalScreen(constraints, isDetached) {
    const constraintsWorkaround = browserConstraintsWorkaround(constraints);
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getDisplayMedia(constraintsWorkaround).then(mediaStream => {
        // Only pass the type if it's screenshare, otherwise, let the media kind determine the type
        const type = 'screen';
        const media = setupMedia(mediaStream, type, isDetached);
        medias.set(media.id, media);
        // TODO: Better event. Include metadata?
        emitter.emit('media:new', media.id);
        resolve(media);
      }).catch(reject);
    });
  }

  /**
   * Create a new remote Media object.
   * Use provided stream/tracks as the base media objects.
   * @method createRemote
   * @param  {MediaStream} mediaStream Native MediaStream object.
   * @param  {Tracks[]} tracks Array of Track objects.
   * @return {Media}
   */
  function createRemote(stream) {
    let tracks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    const media = new _media.default(stream, false);
    tracks.forEach(track => {
      media.addTrack(track);
    });
    media.once('media:stopped', mediaId => {
      remove(mediaId);
    });
    media.on('track:ended', _ref3 => {
      let {
        mediaId,
        trackId
      } = _ref3;
      if (media.getTracks().length === 0) {
        remove(mediaId);
      }
    });
    medias.set(media.id, media);
    // TODO: Better event. Include metadata?
    emitter.emit('media:new', media.id);
    return media;
  }

  /**
   * Removes a Media object from the medias array.
   * @private
   * @method remove
   * @param {String} mediaId
   */
  function remove(mediaId) {
    const media = get(mediaId);
    if (media) {
      medias.delete(mediaId);
      emitter.emit('media:removed', mediaId);
    }
  }

  /**
   * Retrieve an existing Media object.
   * @method get
   * @param  {String} mediaId ID of the desired Media object.
   * @return {Media}
   */
  function get(mediaId) {
    const media = medias.get(mediaId);
    if (!media) {
      log.debug(`No media found with ID: ${mediaId}.`);
    }
    return media;
  }

  /**
   * Retrieve a list of all existing Media object's IDs.
   * @method getAll
   * @return {Array} List of Media IDs.
   */
  function getAll() {
    return Array.from(medias.keys());
  }

  /**
   * Finds the Media object that contains the specified Track.
   * @method findTrack
   * @param  {string}  trackId The ID of the Track to find.
   * @return {string} The ID of the Media object that contains the Track.
   */
  function findTrack(trackId) {
    // Search through all Media objects for the one that has the desired track.
    const allMedia = Array.from(medias.values());
    const media = allMedia.find(media => media.getTrack(trackId));
    if (media) {
      log.debug(`Found Media (${media.id}) with Track ${trackId}.`);
      return media.id;
    } else {
      log.debug(`Found no Media with Track ${trackId}.`);
    }
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    // Getter APIs.
    get,
    getAll,
    getState,
    findTrack,
    // Create APIs.
    createLocal,
    createLocalScreen,
    createRemote,
    // Event APIs.
    on,
    once,
    off
  };
}

/***/ }),

/***/ 9908:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = PeerManager;
var _logs = __webpack_require__(271);
var _Peer = _interopRequireDefault(__webpack_require__(1655));
var _uuid = __webpack_require__(4596);
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/**
 * Manager for Peer objects.
 * Allows the creation and retrieval of peer objects.
 * @method PeerManager
 */
function PeerManager(managers) {
  const log = _logs.logManager.getLogger('Manager', 'Peer');

  // Internal variables.
  const trackManager = managers.trackManager;
  const peers = new Map();
  const emitter = new _eventemitter.default();

  /**
   * Retrieve a snapshot of all Peer objects' current state.
   * @method getState
   * @return {Array}
   */
  function getState() {
    return getAll().map(id => get(id).getState());
  }

  /**
   * Create a new Peer using the provided configs.
   * @method create
   * @param  {Object} [config={}]
   * @return {Peer}
   */
  function create() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const peer = new _Peer.default((0, _uuid.v4)(), config, trackManager);
    peer.once('peer:closed', id => peers.delete(id));
    peers.set(peer.id, peer);
    emitter.emit('peer:new', peer.id);
    return peer;
  }

  /**
   * Retrieves an existing Peer object.
   * @method get
   * @param  {String} id ID of the desired Peer object.
   * @return {Peer}
   */
  function get(id) {
    const peer = peers.get(id);
    if (!peer) {
      log.debug(`No Peer found with ID: ${id}.`);
    }
    return peer;
  }

  /**
   * Retrieve a list of all existing Peer object's IDs.
   * @method getAll
   * @return {Array} List of Peer IDs.
   */
  function getAll() {
    return Array.from(peers.keys());
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    getState,
    get,
    getAll,
    create,
    // Event APIs.
    on,
    once,
    off
  };
}

/***/ }),

/***/ 7707:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Renderer;
__webpack_require__(9375);
__webpack_require__(1412);
__webpack_require__(1883);
__webpack_require__(286);
var _logs = __webpack_require__(271);
var _utils = __webpack_require__(6555);
/*
 * IMPORTANT NOTE: This file is largely duplicated in other packages (search filename in project).
 * Ideally, once we complete KJS-174, we can avoid this duplication, but for now ensure changes here
 * are reflected in the duplicates as necessary.
 */

/**
 * Renderer for managing where Tracks are rendered.
 */
function Renderer() {
  /*
   * Object holding reference to all tracks currently rendered and to where.
   *    Entry format: { containers, rendererId }
   *    `containers` is the array of HTMLElements where the track is rendered.
   *    `rendererId` is the ID used when creating DOM elements for this track.
   */
  const entries = {};

  /**
   * Renders this Track as a subelement of the specified element.
   * @method renderTrack
   * @param  {HTMLElement|String} container The DOM element to be rendered in,
   *    or a unique CSS selector for the DOM element.
   * @param  {String} [speakerId] The device ID to be used for audio output.
   * @return {boolean} true if rendering of track suceeded, false otherwise.
   */
  function renderTrack(track, container, speakerId) {
    const log = _logs.logManager.getLogger('Track', track.id);
    let element;
    // If a string was provided, use it as a CSS selector to find the element.
    if (typeof container === 'string') {
      log.info(`Rendering track in element using selector: ${container}`);
      element = document.querySelector(container);
      if (!element) {
        log.error(`Unable to get container with selector: ${container}.`);
        return false;
      }
    } else {
      log.info('Rendering track in provided HTMLElement.');
      element = container;
    }
    const type = track.getState().kind;
    // Create a unique rendering ID for this track.
    const rendererId = `${type}-${(0, _utils.makeSafeForCSS)(track.id)}`;

    // Get the existing entry for this track.
    let entry = entries[track.id];
    if (entry) {
      if (entry.containers.indexOf(element) > -1) {
        // Already rendered in element.
        log.warn('Failed to render track; already rendered in element.');
        return false;
      } else {
        // Rendering the track in a second element; no issue with that.
      }
    } else {
      // Create an empty entry; track is not rendered anywhere else.
      entry = {
        containers: [],
        rendererId
      };
    }

    // Element is a valid place to render track, so add it to the entry then render it.
    entry.containers.push(element);
    const renderer = document.createElement(type);
    renderer.id = rendererId;
    renderer.style.height = '100%';
    renderer.style.width = '100%';
    const stream = track.getStream();
    try {
      renderer.srcObject = stream;
    } catch (error) {
      log.debug('srcObject property not supported; reverting to createObjectURL.');
      // TODO: AdapterJS handles this, we should remove this.
      renderer.src = window.URL.createObjectURL(stream);
    }
    renderer.autoplay = 'true';
    if (type === 'video') {
      renderer.muted = 'true';
      // Needed for IOS autoplay.
      renderer.playsInline = 'true';
      // Needed for Android.
      renderer.play().catch(err => {
        log.debug(`Could not autoplay renderer #${renderer.id}: ${err.message}`);
      });
    }

    // Set speaker if it was provided and it's supported.
    if (speakerId && typeof renderer.setSinkId !== 'undefined') {
      // TODO: Better then/catch handling.
      renderer.setSinkId(speakerId).then(() => {
        log.debug(`Set to use speaker: ${speakerId}.`);
      }).catch(error => {
        log.debug(`Could not set speaker to use ${speakerId}: ${error.message}`);
      });
    } else if (speakerId && typeof renderer.setSinkId === 'undefined') {
      log.info('Failed to set speaker; setSinkId not supported in this browser.');
    }
    element.appendChild(renderer);

    // Save the new/updated entry to the Renderer scope.
    entries[track.id] = entry;
    return true;
  }

  /**
   * Stop rendering this Track from the specified element.
   * @method unrenderTrack
   * @param  {string}      trackId   ID of the track to be unrendered.
   * @param  {HTMLElement} container The DOM element to be removed from, or
   *     a unique CSS selector for the DOM element.
   * @return {boolean} true if unrendering of track suceeded, false otherwise.
   */
  function unrenderTrack(trackId, container) {
    const log = _logs.logManager.getLogger('Track', trackId);

    // Get the existing entry for this track.
    const entry = entries[trackId];
    if (!entry) {
      log.info('Failed to unrender track; not rendered anywhere.');
      return false;
    }
    let element;
    // If a string was provided, use it as a CSS selector to find the element.
    if (typeof container === 'string') {
      log.info(`Unrendering track from element using selector: ${container}`);
      element = document.querySelector(container);
      if (!element) {
        log.error(`Unable to get container with selector: ${container}.`);
        return false;
      }
    } else {
      log.info('Unrendering track from provided HTMLElement.');
      element = container;
    }
    const index = entry.containers.findIndex(item => item === element);
    if (index === -1) {
      // Not rendered in element.
      log.info('Failed to unrender track; not rendered in element.');
      return false;
    }
    const renderer = element.querySelector(`#${entry.rendererId}`);
    if (renderer.srcObject) {
      renderer.srcObject = null;
    } else if (renderer.src) {
      renderer.src = null;
    }
    element.removeChild(renderer);
    entry.containers.splice(index, 1);
    // If this track isn't rendered anywhere anymore, remove the reference to it.
    if (entry.containers.length === 0) {
      delete entries[trackId];
    }
    return true;
  }
  return {
    renderTrack,
    unrenderTrack
  };
}

/***/ }),

/***/ 8876:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = SessionManager;
var _logs = __webpack_require__(271);
var _session = _interopRequireDefault(__webpack_require__(8529));
var _uuid = __webpack_require__(4596);
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/**
 * Manager for Session objects.
 * Allows for creation and retrieval of session objects.
 * @method SessionManager
 */
function SessionManager(managers) {
  const log = _logs.logManager.getLogger('Manager', 'Session');
  // Internal variables.
  const sessions = new Map();
  const emitter = new _eventemitter.default();

  /**
   * Create a new Session object.
   * @method create
   * @param {Object} [config]
   * @param {Object} [config.peer] Configs for the Session's Peer object.
   * @return {Session}
   */
  function create() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const session = new _session.default((0, _uuid.v4)(), managers, config);
    session.once('session:ended', id => {
      sessions.delete(id);
      emitter.emit('session:removed', id);
    });
    sessions.set(session.id, session);
    emitter.emit('session:new', session.id);
    return session;
  }

  /**
   * Retrieve an existing Session object.
   * @method get
   * @param  {String} sessionId ID of the desired Session object.
   * @return {Session}
   */
  function get(sessionId) {
    const session = sessions.get(sessionId);
    if (!session) {
      log.debug(`No session found with ID: ${sessionId}.`);
    }
    return session;
  }

  /**
   * Retrieve a list of all existing Sessions.
   * @method getAll
   * @return {Array} List of Media IDs.
   */
  function getAll() {
    return Array.from(sessions.values());
  }

  /**
   * Get an existing Session object, and add media to it before returning.
   *    This method is an optimization. It combines `sessionManager.get` and
   *    `session.addWithMedia` into a single method instead of two.
   * @method getWithMedia
   * @return {Promise} Resolves with the Session and Media objects.
   */
  function getWithMedia(sessionId, mediaConstrants, dscpControls) {
    const session = sessions.get(sessionId);
    if (!session) {
      log.debug(`No session found with ID: ${sessionId}.`);
      return;
    }
    return new Promise((resolve, reject) => {
      session.addNewMedia(mediaConstrants, dscpControls).then(medias => {
        resolve({
          session,
          medias
        });
      }).catch(reject);
    });
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    create,
    get,
    getAll,
    getWithMedia,
    on,
    once,
    off
  };
}

/***/ }),

/***/ 5469:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = TrackManager;
var _track = _interopRequireDefault(__webpack_require__(5626));
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/**
 * Manager / store for Track objects.
 * @method TrackManager
 */
function TrackManager() {
  /**
   * The Track objects being managed.
   * @type {Map}
   */
  const tracks = new Map();
  const emitter = new _eventemitter.default();

  /**
   * Retrieve a Track object.
   * @method get
   * @param  {string} trackId
   * @return {Track}
   */
  function get(trackId) {
    return tracks.get(trackId);
  }

  /**
   * Retrieve a list of Track objects.
   * If no tracks are specified, will return all tracks.
   * @method getTracks
   * @param  {Array} [trackIds] List of tracks to retrieve.
   * @return {Array}
   */
  function getTracks(trackIds) {
    if (trackIds) {
      return trackIds.map(trackId => tracks.get(trackId));
    } else {
      return Array.from(tracks.values());
    }
  }

  /**
   * Wraps a MediaStreamTrack into a Track object and adds
   *    it to the manager.
   * @method add
   * @param  {MediaStreamTrack} track A native track object.
   * @param  {string} type The media type to use when creating tracks.
   * @param  {MediaStream} stream
   * @param  {boolean} isLocalTrack Specifies if the track parameter is a local one or a remote one.
   * @param  {boolean} isDetached Specifies if the track is detached and can be used with or without a call.
   * @return {Track} The added/wrapped Track object.
   */
  function add(track, type, stream, isLocalTrack, isDetached) {
    const targetTrack = tracks.get(track.id);

    // Chrome issue: track.stream is outdated and needs to be updated to newStream.
    // targetTrack.stream.active is false & targetTrack.stream.getTracks() gives us an empty array.
    // stream.active is true & stream.getTracks() gives us the correct array of tracks.
    // Set/update the new stream as the track's stream
    if (targetTrack && !targetTrack.getStream().active && stream.active) {
      // The track was previously registered and is being re-added with new stream
      targetTrack.setStream(stream);
      return targetTrack;
    } else if (targetTrack) {
      // This track is already registered.
      return targetTrack;
    } else {
      // Wrap the track as a Track object.
      const wrappedTrack = new _track.default(track, stream);

      // Set the requested media type (audio, video, screen) before we save it in the state
      wrappedTrack.setType(type);

      // Mark it as local (or remote) before we save it in the state
      wrappedTrack.setIsLocal(isLocalTrack);

      // Mark as detached before we save it in the state
      wrappedTrack.setIsDetached(isDetached);
      tracks.set(track.id, wrappedTrack);

      // Remove the track from the manager when it ends.
      wrappedTrack.once('ended', event => {
        if (!event.isUnsolicited || event.isDetached) {
          remove({
            trackId: track.id
          });
        }
      });
      emitter.emit('add', wrappedTrack.id);
      return wrappedTrack;
    }
  }

  /**
   * Remove a Track from the manager.
   * @method remove
   * @param  {string} trackId
   * @return {Boolean} Whether the Track existed (and hence removed).
   */
  function remove(_ref) {
    let {
      trackId
    } = _ref;
    const track = get(trackId);
    if (track) {
      emitter.emit('remove', trackId);
      tracks.delete(trackId);
      // Clean up any listeners.
      track.off('ended', remove);
    }
    return Boolean(track);
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    get,
    getTracks,
    add,
    remove,
    on,
    once,
    off
  };
}

/***/ }),

/***/ 6371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = WebRTCManager;
var _Peer = __webpack_require__(1655);
var _logs = __webpack_require__(271);
/**
 * "Manager" for general WebRTC functions.
 * @class WebRTCManager
 */
function WebRTCManager(managers) {
  const log = _logs.logManager.getLogger('Manager', 'WebRTC');

  /**
   * Retrieve the list of available and supported codecs based on the browser's capabilities for sending media.
   * @method getAvailableCodecs
   * @param {string} kind The kind of media of which to get the supported codecs of.
   * @return {Array|undefined}
   */
  function getAvailableCodecs(kind) {
    const capabilities = RTCRtpSender.getCapabilities(kind);
    if (capabilities && capabilities.codecs) {
      return capabilities.codecs;
    }
  }

  /**
   * Set provided proxies using the "set proxies" functions per WebRTC functionality
   * @param {Object} proxies An object of proxied WebRTC functionality
   * @param {Object} proxies.peerProxies An object containing WebRTC Peer functionality proxies
   */
  function setProxies(proxies) {
    // Set the provided peer proxies
    if (proxies.peer) {
      (0, _Peer.setPeerProxies)(proxies.peer);
      if (Object.keys(proxies.peer).length) {
        log.debug('Peer functionality has been updated with proxies.');
      } else {
        log.debug('Peer functionality has been updated to remove proxies.');
      }
    }

    // TODO: Set any other proxies (media? track?) as necessary
  }
  /**
   * The exposed API.
   */
  return {
    getAvailableCodecs,
    setProxies
  };
}

/***/ }),

/***/ 7237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Media;
var _logs = __webpack_require__(271);
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/**
 * Object to represent a "media" object.
 * Wraps a MediaStream object.
 * @class Media
 * TODO: Rename to Stream? Would be more straight-forward since Tracks can be
 *    managed directly (with trackManager), instead of through a "Media" object.
 */
function Media(nativeStream, isLocal) {
  const log = _logs.logManager.getLogger('Media', nativeStream.id);
  log.info(`Creating new ${isLocal ? 'local' : 'remote'} Media.`);

  // Internal variables.
  const id = nativeStream.id;
  const stream = nativeStream;
  const emitter = new _eventemitter.default();

  /**
   * Mapping of the IDs of this Media object's tracks to the Track object.
   * @type {Map}
   */
  const tracks = new Map();

  /**
   * Retrieve a snapshot of the Media object's current state.
   * @method getState
   * @return {Object}
   */
  function getState() {
    return {
      id: id,
      tracks: Array.from(tracks.values()).map(track => track.getState()),
      isLocal: isLocal
    };
  }

  /**
   * Add a track to this Media object.
   * @method addTrack
   * @param {Track} track The Track object to add to the Media object.
   */
  function addTrack(track) {
    if (tracks.has(track.id)) {
      log.debug(`Track (${track.id}) is already in Media (${id}).`);
      return;
    }

    // Add the native MediaStreamTrack to the MediaStream, if not already a part of the stream.
    if (!stream.getTracks().find(streamTrack => streamTrack.id === track.id)) {
      stream.addTrack(track.track);
    }

    // Add the Track to the Media object.
    tracks.set(track.id, track);

    /**
     * When a track ends, remove it from the Media object then clean it up.
     */
    track.on('ended', () => {
      const removedTrack = removeTrack(track.id);
      // Might be from old already deleted media which has no tracks anymore.
      if (removedTrack) {
        emitter.emit('track:ended', {
          mediaId: id,
          trackId: removedTrack.id
        });
      }
    });
    // TODO: Emit event or return result?
    emitter.emit('track:new', {
      mediaId: id,
      trackId: track.id
    });

    /**
     * When a track is muted, we generate our own internal event
     */
    track.on('muted', event => {
      const wrappedTrack = getTrack(event.trackId);
      if (wrappedTrack && wrappedTrack.track && wrappedTrack.track.muted) {
        // Emit our internal event.
        // Note that wrappedTrack.id is same as wrappedTrack.track & event.trackId
        emitter.emit('track:muted', {
          mediaId: id,
          trackId: event.trackId
        });
      }
    });

    /**
     * When a track is unmuted, we generate our own internal event
     */
    track.on('unmuted', event => {
      const wrappedTrack = getTrack(event.trackId);
      if (wrappedTrack && wrappedTrack.track && wrappedTrack.track.muted === false) {
        // Emit our internal event.
        // Note that wrappedTrack.id is same as wrappedTrack.track & event.trackId
        emitter.emit('track:unmuted', {
          mediaId: id,
          trackId: event.trackId
        });
      }
    });
  }

  /**
   * Remove a track from the Media object.
   * @private
   * @method removeTrack
   * @param  {string} trackId The Track to remove.
   */
  function removeTrack(trackId) {
    const track = getTrack(trackId);
    if (track) {
      tracks.delete(trackId);
      return track;
    }
  }

  /**
   * Stop all Tracks within this Media object.
   * @method stop
   */
  function stop() {
    getTracks().forEach(track => {
      track.stop();
    });
    emitter.emit('media:stopped', this.id);
  }

  /**
   * Retrieve the list of Track object this this Media object manages.
   * @method getTracks
   * @return {Array} The list of Track objects.
   */
  function getTracks() {
    return Array.from(tracks.values());
  }

  /**
   * Retrieve a specific Track object from within the Media object.
   * @method getTrack
   * @param  {String} trackId ID of the Track to retrieve.
   * @return {Track}
   */
  function getTrack(trackId) {
    return tracks.get(trackId);
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    id,
    tracks,
    isLocal,
    // Getter APIs.
    getState,
    getTracks,
    getTrack,
    // Create APIs.
    addTrack,
    // Cleanup APIs.
    stop,
    // Event APIs.
    on,
    once,
    off
  };
}

/***/ }),

/***/ 8529:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Session;
__webpack_require__(7107);
__webpack_require__(2234);
__webpack_require__(9375);
var _debounce2 = _interopRequireDefault(__webpack_require__(4255));
var _logs = __webpack_require__(271);
var _transceiverUtils = __webpack_require__(6106);
var _constants = __webpack_require__(4507);
var _pipeline = _interopRequireDefault(__webpack_require__(8851));
var _extractors = __webpack_require__(9556);
var _utils = __webpack_require__(6555);
var _iceCollectionScheduledCheck = _interopRequireDefault(__webpack_require__(4839));
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Helpers.

// SDP Helpers.

// General Utils.

// Libraries.

const unfixedDebounce = _debounce2.default.convert({
  fixed: false
});

/**
 * Object to represent a webRTC Session for a single peer.
 * "Session" being an abstraction of a webRTC connection between another peer.
 * Performs logic for initializing and connecting a peer connection.
 * Manages media added to / received from the peer connection.
 * @method Session
 */
function Session(id, managers) {
  let config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const log = _logs.logManager.getLogger('Session', id);
  log.info('Creating new Session.');

  // Internal variables.
  const sessionId = id;
  let peerId;
  const peerManager = managers.peerManager;
  const mediaManager = managers.mediaManager;
  const trackManager = managers.trackManager;
  const deviceManager = managers.deviceManager;
  const emitter = new _eventemitter.default();

  // Session settings
  const settings = {
    dscpControls: {}
  };

  // This structure is used to remember the dtls role of a peer relative to some remote sdp.
  // key: the remote sdp's session id (o= line).
  // value: the dtls role that the current peer's local sdp has.
  // This is needed because a remote SDP with the same sessionId as a previous one may reappear later on
  //  (music-unhold scenario) and the roles will be expected to be the same.
  const dtlsRoleRecord = new Map();

  // The latest remote description successfully set, even if the Peer has
  //    been recreated since it was set.
  let latestRemoteDescription;

  // Create and initialize the peer
  let peer = peerManager.create(config.peer);
  if (peer) {
    // The id of the created peer
    peerId = peer.id;
    setupPeerEventHandlers(peer);
  } else {
    throw new Error(`Peer creation error in Session ${sessionId}.`);
  }

  /**
   * Records the peer's dtlsRole if it hasn't been recorded yet and associates it with a remote sdp's sessionId.
   * @method recordNewDtlsRole
   */
  function recordNewDtlsRole() {
    const remoteSdpSessionId = (0, _extractors.getSdpSessionId)(peer.remoteDescription.sdp);
    if (!dtlsRoleRecord.get(remoteSdpSessionId)) {
      dtlsRoleRecord.set(remoteSdpSessionId, peer.dtlsRole);
    }
  }

  /**
   * @property {Array} getLocalTracks List of active Track objects the Session has added locally.
   */
  function getLocalTracks() {
    const peer = peerManager.get(peerId);
    if (peer) {
      return peer.localTracks;
    } else {
      return [];
    }
  }

  /**
   * @property {Array} getAllLocalTracks List of all Track objects the Session has added locally.
   */
  function getAllLocalTracks() {
    const peer = peerManager.get(peerId);
    if (peer) {
      // Get all local Track objects, not just the active ones.
      return peer.senderTracks.map(nativeTrack => trackManager.get(nativeTrack.id));
    } else {
      return [];
    }
  }

  /**
   * @property {Array} getRemoteTracks List of active Track objects the Session has received remotely.
   */
  function getRemoteTracks() {
    const peer = peerManager.get(peerId);
    if (peer) {
      return peer.remoteTracks;
    } else {
      return [];
    }
  }

  /**
   * Retrieve a snapshot of the Session object's current state.
   * @method getState
   * @return {Object}
   */
  function getState() {
    return {
      id: sessionId,
      localTracks: getLocalTracks(),
      remoteTracks: getRemoteTracks(),
      allLocalTracks: getAllLocalTracks()
    };
  }

  /**
   * Setup a warm PeerConnection.
   * @method warmup
   */
  function warmup() {}

  /**
   * Add Track objects to the Session.
   * @method addTracks
   * @param  {Array} tracks List of Track objects.
   * @param  {Object} dscpTrackMapping Track - DSCPSettings map
   */
  function addTracks(tracks, dscpTrackMapping) {
    const peer = peerManager.get(peerId);
    // TODO: Better error handling?
    if (peer) {
      const addTrackOrReuseTransceiverPromises = tracks.map(async track => {
        // We try to find a reusable transceiver that we can attach the track to achieve the following:
        // - Avoid transceiver pollution and needing to create a brand new transceiver to attach the track to.
        // - Allow re-adding of the same track type that has been previously removed.
        //   (This is so that we can still have re-adding of tracks when using the "basic" media API which imposes a 1-audio & 1-video limit)
        const reusableTransceiver = peer.findReusableTransceiver(track.track.kind);

        // If we can find a reusable transceiver, reuse it.
        if (reusableTransceiver) {
          // Replace the dummy track on the Sender with the actual track we want to send.
          try {
            await reusableTransceiver.sender.replaceTrack(track.track);
          } catch (err) {
            log.error(err);
            throw err;
          }
          /*
           * Set the correct direction on the Transceiver to include that we now want to send:
           *   - sendrecv --> sendrecv
           *   - sendonly --> sendonly
           *   - recvonly --> sendrecv
           *   - inactive --> sendonly
           */
          reusableTransceiver.direction = ['sendrecv', 'recvonly'].includes(reusableTransceiver.direction) ? 'sendrecv' : 'sendonly';
          log.info(`Track (${track.track.kind} : ${track.id}) reused transceiver (mid: ${reusableTransceiver.mid}).`);
        } else {
          // To get around the current limitation described above, we use peerConnection's `addTrack` when we can't find a reusable transceiver.
          // `addTrack` does one of the following when called:
          // - Create a new transceiver and attaches the track and stream to the sender
          // - Find and use an existing transceiver that has never been used to send data before and attach the track and stream to the sender.
          await peer.addTransceiver(track);
          log.info(`Added track (${track.track.kind} : ${track.id}).`);
        }

        // Indicate that the Session has a new Track.
        emitter.emit('new:track', {
          local: true,
          trackId: track.id
        });

        // Add the dscpControls to the session's settings map
        settings.dscpControls = (0, _utils.mergeValues)(settings.dscpControls, dscpTrackMapping);

        // Setup event handler for once the track ends
        track.once('ended', _ref => {
          let {
            isUnsolicited
          } = _ref;
          const peer = peerManager.get(peerId);
          if (peer) {
            // If the PeerConnection is closed, we don't need to worry about
            //    removing the track (and it would throw an error anyway).
            if (peer.signalingState !== 'closed') {
              // If this track ending was expected, remove it from the Peer
              //    immediately. Otherwise another operation will remove it.
              if (!isUnsolicited) {
                peer.removeTrack(track.id);

                // Bubble the event upwards to event listeners.
                emitter.emit('track:ended', {
                  local: true,
                  trackId: track.id,
                  isUnsolicited
                });
              } else {
                // In the event this track ending was due to a device change
                // we should update our device list before notifying the client that
                // the track ended so they don't try to use a removed device
                // `true` --> Tell the SDK to _not_ bubble this event to the
                //    application; only update state. The device disconnection
                //    will trigger it's own "device change" event.
                deviceManager.emit('change', true);

                // Wait 50ms before emitting `track:ended` to allow the SDK
                // a chance to update the device list in state
                setTimeout(() => {
                  emitter.emit('track:ended', {
                    local: true,
                    trackId: track.id,
                    isUnsolicited
                  });
                }, 50);
              }

              // Remove track from session dscp settings
              if (settings.dscpControls.hasOwnProperty(track.id)) {
                log.debug(`Removing track ${track.id} from session dscp settings`);
                delete settings.dscpControls[track.id];
              }
            } else {
              log.debug(`Received ended event for track ${track.id}, but its associated Peer ${peer.id} is closed. Ignoring this event...`);
            }
          }
        });
      });
      return Promise.all(addTrackOrReuseTransceiverPromises);
    }
  }

  /**
   * Creates a local SDP offer.
   * @method createOffer
   * @param  {Object} [options] Options for configuring the SDP.
   * @param  {Object} [options.mediaDirections] Directions to use for media.
   * @param  {Array}  [options.sdpHandlers] SDP handlers for modifying the local offer.
   * @return {Promise} Resolves with the offer.
   */
  function createOffer() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }

      // Remove options.mediaDirections.
      // This is because directions are now set in transceivers.
      if (options.mediaDirections) {
        setTransceiversDirection(options.mediaDirections);
        delete options.mediaDirections;
      }
      peer.createOffer(options).then(offer => {
        if (options.sdpHandlers || _pipeline.default.getHandlers().length) {
          log.debug('Modifying local offer with SDP pipeline.');
          offer.sdp = _pipeline.default.run(options.sdpHandlers, offer.sdp, {
            type: offer.type,
            endpoint: _constants.PEER.ENDPOINT.LOCAL
          });
        }
        resolve(offer);
      }).catch(reject);
    });
  }

  /**
   * Sets a local SDP.
   * @method setLocalDescription
   * @param  {Object} description The description containing the SDP to set as the local description.
   * @return {Promise} Resolves with the description.
   */
  function setLocalDescription(description) {
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }
      peer.setLocalDescription(description).then(() => {
        // Record the peer's dtls role if setting a local answer.
        if (description.type === 'answer') {
          recordNewDtlsRole();
        }

        // Set any parameters on the peer's senders if applicable
        setParameters();

        // Resolve with the _current_ local description, which may be
        //    different than the provided description due trickle ICE config.
        resolve(peer.localDescription);
      }).catch(reject);
    });
  }

  /**
   * Rollback the local description.
   * @method rollbackLocalDescription
   * @return {Promise} Resolves with the rollbacked description or error.
   */
  function rollbackLocalDescription() {
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }
      peer.setLocalDescription({
        type: 'rollback'
      }).then(() => {
        resolve(peer.localDescription);
      }).catch(reject);
    });
  }

  /**
   * Parse the result of a call to the ice collection check function and act accordingly:
   *  'StartCall' type - emit the negotiation ready event
   *  'Error' type - end the session
   *  'Wait' type - Schedule a callback to the ice collection check function
   * @method iceCollectionCheckResult
   * @param {Object} result The result of ice collection check function.
   * @param {string} result.type The action to take.
   * @param {number} result.wait How many ms to wait for the next scheduled check.
   */
  function iceCollectionCheckResult(result) {
    const peer = peerManager.get(peerId);
    if (!peer) {
      return new Error(`Peer not found in Session ${sessionId}.`);
    }
    if (result.type === _constants.ICE_COLLECTION_RESULT_TYPES.START_CALL) {
      log.info('Proceeding with the negotiation as instructed by the ice collection check.');
      peer.isIceCollectionCheckOngoing = false;
      peer.emitter.emit('onnegotiationready');
    } else if (result.type === _constants.ICE_COLLECTION_RESULT_TYPES.ERROR) {
      log.info('Cleaning up session as instructed by the ice collection check.');
      peer.isIceCollectionCheckOngoing = false;
      const localTracks = getLocalTracks();
      localTracks.forEach(track => track.stop());
      end();
    } else if (result.type === _constants.ICE_COLLECTION_RESULT_TYPES.WAIT) {
      // If `result.wait` is not set, then the ice collection check function is only waiting for either
      //  ice candidate events or ice gathering state change events
      if (result.wait) {
        log.debug(`Setting a scheduled check for the ice collection check after ${result.wait} ms`);
        peer.iceLoop = setTimeout(() => (0, _iceCollectionScheduledCheck.default)(peer), result.wait);
      }
    } else {
      log.info('Unexpected result type from ICE collection check function, ending call.');
      peer.isIceCollectionCheckOngoing = false;
      const localTracks = getLocalTracks();
      localTracks.forEach(track => track.stop());
      end();
    }
  }

  /**
   * Sets parameters on the RTCRtpSenders
   * @param {Object} mediaConstraints
   */
  function setParameters(mediaConstraints) {
    // RTCRtpSender.setParameters is currently unsupported on Firefox (or at least not supported as it should be)
    if ((0, _utils.getBrowserDetails)().browser === 'firefox') {
      log.debug('Setting sender parameters not supported on Firefox; skipping.');
      return;
    }
    const promises = [];

    // Set the DSCPControls (i.e., network priorities) if set in the session's settings
    for (const trackId in settings.dscpControls) {
      promises.push(new Promise((resolve, reject) => {
        log.debug(`Setting networkPriority ${settings.dscpControls[trackId]} for sender with track ${trackId}`);
        setNetworkPriority(trackId, settings.dscpControls[trackId]).then(resolve).catch(reject);
      }));
    }
    return Promise.all(promises);
  }

  /**
   * Sets the networkPriority in the peer connection's sender's encodings.
   * @method setNetworkPriority
   * @param {string} trackId The track ID
   * @param {string} networkPriority The network priority value to set
   * @return {Promise} Resolves with the setParameters()
   */
  function setNetworkPriority(trackId, networkPriority) {
    const peer = peerManager.get(peerId);
    const senders = peer.getSenders();

    // search for a sender associated with the provided track id
    const sender = senders.find(sender => sender.track.id === trackId);
    if (sender) {
      // Need to perform a getParameters() prior to a setParameters()
      const parameters = sender.getParameters();
      parameters.encodings.forEach(encoding => {
        encoding.networkPriority = networkPriority;
      });
      return sender.setParameters(parameters);
    } else {
      const errMsg = `Cannot find sender associated with trackId: ${trackId}`;
      log.info(errMsg);
      return Promise.reject(errMsg);
    }
  }

  /**
   * Generates (and sets) a local SDP offer.
   * @method generateOffer
   * @param  {Object} [options] Options for configuring the SDP.
   * @param  {Object} [options.mediaDirections] Directions to use for media.
   * @param  {Array}  [options.sdpHandlers] SDP handlers for modifying the local offer.
   * @return {Promise} Resolves with the offer.
   */
  function generateOffer() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // Backwards compatibility: Create the offer and set it as one operation.
    return new Promise((resolve, reject) => {
      createOffer(options).then(setLocalDescription).then(resolve).catch(reject);
    });
  }

  /**
   * Replaces a specified transceiver's sender.track.
   * @method replaceTrack
   * @param {Object} newTrack The MediaStreamTrack we want to place into the sender.
   * @param {Object} options Options for specifying which transceiver's sender should be replaced. They are ordered by priority.
   * @param {String} [options.trackId] The transceiver with the specific sender.track.id.
   * @param {String} [options.mid] The transceiver with the specific media id.
   * @return {Object} A Promise object which is fulfilled once the track has been replaced
   */
  function replaceTrack(newTrack, options) {
    const peer = peerManager.get(peerId);
    const track = trackManager.get(newTrack.id);
    return peer.replaceTrack(track.track, options).then(() => {
      track.once('ended', _ref2 => {
        let {
          isUnsolicited
        } = _ref2;
        const peer = peerManager.get(peerId);
        if (peer) {
          // If the PeerConnection is closed, we don't need to worry about
          //    removing the track (and it would throw an error anyway).
          if (peer.signalingState !== 'closed') {
            // If this track ending was expected, remove it from the Peer
            //    immediately. Otherwise another operation will remove it.
            if (!isUnsolicited) {
              peer.removeTrack(track.id);
            }
            emitter.emit('track:ended', {
              local: true,
              trackId: track.id,
              isUnsolicited
            });
            // Remove track from session dscp settings
            if (settings.dscpControls.hasOwnProperty(track.id)) {
              log.debug(`Removing track ${track.id} from session dscp settings`);
              delete settings.dscpControls[track.id];
            }
          } else {
            log.debug(`Received ended event for track ${track.id}, but its associated Peer ${peer.id} is closed. Ignoring this event...`);
          }
        }
      });
      emitter.emit('track:replaced', {
        oldTrackId: options.trackId,
        trackId: newTrack.id
      });
    }).catch(err => err);
  }

  /**
   * Sets the direction of transceivers.
   * @method setTransceiversDirection
   * @param {Object} mediaDirections Options for specifying the directions we want to set for certain medias (i.e., audio and video)
   * @param {Array} [mediaDirections.audio] The direction we want to set of the transceivers with audio tracks
   * @param {Array} [mediaDirections.video] The direction we want to set of the transceivers with video tracks
   * @return {undefined}
   */
  function setTransceiversDirection(mediaDirections) {
    const peer = peerManager.get(peerId);

    // Set EVERY Transceiver's direction. This includes those with active tracks
    //    and those without.
    peer.getTransceivers().forEach(transceiver => {
      const kind = transceiver.receiver.track.kind;
      (0, _transceiverUtils.setTransceiverDirection)(transceiver, mediaDirections[kind]);
    });
  }

  /**
   * Processes (and sets) a remote SDP offer.
   * @method processOffer
   * @param  {RTCSessionDescription} offer
   * @param  {Object} [options] Options for configuring the SDP.
   * @param  {Array}  [options.sdpHandlers] SDP handlers for modifying the remote offer.
   * @return {Promise}
   */
  function processOffer(offer) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }
      if (options.sdpHandlers || _pipeline.default.getHandlers().length) {
        log.debug('Modifying remote offer with SDP pipeline.');
        offer.sdp = _pipeline.default.run(options.sdpHandlers, offer.sdp, {
          type: offer.type,
          endpoint: _constants.PEER.ENDPOINT.REMOTE
        });
      }
      peer.setRemoteDescription(offer).then(() => {
        // Set the offer as the latest remote description.
        latestRemoteDescription = offer;
        resolve();
      }).catch(reject);
    });
  }

  /**
   * Creates a local SDP answer.
   * @method createAnswer
   * @param  {Object} [options] Options for configuring the SDP.
   * @param  {Object} [options.mediaDirections] Directions to use for media.
   * @param  {Array}  [options.sdpHandlers] SDP handlers for modifying the local answer.
   * @return {Promise} Resolves with the answer.
   */
  function createAnswer() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }

      // Remove options.mediaDirections.
      // This is because directions are now set in transceivers.
      if (options.mediaDirections) {
        setTransceiversDirection(options.mediaDirections);
        delete options.mediaDirections;
      }

      // Set the dtlsRole here if the following are true:
      // - It previously existed for this specific remote sdp.
      // - It hasn't been set on a recreated peer yet.
      const remoteSdpSessionId = (0, _extractors.getSdpSessionId)(peer.remoteDescription.sdp);
      const previousDtlsRole = dtlsRoleRecord.get(remoteSdpSessionId);
      if (!peer.dtlsRole && previousDtlsRole) {
        peer.dtlsRole = previousDtlsRole;
      }
      peer.createAnswer(options).then(answer => {
        if (options.sdpHandlers || _pipeline.default.getHandlers().length) {
          log.debug('Modifying local answer with SDP pipeline.');
          answer.sdp = _pipeline.default.run(options.sdpHandlers, answer.sdp, {
            type: answer.type,
            endpoint: _constants.PEER.ENDPOINT.LOCAL
          });
        }
        resolve(answer);
      }).catch(reject);
    });
  }

  /**
   * Generates (and sets) a local SDP answer.
   * @method generateAnswer
   * @param  {Object} [options] Options for configuring the SDP.
   * @param  {Object} [options.mediaDirections] Directions to use for media.
   * @param  {Array}  [options.sdpHandlers] SDP handlers for modifying the local answer.
   * @return {Promise} Resolves with the answer.
   */
  function generateAnswer() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // For backwards compatibility: Should use other APIs directly.
    return new Promise((resolve, reject) => {
      createAnswer(options).then(setLocalDescription).then(resolve).catch(reject);
    });
  }

  /**
   * Processes (and sets) a remote SDP answer.
   * @method processAnswer
   * @param  {RTCSessionDescription} answer
   * @param  {Object} [options] Options for configuring the SDP.
   * @param  {Array}  [options.sdpHandlers] SDP handlers for modifying the remote answer.
   * @return {Promise}
   */
  function processAnswer(answer) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (options.sdpHandlers || _pipeline.default.getHandlers().length) {
      log.debug('Modifying remote answer with SDP pipeline.');
      answer.sdp = _pipeline.default.run(options.sdpHandlers, answer.sdp, {
        type: answer.type,
        endpoint: _constants.PEER.ENDPOINT.REMOTE
      });
    }
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }
      peer.setRemoteDescription(answer).then(() => {
        // Record the peer's dtls role.
        recordNewDtlsRole();

        // Set the answer as the latest remote description.
        latestRemoteDescription = answer;
        resolve();
      }).catch(reject);
    });
  }

  /**
   * Add an ICE candidate from the remote endpoint.
   * @method addIceCandidate
   * @param  {RTCIceCandidate} candidate
   * @param  {Object} [options]
   * @param  {string} [options.label] The Peer to perform the operation on.
   * @return {Promise}
   */
  function addIceCandidate(candidate) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
      }
      peer.addIceCandidate(candidate).then(resolve).catch(reject);
    });
  }

  /**
   * End the Session.
   * @method end
   */
  function end() {
    log.info('Ending Session.');
    const peer = peerManager.get(peerId);
    if (peer) {
      peer.close();
    }
    emitter.emit('session:ended', sessionId);
  }

  /**
   * Removes specified Track objects from the Session.
   * @method removeTrack
   * @param  {Array} trackIds List of IDs of Track objects to remove.
   */
  function removeTracks(trackIds) {
    const peer = peerManager.get(peerId);
    if (peer) {
      // Get the list of all tracks on the Peer (event ended ones).
      const allLocalTracks = peer.senderTracks;
      trackIds.forEach(trackId => {
        if (allLocalTracks.findIndex(track => track.id === trackId) > -1) {
          peer.removeTrack(trackId);
          // Remove the track from the session dscp settings
          if (settings.dscpControls.hasOwnProperty(trackId)) {
            log.debug(`Removing track ${trackId} from session dscp settings`);
            delete settings.dscpControls[trackId];
          }
        }
      });
    }
  }

  /*
   * Restarts ICE connection
   * @method restartIce
   */
  function restartIce() {
    const peer = peerManager.get(peerId);
    if (peer) {
      peer.restartIce();
    }
  }

  /*
   * Get the DTLS role of the Peer
   * @method getDtlsRole
   * @return {string} The DTLS role of the Peer
   */
  function getDtlsRole() {
    const peer = peerManager.get(peerId);
    if (peer) {
      return peer.dtlsRole;
    }
  }

  /**
   * Send DTMF tones on specified Track object from the Session.
   * @method sendDTMF
   * @param {Object} options The DTMF options.
   * @param {string} options.tone DTMF tone to send. Valid values are [0,1,2,3,4,5,6,7,8,9,#].
   * @param {number} [options.duration=100] The amount of time, in milliseconds, that each DTMF tone should last.
   * @param {number} [options.intertoneGap=70] The length of time, in milliseconds, to wait between tones.
   * @param {Object} [sendOptions] The send options.
   * @param {func} [sendOptions.callback] Optional callback for tone event .
   * @param {string} [sendOptions.trackId] The trackId of the sender to use.
   * @return {boolean} The success or fail indicator
   */
  function sendDTMF(DTMFOptions) {
    let sendOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const peer = peerManager.get(peerId);
    if (peer) {
      return peer.sendDTMF(DTMFOptions, sendOptions);
    } else {
      return false;
    }
  }

  /**
   * Retrieve RTCStatsReport from a sender.
   * @method getStats
   * @param  {string} trackId The track id associated with a sender.
   * @return {Promise}
   */
  function getStats(trackId) {
    return new Promise((resolve, reject) => {
      const peer = peerManager.get(peerId);
      if (!peer) {
        reject(new Error(`Peer not found in Session ${sessionId}.`));
        return;
      }
      peer.getStats(trackId).then(resolve).catch(reject);
    });
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * Sets up event handlers on a given peer.
   * @method setupPeerEventHandlers
   * @param {PeerConnection} targetPeer The peer to set event handlers on.
   */
  function setupPeerEventHandlers(targetPeer) {
    targetPeer.oniceconnectionstatechange = event => {
      emitter.emit('peer:iceConnectionStateChange', {
        iceConnectionState: targetPeer.iceConnectionState
      });
    };

    // TODO: Use `uniqueLabel` when setting event listeners (and bubbling events).
    // When the peer gets an ICE candidate, emit it as
    //  a message to be sent to the other end.
    targetPeer.onicecandidate = event => {
      emitter.emit('onicecandidate', {
        candidate: event.candidate
      });
    };

    /*
     * Ice Collection Check Events:
     *
     * Emit an event for the session channel everytime:
     *  - the ICE gathering state changes
     *  - an ICE candidate is collected
     *  - it is time for a scheduled call to the collection check function
     *
     */
    targetPeer.onicegatheringstatechange = event => {
      // Only emit the event if we are in an ongoing ice collection check loop
      if (targetPeer.isIceCollectionCheckOngoing) {
        // Clear any previous timeout/loop
        if (targetPeer.iceLoop) {
          clearTimeout(targetPeer.iceLoop);
          targetPeer.iceLoop = undefined;
        }
        emitter.emit('peer:iceGatheringStateChange', {
          reason: _constants.ICE_COLLECTION_CHECK_REASONS.ICE_GATHERING_STATE_CHANGE,
          iceCollectionDuration: targetPeer.iceTimer.timeFromStart(),
          iceCandidates: targetPeer.iceCandidates,
          iceGatheringState: targetPeer.iceGatheringState,
          rtcPeerConnectionConfig: targetPeer.config,
          rtcLocalSessionDescription: targetPeer.localDescription
        });
      }
    };

    // Debounce the listener for the ice candidate event since they can be emitted quite quickly
    //  one after another. Options: leading:true will ensure the first invocation always occur, and
    //  trailing:false (default) ensures the last invocation will occur after the delay as appropriate.
    targetPeer.on('iceCandidateCollected', unfixedDebounce(50)(iceCollectionInfo => {
      // Only emit the event if we are in an ongoing ice collection check process
      if (targetPeer.isIceCollectionCheckOngoing) {
        // Clear any previous timeout/loop
        if (targetPeer.iceLoop) {
          clearTimeout(targetPeer.iceLoop);
          targetPeer.iceLoop = undefined;
        }
        emitter.emit('peer:iceCandidateCollected', {
          reason: _constants.ICE_COLLECTION_CHECK_REASONS.NEW_CANDIDATE,
          ...iceCollectionInfo
        });
      }
    }, {
      leading: true
    }));
    targetPeer.on('scheduledCheck', iceCollectionInfo => {
      // Only emit the event if we are in an ongoing ice collection check loop
      if (targetPeer.isIceCollectionCheckOngoing) {
        // Clear any previous timeout/loop
        if (targetPeer.iceLoop) {
          clearTimeout(targetPeer.iceLoop);
          targetPeer.iceLoop = undefined;
        }
        emitter.emit('peer:iceCollectionScheduledCheck', {
          reason: _constants.ICE_COLLECTION_CHECK_REASONS.SCHEDULED,
          ...iceCollectionInfo
        });
      }
    });

    // Handle when the Peer receives a new remote track.
    targetPeer.ontrack = track => {
      let media = mediaManager.get(track.getStream().id);
      if (media) {
        // Add the new Track to its Media object.
        media.addTrack(track);
      } else {
        // Create a new Media object using the Track.
        media = mediaManager.createRemote(track.getStream(), [track]);
      }
      track.once('ended', () => {
        emitter.emit('track:ended', {
          local: false,
          trackId: track.id,
          // If a remote track is ended, then a remote action triggered it. Consider
          //    this solicited since we don't want to take an action here.
          isUnsolicited: false
        });
      });
      const {
        kind
      } = track.getState();
      log.info(`Received new track (${kind} : ${track.id})`);

      // Indicate that the Session has a new Track.
      emitter.emit('new:track', {
        local: false,
        trackId: track.id
      });
    };
  }

  /**
   * Creates a new peer and replaces the current peer being used by this session.
   *     This will close the previous Peer, stopping any media being sent/received on it.
   * @method recreatePeer
   */
  async function recreatePeer() {
    const oldPeer = peer;
    const newPeer = peerManager.create(config.peer);
    if (newPeer) {
      // The id of the created peer
      peerId = newPeer.id;
      log.debug(`Recreated Peer with ID: ${peerId}`);
      peer = newPeer;

      // Copy tracks
      await Promise.all(oldPeer.localTracks.map(async oldLocalTrack => {
        await newPeer.addTransceiver(oldLocalTrack);
      }));

      // Set event handlers
      setupPeerEventHandlers(newPeer);

      // Close the old peer
      oldPeer.close();
    } else {
      throw new Error(`Peer creation error in Session ${sessionId}.`);
    }
  }
  function getPeer() {
    return peer;
  }
  function getRemoteDescription() {
    return peer.remoteDescription;
  }
  function getLatestRemoteDesc() {
    return latestRemoteDescription;
  }

  /**
   * Given a list of media section IDs, return the list of remote track IDs from
   *     the Transceivers that the media sections represent.
   * @param {Array<string>} mids List of media section IDs.
   * @return {Array<string>} List of remote track IDs.
   */
  function getRemoteTrackIdsFromTransceivers(mids) {
    const transceivers = peer.getTransceivers();
    const remoteTrackIds = [];
    // Iterate over every transceiver
    transceivers.forEach(transceiver => {
      // If the transceiver's mid value is in our list of mids, add it to the
      //    remoteTrackIds array to be returned.
      // The `if` condition looks sketchy because we are comparing a string to
      //    a number.
      if (mids.some(mid => mid + '' === transceiver.mid)) {
        const id = transceiver.receiver.track.id;
        remoteTrackIds.push(id);
      }
    });
    return remoteTrackIds;
  }

  /**
   * Get all active, incoming remote tracks that are part of the Session.
   * @return {Array<string>} List of remote track IDs.
   */
  function getIncomingRemoteTrackIds() {
    const transceivers = peer.getTransceivers();
    const remoteTrackIds = [];
    transceivers.forEach(transceiver => {
      // Check the `direction` of the transceiver.
      // For incoming calls, the `currentDirection` property will not be set since that transceiver
      // is not yet fully negotiated.
      const isReceiving = transceiver.mid !== null && transceiver.direction.includes('recv') && transceiver.receiver.track.readyState === 'live';
      if (isReceiving) {
        remoteTrackIds.push(transceiver.receiver.track.id);
      }
    });
    return remoteTrackIds;
  }

  /**
   * Get all active, remote tracks that are part of the Session.
   * @return {Array<string>} List of remote track IDs.
   */
  function getActiveRemoteTrackIds() {
    const transceivers = peer.getTransceivers();
    const remoteTrackIds = [];
    transceivers.forEach(transceiver => {
      // transceiver.mid !== null --> The Transceiver is in the SDP.
      // currentDirection --> The Transceiver has been negotiated.
      // currentDirection.includes(recv) --> It has a remote track.
      // track.readyState === live ---> It is active (...not thorough).
      const isReceiving = transceiver.mid !== null && transceiver.currentDirection && transceiver.currentDirection.includes('recv') && transceiver.receiver.track.readyState === 'live';
      if (isReceiving) {
        remoteTrackIds.push(transceiver.receiver.track.id);
      }
    });
    return remoteTrackIds;
  }

  /**
   * Session method to load an audio file and insert it into the Session by
   *    replacing an existing audio track temporarily.
   *
   * Provides feedback at two points in time:
   *    1) When the audio file starts playing, or fails to start playing.
   *        Done by fulfilling the method's Promise.
   *    2) When the audio file ends playing, or encounters an error while playing.
   *        Done by emitting an event.
   *
   * If the original audio track is replaced, but cannot be put back on the Session afterwards,
   *    it is considered an error scenario. To "fix" this, the method will stop that track.
   *    this is meant to avoid it being a "ghost" track. It will:
   *        1) Clean-up resources and release the microphone,
   *        2) Allow an application to handle it the same as any other track ending unsolicated.
   *
   * @method insertAudio
   * @param {string} filePath
   * @return {Promise} Resolves when audio file starts playing. Rejects if fails to start.
   */
  function insertAudio(filePath) {
    return new Promise((resolve, reject) => {
      let isReady = false;
      /*
       * `playIfReady` needs to be called twice to start playing the audio file.
       *    Once to ensure it "can play through".
       *    Once to ensure the media will be streamed through the Peer.
       */
      function playIfReady() {
        if (isReady) {
          audio.play();
        } else {
          isReady = true;
        }
      }

      /*
       * End the original track from the Call, but pretend that it was "unsolicited". This
       *    makes it appear the same as if something other than the SDK stopped the track
       *    so that it falls into the same error-handling scenario as them.
       */
      function endOriginalTrack() {
        log.info(`Stopping track ${oldTrack.id} to release the microphone after error.`);
        oldTrack.track.stop();
        oldTrack.track.onended(new Event('track-error'));
      }

      // Get the audio track we will be replacing temporarily.
      const peer = peerManager.get(peerId);
      const oldTrack = peer.localTracks.find(track => {
        return track.track.kind === 'audio' && track.track.readyState === 'live';
      });
      if (!oldTrack) {
        reject(new Error('No valid local audio track found to insert audio file on.'));
      }
      // The ID of the track currently on the Call.
      let currentTrackId = oldTrack.id;
      const audio = new Audio(filePath);
      // Set the volume to 20%.
      audio.volume = 0.2;

      // Create a source node from that MediaElement.
      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);

      // Connect the source node to the destination (which has a MediaStream).
      const dest = context.createMediaStreamDestination();
      source.connect(dest);
      const audioTrack = dest.stream.getAudioTracks()[0];

      /*
       * Replace the existing audio track on the Peer with the file's track.
       * When it has been replaced, that is 1 of 2 conditions to be met before playing it.
       */
      peer.replaceTrack(audioTrack, {
        trackId: oldTrack.id
      }).then(() => {
        // The original track has successfully been replaced; take note of that.
        currentTrackId = audioTrack.id;
        log.debug('Replaced audio from file media.');
        playIfReady();
      }).catch(err => {
        log.info(`Failed to replace audio with file media: ${err.message}.`);
        reject(new Error('Failed to replace audio track with file media.'));
      });

      /*
       * Audio event listeners:
       *    - canplaythrough: Enough of the file has been loaded that buffering isn't needed.
       *    - play: The file has started playing.
       *    - error: An error was encountered.
       *    - ended: The file has stopped playing.
       *
       * From our usage of `audio`:
       *    - canplaythrough: Happens once, before we start playing the file.
       *    - play: Indicates we have started playing the file.
       *    - error: Most likely that the file could not start playing because `new Audio(filePath)`
       *        failed. Could also happen mid-play, but unknown.
       *    - ended: Indicates the file reached the end (successfully).
       *
       * Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
       */

      // When the track "can play through", that is 1 of 2 conditions to be met before playing it.
      audio.oncanplaythrough = () => {
        log.debug('File media ready to be played.');
        playIfReady();
      };

      // When the file start's playing, resolve the `insertAudio` promise to provide feedback.
      audio.onplay = () => {
        log.debug(`Audio file started playing. Duration of ${audio.duration} seconds.`);
        resolve(audio.duration);
      };

      // On an error, reject the `insertAudio` promise to provide feedback.
      audio.onerror = () => {
        log.info('Encountered error trying to play audio file.');

        // If the original track is not on the Peer when this error happened,
        //    try to put it back before rejecting the `insertAudio` method.
        if (currentTrackId !== oldTrack.id) {
          peer.replaceTrack(oldTrack.track, {
            trackId: audioTrack.id
          }).catch(() => {
            // If we can't "rollback" the operation, end the original track
            //    to prevent it from becoming a "ghost" track.
            endOriginalTrack();
          });
        }
        // Reject the promise if it hasn't been fulfilled.
        reject(new Error('Failed to play audio file.'));
        // Emit a failure event in case the promise has already been fulfilled.
        emitter.emit('audioFileEnded', false);
      };

      // When the file ends, replace the original audio track back on the Peer.
      audio.onended = event => {
        log.debug('Audio file ended playing.');
        peer.replaceTrack(oldTrack.track, {
          trackId: audioTrack.id
        }).then(() => {
          log.debug('Replaced original audio track.');
          emitter.emit('audioFileEnded', true);
        }).catch(err => {
          log.info('Failed to replace original audio track.', err);
          endOriginalTrack();
          // Failed to replace the original audio track.
          emitter.emit('audioFileEnded', false);
        });
      };
    });
  }

  /**
   * Special-case method that combines getUserMedia and adding the tracks to
   *    the Session.
   * The goal of combining these methods is for Proxy-mode, to reduce the number
   *    of times messages need to cross the channel. This function reduces the
   *    trips from 3 (createLocal, getTracks, addTracks) to 1 (addNewMedia).
   * @method addNewMedia
   * @param {Object} mediaConstraints
   * @return {Promise}
   */
  function addNewMedia(constraints, dscpControls) {
    /*
     * Helper method that wraps the getUserMedia functions on the MediaManager.
     *    The wrapper is to prevent them from rejecting, so even a failure will
     *    resolve the promise returned by this function. This allows the calling
     *    function to wait for all promises to settle, so that media can be
     *    cleaned-up if need be. (For some reason Promise.allSettled was causing
     *    errors...)
     * @method getMedia
     */
    function getMedia(constraints) {
      const {
        audio,
        video,
        screen
      } = constraints;
      return new Promise(resolve => {
        if (audio || video) {
          mediaManager.createLocal({
            audio,
            video
          }).then(media => {
            resolve({
              status: 'fulfilled',
              value: media
            });
          }).catch(err => {
            resolve({
              status: 'rejected',
              value: err
            });
          });
        } else if (screen) {
          mediaManager.createLocalScreen({
            screen
          }).then(media => {
            resolve({
              status: 'fulfilled',
              value: media
            });
          }).catch(err => {
            resolve({
              status: 'rejected',
              value: err
            });
          });
        }
      });
    }
    return new Promise((resolve, reject) => {
      const {
        audio,
        video,
        screen
      } = constraints;
      let mediaProm, screenProm;
      if (audio || video) {
        mediaProm = getMedia({
          audio,
          video
        });
      }
      if (screen) {
        screenProm = getMedia({
          screen
        });
      }
      Promise.all([mediaProm, screenProm]).then(results => {
        if (results.some(result => result && result.status === 'rejected')) {
          // At least one promise rejected. Clean-up any successful media, then
          //    reject the original promise.
          const medias = results.filter(result => result && result.status === 'fulfilled').map(result => result.value);
          Promise.all(medias.map(media => media.stop)).then(() => {
            const err = results.find(result => result.status === 'rejected').value;
            let errMessage;
            if (err.name === 'OverconstrainedError') {
              errMessage = `Failed to get media due to constraint: ${err.constraint}.`;
            } else {
              errMessage = `Failed to get media => Name: ${err.name}; Error Message :${err.message}.`;
            }
            log.info(errMessage);
            const newErr = new Error(errMessage);
            newErr.name = err.name;
            reject(newErr);
          });
        } else {
          // All media was gathered successfully.
          const dscpTrackMapping = {};
          const tracks = results.reduce((acc, cur) => {
            // Add the tracks from the current media object to the accumulator.
            if (cur) {
              const tracks = cur.value.getTracks();
              if (dscpControls) {
                for (const track of tracks) {
                  if (track.getType() === 'audio' && dscpControls.audioNetworkPriority) {
                    dscpTrackMapping[track.id] = dscpControls.audioNetworkPriority;
                  } else if (track.getType() === 'video' && dscpControls.videoNetworkPriority) {
                    dscpTrackMapping[track.id] = dscpControls.videoNetworkPriority;
                  } else if (track.getType() === 'screen' && dscpControls.screenNetworkPriority) {
                    dscpTrackMapping[track.id] = dscpControls.screenNetworkPriority;
                  }
                }
              }
              return acc.concat(tracks);
            }
            // If cur is undefined, just return the accumulator.
            return acc;
          }, []);
          addTracks(tracks, dscpTrackMapping).then(() => {
            const medias = results.filter(result => result && result.value).map(result => result.value);
            resolve(medias);
          }).catch(reject);
        }
      });
    });
  }

  /**
   * The exposed API.
   */
  return {
    id: sessionId,
    config,
    // Getter APIs.
    get peer() {
      return getPeer();
    },
    getState,
    get localTracks() {
      return getLocalTracks();
    },
    get remoteTracks() {
      return getRemoteTracks();
    },
    get allLocalTracks() {
      return getAllLocalTracks();
    },
    warmup,
    addTracks,
    removeTracks,
    replaceTrack,
    setTransceiversDirection,
    // Negotiation APIs.
    createOffer,
    createAnswer,
    setLocalDescription,
    getRemoteDescription,
    getLatestRemoteDesc,
    generateOffer,
    processOffer,
    generateAnswer,
    processAnswer,
    iceCollectionCheckResult,
    // Other APIs.
    recreatePeer,
    rollbackLocalDescription,
    addIceCandidate,
    restartIce,
    getDtlsRole,
    end,
    sendDTMF,
    getStats,
    setParameters,
    getRemoteTrackIdsFromTransceivers,
    getIncomingRemoteTrackIds,
    getActiveRemoteTrackIds,
    insertAudio,
    addNewMedia,
    // Event APIs.
    on,
    once,
    off
  };
}

/***/ }),

/***/ 5626:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Track;
var _logs = __webpack_require__(271);
var _eventemitter = _interopRequireDefault(__webpack_require__(8985));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

/**
 * Wrapper object for a native MediaStreamTrack object.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack
 * @method Track
 */
function Track(mediaTrack, mediaStream) {
  const log = _logs.logManager.getLogger('Track', mediaTrack.id);
  log.info(`Creating new ${mediaTrack.kind} Track.`);

  // Internal variables.
  const id = mediaTrack.id;
  const track = mediaTrack;
  let stream = mediaStream;
  let type;
  let isLocalTrack;
  let isDetatchedTrack;
  let constraints = {};
  const emitter = new _eventemitter.default();

  /**
   * When a track ends, the Track itself doesn't do anything about it.
   * It "bubbles" the event up to be handled at a higher level.
   */
  track.onended = event => {
    // Check whether this function was called because a native event was emitted
    //    or if it was called manually by the SDK.
    const isNative = event instanceof Event;
    const endpoint = isLocalTrack ? 'local' : 'remote';
    const trigger = isNative ? 'unsolicited' : 'solicited';
    log.debug(`Track ended (${endpoint}, ${trigger}).`, event);
    emitter.emit('ended', {
      trackId: track.id,
      /*
       * If an event triggered this listener, then it was a remote notification
       *    (for remote track) or browser action (for local track) that caused it.
       *    If it was a local track, then the track ending was not part of a
       *    renegotiation and something will need to handle this situation.
       *
       * Otherwise, the SDK called `track.onended()` when we stopped the track as
       *    part of an operation. The operation should handle the track being
       *    ended since it was solicited.
       */
      isUnsolicited: isNative,
      isDetached: isDetached()
    });
  };

  /**
   * When a track is muted, we forward this to any listener.
   * This handler is typically invoked by actions triggered outside the
   * direct control of the webrtc SDK.
   */
  track.onmute = event => {
    log.debug('Event emitted: ', event);
    emitter.emit('muted', {
      trackId: track.id,
      mediaId: stream.id,
      isLocal: isLocalTrack
    });
  };

  /**
   * When a track is unmuted, we forward this to any listener.
   * This handler is typically invoked by actions triggered outside the
   * direct control of the webrtc SDK.
   */
  track.onunmute = event => {
    log.debug('Event emitted: ', event);
    emitter.emit('unmuted', {
      trackId: track.id,
      mediaId: stream.id,
      isLocal: isLocalTrack
    });
  };
  function setType(mediaType) {
    type = mediaType;
  }
  function getType() {
    return type;
  }
  function setIsLocal(isLocal) {
    isLocalTrack = isLocal;
  }
  function isLocal() {
    return isLocalTrack;
  }
  function setIsDetached(detached) {
    isDetatchedTrack = detached;
  }
  function isDetached() {
    return isDetatchedTrack;
  }
  function setStream(newStream) {
    stream = newStream;
  }
  function getStream() {
    return stream;
  }

  /**
   * Retrieve a snapshot of the Track object's current state.
   * @method getState
   * @return {Object}
   */
  function getState() {
    return {
      id,
      streamId: stream.id,
      kind: track.kind,
      type,
      isLocal: isLocalTrack,
      label: track.label,
      muted: track.muted,
      enabled: track.enabled,
      state: track.readyState,
      detached: isDetatchedTrack
    };
  }

  /**
   * Set this Track to be disabled and disallow the Track to render the source stream.
   * @method mute
   */
  function mute() {
    track.enabled = false;
  }

  /**
   * Set this Track to be enabled and allow the Track to render the source stream.
   * @method unmute
   */
  function unmute() {
    track.enabled = true;
  }

  /**
   * Calls native stop() function to deassociate the source and the track.
   * @method stop
   */
  function stop() {
    if (track.readyState === 'ended') {
      log.debug('Track already ended.');
      return;
    }
    track.stop();
    /**
     * Treat stopping the track the same as it being ended.
     * Normally, onended is not triggered when `stop` is called, only when it is
     *    "remotely ended".
     */
    track.onended();
  }

  /**
   * Gets the currently set constraints for the track.
   * @method getConstraints
   * @return {Object}
   */
  function getConstraints() {
    return constraints;
  }

  /**
   * Set the values for constrainable properties of the track.
   * @method applyConstraints
   * @param  {Object} constraints The list of constrainable properties.
   */
  function setConstraints(constr) {
    constraints = constr;
  }
  function on() {
    return emitter.on(...arguments);
  }
  function once() {
    return emitter.once(...arguments);
  }
  function off() {
    return emitter.off(...arguments);
  }

  /**
   * The exposed API.
   */
  return {
    id,
    // Track APIs.
    getState,
    mute,
    unmute,
    stop,
    getConstraints,
    setConstraints,
    // Event APIs.
    on,
    off,
    once,
    // The native track and stream was accessible before, so it was
    //    used when it probably shouldn't have been.
    // TODO: Find a better solution.
    track,
    setStream,
    getStream,
    setType,
    getType,
    setIsLocal,
    isLocal,
    setIsDetached,
    isDetached
  };
}

/***/ }),

/***/ 9556:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getSdpSessionId = getSdpSessionId;
/**
 * Extracts the session ID from the SDP.
 * Session ID is located in the o= line.
 * Ref: https://tools.ietf.org/html/rfc4566#section-5.2
 * @method getSdpSessionId
 * @param  {string} sdp A valid SDP string.
 * @return {string} The SDP's session ID.
 */
function getSdpSessionId(sdp) {
  const oLine = sdp.match(/o=.*/gm);
  if (oLine && oLine[0]) {
    return oLine[0].split(' ')[1];
  }
}

/***/ }),

/***/ 5424:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.changeMediaDirection = changeMediaDirection;
exports.preventDtlsRoleChange = preventDtlsRoleChange;
exports.removeBundling = removeBundling;
exports.removeTrickleIce = removeTrickleIce;
__webpack_require__(2234);
var _logs = __webpack_require__(271);
var _constants = __webpack_require__(4507);
// Constants.

const log = _logs.logManager.getLogger('SdpPipeline');

/**
 * SDP handler to remove the trickle ICE option from media groups.
 * Modifies the SDP so it claims to not support trickle ICE.
 * @method removeTrickleIce
 * @param  {Object} sdp
 * @param  {Object} info
 * @param  {String} info.type
 * @param  {String} info.endpoint
 * @param  {Object} originalSdp
 * @return {Object}
 */
function removeTrickleIce(sdp, info, originalSdp) {
  sdp.media.forEach(media => {
    if (media.iceOptions === 'trickle') {
      log.debug(`Removing trickle ICE option from ${media.type} media.`);
      delete media.iceOptions;
    }
  });
  return sdp;
}

/**
 * SDP handler to delete the bundle groupings line from the SDP.
 * PeerConnections do not have an option to completely disable bundling, so
 *    manually removing the line from the SDP is needed to prevent bundling.
 * @method removeBundling
 * @param  {Object}     sdp           The session description.
 * @param  {Object}     info          Information about the session description.
 * @param  {RTCSdpType} info.type     The session description's type.
 * @param  {String}     info.endpoint Which end of the connection created the SDP.
 * @param  {Object}     originalSdp   The original SDP before any modifications.
 * @return {Object}
 */
function removeBundling(sdp, info, originalSdp) {
  if (sdp.groups) {
    log.debug('Removing SDP bundling groups.');
    delete sdp.groups;
  }
  return sdp;
}

/**
 * Currying function to create an SDP handler.
 * The SDP handler modifies the SDP to change the direction of media.
 * @method changeMediaDirection
 * @param  {Object} mediaDirections
 * @param  {string} [audio] Direction to set for audio.
 * @param  {string} [video] Direction to set for video.
 * @return {Function} SDP handler.
 */
function changeMediaDirection(_ref) {
  let {
    audio,
    video
  } = _ref;
  function isValid(direction) {
    return Object.values(_constants.MEDIA_DIR).includes(direction);
  }

  /**
   * SDP handler to change the direction of media a-lines.
   */
  return (sdp, info, originalSdp) => {
    sdp.media.forEach(media => {
      if (media.type === 'audio' && isValid(audio)) {
        media.direction = audio;
      } else if (media.type === 'video' && isValid(video)) {
        media.direction = video;
      }
    });
    return sdp;
  };
}

/**
 * SDP handler to modify the DTLS role of a locally generated answer SDP.
 *
 * The point of this SDP handler is to avoid a DTLS role conflict during a
 *    renegotiation. A role conflict occurs when DTLS roles have been selected
 *    during initial negotiation, but during renegotiation, the answerer selects
 *    the opposite role than previously used.
 *
 * This handler only needs to be used when the Peer is generating an answer SDP.
 *    That is the only point when a conflicting role can be chosen.
 *
 * This handler prevents the role changing by comparing the SDP's role with the
 *    role that the Peer previously selected. If they conflict, the Peer's
 *    previous role is used.
 *
 * Related stories: KAA-1426, KAA-1562.
 * References: https://groups.google.com/forum/#!topic/discuss-webrtc/gsw3OEAwNKo
 * @method preventDtlsRoleChange
 * @param  {Object}     newSdp          The session description.
 * @param  {Object}     info            Information about the session description.
 * @param  {RTCSdpType} info.type       The session description's type.
 * @param  {string}     info.endpoint   Which end of the connection created the SDP.
 * @param  {string}     [info.dtlsRole] The previously select DTLS role of the Peer.
 * @param  {Object}     originalSdp     The sdp in its initial state.
 * @return {Object}                     The modified SDP.
 */
function preventDtlsRoleChange(newSdp, info, originalSdp) {
  /**
   * This SDP handler only affects local answer SDPs.
   *  - Only local because we are trying to prevent role conflict issues caused
   *        by the answerer choosing the "wrong" role during a renegotiation.
   *  - Only answer because offers are always actpass.
   */
  if (info.endpoint === 'local' && info.type === 'answer') {
    for (const mLine of newSdp.media) {
      /**
       * If the generated DTLS role is different than what the Peer expects,
       *    replace it. The Peer expects the DTLS role to stay the same
       *    throughout renegotiations.
       */
      if (mLine.setup && info.dtlsRole && mLine.setup !== info.dtlsRole) {
        log.debug(`Changing DTLS role from ${mLine.setup} to ${info.dtlsRole}.`);
        mLine.setup = info.dtlsRole;
      }
    }
  }
  return newSdp;
}

/***/ }),

/***/ 8851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.runPipeline = runPipeline;
var _isFunction2 = _interopRequireDefault(__webpack_require__(524));
var _isArray2 = _interopRequireDefault(__webpack_require__(283));
var _cloneDeep2 = _interopRequireDefault(__webpack_require__(9321));
var _sdpTransform = _interopRequireDefault(__webpack_require__(4722));
var _logs = __webpack_require__(271);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Libraries.

const log = _logs.logManager.getLogger('SdpPipeline');

/**
 * Basic SDP pipeline runner.
 * Does not include any default handlers.
 * @method sdpPipeline
 * @param  {Array}      handlers       List of functions that transform the SDP.
 * @param  {String}     sdp            The session description.
 * @param  {RTCSdpType} info           Information about the session description.
 * @param  {RTCSdpType} info.type      The session description's type.
 * @param  {String}     info.endpoint  Which end of the connection created the SDP.
 * @param  {Boolean}    info.isInitiator Whether this session initiated the connection or not.
 * @return {String}     The modified session description.

 */
function runPipeline(handlers, sdp, info) {
  const objectSdp = _sdpTransform.default.parse(sdp);
  const originalSdp = Object.freeze(objectSdp);
  let newSdp = (0, _cloneDeep2.default)(originalSdp);
  if ((0, _isArray2.default)(handlers)) {
    handlers.forEach(handler => {
      if ((0, _isFunction2.default)(handler)) {
        newSdp = handler(newSdp, info, originalSdp);
      } else {
        log.error('SDP handler not a function; skipping.');
      }
    });
  }
  return _sdpTransform.default.write(newSdp);
}

/**
 * Create an instance of the SDP pipeline.
 * Allows for persistent SDP handlers to be set and implicitly used.
 * @method createPipeline
 * @return {Object} An SDP pipeline.
 */
function createPipeline() {
  /**
   * SDP handlers that should be included with every pipeline run.
   * @type {Array}
   */
  let defaultHandlers = [];

  /**
   * Use the pipeline to process an SDP.
   * @method run
   * @param  {Array}      handlers      List of functions that transform the SDP.
   * @param  {String}     sdp           The session description.
   * @param  {RTCSdpType} info          Information about the session description.
   * @param  {RTCSdpType} info.type     The session description's type.
   * @param  {String}     info.endpoint Which end of the connection created the SDP.
   * @return {String}     The modified session description.
   */
  function run() {
    let handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let sdp = arguments.length > 1 ? arguments[1] : undefined;
    let info = arguments.length > 2 ? arguments[2] : undefined;
    return runPipeline(handlers.concat(defaultHandlers), sdp, info);
  }

  /**
   * Set the SDP handlers that should be included with every pipeline run.
   * @method setHandlers
   * @param  {Array} handlers List of SDP handler functions.
   */
  function setHandlers(handlers) {
    if ((0, _isArray2.default)(handlers)) {
      defaultHandlers = defaultHandlers.concat(handlers);
    }
  }

  /**
   * Get the SDP handlers that are included with every pipeline run.
   * @method getHandlers
   * @return {Array} List of SDP handler functions.
   */
  function getHandlers() {
    return defaultHandlers;
  }
  return {
    run,
    setHandlers,
    getHandlers
  };
}

// Export an instance of the pipeline to be used by everything.
var _default = exports["default"] = createPipeline();

/***/ }),

/***/ 6106:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setTransceiverDirection = setTransceiverDirection;
var _includes2 = _interopRequireDefault(__webpack_require__(593));
var _values2 = _interopRequireDefault(__webpack_require__(186));
var _constants = __webpack_require__(4507);
var _logs = __webpack_require__(271);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const log = _logs.logManager.getLogger('SdpPipeline');

/**
 * Sets a transceiver's direction.
 * Checks that the desired direction is a valid one.
 * @method setTransceiverDirection
 * @param {Object} transceiver The transceiver that we want to modify.
 * @param {String} targetDirection The desired direction we want to change to.
 * @return {Boolean} Indicator on whether the transceiver direction was successfully changed.
 */
function setTransceiverDirection(transceiver, targetDirection) {
  if (!(0, _includes2.default)(targetDirection, (0, _values2.default)(_constants.MEDIA_DIR))) {
    log.info(`Invalid direction "${targetDirection}"`);
    return false;
  }

  // Only in Safari:
  //  - has transceiver.setDirection
  //  - transceiver.direction is readOnly
  if (transceiver.setDirection) {
    transceiver.setDirection(targetDirection);
  } else {
    transceiver.direction = targetDirection;
  }
  return true;
}

/***/ }),

/***/ 6555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getBrowserDetails = getBrowserDetails;
exports.makeSafeForCSS = makeSafeForCSS;
exports.mergeValues = mergeValues;
var _isArray2 = _interopRequireDefault(__webpack_require__(283));
var _mergeAllWith2 = _interopRequireDefault(__webpack_require__(1175));
var _adapter = _interopRequireDefault(__webpack_require__(4945));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO: This function was copied from Kandy, we should eventually create a common project that
// can contain all of these utils that are useful in multiple packages.

/**
 * Deeply merges the values of multiple objects. Objects on the left receive the values from objects on their right.
 * Unlike lodash's default merge behavior this doesn't merge arrays.
 *
 * @name mergeValues
 * @param {...Object} objects - Objects to merge
 * @return {Object} A new object containing the merged values.
 */
function mergeValues() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }
  return (0, _mergeAllWith2.default)((leftValue, rightValue) => {
    // Overwrite the default behavior of lodash's merge for arrays and simply
    // clobber what's on the left so we don't end up with merged arrays.
    if ((0, _isArray2.default)(leftValue)) {
      return rightValue;
    }
  }, objects);
}
function makeSafeForCSS(name) {
  if (!name) {
    return name;
  } else {
    return name.replace(/[^a-z0-9]/g, '');
  }
}

/**
 * @returns The browser details as provided by webrtc-adapter
 */
function getBrowserDetails() {
  return _adapter.default.browserDetails;
}

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp('(' + token + ')|([^%]+?)', 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return [decodeURIComponent(components.join(''))];
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher) || [];

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher) || [];
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ 8985:
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 28:
/***/ ((module) => {

"use strict";

module.exports = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};


/***/ }),

/***/ 3103:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715),
    root = __webpack_require__(8942);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ 5098:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(3305),
    hashDelete = __webpack_require__(9361),
    hashGet = __webpack_require__(1112),
    hashHas = __webpack_require__(5276),
    hashSet = __webpack_require__(5071);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ 7553:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(9747),
    baseLodash = __webpack_require__(5962);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;


/***/ }),

/***/ 1386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(2393),
    listCacheDelete = __webpack_require__(2049),
    listCacheGet = __webpack_require__(7144),
    listCacheHas = __webpack_require__(7452),
    listCacheSet = __webpack_require__(3964);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 528:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(9747),
    baseLodash = __webpack_require__(5962);

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;


/***/ }),

/***/ 9770:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715),
    root = __webpack_require__(8942);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ 8250:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(9753),
    mapCacheDelete = __webpack_require__(5681),
    mapCacheGet = __webpack_require__(88),
    mapCacheHas = __webpack_require__(4732),
    mapCacheSet = __webpack_require__(9068);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ 9413:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715),
    root = __webpack_require__(8942);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ 4512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715),
    root = __webpack_require__(8942);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ 3212:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8250),
    setCacheAdd = __webpack_require__(1877),
    setCacheHas = __webpack_require__(8006);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ 1340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(1386),
    stackClear = __webpack_require__(4103),
    stackDelete = __webpack_require__(1779),
    stackGet = __webpack_require__(4162),
    stackHas = __webpack_require__(7462),
    stackSet = __webpack_require__(6638);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ 5650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(8942);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 1623:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(8942);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ 9270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715),
    root = __webpack_require__(8942);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ 6912:
/***/ ((module) => {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ 9968:
/***/ ((module) => {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ 9847:
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ 9756:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__(2478);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ 358:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(6137),
    isArguments = __webpack_require__(3283),
    isArray = __webpack_require__(3142),
    isBuffer = __webpack_require__(5853),
    isIndex = __webpack_require__(9632),
    isTypedArray = __webpack_require__(8666);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ 5111:
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ 1129:
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 6465:
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ 4810:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(7073),
    eq = __webpack_require__(6285);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),

/***/ 3422:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(7073),
    eq = __webpack_require__(6285);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ 7034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(6285);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ 7930:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(9032),
    keys = __webpack_require__(1211);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ 125:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(9032),
    keysIn = __webpack_require__(5288);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ 7073:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(2532);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ 9334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(1340),
    arrayEach = __webpack_require__(9968),
    assignValue = __webpack_require__(3422),
    baseAssign = __webpack_require__(7930),
    baseAssignIn = __webpack_require__(125),
    cloneBuffer = __webpack_require__(7099),
    copyArray = __webpack_require__(4354),
    copySymbols = __webpack_require__(3546),
    copySymbolsIn = __webpack_require__(4733),
    getAllKeys = __webpack_require__(393),
    getAllKeysIn = __webpack_require__(3650),
    getTag = __webpack_require__(8486),
    initCloneArray = __webpack_require__(7350),
    initCloneByTag = __webpack_require__(424),
    initCloneObject = __webpack_require__(5964),
    isArray = __webpack_require__(3142),
    isBuffer = __webpack_require__(5853),
    isMap = __webpack_require__(7681),
    isObject = __webpack_require__(1580),
    isSet = __webpack_require__(3943),
    keys = __webpack_require__(1211),
    keysIn = __webpack_require__(5288);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ 9747:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(1580);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ 7250:
/***/ ((module) => {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ 313:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(1129),
    isFlattenable = __webpack_require__(714);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ 5636:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createBaseFor = __webpack_require__(6596);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ 7923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(3526),
    toKey = __webpack_require__(6040);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ 8244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(1129),
    isArray = __webpack_require__(3142);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ 7379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(5650),
    getRawTag = __webpack_require__(8870),
    objectToString = __webpack_require__(9005);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 3636:
/***/ ((module) => {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ 2478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFindIndex = __webpack_require__(7250),
    baseIsNaN = __webpack_require__(9454),
    strictIndexOf = __webpack_require__(7706);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ 6027:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 4687:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(353),
    isObjectLike = __webpack_require__(547);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ 353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(1340),
    equalArrays = __webpack_require__(3934),
    equalByTag = __webpack_require__(8861),
    equalObjects = __webpack_require__(1182),
    getTag = __webpack_require__(8486),
    isArray = __webpack_require__(3142),
    isBuffer = __webpack_require__(5853),
    isTypedArray = __webpack_require__(8666);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ 777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(8486),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ 8330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(1340),
    baseIsEqual = __webpack_require__(4687);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ 9454:
/***/ ((module) => {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3655),
    isMasked = __webpack_require__(4759),
    isObject = __webpack_require__(1580),
    toSource = __webpack_require__(4066);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ 1935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(8486),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ 674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    isLength = __webpack_require__(5387),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ 3334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMatches = __webpack_require__(6526),
    baseMatchesProperty = __webpack_require__(2343),
    identity = __webpack_require__(2053),
    isArray = __webpack_require__(3142),
    property = __webpack_require__(3282);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ 195:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(4882),
    nativeKeys = __webpack_require__(8121);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ 7200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(1580),
    isPrototype = __webpack_require__(4882),
    nativeKeysIn = __webpack_require__(8546);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ 5962:
/***/ ((module) => {

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;


/***/ }),

/***/ 6526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMatch = __webpack_require__(8330),
    getMatchData = __webpack_require__(4367),
    matchesStrictComparable = __webpack_require__(3904);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ 2343:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(4687),
    get = __webpack_require__(6123),
    hasIn = __webpack_require__(7276),
    isKey = __webpack_require__(5187),
    isStrictComparable = __webpack_require__(7267),
    matchesStrictComparable = __webpack_require__(3904),
    toKey = __webpack_require__(6040);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ 91:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(1340),
    assignMergeValue = __webpack_require__(4810),
    baseFor = __webpack_require__(5636),
    baseMergeDeep = __webpack_require__(6885),
    isObject = __webpack_require__(1580),
    keysIn = __webpack_require__(5288),
    safeGet = __webpack_require__(8763);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),

/***/ 6885:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignMergeValue = __webpack_require__(4810),
    cloneBuffer = __webpack_require__(7099),
    cloneTypedArray = __webpack_require__(2264),
    copyArray = __webpack_require__(4354),
    initCloneObject = __webpack_require__(5964),
    isArguments = __webpack_require__(3283),
    isArray = __webpack_require__(3142),
    isArrayLikeObject = __webpack_require__(5406),
    isBuffer = __webpack_require__(5853),
    isFunction = __webpack_require__(3655),
    isObject = __webpack_require__(1580),
    isPlainObject = __webpack_require__(8360),
    isTypedArray = __webpack_require__(8666),
    safeGet = __webpack_require__(8763),
    toPlainObject = __webpack_require__(4207);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),

/***/ 2762:
/***/ ((module) => {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(7923);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ 3945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(2053),
    overRest = __webpack_require__(2853),
    setToString = __webpack_require__(796);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ 4943:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(2053),
    metaMap = __webpack_require__(6065);

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;


/***/ }),

/***/ 7403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constant = __webpack_require__(2619),
    defineProperty = __webpack_require__(2532),
    identity = __webpack_require__(2053);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ 6137:
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ 2291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(5650),
    arrayMap = __webpack_require__(5111),
    isArray = __webpack_require__(3142),
    isSymbol = __webpack_require__(1187);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ 6403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(2945);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 9460:
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ 3905:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(5111);

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ 5568:
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ 3526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3142),
    isKey = __webpack_require__(5187),
    stringToPath = __webpack_require__(6493),
    toString = __webpack_require__(5243);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ 8898:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Uint8Array = __webpack_require__(1623);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ 7099:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(8942);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ 2480:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(8898);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ 8340:
/***/ ((module) => {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ 8069:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(5650);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ 2264:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(8898);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ 7358:
/***/ ((module) => {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;


/***/ }),

/***/ 5755:
/***/ ((module) => {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

module.exports = composeArgsRight;


/***/ }),

/***/ 4354:
/***/ ((module) => {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ 9032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignValue = __webpack_require__(3422),
    baseAssignValue = __webpack_require__(7073);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ 3546:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(9032),
    getSymbols = __webpack_require__(7979);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ 4733:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(9032),
    getSymbolsIn = __webpack_require__(5832);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ 1950:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(8942);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 3816:
/***/ ((module) => {

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

module.exports = countHolders;


/***/ }),

/***/ 7848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRest = __webpack_require__(3945),
    isIterateeCall = __webpack_require__(4535);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ 6596:
/***/ ((module) => {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ 6713:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createCtor = __webpack_require__(4364),
    root = __webpack_require__(8942);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

module.exports = createBind;


/***/ }),

/***/ 4364:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(9747),
    isObject = __webpack_require__(1580);

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;


/***/ }),

/***/ 2443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(6912),
    createCtor = __webpack_require__(4364),
    createHybrid = __webpack_require__(3504),
    createRecurry = __webpack_require__(4216),
    getHolder = __webpack_require__(6850),
    replaceHolders = __webpack_require__(8813),
    root = __webpack_require__(8942);

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

module.exports = createCurry;


/***/ }),

/***/ 3504:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var composeArgs = __webpack_require__(7358),
    composeArgsRight = __webpack_require__(5755),
    countHolders = __webpack_require__(3816),
    createCtor = __webpack_require__(4364),
    createRecurry = __webpack_require__(4216),
    getHolder = __webpack_require__(6850),
    reorder = __webpack_require__(6591),
    replaceHolders = __webpack_require__(8813),
    root = __webpack_require__(8942);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_ARY_FLAG = 128,
    WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG,
      isBind = bitmask & WRAP_BIND_FLAG,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybrid;


/***/ }),

/***/ 6341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(6912),
    createCtor = __webpack_require__(4364),
    root = __webpack_require__(8942);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;


/***/ }),

/***/ 4216:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isLaziable = __webpack_require__(6648),
    setData = __webpack_require__(5512),
    setWrapToString = __webpack_require__(5620);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

module.exports = createRecurry;


/***/ }),

/***/ 8638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetData = __webpack_require__(4943),
    createBind = __webpack_require__(6713),
    createCurry = __webpack_require__(2443),
    createHybrid = __webpack_require__(3504),
    createPartial = __webpack_require__(6341),
    getData = __webpack_require__(5196),
    mergeData = __webpack_require__(7028),
    setData = __webpack_require__(5512),
    setWrapToString = __webpack_require__(5620),
    toInteger = __webpack_require__(7642);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

module.exports = createWrap;


/***/ }),

/***/ 2532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ 3934:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(3212),
    arraySome = __webpack_require__(6465),
    cacheHas = __webpack_require__(5568);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ 8861:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(5650),
    Uint8Array = __webpack_require__(1623),
    eq = __webpack_require__(6285),
    equalArrays = __webpack_require__(3934),
    mapToArray = __webpack_require__(5894),
    setToArray = __webpack_require__(9828);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ 1182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(393);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ 1439:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var flatten = __webpack_require__(5857),
    overRest = __webpack_require__(2853),
    setToString = __webpack_require__(796);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),

/***/ 4967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 393:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(8244),
    getSymbols = __webpack_require__(7979),
    keys = __webpack_require__(1211);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ 3650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(8244),
    getSymbolsIn = __webpack_require__(5832),
    keysIn = __webpack_require__(5288);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ 5196:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var metaMap = __webpack_require__(6065),
    noop = __webpack_require__(9071);

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;


/***/ }),

/***/ 961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var realNames = __webpack_require__(3476);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;


/***/ }),

/***/ 6850:
/***/ ((module) => {

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

module.exports = getHolder;


/***/ }),

/***/ 4700:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(9067);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ 4367:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isStrictComparable = __webpack_require__(7267),
    keys = __webpack_require__(1211);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ 4715:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(9624),
    getValue = __webpack_require__(155);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ 4784:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(3766);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ 8870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(5650);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 7979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(9847),
    stubArray = __webpack_require__(9306);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ 5832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(1129),
    getPrototype = __webpack_require__(4784),
    getSymbols = __webpack_require__(7979),
    stubArray = __webpack_require__(9306);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ 8486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(3103),
    Map = __webpack_require__(9770),
    Promise = __webpack_require__(9413),
    Set = __webpack_require__(4512),
    WeakMap = __webpack_require__(9270),
    baseGetTag = __webpack_require__(7379),
    toSource = __webpack_require__(4066);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ 155:
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ 8788:
/***/ ((module) => {

/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

module.exports = getWrapDetails;


/***/ }),

/***/ 5899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(3526),
    isArguments = __webpack_require__(3283),
    isArray = __webpack_require__(3142),
    isIndex = __webpack_require__(9632),
    isLength = __webpack_require__(5387),
    toKey = __webpack_require__(6040);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ 3305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(4497);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ 9361:
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ 1112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(4497);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ 5276:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(4497);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ 5071:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(4497);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ 7350:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ 424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(8898),
    cloneDataView = __webpack_require__(2480),
    cloneRegExp = __webpack_require__(8340),
    cloneSymbol = __webpack_require__(8069),
    cloneTypedArray = __webpack_require__(2264);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ 5964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(9747),
    getPrototype = __webpack_require__(4784),
    isPrototype = __webpack_require__(4882);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ 9141:
/***/ ((module) => {

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

module.exports = insertWrapDetails;


/***/ }),

/***/ 714:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(5650),
    isArguments = __webpack_require__(3283),
    isArray = __webpack_require__(3142);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ 9632:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 4535:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(6285),
    isArrayLike = __webpack_require__(6529),
    isIndex = __webpack_require__(9632),
    isObject = __webpack_require__(1580);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ 5187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3142),
    isSymbol = __webpack_require__(1187);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ 9067:
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ 6648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var LazyWrapper = __webpack_require__(7553),
    getData = __webpack_require__(5196),
    getFuncName = __webpack_require__(961),
    lodash = __webpack_require__(3321);

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;


/***/ }),

/***/ 4759:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(1950);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ 4882:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ 7267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(1580);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ 2393:
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 2049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(7034);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 7144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(7034);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 7452:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(7034);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 3964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(7034);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 9753:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(5098),
    ListCache = __webpack_require__(1386),
    Map = __webpack_require__(9770);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ 5681:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(4700);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ 88:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(4700);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ 4732:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(4700);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ 9068:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(4700);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ 5894:
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ 3904:
/***/ ((module) => {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ 6853:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoize = __webpack_require__(9011);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ 7028:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var composeArgs = __webpack_require__(7358),
    composeArgsRight = __webpack_require__(5755),
    replaceHolders = __webpack_require__(8813);

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;


/***/ }),

/***/ 6065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var WeakMap = __webpack_require__(9270);

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;


/***/ }),

/***/ 4497:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(4715);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ 8121:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(3766);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ 8546:
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ 2306:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(4967);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ 9005:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 3766:
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ 2853:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var apply = __webpack_require__(6912);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ 3476:
/***/ ((module) => {

/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;


/***/ }),

/***/ 6591:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyArray = __webpack_require__(4354),
    isIndex = __webpack_require__(9632);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;


/***/ }),

/***/ 8813:
/***/ ((module) => {

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;


/***/ }),

/***/ 8942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(4967);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 8763:
/***/ ((module) => {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),

/***/ 1877:
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ 8006:
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ 5512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetData = __webpack_require__(4943),
    shortOut = __webpack_require__(3316);

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = shortOut(baseSetData);

module.exports = setData;


/***/ }),

/***/ 9828:
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ 796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSetToString = __webpack_require__(7403),
    shortOut = __webpack_require__(3316);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ 5620:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getWrapDetails = __webpack_require__(8788),
    insertWrapDetails = __webpack_require__(9141),
    setToString = __webpack_require__(796),
    updateWrapDetails = __webpack_require__(33);

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

module.exports = setWrapToString;


/***/ }),

/***/ 3316:
/***/ ((module) => {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ 4103:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(1386);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ 1779:
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ 4162:
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ 7462:
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ 6638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(1386),
    Map = __webpack_require__(9770),
    MapCache = __webpack_require__(8250);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ 7706:
/***/ ((module) => {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ 6493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoizeCapped = __webpack_require__(6853);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ 6040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(1187);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ 4066:
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ 2945:
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 33:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayEach = __webpack_require__(9968),
    arrayIncludes = __webpack_require__(9756);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

module.exports = updateWrapDetails;


/***/ }),

/***/ 3410:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var LazyWrapper = __webpack_require__(7553),
    LodashWrapper = __webpack_require__(528),
    copyArray = __webpack_require__(4354);

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;


/***/ }),

/***/ 5353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createWrap = __webpack_require__(8638);

/** Used to compose bitmasks for function metadata. */
var WRAP_ARY_FLAG = 128;

/**
 * Creates a function that invokes `func`, with up to `n` arguments,
 * ignoring any additional arguments.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new capped function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = (func && n == null) ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}

module.exports = ary;


/***/ }),

/***/ 2846:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(9334);

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

module.exports = clone;


/***/ }),

/***/ 6108:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(9334);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ 2619:
/***/ ((module) => {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ 7336:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createWrap = __webpack_require__(8638);

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8;

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// Assign default placeholders.
curry.placeholder = {};

module.exports = curry;


/***/ }),

/***/ 2784:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(1580),
    now = __webpack_require__(4495),
    toNumber = __webpack_require__(6131);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 6285:
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 5857:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFlatten = __webpack_require__(313);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ 3579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapping = __webpack_require__(3565),
    fallbackHolder = __webpack_require__(2991);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var defaultHolder = isLib ? func : fallbackHolder,
      forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isError': util.isError,
    'isFunction': util.isFunction,
    'isWeakMap': util.isWeakMap,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isError = helpers.isError,
      isFunction = helpers.isFunction,
      isWeakMap = helpers.isWeakMap,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null &&
          !(isFunction(value) || isError(value) || isWeakMap(value))) {
        nested[key] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func, placeholder) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    result.placeholder = func.placeholder = placeholder;

    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func, defaultHolder);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func, _)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  _.placeholder = _;

  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;


/***/ }),

/***/ 4267:
/***/ ((module) => {

module.exports = {
  'cap': false,
  'curry': false,
  'fixed': false,
  'immutable': false,
  'rearg': false
};


/***/ }),

/***/ 3565:
/***/ ((__unused_webpack_module, exports) => {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};


/***/ }),

/***/ 8055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  'ary': __webpack_require__(5353),
  'assign': __webpack_require__(7930),
  'clone': __webpack_require__(2846),
  'curry': __webpack_require__(7336),
  'forEach': __webpack_require__(9968),
  'isArray': __webpack_require__(3142),
  'isError': __webpack_require__(441),
  'isFunction': __webpack_require__(3655),
  'isWeakMap': __webpack_require__(7769),
  'iteratee': __webpack_require__(2590),
  'keys': __webpack_require__(195),
  'rearg': __webpack_require__(864),
  'toInteger': __webpack_require__(7642),
  'toPath': __webpack_require__(2613)
};


/***/ }),

/***/ 9321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('cloneDeep', __webpack_require__(6108), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 2673:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseConvert = __webpack_require__(3579),
    util = __webpack_require__(8055);

/**
 * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
 * version with conversion `options` applied. If `name` is an object its methods
 * will be converted.
 *
 * @param {string} name The name of the function to wrap.
 * @param {Function} [func] The function to wrap.
 * @param {Object} [options] The options object. See `baseConvert` for more details.
 * @returns {Function|Object} Returns the converted function or object.
 */
function convert(name, func, options) {
  return baseConvert(util, name, func, options);
}

module.exports = convert;


/***/ }),

/***/ 4255:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('debounce', __webpack_require__(2784));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('includes', __webpack_require__(7526));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('isArray', __webpack_require__(3142), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 2202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('isElement', __webpack_require__(9191), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 4499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('isEmpty', __webpack_require__(3514), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('isFunction', __webpack_require__(3655), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 6705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('isPlainObject', __webpack_require__(8360), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 1175:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('mergeAllWith', __webpack_require__(8875));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 2991:
/***/ ((module) => {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};


/***/ }),

/***/ 186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var convert = __webpack_require__(2673),
    func = convert('values', __webpack_require__(9817), __webpack_require__(4267));

func.placeholder = __webpack_require__(2991);
module.exports = func;


/***/ }),

/***/ 6123:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(7923);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ 7276:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseHasIn = __webpack_require__(3636),
    hasPath = __webpack_require__(5899);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ 2053:
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 7526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__(2478),
    isArrayLike = __webpack_require__(6529),
    isString = __webpack_require__(8138),
    toInteger = __webpack_require__(7642),
    values = __webpack_require__(9817);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;


/***/ }),

/***/ 3283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(6027),
    isObjectLike = __webpack_require__(547);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 3142:
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 6529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3655),
    isLength = __webpack_require__(5387);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ 5406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLike = __webpack_require__(6529),
    isObjectLike = __webpack_require__(547);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ 5853:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(8942),
    stubFalse = __webpack_require__(4772);

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ 9191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObjectLike = __webpack_require__(547),
    isPlainObject = __webpack_require__(8360);

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

module.exports = isElement;


/***/ }),

/***/ 3514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseKeys = __webpack_require__(195),
    getTag = __webpack_require__(8486),
    isArguments = __webpack_require__(3283),
    isArray = __webpack_require__(3142),
    isArrayLike = __webpack_require__(6529),
    isBuffer = __webpack_require__(5853),
    isPrototype = __webpack_require__(4882),
    isTypedArray = __webpack_require__(8666);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),

/***/ 441:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    isObjectLike = __webpack_require__(547),
    isPlainObject = __webpack_require__(8360);

/** `Object#toString` result references. */
var domExcTag = '[object DOMException]',
    errorTag = '[object Error]';

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == errorTag || tag == domExcTag ||
    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
}

module.exports = isError;


/***/ }),

/***/ 3655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    isObject = __webpack_require__(1580);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 5387:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 7681:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMap = __webpack_require__(777),
    baseUnary = __webpack_require__(9460),
    nodeUtil = __webpack_require__(2306);

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ 1580:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 547:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 8360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    getPrototype = __webpack_require__(4784),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ 3943:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsSet = __webpack_require__(1935),
    baseUnary = __webpack_require__(9460),
    nodeUtil = __webpack_require__(2306);

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ 8138:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    isArray = __webpack_require__(3142),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ 1187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(7379),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 8666:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(674),
    baseUnary = __webpack_require__(9460),
    nodeUtil = __webpack_require__(2306);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ 7769:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(8486),
    isObjectLike = __webpack_require__(547);

/** `Object#toString` result references. */
var weakMapTag = '[object WeakMap]';

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * _.isWeakMap(new WeakMap);
 * // => true
 *
 * _.isWeakMap(new Map);
 * // => false
 */
function isWeakMap(value) {
  return isObjectLike(value) && getTag(value) == weakMapTag;
}

module.exports = isWeakMap;


/***/ }),

/***/ 2590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(9334),
    baseIteratee = __webpack_require__(3334);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes `func` with the arguments of the created
 * function. If `func` is a property name, the created function returns the
 * property value for a given element. If `func` is an array or object, the
 * created function returns `true` for elements that contain the equivalent
 * source properties, otherwise it returns `false`.
 *
 * @static
 * @since 4.0.0
 * @memberOf _
 * @category Util
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
 * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, _.iteratee(['user', 'fred']));
 * // => [{ 'user': 'fred', 'age': 40 }]
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, _.iteratee('user'));
 * // => ['barney', 'fred']
 *
 * // Create custom iteratee shorthands.
 * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
 *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
 *     return func.test(string);
 *   };
 * });
 *
 * _.filter(['abc', 'def'], /ef/);
 * // => ['def']
 */
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
}

module.exports = iteratee;


/***/ }),

/***/ 1211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(358),
    baseKeys = __webpack_require__(195),
    isArrayLike = __webpack_require__(6529);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ 5288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(358),
    baseKeysIn = __webpack_require__(7200),
    isArrayLike = __webpack_require__(6529);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ 9011:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8250);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ 8875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMerge = __webpack_require__(91),
    createAssigner = __webpack_require__(7848);

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

module.exports = mergeWith;


/***/ }),

/***/ 9071:
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ 4495:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(8942);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 3282:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseProperty = __webpack_require__(2762),
    basePropertyDeep = __webpack_require__(8880),
    isKey = __webpack_require__(5187),
    toKey = __webpack_require__(6040);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ 864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createWrap = __webpack_require__(8638),
    flatRest = __webpack_require__(1439);

/** Used to compose bitmasks for function metadata. */
var WRAP_REARG_FLAG = 256;

/**
 * Creates a function that invokes `func` with arguments arranged according
 * to the specified `indexes` where the argument value at the first index is
 * provided as the first argument, the argument value at the second index is
 * provided as the second argument, and so on.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to rearrange arguments for.
 * @param {...(number|number[])} indexes The arranged argument indexes.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var rearged = _.rearg(function(a, b, c) {
 *   return [a, b, c];
 * }, [2, 0, 1]);
 *
 * rearged('b', 'c', 'a')
 * // => ['a', 'b', 'c']
 */
var rearg = flatRest(function(func, indexes) {
  return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
});

module.exports = rearg;


/***/ }),

/***/ 9306:
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 4772:
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 3301:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toNumber = __webpack_require__(6131);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ 7642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toFinite = __webpack_require__(3301);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ 6131:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(6403),
    isObject = __webpack_require__(1580),
    isSymbol = __webpack_require__(1187);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 2613:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__(5111),
    copyArray = __webpack_require__(4354),
    isArray = __webpack_require__(3142),
    isSymbol = __webpack_require__(1187),
    stringToPath = __webpack_require__(6493),
    toKey = __webpack_require__(6040),
    toString = __webpack_require__(5243);

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

module.exports = toPath;


/***/ }),

/***/ 4207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(9032),
    keysIn = __webpack_require__(5288);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),

/***/ 5243:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseToString = __webpack_require__(2291);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ 9817:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseValues = __webpack_require__(3905),
    keys = __webpack_require__(1211);

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),

/***/ 3321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var LazyWrapper = __webpack_require__(7553),
    LodashWrapper = __webpack_require__(528),
    baseLodash = __webpack_require__(5962),
    isArray = __webpack_require__(3142),
    isObjectLike = __webpack_require__(547),
    wrapperClone = __webpack_require__(3410);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;


/***/ }),

/***/ 8032:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const strictUriEncode = __webpack_require__(7269);
const decodeComponent = __webpack_require__(8605);
const splitOnFirst = __webpack_require__(2851);
const filterObject = __webpack_require__(28);

const isNullOrUndefined = value => value === null || value === undefined;

const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'colon-list-separator':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), ':list='].join('')];
				}

				return [...result, [encode(key, options), ':list=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
		case 'bracket-separator': {
			const keyValueSep = options.arrayFormat === 'bracket-separator' ?
				'[]=' :
				'=';

			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				// Translate null to an empty string so that it doesn't serialize as 'null'
				value = value === null ? '' : value;

				if (result.length === 0) {
					return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		}

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'colon-list-separator':
			return (key, value, accumulator) => {
				result = /(:list)$/.exec(key);
				key = key.replace(/:list$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		case 'bracket-separator':
			return (key, value, accumulator) => {
				const isArray = /(\[\])$/.test(key);
				key = key.replace(/\[\]$/, '');

				if (!isArray) {
					accumulator[key] = value ? decode(value, options) : value;
					return;
				}

				const arrayValue = value === null ?
					[] :
					value.split(options.arrayFormatSeparator).map(item => decode(item, options));

				if (accumulator[key] === undefined) {
					accumulator[key] = arrayValue;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], arrayValue);
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(query, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
	}

	for (const param of query.split('&')) {
		if (param === '') {
			continue;
		}

		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
				return encode(key, options) + '[]';
			}

			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url_, hash] = splitOnFirst(url, '#');

	return Object.assign(
		{
			url: url_.split('?')[0] || '',
			query: parse(extract(url), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (object, options) => {
	options = Object.assign({
		encode: true,
		strict: true,
		[encodeFragmentIdentifier]: true
	}, options);

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(object.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, object.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(object.url);
	if (object.fragmentIdentifier) {
		hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
	}

	return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
	options = Object.assign({
		parseFragmentIdentifier: true,
		[encodeFragmentIdentifier]: false
	}, options);

	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
	return exports.stringifyUrl({
		url,
		query: filterObject(query, filter),
		fragmentIdentifier
	}, options);
};

exports.exclude = (input, filter, options) => {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return exports.pick(input, exclusionFilter, options);
};


/***/ }),

/***/ 5860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  actionChannel: () => (/* reexport */ actionChannel),
  all: () => (/* reexport */ io_22ea0cf9_all),
  apply: () => (/* reexport */ apply),
  call: () => (/* reexport */ call),
  cancel: () => (/* reexport */ cancel),
  cancelled: () => (/* reexport */ cancelled),
  cps: () => (/* reexport */ cps),
  debounce: () => (/* reexport */ debounce),
  delay: () => (/* reexport */ delay),
  effectTypes: () => (/* reexport */ effectTypes),
  flush: () => (/* reexport */ flush),
  fork: () => (/* reexport */ fork),
  getContext: () => (/* reexport */ getContext),
  join: () => (/* reexport */ join),
  put: () => (/* reexport */ put),
  putResolve: () => (/* reexport */ putResolve),
  race: () => (/* reexport */ race),
  retry: () => (/* reexport */ retry$1),
  select: () => (/* reexport */ io_22ea0cf9_select),
  setContext: () => (/* reexport */ setContext),
  spawn: () => (/* reexport */ spawn),
  take: () => (/* reexport */ take),
  takeEvery: () => (/* reexport */ takeEvery$1),
  takeLatest: () => (/* reexport */ takeLatest$1),
  takeLeading: () => (/* reexport */ takeLeading$1),
  takeMaybe: () => (/* reexport */ takeMaybe),
  throttle: () => (/* reexport */ throttle$1)
});

;// CONCATENATED MODULE: ../../node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js
var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var CHANNEL_END_TYPE =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('CHANNEL_END')));
var redux_saga_symbols_esm_IO =
/*#__PURE__*/
createSymbol('IO');
var MATCH =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('MATCH')));
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');
var redux_saga_symbols_esm_SAGA_ACTION =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('SAGA_ACTION')));
var SELF_CANCELLATION =
/*#__PURE__*/
createSymbol('SELF_CANCELLATION');
var redux_saga_symbols_esm_TASK =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('TASK')));
var redux_saga_symbols_esm_TASK_CANCEL =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('TASK_CANCEL')));
var redux_saga_symbols_esm_TERMINATE =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('TERMINATE')));
var redux_saga_symbols_esm_SAGA_LOCATION =
/*#__PURE__*/
(/* unused pure expression or super */ null && (createSymbol('LOCATION')));



;// CONCATENATED MODULE: ../../node_modules/@redux-saga/is/dist/redux-saga-is.esm.js


var undef = function undef(v) {
  return v === null || v === undefined;
};
var redux_saga_is_esm_notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var redux_saga_is_esm_func = function func(f) {
  return typeof f === 'function';
};
var number = function number(n) {
  return typeof n === 'number';
};
var redux_saga_is_esm_string = function string(s) {
  return typeof s === 'string';
};
var redux_saga_is_esm_array = Array.isArray;
var redux_saga_is_esm_object = function object(obj) {
  return obj && !redux_saga_is_esm_array(obj) && typeof obj === 'object';
};
var promise = function promise(p) {
  return p && redux_saga_is_esm_func(p.then);
};
var iterator = function iterator(it) {
  return it && redux_saga_is_esm_func(it.next) && redux_saga_is_esm_func(it.throw);
};
var iterable = function iterable(it) {
  return it && redux_saga_is_esm_func(Symbol) ? redux_saga_is_esm_func(it[Symbol.iterator]) : redux_saga_is_esm_array(it);
};
var task = function task(t) {
  return t && t[TASK];
};
var sagaAction = function sagaAction(a) {
  return Boolean(a && a[SAGA_ACTION]);
};
var observable = function observable(ob) {
  return ob && redux_saga_is_esm_func(ob.subscribe);
};
var buffer = function buffer(buf) {
  return buf && redux_saga_is_esm_func(buf.isEmpty) && redux_saga_is_esm_func(buf.take) && redux_saga_is_esm_func(buf.put);
};
var pattern = function pattern(pat) {
  return pat && (redux_saga_is_esm_string(pat) || symbol(pat) || redux_saga_is_esm_func(pat) || redux_saga_is_esm_array(pat) && pat.every(pattern));
};
var channel = function channel(ch) {
  return ch && redux_saga_is_esm_func(ch.take) && redux_saga_is_esm_func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return redux_saga_is_esm_func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var multicast = function multicast(ch) {
  return channel(ch) && ch[MULTICAST];
};
var redux_saga_is_esm_effect = function effect(eff) {
  return eff && eff[IO];
};



;// CONCATENATED MODULE: ../../node_modules/@redux-saga/core/node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  return extends_extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, extends_extends.apply(null, arguments);
}

;// CONCATENATED MODULE: ../../node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js


var MAX_SIGNED_INT = 2147483647;
function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
  if (false) {}

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, Math.min(MAX_SIGNED_INT, ms), val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

/* harmony default export */ const redux_saga_delay_p_esm = (delayP);

;// CONCATENATED MODULE: ../../node_modules/@redux-saga/core/dist/io-22ea0cf9.js





var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue =
/*#__PURE__*/
konst(true);

var noop = function noop() {};

if (false) {}
var identity = function identity(v) {
  return v;
};
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function io_22ea0cf9_check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var assignWithSymbols = function assignWithSymbols(target, source) {
  _extends(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function (s) {
      target[s] = source[s];
    });
  }
};
var flatMap = function flatMap(mapper, arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
function once(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
function logError(error, _ref2) {
  var sagaStack = _ref2.sagaStack;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
var internalErr = function internalErr(err) {
  return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
};
var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
};
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

var createEmptyArray = function createEmptyArray(n) {
  return Array.apply(null, new Array(n));
};
var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    if (false) {}

    return dispatch(Object.defineProperty(action, SAGA_ACTION, {
      value: true
    }));
  };
};
var shouldTerminate = function shouldTerminate(res) {
  return res === TERMINATE;
};
var shouldCancel = function shouldCancel(res) {
  return res === TASK_CANCEL;
};
var shouldComplete = function shouldComplete(res) {
  return shouldTerminate(res) || shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  if (false) {}

  var completedCount = 0;
  var completed;
  var results = array(shape) ? createEmptyArray(totalCount) : {};
  var childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }

  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };

    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });

  parentCallback.cancel = function () {
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCallbacks[key].cancel();
      });
    }
  };

  return childCallbacks;
}
function getMetaInfo(fn) {
  return {
    name: fn.name || 'anonymous',
    location: getLocation(fn)
  };
}
function getLocation(instrumented) {
  return instrumented[SAGA_LOCATION];
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

          default: // DROP

        }
      }
    },
    take: take,
    flush: flush
  };
}

var none = function none() {
  return zeroBuffer;
};
var fixed = function fixed(limit) {
  return ringBuffer(limit, ON_OVERFLOW_THROW);
};
var dropping = function dropping(limit) {
  return ringBuffer(limit, ON_OVERFLOW_DROP);
};
var sliding = function sliding(limit) {
  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
};
var expanding = function expanding(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};

var buffers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var io_22ea0cf9_CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: io_22ea0cf9_CANCEL,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[redux_saga_symbols_esm_IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

var isForkEffect = function isForkEffect(eff) {
  return effect(eff) && eff.type === FORK;
};

var detach = function detach(eff) {
  if (false) {}

  return makeEffect(FORK, extends_extends({}, eff.payload, {
    detached: true
  }));
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (false) {}

  if (pattern(patternOrChannel)) {
    if (redux_saga_is_esm_notUndef(multicastPattern)) {
      /* eslint-disable no-console */
      console.warn("take(pattern) takes one argument but two were provided. Consider passing an array for listening to several action types");
    }

    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (multicast(patternOrChannel) && redux_saga_is_esm_notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    if (redux_saga_is_esm_notUndef(multicastPattern)) {
      /* eslint-disable no-console */
      console.warn("take(channel) takes one argument but two were provided. Second argument is ignored.");
    }

    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  if (false) {}
}
var takeMaybe = function takeMaybe() {
  var eff = take.apply(void 0, arguments);
  eff.payload.maybe = true;
  return eff;
};
function put(channel$1, action) {
  if (false) {}

  if (undef(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$1,
    action: action
  });
}
var putResolve = function putResolve() {
  var eff = put.apply(void 0, arguments);
  eff.payload.resolve = true;
  return eff;
};
function io_22ea0cf9_all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function race(effects) {
  var eff = makeEffect(RACE, effects);
  eff.combinator = true;
  return eff;
} // this match getFnCallDescriptor logic

var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  io_22ea0cf9_check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    io_22ea0cf9_check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    io_22ea0cf9_check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    io_22ea0cf9_check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    io_22ea0cf9_check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  io_22ea0cf9_check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (redux_saga_is_esm_func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (redux_saga_is_esm_array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && redux_saga_is_esm_string(fn) && redux_saga_is_esm_func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== delay;
};

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (false) { var arg0; }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function apply(context, fn, args) {
  if (args === void 0) {
    args = [];
  }

  var fnDescriptor = [context, fn];

  if (false) {}

  return makeEffect(CALL, getFnCallDescriptor([context, fn], args));
}
function cps(fnDescriptor) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function spawn(fnDescriptor) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(fork.apply(void 0, [fnDescriptor].concat(args)));
}
function join(taskOrTasks) {
  if (false) {}

  return makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = SELF_CANCELLATION;
  }

  if (false) {}

  return makeEffect(io_22ea0cf9_CANCEL, taskOrTasks);
}
function io_22ea0cf9_select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (false) {}

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function actionChannel(pattern$1, buffer$1) {
  if (false) {}

  return makeEffect(ACTION_CHANNEL, {
    pattern: pattern$1,
    buffer: buffer$1
  });
}
function cancelled() {
  return makeEffect(CANCELLED, {});
}
function flush(channel$1) {
  if (false) {}

  return makeEffect(FLUSH, channel$1);
}
function getContext(prop) {
  if (false) {}

  return makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  if (false) {}

  return makeEffect(SET_CONTEXT, props);
}
var delay =
/*#__PURE__*/
call.bind(null, redux_saga_delay_p_esm);



;// CONCATENATED MODULE: ../../node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js







var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (redux_saga_is_esm_func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yCancel = function yCancel(task) {
    return {
      done: false,
      value: cancel(task)
    };
  };

  var task, action;

  var setTask = function setTask(t) {
    return task = t;
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return task ? {
        nextState: 'q3',
        effect: yCancel(task)
      } : {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    },
    q3: function q3() {
      return {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    }
  }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yCall = function yCall(ac) {
    return {
      done: false,
      value: call.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action;

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yCall(action)
      };
    }
  }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function throttle(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, channel$1;

  var yTake = function yTake() {
    return {
      done: false,
      value: take(channel$1)
    };
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yDelay = {
    done: false,
    value: delay(delayLength)
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setChannel = function setChannel(ch) {
    return channel$1 = ch;
  };

  var needsChannel = !channel(patternOrChannel);

  if (!needsChannel) {
    setChannel(patternOrChannel);
  }

  return fsmIterator({
    q1: function q1() {
      var yActionChannel = {
        done: false,
        value: actionChannel(patternOrChannel, sliding(1))
      };
      return {
        nextState: 'q2',
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yTake(),
        stateUpdater: setAction
      };
    },
    q3: function q3() {
      return {
        nextState: 'q4',
        effect: yFork(action)
      };
    },
    q4: function q4() {
      return {
        nextState: 'q2',
        effect: yDelay
      };
    }
  }, needsChannel ? 'q1' : 'q2', "throttle(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function retry(maxTries, delayLength, fn) {
  var counter = maxTries;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var yCall = {
    done: false,
    value: call.apply(void 0, [fn].concat(args))
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yCall,
        errorState: 'q10'
      };
    },
    q2: function q2() {
      return {
        nextState: qEnd
      };
    },
    q10: function q10(error) {
      counter -= 1;

      if (counter <= 0) {
        throw error;
      }

      return {
        nextState: 'q1',
        effect: yDelay
      };
    }
  }, 'q1', "retry(" + fn.name + ")");
}

function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, raceOutput;
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yNoop = function yNoop(value) {
    return {
      done: false,
      value: value
    };
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setRaceOutput = function setRaceOutput(ro) {
    return raceOutput = ro;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },
    q3: function q3() {
      return raceOutput.debounce ? {
        nextState: 'q1',
        effect: yFork(action)
      } : {
        nextState: 'q2',
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }
  }, 'q1', "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

var validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};

function takeEvery$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return fork.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
}
function takeLeading$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
}
function throttle$1(ms, patternOrChannel, worker) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  return fork.apply(void 0, [throttle, ms, patternOrChannel, worker].concat(args));
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
}



;// CONCATENATED MODULE: ../../node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js



/***/ }),

/***/ 9323:
/***/ ((module) => {

var grammar = module.exports = {
  v: [{
    name: 'version',
    reg: /^(\d*)$/
  }],
  o: [{
    // o=- 20518 0 IN IP4 203.0.113.1
    // NB: sessionId will be a String in most cases because it is huge
    name: 'origin',
    reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
    names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
    format: '%s %s %d %s IP%d %s'
  }],
  // default parsing of these only (though some of these feel outdated)
  s: [{ name: 'name' }],
  i: [{ name: 'description' }],
  u: [{ name: 'uri' }],
  e: [{ name: 'email' }],
  p: [{ name: 'phone' }],
  z: [{ name: 'timezones' }], // TODO: this one can actually be parsed properly...
  r: [{ name: 'repeats' }],   // TODO: this one can also be parsed properly
  // k: [{}], // outdated thing ignored
  t: [{
    // t=0 0
    name: 'timing',
    reg: /^(\d*) (\d*)/,
    names: ['start', 'stop'],
    format: '%d %d'
  }],
  c: [{
    // c=IN IP4 10.47.197.26
    name: 'connection',
    reg: /^IN IP(\d) (\S*)/,
    names: ['version', 'ip'],
    format: 'IN IP%d %s'
  }],
  b: [{
    // b=AS:4000
    push: 'bandwidth',
    reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
    names: ['type', 'limit'],
    format: '%s:%s'
  }],
  m: [{
    // m=video 51744 RTP/AVP 126 97 98 34 31
    // NB: special - pushes to session
    // TODO: rtp/fmtp should be filtered by the payloads found here?
    reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
    names: ['type', 'port', 'protocol', 'payloads'],
    format: '%s %d %s %s'
  }],
  a: [
    {
      // a=rtpmap:110 opus/48000/2
      push: 'rtp',
      reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
      names: ['payload', 'codec', 'rate', 'encoding'],
      format: function (o) {
        return (o.encoding)
          ? 'rtpmap:%d %s/%s/%s'
          : o.rate
            ? 'rtpmap:%d %s/%s'
            : 'rtpmap:%d %s';
      }
    },
    {
      // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
      // a=fmtp:111 minptime=10; useinbandfec=1
      push: 'fmtp',
      reg: /^fmtp:(\d*) ([\S| ]*)/,
      names: ['payload', 'config'],
      format: 'fmtp:%d %s'
    },
    {
      // a=control:streamid=0
      name: 'control',
      reg: /^control:(.*)/,
      format: 'control:%s'
    },
    {
      // a=rtcp:65179 IN IP4 193.84.77.194
      name: 'rtcp',
      reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
      names: ['port', 'netType', 'ipVer', 'address'],
      format: function (o) {
        return (o.address != null)
          ? 'rtcp:%d %s IP%d %s'
          : 'rtcp:%d';
      }
    },
    {
      // a=rtcp-fb:98 trr-int 100
      push: 'rtcpFbTrrInt',
      reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
      names: ['payload', 'value'],
      format: 'rtcp-fb:%s trr-int %d'
    },
    {
      // a=rtcp-fb:98 nack rpsi
      push: 'rtcpFb',
      reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
      names: ['payload', 'type', 'subtype'],
      format: function (o) {
        return (o.subtype != null)
          ? 'rtcp-fb:%s %s %s'
          : 'rtcp-fb:%s %s';
      }
    },
    {
      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      // a=extmap:1/recvonly URI-gps-string
      // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
      push: 'ext',
      reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
      names: ['value', 'direction', 'encrypt-uri', 'uri', 'config'],
      format: function (o) {
        return (
          'extmap:%d' +
          (o.direction ? '/%s' : '%v') +
          (o['encrypt-uri'] ? ' %s' : '%v') +
          ' %s' +
          (o.config ? ' %s' : '')
        );
      }
    },
    {
      // a=extmap-allow-mixed
      name: 'extmapAllowMixed',
      reg: /^(extmap-allow-mixed)/
    },
    {
      // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
      push: 'crypto',
      reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
      names: ['id', 'suite', 'config', 'sessionConfig'],
      format: function (o) {
        return (o.sessionConfig != null)
          ? 'crypto:%d %s %s %s'
          : 'crypto:%d %s %s';
      }
    },
    {
      // a=setup:actpass
      name: 'setup',
      reg: /^setup:(\w*)/,
      format: 'setup:%s'
    },
    {
      // a=connection:new
      name: 'connectionType',
      reg: /^connection:(new|existing)/,
      format: 'connection:%s'
    },
    {
      // a=mid:1
      name: 'mid',
      reg: /^mid:([^\s]*)/,
      format: 'mid:%s'
    },
    {
      // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
      name: 'msid',
      reg: /^msid:(.*)/,
      format: 'msid:%s'
    },
    {
      // a=ptime:20
      name: 'ptime',
      reg: /^ptime:(\d*(?:\.\d*)*)/,
      format: 'ptime:%d'
    },
    {
      // a=maxptime:60
      name: 'maxptime',
      reg: /^maxptime:(\d*(?:\.\d*)*)/,
      format: 'maxptime:%d'
    },
    {
      // a=sendrecv
      name: 'direction',
      reg: /^(sendrecv|recvonly|sendonly|inactive)/
    },
    {
      // a=ice-lite
      name: 'icelite',
      reg: /^(ice-lite)/
    },
    {
      // a=ice-ufrag:F7gI
      name: 'iceUfrag',
      reg: /^ice-ufrag:(\S*)/,
      format: 'ice-ufrag:%s'
    },
    {
      // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
      name: 'icePwd',
      reg: /^ice-pwd:(\S*)/,
      format: 'ice-pwd:%s'
    },
    {
      // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
      name: 'fingerprint',
      reg: /^fingerprint:(\S*) (\S*)/,
      names: ['type', 'hash'],
      format: 'fingerprint:%s %s'
    },
    {
      // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
      // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
      // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
      push:'candidates',
      reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
      names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation', 'network-id', 'network-cost'],
      format: function (o) {
        var str = 'candidate:%s %d %s %d %s %d typ %s';

        str += (o.raddr != null) ? ' raddr %s rport %d' : '%v%v';

        // NB: candidate has three optional chunks, so %void middles one if it's missing
        str += (o.tcptype != null) ? ' tcptype %s' : '%v';

        if (o.generation != null) {
          str += ' generation %d';
        }

        str += (o['network-id'] != null) ? ' network-id %d' : '%v';
        str += (o['network-cost'] != null) ? ' network-cost %d' : '%v';
        return str;
      }
    },
    {
      // a=end-of-candidates (keep after the candidates line for readability)
      name: 'endOfCandidates',
      reg: /^(end-of-candidates)/
    },
    {
      // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
      name: 'remoteCandidates',
      reg: /^remote-candidates:(.*)/,
      format: 'remote-candidates:%s'
    },
    {
      // a=ice-options:google-ice
      name: 'iceOptions',
      reg: /^ice-options:(\S*)/,
      format: 'ice-options:%s'
    },
    {
      // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
      push: 'ssrcs',
      reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
      names: ['id', 'attribute', 'value'],
      format: function (o) {
        var str = 'ssrc:%d';
        if (o.attribute != null) {
          str += ' %s';
          if (o.value != null) {
            str += ':%s';
          }
        }
        return str;
      }
    },
    {
      // a=ssrc-group:FEC 1 2
      // a=ssrc-group:FEC-FR 3004364195 1080772241
      push: 'ssrcGroups',
      // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
      reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
      names: ['semantics', 'ssrcs'],
      format: 'ssrc-group:%s %s'
    },
    {
      // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
      name: 'msidSemantic',
      reg: /^msid-semantic:\s?(\w*) (\S*)/,
      names: ['semantic', 'token'],
      format: 'msid-semantic: %s %s' // space after ':' is not accidental
    },
    {
      // a=group:BUNDLE audio video
      push: 'groups',
      reg: /^group:(\w*) (.*)/,
      names: ['type', 'mids'],
      format: 'group:%s %s'
    },
    {
      // a=rtcp-mux
      name: 'rtcpMux',
      reg: /^(rtcp-mux)/
    },
    {
      // a=rtcp-rsize
      name: 'rtcpRsize',
      reg: /^(rtcp-rsize)/
    },
    {
      // a=sctpmap:5000 webrtc-datachannel 1024
      name: 'sctpmap',
      reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
      names: ['sctpmapNumber', 'app', 'maxMessageSize'],
      format: function (o) {
        return (o.maxMessageSize != null)
          ? 'sctpmap:%s %s %s'
          : 'sctpmap:%s %s';
      }
    },
    {
      // a=x-google-flag:conference
      name: 'xGoogleFlag',
      reg: /^x-google-flag:([^\s]*)/,
      format: 'x-google-flag:%s'
    },
    {
      // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
      push: 'rids',
      reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
      names: ['id', 'direction', 'params'],
      format: function (o) {
        return (o.params) ? 'rid:%s %s %s' : 'rid:%s %s';
      }
    },
    {
      // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
      // a=imageattr:* send [x=800,y=640] recv *
      // a=imageattr:100 recv [x=320,y=240]
      push: 'imageattrs',
      reg: new RegExp(
        // a=imageattr:97
        '^imageattr:(\\d+|\\*)' +
        // send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320]
        '[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)' +
        // recv [x=330,y=250]
        '(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?'
      ),
      names: ['pt', 'dir1', 'attrs1', 'dir2', 'attrs2'],
      format: function (o) {
        return 'imageattr:%s %s %s' + (o.dir2 ? ' %s %s' : '');
      }
    },
    {
      // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
      // a=simulcast:recv 1;4,5 send 6;7
      name: 'simulcast',
      reg: new RegExp(
        // a=simulcast:
        '^simulcast:' +
        // send 1,2,3;~4,~5
        '(send|recv) ([a-zA-Z0-9\\-_~;,]+)' +
        // space + recv 6;~7,~8
        '(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?' +
        // end
        '$'
      ),
      names: ['dir1', 'list1', 'dir2', 'list2'],
      format: function (o) {
        return 'simulcast:%s %s' + (o.dir2 ? ' %s %s' : '');
      }
    },
    {
      // old simulcast draft 03 (implemented by Firefox)
      //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
      // a=simulcast: recv pt=97;98 send pt=97
      // a=simulcast: send rid=5;6;7 paused=6,7
      name: 'simulcast_03',
      reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
      names: ['value'],
      format: 'simulcast: %s'
    },
    {
      // a=framerate:25
      // a=framerate:29.97
      name: 'framerate',
      reg: /^framerate:(\d+(?:$|\.\d+))/,
      format: 'framerate:%s'
    },
    {
      // RFC4570
      // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
      name: 'sourceFilter',
      reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
      names: ['filterMode', 'netType', 'addressTypes', 'destAddress', 'srcList'],
      format: 'source-filter: %s %s %s %s %s'
    },
    {
      // a=bundle-only
      name: 'bundleOnly',
      reg: /^(bundle-only)/
    },
    {
      // a=label:1
      name: 'label',
      reg: /^label:(.+)/,
      format: 'label:%s'
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
      name: 'sctpPort',
      reg: /^sctp-port:(\d+)$/,
      format: 'sctp-port:%s'
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
      name: 'maxMessageSize',
      reg: /^max-message-size:(\d+)$/,
      format: 'max-message-size:%s'
    },
    {
      // RFC7273
      // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
      push:'tsRefClocks',
      reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
      names: ['clksrc', 'clksrcExt'],
      format: function (o) {
        return 'ts-refclk:%s' + (o.clksrcExt != null ? '=%s' : '');
      }
    },
    {
      // RFC7273
      // a=mediaclk:direct=963214424
      name:'mediaClk',
      reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
      names: ['id', 'mediaClockName', 'mediaClockValue', 'rateNumerator', 'rateDenominator'],
      format: function (o) {
        var str = 'mediaclk:';
        str += (o.id != null ? 'id=%s %s' : '%v%s');
        str += (o.mediaClockValue != null ? '=%s' : '');
        str += (o.rateNumerator != null ? ' rate=%s' : '');
        str += (o.rateDenominator != null ? '/%s' : '');
        return str;
      }
    },
    {
      // a=keywds:keywords
      name: 'keywords',
      reg: /^keywds:(.+)$/,
      format: 'keywds:%s'
    },
    {
      // a=content:main
      name: 'content',
      reg: /^content:(.+)/,
      format: 'content:%s'
    },
    // BFCP https://tools.ietf.org/html/rfc4583
    {
      // a=floorctrl:c-s
      name: 'bfcpFloorCtrl',
      reg: /^floorctrl:(c-only|s-only|c-s)/,
      format: 'floorctrl:%s'
    },
    {
      // a=confid:1
      name: 'bfcpConfId',
      reg: /^confid:(\d+)/,
      format: 'confid:%s'
    },
    {
      // a=userid:1
      name: 'bfcpUserId',
      reg: /^userid:(\d+)/,
      format: 'userid:%s'
    },
    {
      // a=floorid:1
      name: 'bfcpFloorId',
      reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
      names: ['id', 'mStream'],
      format: 'floorid:%s mstrm:%s'
    },
    {
      // any a= that we don't understand is kept verbatim on media.invalid
      push: 'invalid',
      names: ['value']
    }
  ]
};

// set sensible defaults to avoid polluting the grammar with boring details
Object.keys(grammar).forEach(function (key) {
  var objs = grammar[key];
  objs.forEach(function (obj) {
    if (!obj.reg) {
      obj.reg = /(.*)/;
    }
    if (!obj.format) {
      obj.format = '%s';
    }
  });
});


/***/ }),

/***/ 4722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var parser = __webpack_require__(2427);
var writer = __webpack_require__(923);

exports.write = writer;
exports.parse = parser.parse;
exports.parseParams = parser.parseParams;
exports.parseFmtpConfig = parser.parseFmtpConfig; // Alias of parseParams().
exports.parsePayloads = parser.parsePayloads;
exports.parseRemoteCandidates = parser.parseRemoteCandidates;
exports.parseImageAttributes = parser.parseImageAttributes;
exports.parseSimulcastStreamList = parser.parseSimulcastStreamList;


/***/ }),

/***/ 2427:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var toIntIfInt = function (v) {
  return String(Number(v)) === v ? Number(v) : v;
};

var attachProperties = function (match, location, names, rawName) {
  if (rawName && !names) {
    location[rawName] = toIntIfInt(match[1]);
  }
  else {
    for (var i = 0; i < names.length; i += 1) {
      if (match[i+1] != null) {
        location[names[i]] = toIntIfInt(match[i+1]);
      }
    }
  }
};

var parseReg = function (obj, location, content) {
  var needsBlank = obj.name && obj.names;
  if (obj.push && !location[obj.push]) {
    location[obj.push] = [];
  }
  else if (needsBlank && !location[obj.name]) {
    location[obj.name] = {};
  }
  var keyLocation = obj.push ?
    {} :  // blank object that will be pushed
    needsBlank ? location[obj.name] : location; // otherwise, named location or root

  attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);

  if (obj.push) {
    location[obj.push].push(keyLocation);
  }
};

var grammar = __webpack_require__(9323);
var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);

exports.parse = function (sdp) {
  var session = {}
    , media = []
    , location = session; // points at where properties go under (one of the above)

  // parse lines we understand
  sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function (l) {
    var type = l[0];
    var content = l.slice(2);
    if (type === 'm') {
      media.push({rtp: [], fmtp: []});
      location = media[media.length-1]; // point at latest media line
    }

    for (var j = 0; j < (grammar[type] || []).length; j += 1) {
      var obj = grammar[type][j];
      if (obj.reg.test(content)) {
        return parseReg(obj, location, content);
      }
    }
  });

  session.media = media; // link it up
  return session;
};

var paramReducer = function (acc, expr) {
  var s = expr.split(/=(.+)/, 2);
  if (s.length === 2) {
    acc[s[0]] = toIntIfInt(s[1]);
  } else if (s.length === 1 && expr.length > 1) {
    acc[s[0]] = undefined;
  }
  return acc;
};

exports.parseParams = function (str) {
  return str.split(/;\s?/).reduce(paramReducer, {});
};

// For backward compatibility - alias will be removed in 3.0.0
exports.parseFmtpConfig = exports.parseParams;

exports.parsePayloads = function (str) {
  return str.toString().split(' ').map(Number);
};

exports.parseRemoteCandidates = function (str) {
  var candidates = [];
  var parts = str.split(' ').map(toIntIfInt);
  for (var i = 0; i < parts.length; i += 3) {
    candidates.push({
      component: parts[i],
      ip: parts[i + 1],
      port: parts[i + 2]
    });
  }
  return candidates;
};

exports.parseImageAttributes = function (str) {
  return str.split(' ').map(function (item) {
    return item.substring(1, item.length-1).split(',').reduce(paramReducer, {});
  });
};

exports.parseSimulcastStreamList = function (str) {
  return str.split(';').map(function (stream) {
    return stream.split(',').map(function (format) {
      var scid, paused = false;

      if (format[0] !== '~') {
        scid = toIntIfInt(format);
      } else {
        scid = toIntIfInt(format.substring(1, format.length));
        paused = true;
      }

      return {
        scid: scid,
        paused: paused
      };
    });
  });
};


/***/ }),

/***/ 923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var grammar = __webpack_require__(9323);

// customized util.format - discards excess arguments and can void middle ones
var formatRegExp = /%[sdv%]/g;
var format = function (formatStr) {
  var i = 1;
  var args = arguments;
  var len = args.length;
  return formatStr.replace(formatRegExp, function (x) {
    if (i >= len) {
      return x; // missing argument
    }
    var arg = args[i];
    i += 1;
    switch (x) {
    case '%%':
      return '%';
    case '%s':
      return String(arg);
    case '%d':
      return Number(arg);
    case '%v':
      return '';
    }
  });
  // NB: we discard excess arguments - they are typically undefined from makeLine
};

var makeLine = function (type, obj, location) {
  var str = obj.format instanceof Function ?
    (obj.format(obj.push ? location : location[obj.name])) :
    obj.format;

  var args = [type + '=' + str];
  if (obj.names) {
    for (var i = 0; i < obj.names.length; i += 1) {
      var n = obj.names[i];
      if (obj.name) {
        args.push(location[obj.name][n]);
      }
      else { // for mLine and push attributes
        args.push(location[obj.names[i]]);
      }
    }
  }
  else {
    args.push(location[obj.name]);
  }
  return format.apply(null, args);
};

// RFC specified order
// TODO: extend this with all the rest
var defaultOuterOrder = [
  'v', 'o', 's', 'i',
  'u', 'e', 'p', 'c',
  'b', 't', 'r', 'z', 'a'
];
var defaultInnerOrder = ['i', 'c', 'b', 'a'];


module.exports = function (session, opts) {
  opts = opts || {};
  // ensure certain properties exist
  if (session.version == null) {
    session.version = 0; // 'v=0' must be there (only defined version atm)
  }
  if (session.name == null) {
    session.name = ' '; // 's= ' must be there if no meaningful name set
  }
  session.media.forEach(function (mLine) {
    if (mLine.payloads == null) {
      mLine.payloads = '';
    }
  });

  var outerOrder = opts.outerOrder || defaultOuterOrder;
  var innerOrder = opts.innerOrder || defaultInnerOrder;
  var sdp = [];

  // loop through outerOrder for matching properties on session
  outerOrder.forEach(function (type) {
    grammar[type].forEach(function (obj) {
      if (obj.name in session && session[obj.name] != null) {
        sdp.push(makeLine(type, obj, session));
      }
      else if (obj.push in session && session[obj.push] != null) {
        session[obj.push].forEach(function (el) {
          sdp.push(makeLine(type, obj, el));
        });
      }
    });
  });

  // then for each media line, follow the innerOrder
  session.media.forEach(function (mLine) {
    sdp.push(makeLine('m', grammar.m[0], mLine));

    innerOrder.forEach(function (type) {
      grammar[type].forEach(function (obj) {
        if (obj.name in mLine && mLine[obj.name] != null) {
          sdp.push(makeLine(type, obj, mLine));
        }
        else if (obj.push in mLine && mLine[obj.push] != null) {
          mLine[obj.push].forEach(function (el) {
            sdp.push(makeLine(type, obj, el));
          });
        }
      });
    });
  });

  return sdp.join('\r\n') + '\r\n';
};


/***/ }),

/***/ 2851:
/***/ ((module) => {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ 7269:
/***/ ((module) => {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ 7109:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(4564));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 4596:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version.default;
  }
}));

var _v = _interopRequireDefault(__webpack_require__(4603));

var _v2 = _interopRequireDefault(__webpack_require__(9917));

var _v3 = _interopRequireDefault(__webpack_require__(2712));

var _v4 = _interopRequireDefault(__webpack_require__(3423));

var _nil = _interopRequireDefault(__webpack_require__(5911));

var _version = _interopRequireDefault(__webpack_require__(7109));

var _validate = _interopRequireDefault(__webpack_require__(4564));

var _stringify = _interopRequireDefault(__webpack_require__(6585));

var _parse = _interopRequireDefault(__webpack_require__(9975));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 2668:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 193:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID
};
exports["default"] = _default;

/***/ }),

/***/ 5911:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 9975:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(4564));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 6635:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 4089:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ 4271:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 6585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;

var _validate = _interopRequireDefault(__webpack_require__(4564));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 4603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__webpack_require__(4089));

var _stringify = __webpack_require__(6585);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 9917:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(4782));

var _md = _interopRequireDefault(__webpack_require__(2668));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 4782:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;

var _stringify = __webpack_require__(6585);

var _parse = _interopRequireDefault(__webpack_require__(9975));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 2712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _native = _interopRequireDefault(__webpack_require__(193));

var _rng = _interopRequireDefault(__webpack_require__(4089));

var _stringify = __webpack_require__(6585);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }

  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 3423:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(4782));

var _sha = _interopRequireDefault(__webpack_require__(4271));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 4564:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__webpack_require__(6635));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 4945:
/***/ ((module) => {

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=undefined;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=undefined,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */

'use strict';

var _adapter_factory = require("./adapter_factory.js");
var adapter = (0, _adapter_factory.adapterFactory)({
  window: typeof window === 'undefined' ? undefined : window
});
module.exports = adapter; // this is the difference from adapter_core.

},{"./adapter_factory.js":2}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adapterFactory = adapterFactory;
var utils = _interopRequireWildcard(require("./utils"));
var chromeShim = _interopRequireWildcard(require("./chrome/chrome_shim"));
var firefoxShim = _interopRequireWildcard(require("./firefox/firefox_shim"));
var safariShim = _interopRequireWildcard(require("./safari/safari_shim"));
var commonShim = _interopRequireWildcard(require("./common_shim"));
var sdp = _interopRequireWildcard(require("sdp"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

// Browser shims.

// Shimming starts here.
function adapterFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    window = _ref.window;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    shimChrome: true,
    shimFirefox: true,
    shimSafari: true
  };
  // Utils.
  var logging = utils.log;
  var browserDetails = utils.detectBrowser(window);
  var adapter = {
    browserDetails: browserDetails,
    commonShim: commonShim,
    extractVersion: utils.extractVersion,
    disableLog: utils.disableLog,
    disableWarnings: utils.disableWarnings,
    // Expose sdp as a convenience. For production apps include directly.
    sdp: sdp
  };

  // Shim browser if found.
  switch (browserDetails.browser) {
    case 'chrome':
      if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
        logging('Chrome shim is not included in this adapter release.');
        return adapter;
      }
      if (browserDetails.version === null) {
        logging('Chrome shim can not determine version, not shimming.');
        return adapter;
      }
      logging('adapter.js shimming chrome.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = chromeShim;

      // Must be called before shimPeerConnection.
      commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
      commonShim.shimParameterlessSetLocalDescription(window, browserDetails);
      chromeShim.shimGetUserMedia(window, browserDetails);
      chromeShim.shimMediaStream(window, browserDetails);
      chromeShim.shimPeerConnection(window, browserDetails);
      chromeShim.shimOnTrack(window, browserDetails);
      chromeShim.shimAddTrackRemoveTrack(window, browserDetails);
      chromeShim.shimGetSendersWithDtmf(window, browserDetails);
      chromeShim.shimGetStats(window, browserDetails);
      chromeShim.shimSenderReceiverGetStats(window, browserDetails);
      chromeShim.fixNegotiationNeeded(window, browserDetails);
      commonShim.shimRTCIceCandidate(window, browserDetails);
      commonShim.shimRTCIceCandidateRelayProtocol(window, browserDetails);
      commonShim.shimConnectionState(window, browserDetails);
      commonShim.shimMaxMessageSize(window, browserDetails);
      commonShim.shimSendThrowTypeError(window, browserDetails);
      commonShim.removeExtmapAllowMixed(window, browserDetails);
      break;
    case 'firefox':
      if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
        logging('Firefox shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming firefox.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = firefoxShim;

      // Must be called before shimPeerConnection.
      commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
      commonShim.shimParameterlessSetLocalDescription(window, browserDetails);
      firefoxShim.shimGetUserMedia(window, browserDetails);
      firefoxShim.shimPeerConnection(window, browserDetails);
      firefoxShim.shimOnTrack(window, browserDetails);
      firefoxShim.shimRemoveStream(window, browserDetails);
      firefoxShim.shimSenderGetStats(window, browserDetails);
      firefoxShim.shimReceiverGetStats(window, browserDetails);
      firefoxShim.shimRTCDataChannel(window, browserDetails);
      firefoxShim.shimAddTransceiver(window, browserDetails);
      firefoxShim.shimGetParameters(window, browserDetails);
      firefoxShim.shimCreateOffer(window, browserDetails);
      firefoxShim.shimCreateAnswer(window, browserDetails);
      commonShim.shimRTCIceCandidate(window, browserDetails);
      commonShim.shimConnectionState(window, browserDetails);
      commonShim.shimMaxMessageSize(window, browserDetails);
      commonShim.shimSendThrowTypeError(window, browserDetails);
      break;
    case 'safari':
      if (!safariShim || !options.shimSafari) {
        logging('Safari shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming safari.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = safariShim;

      // Must be called before shimCallbackAPI.
      commonShim.shimAddIceCandidateNullOrEmpty(window, browserDetails);
      commonShim.shimParameterlessSetLocalDescription(window, browserDetails);
      safariShim.shimRTCIceServerUrls(window, browserDetails);
      safariShim.shimCreateOfferLegacy(window, browserDetails);
      safariShim.shimCallbacksAPI(window, browserDetails);
      safariShim.shimLocalStreamsAPI(window, browserDetails);
      safariShim.shimRemoteStreamsAPI(window, browserDetails);
      safariShim.shimTrackEventTransceiver(window, browserDetails);
      safariShim.shimGetUserMedia(window, browserDetails);
      safariShim.shimAudioContext(window, browserDetails);
      commonShim.shimRTCIceCandidate(window, browserDetails);
      commonShim.shimRTCIceCandidateRelayProtocol(window, browserDetails);
      commonShim.shimMaxMessageSize(window, browserDetails);
      commonShim.shimSendThrowTypeError(window, browserDetails);
      commonShim.removeExtmapAllowMixed(window, browserDetails);
      break;
    default:
      logging('Unsupported browser!');
      break;
  }
  return adapter;
}

},{"./chrome/chrome_shim":3,"./common_shim":6,"./firefox/firefox_shim":7,"./safari/safari_shim":10,"./utils":11,"sdp":12}],3:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixNegotiationNeeded = fixNegotiationNeeded;
exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
Object.defineProperty(exports, "shimGetDisplayMedia", {
  enumerable: true,
  get: function get() {
    return _getdisplaymedia.shimGetDisplayMedia;
  }
});
exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
exports.shimGetStats = shimGetStats;
Object.defineProperty(exports, "shimGetUserMedia", {
  enumerable: true,
  get: function get() {
    return _getusermedia.shimGetUserMedia;
  }
});
exports.shimMediaStream = shimMediaStream;
exports.shimOnTrack = shimOnTrack;
exports.shimPeerConnection = shimPeerConnection;
exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
var utils = _interopRequireWildcard(require("../utils.js"));
var _getusermedia = require("./getusermedia");
var _getdisplaymedia = require("./getdisplaymedia");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function shimMediaStream(window) {
  window.MediaStream = window.MediaStream || window.webkitMediaStream;
}
function shimOnTrack(window) {
  if (_typeof(window) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
      get: function get() {
        return this._ontrack;
      },
      set: function set(f) {
        if (this._ontrack) {
          this.removeEventListener('track', this._ontrack);
        }
        this.addEventListener('track', this._ontrack = f);
      },
      enumerable: true,
      configurable: true
    });
    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      var _this = this;
      if (!this._ontrackpoly) {
        this._ontrackpoly = function (e) {
          // onaddstream does not fire when a track is added to an existing
          // stream. But stream.onaddtrack is implemented so we use that.
          e.stream.addEventListener('addtrack', function (te) {
            var receiver;
            if (window.RTCPeerConnection.prototype.getReceivers) {
              receiver = _this.getReceivers().find(function (r) {
                return r.track && r.track.id === te.track.id;
              });
            } else {
              receiver = {
                track: te.track
              };
            }
            var event = new Event('track');
            event.track = te.track;
            event.receiver = receiver;
            event.transceiver = {
              receiver: receiver
            };
            event.streams = [e.stream];
            _this.dispatchEvent(event);
          });
          e.stream.getTracks().forEach(function (track) {
            var receiver;
            if (window.RTCPeerConnection.prototype.getReceivers) {
              receiver = _this.getReceivers().find(function (r) {
                return r.track && r.track.id === track.id;
              });
            } else {
              receiver = {
                track: track
              };
            }
            var event = new Event('track');
            event.track = track;
            event.receiver = receiver;
            event.transceiver = {
              receiver: receiver
            };
            event.streams = [e.stream];
            _this.dispatchEvent(event);
          });
        };
        this.addEventListener('addstream', this._ontrackpoly);
      }
      return origSetRemoteDescription.apply(this, arguments);
    };
  } else {
    // even if RTCRtpTransceiver is in window, it is only used and
    // emitted in unified-plan. Unfortunately this means we need
    // to unconditionally wrap the event.
    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
      if (!e.transceiver) {
        Object.defineProperty(e, 'transceiver', {
          value: {
            receiver: e.receiver
          }
        });
      }
      return e;
    });
  }
}
function shimGetSendersWithDtmf(window) {
  // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
  if (_typeof(window) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
    var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
      return {
        track: track,
        get dtmf() {
          if (this._dtmf === undefined) {
            if (track.kind === 'audio') {
              this._dtmf = pc.createDTMFSender(track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        },
        _pc: pc
      };
    };

    // augment addTrack when getSenders is not available.
    if (!window.RTCPeerConnection.prototype.getSenders) {
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        this._senders = this._senders || [];
        return this._senders.slice(); // return a copy of the internal state.
      };

      var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        var sender = origAddTrack.apply(this, arguments);
        if (!sender) {
          sender = shimSenderWithDtmf(this, track);
          this._senders.push(sender);
        }
        return sender;
      };
      var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
      window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        origRemoveTrack.apply(this, arguments);
        var idx = this._senders.indexOf(sender);
        if (idx !== -1) {
          this._senders.splice(idx, 1);
        }
      };
    }
    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      var _this2 = this;
      this._senders = this._senders || [];
      origAddStream.apply(this, [stream]);
      stream.getTracks().forEach(function (track) {
        _this2._senders.push(shimSenderWithDtmf(_this2, track));
      });
    };
    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      var _this3 = this;
      this._senders = this._senders || [];
      origRemoveStream.apply(this, [stream]);
      stream.getTracks().forEach(function (track) {
        var sender = _this3._senders.find(function (s) {
          return s.track === track;
        });
        if (sender) {
          // remove sender
          _this3._senders.splice(_this3._senders.indexOf(sender), 1);
        }
      });
    };
  } else if (_typeof(window) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
      var _this4 = this;
      var senders = origGetSenders.apply(this, []);
      senders.forEach(function (sender) {
        return sender._pc = _this4;
      });
      return senders;
    };
    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
      get: function get() {
        if (this._dtmf === undefined) {
          if (this.track.kind === 'audio') {
            this._dtmf = this._pc.createDTMFSender(this.track);
          } else {
            this._dtmf = null;
          }
        }
        return this._dtmf;
      }
    });
  }
}
function shimGetStats(window) {
  if (!window.RTCPeerConnection) {
    return;
  }
  var origGetStats = window.RTCPeerConnection.prototype.getStats;
  window.RTCPeerConnection.prototype.getStats = function getStats() {
    var _this5 = this;
    var _arguments = Array.prototype.slice.call(arguments),
      selector = _arguments[0],
      onSucc = _arguments[1],
      onErr = _arguments[2];

    // If selector is a function then we are in the old style stats so just
    // pass back the original getStats format to avoid breaking old users.
    if (arguments.length > 0 && typeof selector === 'function') {
      return origGetStats.apply(this, arguments);
    }

    // When spec-style getStats is supported, return those when called with
    // either no arguments or the selector argument is null.
    if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
      return origGetStats.apply(this, []);
    }
    var fixChromeStats_ = function fixChromeStats_(response) {
      var standardReport = {};
      var reports = response.result();
      reports.forEach(function (report) {
        var standardStats = {
          id: report.id,
          timestamp: report.timestamp,
          type: {
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          }[report.type] || report.type
        };
        report.names().forEach(function (name) {
          standardStats[name] = report.stat(name);
        });
        standardReport[standardStats.id] = standardStats;
      });
      return standardReport;
    };

    // shim getStats with maplike support
    var makeMapStats = function makeMapStats(stats) {
      return new Map(Object.keys(stats).map(function (key) {
        return [key, stats[key]];
      }));
    };
    if (arguments.length >= 2) {
      var successCallbackWrapper_ = function successCallbackWrapper_(response) {
        onSucc(makeMapStats(fixChromeStats_(response)));
      };
      return origGetStats.apply(this, [successCallbackWrapper_, selector]);
    }

    // promise-support
    return new Promise(function (resolve, reject) {
      origGetStats.apply(_this5, [function (response) {
        resolve(makeMapStats(fixChromeStats_(response)));
      }, reject]);
    }).then(onSucc, onErr);
  };
}
function shimSenderReceiverGetStats(window) {
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
    return;
  }

  // shim sender stats.
  if (!('getStats' in window.RTCRtpSender.prototype)) {
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) {
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        var _this6 = this;
        var senders = origGetSenders.apply(this, []);
        senders.forEach(function (sender) {
          return sender._pc = _this6;
        });
        return senders;
      };
    }
    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) {
      window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        var sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }
    window.RTCRtpSender.prototype.getStats = function getStats() {
      var sender = this;
      return this._pc.getStats().then(function (result) {
        return (
          /* Note: this will include stats of all senders that
           *   send a track with the same id as sender.track as
           *   it is not possible to identify the RTCRtpSender.
           */
          utils.filterStats(result, sender.track, true)
        );
      });
    };
  }

  // shim receiver stats.
  if (!('getStats' in window.RTCRtpReceiver.prototype)) {
    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) {
      window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        var _this7 = this;
        var receivers = origGetReceivers.apply(this, []);
        receivers.forEach(function (receiver) {
          return receiver._pc = _this7;
        });
        return receivers;
      };
    }
    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
      e.receiver._pc = e.srcElement;
      return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
      var receiver = this;
      return this._pc.getStats().then(function (result) {
        return utils.filterStats(result, receiver.track, false);
      });
    };
  }
  if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
    return;
  }

  // shim RTCPeerConnection.getStats(track).
  var origGetStats = window.RTCPeerConnection.prototype.getStats;
  window.RTCPeerConnection.prototype.getStats = function getStats() {
    if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
      var track = arguments[0];
      var sender;
      var receiver;
      var err;
      this.getSenders().forEach(function (s) {
        if (s.track === track) {
          if (sender) {
            err = true;
          } else {
            sender = s;
          }
        }
      });
      this.getReceivers().forEach(function (r) {
        if (r.track === track) {
          if (receiver) {
            err = true;
          } else {
            receiver = r;
          }
        }
        return r.track === track;
      });
      if (err || sender && receiver) {
        return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
      } else if (sender) {
        return sender.getStats();
      } else if (receiver) {
        return receiver.getStats();
      }
      return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
    }
    return origGetStats.apply(this, arguments);
  };
}
function shimAddTrackRemoveTrackWithNative(window) {
  // shim addTrack/removeTrack with native variants in order to make
  // the interactions with legacy getLocalStreams behave as in other browsers.
  // Keeps a mapping stream.id => [stream, rtpsenders...]
  window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
    var _this8 = this;
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
      return _this8._shimmedLocalStreams[streamId][0];
    });
  };
  var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
  window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
    if (!stream) {
      return origAddTrack.apply(this, arguments);
    }
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    var sender = origAddTrack.apply(this, arguments);
    if (!this._shimmedLocalStreams[stream.id]) {
      this._shimmedLocalStreams[stream.id] = [stream, sender];
    } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
      this._shimmedLocalStreams[stream.id].push(sender);
    }
    return sender;
  };
  var origAddStream = window.RTCPeerConnection.prototype.addStream;
  window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
    var _this9 = this;
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    stream.getTracks().forEach(function (track) {
      var alreadyExists = _this9.getSenders().find(function (s) {
        return s.track === track;
      });
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
    });
    var existingSenders = this.getSenders();
    origAddStream.apply(this, arguments);
    var newSenders = this.getSenders().filter(function (newSender) {
      return existingSenders.indexOf(newSender) === -1;
    });
    this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
  };
  var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
  window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    delete this._shimmedLocalStreams[stream.id];
    return origRemoveStream.apply(this, arguments);
  };
  var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
  window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
    var _this10 = this;
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    if (sender) {
      Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
        var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
        if (idx !== -1) {
          _this10._shimmedLocalStreams[streamId].splice(idx, 1);
        }
        if (_this10._shimmedLocalStreams[streamId].length === 1) {
          delete _this10._shimmedLocalStreams[streamId];
        }
      });
    }
    return origRemoveTrack.apply(this, arguments);
  };
}
function shimAddTrackRemoveTrack(window, browserDetails) {
  if (!window.RTCPeerConnection) {
    return;
  }
  // shim addTrack and removeTrack.
  if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
    return shimAddTrackRemoveTrackWithNative(window);
  }

  // also shim pc.getLocalStreams when addTrack is shimmed
  // to return the original streams.
  var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
  window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
    var _this11 = this;
    var nativeStreams = origGetLocalStreams.apply(this);
    this._reverseStreams = this._reverseStreams || {};
    return nativeStreams.map(function (stream) {
      return _this11._reverseStreams[stream.id];
    });
  };
  var origAddStream = window.RTCPeerConnection.prototype.addStream;
  window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
    var _this12 = this;
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    stream.getTracks().forEach(function (track) {
      var alreadyExists = _this12.getSenders().find(function (s) {
        return s.track === track;
      });
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
    });
    // Add identity mapping for consistency with addTrack.
    // Unless this is being used with a stream from addTrack.
    if (!this._reverseStreams[stream.id]) {
      var newStream = new window.MediaStream(stream.getTracks());
      this._streams[stream.id] = newStream;
      this._reverseStreams[newStream.id] = stream;
      stream = newStream;
    }
    origAddStream.apply(this, [stream]);
  };
  var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
  window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
    delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
    delete this._streams[stream.id];
  };
  window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
    var _this13 = this;
    if (this.signalingState === 'closed') {
      throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
    }
    var streams = [].slice.call(arguments, 1);
    if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
      return t === track;
    })) {
      // this is not fully correct but all we can manage without
      // [[associated MediaStreams]] internal slot.
      throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
    }
    var alreadyExists = this.getSenders().find(function (s) {
      return s.track === track;
    });
    if (alreadyExists) {
      throw new DOMException('Track already exists.', 'InvalidAccessError');
    }
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    var oldStream = this._streams[stream.id];
    if (oldStream) {
      // this is using odd Chrome behaviour, use with caution:
      // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
      // Note: we rely on the high-level addTrack/dtmf shim to
      // create the sender with a dtmf sender.
      oldStream.addTrack(track);

      // Trigger ONN async.
      Promise.resolve().then(function () {
        _this13.dispatchEvent(new Event('negotiationneeded'));
      });
    } else {
      var newStream = new window.MediaStream([track]);
      this._streams[stream.id] = newStream;
      this._reverseStreams[newStream.id] = stream;
      this.addStream(newStream);
    }
    return this.getSenders().find(function (s) {
      return s.track === track;
    });
  };

  // replace the internal stream id with the external one and
  // vice versa.
  function replaceInternalStreamId(pc, description) {
    var sdp = description.sdp;
    Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
      var externalStream = pc._reverseStreams[internalId];
      var internalStream = pc._streams[externalStream.id];
      sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
    });
    return new RTCSessionDescription({
      type: description.type,
      sdp: sdp
    });
  }
  function replaceExternalStreamId(pc, description) {
    var sdp = description.sdp;
    Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
      var externalStream = pc._reverseStreams[internalId];
      var internalStream = pc._streams[externalStream.id];
      sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
    });
    return new RTCSessionDescription({
      type: description.type,
      sdp: sdp
    });
  }
  ['createOffer', 'createAnswer'].forEach(function (method) {
    var nativeMethod = window.RTCPeerConnection.prototype[method];
    var methodObj = _defineProperty({}, method, function () {
      var _this14 = this;
      var args = arguments;
      var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
      if (isLegacyCall) {
        return nativeMethod.apply(this, [function (description) {
          var desc = replaceInternalStreamId(_this14, description);
          args[0].apply(null, [desc]);
        }, function (err) {
          if (args[1]) {
            args[1].apply(null, err);
          }
        }, arguments[2]]);
      }
      return nativeMethod.apply(this, arguments).then(function (description) {
        return replaceInternalStreamId(_this14, description);
      });
    });
    window.RTCPeerConnection.prototype[method] = methodObj[method];
  });
  var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
  window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
    if (!arguments.length || !arguments[0].type) {
      return origSetLocalDescription.apply(this, arguments);
    }
    arguments[0] = replaceExternalStreamId(this, arguments[0]);
    return origSetLocalDescription.apply(this, arguments);
  };

  // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

  var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
  Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
    get: function get() {
      var description = origLocalDescription.get.apply(this);
      if (description.type === '') {
        return description;
      }
      return replaceInternalStreamId(this, description);
    }
  });
  window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
    var _this15 = this;
    if (this.signalingState === 'closed') {
      throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
    }
    // We can not yet check for sender instanceof RTCRtpSender
    // since we shim RTPSender. So we check if sender._pc is set.
    if (!sender._pc) {
      throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
    }
    var isLocal = sender._pc === this;
    if (!isLocal) {
      throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
    }

    // Search for the native stream the senders track belongs to.
    this._streams = this._streams || {};
    var stream;
    Object.keys(this._streams).forEach(function (streamid) {
      var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
        return sender.track === track;
      });
      if (hasTrack) {
        stream = _this15._streams[streamid];
      }
    });
    if (stream) {
      if (stream.getTracks().length === 1) {
        // if this is the last track of the stream, remove the stream. This
        // takes care of any shimmed _senders.
        this.removeStream(this._reverseStreams[stream.id]);
      } else {
        // relying on the same odd chrome behaviour as above.
        stream.removeTrack(sender.track);
      }
      this.dispatchEvent(new Event('negotiationneeded'));
    }
  };
}
function shimPeerConnection(window, browserDetails) {
  if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
    // very basic support for old versions.
    window.RTCPeerConnection = window.webkitRTCPeerConnection;
  }
  if (!window.RTCPeerConnection) {
    return;
  }

  // shim implicit creation of RTCSessionDescription/RTCIceCandidate
  if (browserDetails.version < 53) {
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      var methodObj = _defineProperty({}, method, function () {
        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
        return nativeMethod.apply(this, arguments);
      });
      window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
  }
}

// Attempt to fix ONN in plan-b mode.
function fixNegotiationNeeded(window, browserDetails) {
  utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
    var pc = e.target;
    if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
      if (pc.signalingState !== 'stable') {
        return;
      }
    }
    return e;
  });
}

},{"../utils.js":11,"./getdisplaymedia":4,"./getusermedia":5}],4:[function(require,module,exports){
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;
function shimGetDisplayMedia(window, getSourceId) {
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }
  if (!window.navigator.mediaDevices) {
    return;
  }
  // getSourceId is a function that returns a promise resolving with
  // the sourceId of the screen/window/tab to be shared.
  if (typeof getSourceId !== 'function') {
    console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
    return;
  }
  window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
    return getSourceId(constraints).then(function (sourceId) {
      var widthSpecified = constraints.video && constraints.video.width;
      var heightSpecified = constraints.video && constraints.video.height;
      var frameRateSpecified = constraints.video && constraints.video.frameRate;
      constraints.video = {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          maxFrameRate: frameRateSpecified || 3
        }
      };
      if (widthSpecified) {
        constraints.video.mandatory.maxWidth = widthSpecified;
      }
      if (heightSpecified) {
        constraints.video.mandatory.maxHeight = heightSpecified;
      }
      return window.navigator.mediaDevices.getUserMedia(constraints);
    });
  };
}

},{}],5:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetUserMedia = shimGetUserMedia;
var utils = _interopRequireWildcard(require("../utils.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var logging = utils.log;
function shimGetUserMedia(window, browserDetails) {
  var navigator = window && window.navigator;
  if (!navigator.mediaDevices) {
    return;
  }
  var constraintsToChrome_ = function constraintsToChrome_(c) {
    if (_typeof(c) !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    var cc = {};
    Object.keys(c).forEach(function (key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      var r = _typeof(c[key]) === 'object' ? c[key] : {
        ideal: c[key]
      };
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      var oldname_ = function oldname_(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return name === 'deviceId' ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname_('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname_('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname_('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname_('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function (mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };
  var shimConstraints_ = function shimConstraints_(constraints, func) {
    if (browserDetails.version >= 61) {
      return func(constraints);
    }
    constraints = JSON.parse(JSON.stringify(constraints));
    if (constraints && _typeof(constraints.audio) === 'object') {
      var remap = function remap(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };
      constraints = JSON.parse(JSON.stringify(constraints));
      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
      constraints.audio = constraintsToChrome_(constraints.audio);
    }
    if (constraints && _typeof(constraints.video) === 'object') {
      // Shim facingMode for mobile & surface pro.
      var face = constraints.video.facingMode;
      face = face && (_typeof(face) === 'object' ? face : {
        ideal: face
      });
      var getSupportedFacingModeLies = browserDetails.version < 66;
      if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
        delete constraints.video.facingMode;
        var matches;
        if (face.exact === 'environment' || face.ideal === 'environment') {
          matches = ['back', 'rear'];
        } else if (face.exact === 'user' || face.ideal === 'user') {
          matches = ['front'];
        }
        if (matches) {
          // Look for matches in label, or use last cam for back (typical).
          return navigator.mediaDevices.enumerateDevices().then(function (devices) {
            devices = devices.filter(function (d) {
              return d.kind === 'videoinput';
            });
            var dev = devices.find(function (d) {
              return matches.some(function (match) {
                return d.label.toLowerCase().includes(match);
              });
            });
            if (!dev && devices.length && matches.includes('back')) {
              dev = devices[devices.length - 1]; // more likely the back cam
            }

            if (dev) {
              constraints.video.deviceId = face.exact ? {
                exact: dev.deviceId
              } : {
                ideal: dev.deviceId
              };
            }
            constraints.video = constraintsToChrome_(constraints.video);
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          });
        }
      }
      constraints.video = constraintsToChrome_(constraints.video);
    }
    logging('chrome: ' + JSON.stringify(constraints));
    return func(constraints);
  };
  var shimError_ = function shimError_(e) {
    if (browserDetails.version >= 64) {
      return e;
    }
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError',
        PermissionDismissedError: 'NotAllowedError',
        InvalidStateError: 'NotAllowedError',
        DevicesNotFoundError: 'NotFoundError',
        ConstraintNotSatisfiedError: 'OverconstrainedError',
        TrackStartError: 'NotReadableError',
        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
        MediaDeviceKillSwitchOn: 'NotAllowedError',
        TabCaptureError: 'AbortError',
        ScreenCaptureError: 'AbortError',
        DeviceCaptureError: 'AbortError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraint || e.constraintName,
      toString: function toString() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };
  var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
    shimConstraints_(constraints, function (c) {
      navigator.webkitGetUserMedia(c, onSuccess, function (e) {
        if (onError) {
          onError(shimError_(e));
        }
      });
    });
  };
  navigator.getUserMedia = getUserMedia_.bind(navigator);

  // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
  // function which returns a Promise, it does not accept spec-style
  // constraints.
  if (navigator.mediaDevices.getUserMedia) {
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (cs) {
      return shimConstraints_(cs, function (c) {
        return origGetUserMedia(c).then(function (stream) {
          if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
            throw new DOMException('', 'NotFoundError');
          }
          return stream;
        }, function (e) {
          return Promise.reject(shimError_(e));
        });
      });
    };
  }
}

},{"../utils.js":11}],6:[function(require,module,exports){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeExtmapAllowMixed = removeExtmapAllowMixed;
exports.shimAddIceCandidateNullOrEmpty = shimAddIceCandidateNullOrEmpty;
exports.shimConnectionState = shimConnectionState;
exports.shimMaxMessageSize = shimMaxMessageSize;
exports.shimParameterlessSetLocalDescription = shimParameterlessSetLocalDescription;
exports.shimRTCIceCandidate = shimRTCIceCandidate;
exports.shimRTCIceCandidateRelayProtocol = shimRTCIceCandidateRelayProtocol;
exports.shimSendThrowTypeError = shimSendThrowTypeError;
var _sdp = _interopRequireDefault(require("sdp"));
var utils = _interopRequireWildcard(require("./utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function shimRTCIceCandidate(window) {
  // foundation is arbitrarily chosen as an indicator for full support for
  // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
  if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
    return;
  }
  var NativeRTCIceCandidate = window.RTCIceCandidate;
  window.RTCIceCandidate = function RTCIceCandidate(args) {
    // Remove the a= which shouldn't be part of the candidate string.
    if (_typeof(args) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
      args = JSON.parse(JSON.stringify(args));
      args.candidate = args.candidate.substring(2);
    }
    if (args.candidate && args.candidate.length) {
      // Augment the native candidate with the parsed fields.
      var nativeCandidate = new NativeRTCIceCandidate(args);
      var parsedCandidate = _sdp["default"].parseCandidate(args.candidate);
      for (var key in parsedCandidate) {
        if (!(key in nativeCandidate)) {
          Object.defineProperty(nativeCandidate, key, {
            value: parsedCandidate[key]
          });
        }
      }

      // Override serializer to not serialize the extra attributes.
      nativeCandidate.toJSON = function toJSON() {
        return {
          candidate: nativeCandidate.candidate,
          sdpMid: nativeCandidate.sdpMid,
          sdpMLineIndex: nativeCandidate.sdpMLineIndex,
          usernameFragment: nativeCandidate.usernameFragment
        };
      };
      return nativeCandidate;
    }
    return new NativeRTCIceCandidate(args);
  };
  window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

  // Hook up the augmented candidate in onicecandidate and
  // addEventListener('icecandidate', ...)
  utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
    if (e.candidate) {
      Object.defineProperty(e, 'candidate', {
        value: new window.RTCIceCandidate(e.candidate),
        writable: 'false'
      });
    }
    return e;
  });
}
function shimRTCIceCandidateRelayProtocol(window) {
  if (!window.RTCIceCandidate || window.RTCIceCandidate && 'relayProtocol' in window.RTCIceCandidate.prototype) {
    return;
  }

  // Hook up the augmented candidate in onicecandidate and
  // addEventListener('icecandidate', ...)
  utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
    if (e.candidate) {
      var parsedCandidate = _sdp["default"].parseCandidate(e.candidate.candidate);
      if (parsedCandidate.type === 'relay') {
        // This is a libwebrtc-specific mapping of local type preference
        // to relayProtocol.
        e.candidate.relayProtocol = {
          0: 'tls',
          1: 'tcp',
          2: 'udp'
        }[parsedCandidate.priority >> 24];
      }
    }
    return e;
  });
}
function shimMaxMessageSize(window, browserDetails) {
  if (!window.RTCPeerConnection) {
    return;
  }
  if (!('sctp' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
      get: function get() {
        return typeof this._sctp === 'undefined' ? null : this._sctp;
      }
    });
  }
  var sctpInDescription = function sctpInDescription(description) {
    if (!description || !description.sdp) {
      return false;
    }
    var sections = _sdp["default"].splitSections(description.sdp);
    sections.shift();
    return sections.some(function (mediaSection) {
      var mLine = _sdp["default"].parseMLine(mediaSection);
      return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
    });
  };
  var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
    // TODO: Is there a better solution for detecting Firefox?
    var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
    if (match === null || match.length < 2) {
      return -1;
    }
    var version = parseInt(match[1], 10);
    // Test for NaN (yes, this is ugly)
    return version !== version ? -1 : version;
  };
  var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
    // Every implementation we know can send at least 64 KiB.
    // Note: Although Chrome is technically able to send up to 256 KiB, the
    //       data does not reach the other peer reliably.
    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
    var canSendMaxMessageSize = 65536;
    if (browserDetails.browser === 'firefox') {
      if (browserDetails.version < 57) {
        if (remoteIsFirefox === -1) {
          // FF < 57 will send in 16 KiB chunks using the deprecated PPID
          // fragmentation.
          canSendMaxMessageSize = 16384;
        } else {
          // However, other FF (and RAWRTC) can reassemble PPID-fragmented
          // messages. Thus, supporting ~2 GiB when sending.
          canSendMaxMessageSize = 2147483637;
        }
      } else if (browserDetails.version < 60) {
        // Currently, all FF >= 57 will reset the remote maximum message size
        // to the default value when a data channel is created at a later
        // stage. :(
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
        canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
      } else {
        // FF >= 60 supports sending ~2 GiB
        canSendMaxMessageSize = 2147483637;
      }
    }
    return canSendMaxMessageSize;
  };
  var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
    // Note: 65536 bytes is the default value from the SDP spec. Also,
    //       every implementation we know supports receiving 65536 bytes.
    var maxMessageSize = 65536;

    // FF 57 has a slightly incorrect default remote max message size, so
    // we need to adjust it here to avoid a failure when sending.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
    if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
      maxMessageSize = 65535;
    }
    var match = _sdp["default"].matchPrefix(description.sdp, 'a=max-message-size:');
    if (match.length > 0) {
      maxMessageSize = parseInt(match[0].substring(19), 10);
    } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
      // If the maximum message size is not present in the remote SDP and
      // both local and remote are Firefox, the remote peer can receive
      // ~2 GiB.
      maxMessageSize = 2147483637;
    }
    return maxMessageSize;
  };
  var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
  window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
    this._sctp = null;
    // Chrome decided to not expose .sctp in plan-b mode.
    // As usual, adapter.js has to do an 'ugly worakaround'
    // to cover up the mess.
    if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
      var _this$getConfiguratio = this.getConfiguration(),
        sdpSemantics = _this$getConfiguratio.sdpSemantics;
      if (sdpSemantics === 'plan-b') {
        Object.defineProperty(this, 'sctp', {
          get: function get() {
            return typeof this._sctp === 'undefined' ? null : this._sctp;
          },
          enumerable: true,
          configurable: true
        });
      }
    }
    if (sctpInDescription(arguments[0])) {
      // Check if the remote is FF.
      var isFirefox = getRemoteFirefoxVersion(arguments[0]);

      // Get the maximum message size the local peer is capable of sending
      var canSendMMS = getCanSendMaxMessageSize(isFirefox);

      // Get the maximum message size of the remote peer.
      var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

      // Determine final maximum message size
      var maxMessageSize;
      if (canSendMMS === 0 && remoteMMS === 0) {
        maxMessageSize = Number.POSITIVE_INFINITY;
      } else if (canSendMMS === 0 || remoteMMS === 0) {
        maxMessageSize = Math.max(canSendMMS, remoteMMS);
      } else {
        maxMessageSize = Math.min(canSendMMS, remoteMMS);
      }

      // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
      // attribute.
      var sctp = {};
      Object.defineProperty(sctp, 'maxMessageSize', {
        get: function get() {
          return maxMessageSize;
        }
      });
      this._sctp = sctp;
    }
    return origSetRemoteDescription.apply(this, arguments);
  };
}
function shimSendThrowTypeError(window) {
  if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
    return;
  }

  // Note: Although Firefox >= 57 has a native implementation, the maximum
  //       message size can be reset for all data channels at a later stage.
  //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

  function wrapDcSend(dc, pc) {
    var origDataChannelSend = dc.send;
    dc.send = function send() {
      var data = arguments[0];
      var length = data.length || data.size || data.byteLength;
      if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
        throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
      }
      return origDataChannelSend.apply(dc, arguments);
    };
  }
  var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
  window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
    var dataChannel = origCreateDataChannel.apply(this, arguments);
    wrapDcSend(dataChannel, this);
    return dataChannel;
  };
  utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
    wrapDcSend(e.channel, e.target);
    return e;
  });
}

/* shims RTCConnectionState by pretending it is the same as iceConnectionState.
 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
 * since DTLS failures would be hidden. See
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
 * for the Firefox tracking bug.
 */
function shimConnectionState(window) {
  if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
    return;
  }
  var proto = window.RTCPeerConnection.prototype;
  Object.defineProperty(proto, 'connectionState', {
    get: function get() {
      return {
        completed: 'connected',
        checking: 'connecting'
      }[this.iceConnectionState] || this.iceConnectionState;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'onconnectionstatechange', {
    get: function get() {
      return this._onconnectionstatechange || null;
    },
    set: function set(cb) {
      if (this._onconnectionstatechange) {
        this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
        delete this._onconnectionstatechange;
      }
      if (cb) {
        this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
      }
    },
    enumerable: true,
    configurable: true
  });
  ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
    var origMethod = proto[method];
    proto[method] = function () {
      if (!this._connectionstatechangepoly) {
        this._connectionstatechangepoly = function (e) {
          var pc = e.target;
          if (pc._lastConnectionState !== pc.connectionState) {
            pc._lastConnectionState = pc.connectionState;
            var newEvent = new Event('connectionstatechange', e);
            pc.dispatchEvent(newEvent);
          }
          return e;
        };
        this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
      }
      return origMethod.apply(this, arguments);
    };
  });
}
function removeExtmapAllowMixed(window, browserDetails) {
  /* remove a=extmap-allow-mixed for webrtc.org < M71 */
  if (!window.RTCPeerConnection) {
    return;
  }
  if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
    return;
  }
  if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
    return;
  }
  var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
  window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
    if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
      var sdp = desc.sdp.split('\n').filter(function (line) {
        return line.trim() !== 'a=extmap-allow-mixed';
      }).join('\n');
      // Safari enforces read-only-ness of RTCSessionDescription fields.
      if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) {
        arguments[0] = new window.RTCSessionDescription({
          type: desc.type,
          sdp: sdp
        });
      } else {
        desc.sdp = sdp;
      }
    }
    return nativeSRD.apply(this, arguments);
  };
}
function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
  // Support for addIceCandidate(null or undefined)
  // as well as addIceCandidate({candidate: "", ...})
  // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
  // Note: must be called before other polyfills which change the signature.
  if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
    return;
  }
  var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
  if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) {
    return;
  }
  window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
    if (!arguments[0]) {
      if (arguments[1]) {
        arguments[1].apply(null);
      }
      return Promise.resolve();
    }
    // Firefox 68+ emits and processes {candidate: "", ...}, ignore
    // in older versions.
    // Native support for ignoring exists for Chrome M77+.
    // Safari ignores as well, exact version unknown but works in the same
    // version that also ignores addIceCandidate(null).
    if ((browserDetails.browser === 'chrome' && browserDetails.version < 78 || browserDetails.browser === 'firefox' && browserDetails.version < 68 || browserDetails.browser === 'safari') && arguments[0] && arguments[0].candidate === '') {
      return Promise.resolve();
    }
    return nativeAddIceCandidate.apply(this, arguments);
  };
}

// Note: Make sure to call this ahead of APIs that modify
// setLocalDescription.length
function shimParameterlessSetLocalDescription(window, browserDetails) {
  if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
    return;
  }
  var nativeSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
  if (!nativeSetLocalDescription || nativeSetLocalDescription.length === 0) {
    return;
  }
  window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
    var _this = this;
    var desc = arguments[0] || {};
    if (_typeof(desc) !== 'object' || desc.type && desc.sdp) {
      return nativeSetLocalDescription.apply(this, arguments);
    }
    // The remaining steps should technically happen when SLD comes off the
    // RTCPeerConnection's operations chain (not ahead of going on it), but
    // this is too difficult to shim. Instead, this shim only covers the
    // common case where the operations chain is empty. This is imperfect, but
    // should cover many cases. Rationale: Even if we can't reduce the glare
    // window to zero on imperfect implementations, there's value in tapping
    // into the perfect negotiation pattern that several browsers support.
    desc = {
      type: desc.type,
      sdp: desc.sdp
    };
    if (!desc.type) {
      switch (this.signalingState) {
        case 'stable':
        case 'have-local-offer':
        case 'have-remote-pranswer':
          desc.type = 'offer';
          break;
        default:
          desc.type = 'answer';
          break;
      }
    }
    if (desc.sdp || desc.type !== 'offer' && desc.type !== 'answer') {
      return nativeSetLocalDescription.apply(this, [desc]);
    }
    var func = desc.type === 'offer' ? this.createOffer : this.createAnswer;
    return func.apply(this).then(function (d) {
      return nativeSetLocalDescription.apply(_this, [d]);
    });
  };
}

},{"./utils":11,"sdp":12}],7:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimAddTransceiver = shimAddTransceiver;
exports.shimCreateAnswer = shimCreateAnswer;
exports.shimCreateOffer = shimCreateOffer;
Object.defineProperty(exports, "shimGetDisplayMedia", {
  enumerable: true,
  get: function get() {
    return _getdisplaymedia.shimGetDisplayMedia;
  }
});
exports.shimGetParameters = shimGetParameters;
Object.defineProperty(exports, "shimGetUserMedia", {
  enumerable: true,
  get: function get() {
    return _getusermedia.shimGetUserMedia;
  }
});
exports.shimOnTrack = shimOnTrack;
exports.shimPeerConnection = shimPeerConnection;
exports.shimRTCDataChannel = shimRTCDataChannel;
exports.shimReceiverGetStats = shimReceiverGetStats;
exports.shimRemoveStream = shimRemoveStream;
exports.shimSenderGetStats = shimSenderGetStats;
var utils = _interopRequireWildcard(require("../utils"));
var _getusermedia = require("./getusermedia");
var _getdisplaymedia = require("./getdisplaymedia");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function shimOnTrack(window) {
  if (_typeof(window) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
      get: function get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
}
function shimPeerConnection(window, browserDetails) {
  if (_typeof(window) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
    return; // probably media.peerconnection.enabled=false in about:config
  }

  if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
    // very basic support for old versions.
    window.RTCPeerConnection = window.mozRTCPeerConnection;
  }
  if (browserDetails.version < 53) {
    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      var nativeMethod = window.RTCPeerConnection.prototype[method];
      var methodObj = _defineProperty({}, method, function () {
        arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
        return nativeMethod.apply(this, arguments);
      });
      window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
  }
  var modernStatsTypes = {
    inboundrtp: 'inbound-rtp',
    outboundrtp: 'outbound-rtp',
    candidatepair: 'candidate-pair',
    localcandidate: 'local-candidate',
    remotecandidate: 'remote-candidate'
  };
  var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
  window.RTCPeerConnection.prototype.getStats = function getStats() {
    var _arguments = Array.prototype.slice.call(arguments),
      selector = _arguments[0],
      onSucc = _arguments[1],
      onErr = _arguments[2];
    return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
      if (browserDetails.version < 53 && !onSucc) {
        // Shim only promise getStats with spec-hyphens in type names
        // Leave callback version alone; misc old uses of forEach before Map
        try {
          stats.forEach(function (stat) {
            stat.type = modernStatsTypes[stat.type] || stat.type;
          });
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          }
          // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
          stats.forEach(function (stat, i) {
            stats.set(i, Object.assign({}, stat, {
              type: modernStatsTypes[stat.type] || stat.type
            }));
          });
        }
      }
      return stats;
    }).then(onSucc, onErr);
  };
}
function shimSenderGetStats(window) {
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
    return;
  }
  if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
    return;
  }
  var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
  if (origGetSenders) {
    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
      var _this = this;
      var senders = origGetSenders.apply(this, []);
      senders.forEach(function (sender) {
        return sender._pc = _this;
      });
      return senders;
    };
  }
  var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
  if (origAddTrack) {
    window.RTCPeerConnection.prototype.addTrack = function addTrack() {
      var sender = origAddTrack.apply(this, arguments);
      sender._pc = this;
      return sender;
    };
  }
  window.RTCRtpSender.prototype.getStats = function getStats() {
    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
  };
}
function shimReceiverGetStats(window) {
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
    return;
  }
  if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
    return;
  }
  var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
  if (origGetReceivers) {
    window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
      var _this2 = this;
      var receivers = origGetReceivers.apply(this, []);
      receivers.forEach(function (receiver) {
        return receiver._pc = _this2;
      });
      return receivers;
    };
  }
  utils.wrapPeerConnectionEvent(window, 'track', function (e) {
    e.receiver._pc = e.srcElement;
    return e;
  });
  window.RTCRtpReceiver.prototype.getStats = function getStats() {
    return this._pc.getStats(this.track);
  };
}
function shimRemoveStream(window) {
  if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
    return;
  }
  window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
    var _this3 = this;
    utils.deprecated('removeStream', 'removeTrack');
    this.getSenders().forEach(function (sender) {
      if (sender.track && stream.getTracks().includes(sender.track)) {
        _this3.removeTrack(sender);
      }
    });
  };
}
function shimRTCDataChannel(window) {
  // rename DataChannel to RTCDataChannel (native fix in FF60):
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
  if (window.DataChannel && !window.RTCDataChannel) {
    window.RTCDataChannel = window.DataChannel;
  }
}
function shimAddTransceiver(window) {
  // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
  // Firefox ignores the init sendEncodings options passed to addTransceiver
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection)) {
    return;
  }
  var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
  if (origAddTransceiver) {
    window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
      this.setParametersPromises = [];
      // WebIDL input coercion and validation
      var sendEncodings = arguments[1] && arguments[1].sendEncodings;
      if (sendEncodings === undefined) {
        sendEncodings = [];
      }
      sendEncodings = _toConsumableArray(sendEncodings);
      var shouldPerformCheck = sendEncodings.length > 0;
      if (shouldPerformCheck) {
        // If sendEncodings params are provided, validate grammar
        sendEncodings.forEach(function (encodingParam) {
          if ('rid' in encodingParam) {
            var ridRegex = /^[a-z0-9]{0,16}$/i;
            if (!ridRegex.test(encodingParam.rid)) {
              throw new TypeError('Invalid RID value provided.');
            }
          }
          if ('scaleResolutionDownBy' in encodingParam) {
            if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
              throw new RangeError('scale_resolution_down_by must be >= 1.0');
            }
          }
          if ('maxFramerate' in encodingParam) {
            if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
              throw new RangeError('max_framerate must be >= 0.0');
            }
          }
        });
      }
      var transceiver = origAddTransceiver.apply(this, arguments);
      if (shouldPerformCheck) {
        // Check if the init options were applied. If not we do this in an
        // asynchronous way and save the promise reference in a global object.
        // This is an ugly hack, but at the same time is way more robust than
        // checking the sender parameters before and after the createOffer
        // Also note that after the createoffer we are not 100% sure that
        // the params were asynchronously applied so we might miss the
        // opportunity to recreate offer.
        var sender = transceiver.sender;
        var params = sender.getParameters();
        if (!('encodings' in params) ||
        // Avoid being fooled by patched getParameters() below.
        params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
          params.encodings = sendEncodings;
          sender.sendEncodings = sendEncodings;
          this.setParametersPromises.push(sender.setParameters(params).then(function () {
            delete sender.sendEncodings;
          })["catch"](function () {
            delete sender.sendEncodings;
          }));
        }
      }
      return transceiver;
    };
  }
}
function shimGetParameters(window) {
  if (!(_typeof(window) === 'object' && window.RTCRtpSender)) {
    return;
  }
  var origGetParameters = window.RTCRtpSender.prototype.getParameters;
  if (origGetParameters) {
    window.RTCRtpSender.prototype.getParameters = function getParameters() {
      var params = origGetParameters.apply(this, arguments);
      if (!('encodings' in params)) {
        params.encodings = [].concat(this.sendEncodings || [{}]);
      }
      return params;
    };
  }
}
function shimCreateOffer(window) {
  // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
  // Firefox ignores the init sendEncodings options passed to addTransceiver
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection)) {
    return;
  }
  var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
  window.RTCPeerConnection.prototype.createOffer = function createOffer() {
    var _arguments2 = arguments,
      _this4 = this;
    if (this.setParametersPromises && this.setParametersPromises.length) {
      return Promise.all(this.setParametersPromises).then(function () {
        return origCreateOffer.apply(_this4, _arguments2);
      })["finally"](function () {
        _this4.setParametersPromises = [];
      });
    }
    return origCreateOffer.apply(this, arguments);
  };
}
function shimCreateAnswer(window) {
  // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
  // Firefox ignores the init sendEncodings options passed to addTransceiver
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection)) {
    return;
  }
  var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
  window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
    var _arguments3 = arguments,
      _this5 = this;
    if (this.setParametersPromises && this.setParametersPromises.length) {
      return Promise.all(this.setParametersPromises).then(function () {
        return origCreateAnswer.apply(_this5, _arguments3);
      })["finally"](function () {
        _this5.setParametersPromises = [];
      });
    }
    return origCreateAnswer.apply(this, arguments);
  };
}

},{"../utils":11,"./getdisplaymedia":8,"./getusermedia":9}],8:[function(require,module,exports){
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;
function shimGetDisplayMedia(window, preferredMediaSource) {
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }
  if (!window.navigator.mediaDevices) {
    return;
  }
  window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
    if (!(constraints && constraints.video)) {
      var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
      err.name = 'NotFoundError';
      // from https://heycam.github.io/webidl/#idl-DOMException-error-names
      err.code = 8;
      return Promise.reject(err);
    }
    if (constraints.video === true) {
      constraints.video = {
        mediaSource: preferredMediaSource
      };
    } else {
      constraints.video.mediaSource = preferredMediaSource;
    }
    return window.navigator.mediaDevices.getUserMedia(constraints);
  };
}

},{}],9:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetUserMedia = shimGetUserMedia;
var utils = _interopRequireWildcard(require("../utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function shimGetUserMedia(window, browserDetails) {
  var navigator = window && window.navigator;
  var MediaStreamTrack = window && window.MediaStreamTrack;
  navigator.getUserMedia = function (constraints, onSuccess, onError) {
    // Replace Firefox 44+'s deprecation warning with unprefixed version.
    utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  };
  if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
    var remap = function remap(obj, a, b) {
      if (a in obj && !(b in obj)) {
        obj[b] = obj[a];
        delete obj[a];
      }
    };
    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (c) {
      if (_typeof(c) === 'object' && _typeof(c.audio) === 'object') {
        c = JSON.parse(JSON.stringify(c));
        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
      }
      return nativeGetUserMedia(c);
    };
    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
      var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
      MediaStreamTrack.prototype.getSettings = function () {
        var obj = nativeGetSettings.apply(this, arguments);
        remap(obj, 'mozAutoGainControl', 'autoGainControl');
        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
        return obj;
      };
    }
    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
      var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
      MediaStreamTrack.prototype.applyConstraints = function (c) {
        if (this.kind === 'audio' && _typeof(c) === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c, 'autoGainControl', 'mozAutoGainControl');
          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeApplyConstraints.apply(this, [c]);
      };
    }
  }
}

},{"../utils":11}],10:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimAudioContext = shimAudioContext;
exports.shimCallbacksAPI = shimCallbacksAPI;
exports.shimConstraints = shimConstraints;
exports.shimCreateOfferLegacy = shimCreateOfferLegacy;
exports.shimGetUserMedia = shimGetUserMedia;
exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
var utils = _interopRequireWildcard(require("../utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function shimLocalStreamsAPI(window) {
  if (_typeof(window) !== 'object' || !window.RTCPeerConnection) {
    return;
  }
  if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      if (!this._localStreams) {
        this._localStreams = [];
      }
      return this._localStreams;
    };
  }
  if (!('addStream' in window.RTCPeerConnection.prototype)) {
    var _addTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      var _this = this;
      if (!this._localStreams) {
        this._localStreams = [];
      }
      if (!this._localStreams.includes(stream)) {
        this._localStreams.push(stream);
      }
      // Try to emulate Chrome's behaviour of adding in audio-video order.
      // Safari orders by track id.
      stream.getAudioTracks().forEach(function (track) {
        return _addTrack.call(_this, track, stream);
      });
      stream.getVideoTracks().forEach(function (track) {
        return _addTrack.call(_this, track, stream);
      });
    };
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
      var _this2 = this;
      for (var _len = arguments.length, streams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        streams[_key - 1] = arguments[_key];
      }
      if (streams) {
        streams.forEach(function (stream) {
          if (!_this2._localStreams) {
            _this2._localStreams = [stream];
          } else if (!_this2._localStreams.includes(stream)) {
            _this2._localStreams.push(stream);
          }
        });
      }
      return _addTrack.apply(this, arguments);
    };
  }
  if (!('removeStream' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      var _this3 = this;
      if (!this._localStreams) {
        this._localStreams = [];
      }
      var index = this._localStreams.indexOf(stream);
      if (index === -1) {
        return;
      }
      this._localStreams.splice(index, 1);
      var tracks = stream.getTracks();
      this.getSenders().forEach(function (sender) {
        if (tracks.includes(sender.track)) {
          _this3.removeTrack(sender);
        }
      });
    };
  }
}
function shimRemoteStreamsAPI(window) {
  if (_typeof(window) !== 'object' || !window.RTCPeerConnection) {
    return;
  }
  if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
      return this._remoteStreams ? this._remoteStreams : [];
    };
  }
  if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
      get: function get() {
        return this._onaddstream;
      },
      set: function set(f) {
        var _this4 = this;
        if (this._onaddstream) {
          this.removeEventListener('addstream', this._onaddstream);
          this.removeEventListener('track', this._onaddstreampoly);
        }
        this.addEventListener('addstream', this._onaddstream = f);
        this.addEventListener('track', this._onaddstreampoly = function (e) {
          e.streams.forEach(function (stream) {
            if (!_this4._remoteStreams) {
              _this4._remoteStreams = [];
            }
            if (_this4._remoteStreams.includes(stream)) {
              return;
            }
            _this4._remoteStreams.push(stream);
            var event = new Event('addstream');
            event.stream = stream;
            _this4.dispatchEvent(event);
          });
        });
      }
    });
    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      var pc = this;
      if (!this._onaddstreampoly) {
        this.addEventListener('track', this._onaddstreampoly = function (e) {
          e.streams.forEach(function (stream) {
            if (!pc._remoteStreams) {
              pc._remoteStreams = [];
            }
            if (pc._remoteStreams.indexOf(stream) >= 0) {
              return;
            }
            pc._remoteStreams.push(stream);
            var event = new Event('addstream');
            event.stream = stream;
            pc.dispatchEvent(event);
          });
        });
      }
      return origSetRemoteDescription.apply(pc, arguments);
    };
  }
}
function shimCallbacksAPI(window) {
  if (_typeof(window) !== 'object' || !window.RTCPeerConnection) {
    return;
  }
  var prototype = window.RTCPeerConnection.prototype;
  var origCreateOffer = prototype.createOffer;
  var origCreateAnswer = prototype.createAnswer;
  var setLocalDescription = prototype.setLocalDescription;
  var setRemoteDescription = prototype.setRemoteDescription;
  var addIceCandidate = prototype.addIceCandidate;
  prototype.createOffer = function createOffer(successCallback, failureCallback) {
    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
    var promise = origCreateOffer.apply(this, [options]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
    var promise = origCreateAnswer.apply(this, [options]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  var withCallback = function withCallback(description, successCallback, failureCallback) {
    var promise = setLocalDescription.apply(this, [description]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.setLocalDescription = withCallback;
  withCallback = function withCallback(description, successCallback, failureCallback) {
    var promise = setRemoteDescription.apply(this, [description]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.setRemoteDescription = withCallback;
  withCallback = function withCallback(candidate, successCallback, failureCallback) {
    var promise = addIceCandidate.apply(this, [candidate]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.addIceCandidate = withCallback;
}
function shimGetUserMedia(window) {
  var navigator = window && window.navigator;
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // shim not needed in Safari 12.1
    var mediaDevices = navigator.mediaDevices;
    var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return _getUserMedia(shimConstraints(constraints));
    };
  }
  if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
      navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
    }.bind(navigator);
  }
}
function shimConstraints(constraints) {
  if (constraints && constraints.video !== undefined) {
    return Object.assign({}, constraints, {
      video: utils.compactObject(constraints.video)
    });
  }
  return constraints;
}
function shimRTCIceServerUrls(window) {
  if (!window.RTCPeerConnection) {
    return;
  }
  // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
  var OrigPeerConnection = window.RTCPeerConnection;
  window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
    if (pcConfig && pcConfig.iceServers) {
      var newIceServers = [];
      for (var i = 0; i < pcConfig.iceServers.length; i++) {
        var server = pcConfig.iceServers[i];
        if (server.urls === undefined && server.url) {
          utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
          server = JSON.parse(JSON.stringify(server));
          server.urls = server.url;
          delete server.url;
          newIceServers.push(server);
        } else {
          newIceServers.push(pcConfig.iceServers[i]);
        }
      }
      pcConfig.iceServers = newIceServers;
    }
    return new OrigPeerConnection(pcConfig, pcConstraints);
  };
  window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
  // wrap static methods. Currently just generateCertificate.
  if ('generateCertificate' in OrigPeerConnection) {
    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
      get: function get() {
        return OrigPeerConnection.generateCertificate;
      }
    });
  }
}
function shimTrackEventTransceiver(window) {
  // Add event.transceiver member over deprecated event.receiver
  if (_typeof(window) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
      get: function get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
}
function shimCreateOfferLegacy(window) {
  var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
  window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
    if (offerOptions) {
      if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
        // support bit values
        offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
      }
      var audioTransceiver = this.getTransceivers().find(function (transceiver) {
        return transceiver.receiver.track.kind === 'audio';
      });
      if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
        if (audioTransceiver.direction === 'sendrecv') {
          if (audioTransceiver.setDirection) {
            audioTransceiver.setDirection('sendonly');
          } else {
            audioTransceiver.direction = 'sendonly';
          }
        } else if (audioTransceiver.direction === 'recvonly') {
          if (audioTransceiver.setDirection) {
            audioTransceiver.setDirection('inactive');
          } else {
            audioTransceiver.direction = 'inactive';
          }
        }
      } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
        this.addTransceiver('audio', {
          direction: 'recvonly'
        });
      }
      if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
        // support bit values
        offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
      }
      var videoTransceiver = this.getTransceivers().find(function (transceiver) {
        return transceiver.receiver.track.kind === 'video';
      });
      if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
        if (videoTransceiver.direction === 'sendrecv') {
          if (videoTransceiver.setDirection) {
            videoTransceiver.setDirection('sendonly');
          } else {
            videoTransceiver.direction = 'sendonly';
          }
        } else if (videoTransceiver.direction === 'recvonly') {
          if (videoTransceiver.setDirection) {
            videoTransceiver.setDirection('inactive');
          } else {
            videoTransceiver.direction = 'inactive';
          }
        }
      } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
        this.addTransceiver('video', {
          direction: 'recvonly'
        });
      }
    }
    return origCreateOffer.apply(this, arguments);
  };
}
function shimAudioContext(window) {
  if (_typeof(window) !== 'object' || window.AudioContext) {
    return;
  }
  window.AudioContext = window.webkitAudioContext;
}

},{"../utils":11}],11:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compactObject = compactObject;
exports.deprecated = deprecated;
exports.detectBrowser = detectBrowser;
exports.disableLog = disableLog;
exports.disableWarnings = disableWarnings;
exports.extractVersion = extractVersion;
exports.filterStats = filterStats;
exports.log = log;
exports.walkStats = walkStats;
exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var logDisabled_ = true;
var deprecationWarnings_ = true;

/**
 * Extract browser version out of the provided user agent string.
 *
 * @param {!string} uastring userAgent string.
 * @param {!string} expr Regular expression used as match criteria.
 * @param {!number} pos position in the version string to be returned.
 * @return {!number} browser version.
 */
function extractVersion(uastring, expr, pos) {
  var match = uastring.match(expr);
  return match && match.length >= pos && parseInt(match[pos], 10);
}

// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object (or false to prevent
// the event).
function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
  if (!window.RTCPeerConnection) {
    return;
  }
  var proto = window.RTCPeerConnection.prototype;
  var nativeAddEventListener = proto.addEventListener;
  proto.addEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap) {
      return nativeAddEventListener.apply(this, arguments);
    }
    var wrappedCallback = function wrappedCallback(e) {
      var modifiedEvent = wrapper(e);
      if (modifiedEvent) {
        if (cb.handleEvent) {
          cb.handleEvent(modifiedEvent);
        } else {
          cb(modifiedEvent);
        }
      }
    };
    this._eventMap = this._eventMap || {};
    if (!this._eventMap[eventNameToWrap]) {
      this._eventMap[eventNameToWrap] = new Map();
    }
    this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
    return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
  };
  var nativeRemoveEventListener = proto.removeEventListener;
  proto.removeEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
      return nativeRemoveEventListener.apply(this, arguments);
    }
    if (!this._eventMap[eventNameToWrap].has(cb)) {
      return nativeRemoveEventListener.apply(this, arguments);
    }
    var unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
    this._eventMap[eventNameToWrap]["delete"](cb);
    if (this._eventMap[eventNameToWrap].size === 0) {
      delete this._eventMap[eventNameToWrap];
    }
    if (Object.keys(this._eventMap).length === 0) {
      delete this._eventMap;
    }
    return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
  };
  Object.defineProperty(proto, 'on' + eventNameToWrap, {
    get: function get() {
      return this['_on' + eventNameToWrap];
    },
    set: function set(cb) {
      if (this['_on' + eventNameToWrap]) {
        this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
        delete this['_on' + eventNameToWrap];
      }
      if (cb) {
        this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
      }
    },
    enumerable: true,
    configurable: true
  });
}
function disableLog(bool) {
  if (typeof bool !== 'boolean') {
    return new Error('Argument type: ' + _typeof(bool) + '. Please use a boolean.');
  }
  logDisabled_ = bool;
  return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
}

/**
 * Disable or enable deprecation warnings
 * @param {!boolean} bool set to true to disable warnings.
 */
function disableWarnings(bool) {
  if (typeof bool !== 'boolean') {
    return new Error('Argument type: ' + _typeof(bool) + '. Please use a boolean.');
  }
  deprecationWarnings_ = !bool;
  return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
}
function log() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    if (logDisabled_) {
      return;
    }
    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      console.log.apply(console, arguments);
    }
  }
}

/**
 * Shows a deprecation warning suggesting the modern and spec-compatible API.
 */
function deprecated(oldMethod, newMethod) {
  if (!deprecationWarnings_) {
    return;
  }
  console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
}

/**
 * Browser detector.
 *
 * @return {object} result containing browser and version
 *     properties.
 */
function detectBrowser(window) {
  // Returned result object.
  var result = {
    browser: null,
    version: null
  };

  // Fail early if it's not a browser
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.userAgent) {
    result.browser = 'Not a browser.';
    return result;
  }
  var navigator = window.navigator;
  if (navigator.mozGetUserMedia) {
    // Firefox.
    result.browser = 'firefox';
    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
  } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection) {
    // Chrome, Chromium, Webview, Opera.
    // Version matches Chrome/WebRTC version.
    // Chrome 74 removed webkitGetUserMedia on http as well so we need the
    // more complicated fallback to webkitRTCPeerConnection.
    result.browser = 'chrome';
    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
    // Safari.
    result.browser = 'safari';
    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
    result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
  } else {
    // Default fallthrough: not supported.
    result.browser = 'Not a supported browser.';
    return result;
  }
  return result;
}

/**
 * Checks if something is an object.
 *
 * @param {*} val The something you want to check.
 * @return true if val is an object, false otherwise.
 */
function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

/**
 * Remove all empty objects and undefined values
 * from a nested object -- an enhanced and vanilla version
 * of Lodash's `compact`.
 */
function compactObject(data) {
  if (!isObject(data)) {
    return data;
  }
  return Object.keys(data).reduce(function (accumulator, key) {
    var isObj = isObject(data[key]);
    var value = isObj ? compactObject(data[key]) : data[key];
    var isEmptyObject = isObj && !Object.keys(value).length;
    if (value === undefined || isEmptyObject) {
      return accumulator;
    }
    return Object.assign(accumulator, _defineProperty({}, key, value));
  }, {});
}

/* iterates the stats graph recursively. */
function walkStats(stats, base, resultSet) {
  if (!base || resultSet.has(base.id)) {
    return;
  }
  resultSet.set(base.id, base);
  Object.keys(base).forEach(function (name) {
    if (name.endsWith('Id')) {
      walkStats(stats, stats.get(base[name]), resultSet);
    } else if (name.endsWith('Ids')) {
      base[name].forEach(function (id) {
        walkStats(stats, stats.get(id), resultSet);
      });
    }
  });
}

/* filter getStats for a sender/receiver track. */
function filterStats(result, track, outbound) {
  var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
  var filteredResult = new Map();
  if (track === null) {
    return filteredResult;
  }
  var trackStats = [];
  result.forEach(function (value) {
    if (value.type === 'track' && value.trackIdentifier === track.id) {
      trackStats.push(value);
    }
  });
  trackStats.forEach(function (trackStat) {
    result.forEach(function (stats) {
      if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
        walkStats(result, stats, filteredResult);
      }
    });
  });
  return filteredResult;
}

},{}],12:[function(require,module,exports){
/* eslint-env node */
'use strict';

// SDP helpers.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function () {
  return Math.random().toString(36).substring(2, 12);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function (blob) {
  return blob.trim().split('\n').map(function (line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function (blob) {
  var parts = blob.split('\nm=');
  return parts.map(function (part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// Returns the session description.
SDPUtils.getDescription = function (blob) {
  var sections = SDPUtils.splitSections(blob);
  return sections && sections[0];
};

// Returns the individual media sections.
SDPUtils.getMediaSections = function (blob) {
  var sections = SDPUtils.splitSections(blob);
  sections.shift();
  return sections;
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function (blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function (line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
// Input can be prefixed with a=.
SDPUtils.parseCandidate = function (line) {
  var parts = void 0;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: { 1: 'rtp', 2: 'rtcp' }[parts[1]] || parts[1],
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    address: parts[4], // address is an alias for ip.
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compatibility.
        candidate.usernameFragment = parts[i + 1];
        break;
      default:
        // extension handling, in particular ufrag. Don't overwrite.
        if (candidate[parts[i]] === undefined) {
          candidate[parts[i]] = parts[i + 1];
        }
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
// This does not include the a= prefix!
SDPUtils.writeCandidate = function (candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);

  var component = candidate.component;
  if (component === 'rtp') {
    sdp.push(1);
  } else if (component === 'rtcp') {
    sdp.push(2);
  } else {
    sdp.push(component);
  }
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.address || candidate.ip);
  sdp.push(candidate.port);

  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress);
    sdp.push('rport');
    sdp.push(candidate.relatedPort);
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  if (candidate.usernameFragment || candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.usernameFragment || candidate.ufrag);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an ice-options line, returns an array of option tags.
// Sample input:
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function (line) {
  return line.substring(14).split(' ');
};

// Parses a rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function (line) {
  var parts = line.substring(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');

  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  // legacy alias, got renamed back to channels in ORTC.
  parsed.numChannels = parsed.channels;
  return parsed;
};

// Generates a rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function (codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  var channels = codec.channels || codec.numChannels || 1;
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
};

// Parses a extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function (line) {
  var parts = line.substring(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1],
    attributes: parts.slice(2).join(' ')
  };
};

// Generates an extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function (headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + (headerExtension.attributes ? ' ' + headerExtension.attributes : '') + '\r\n';
};

// Parses a fmtp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function (line) {
  var parsed = {};
  var kv = void 0;
  var parts = line.substring(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates a fmtp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function (codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function (param) {
      if (codec.parameters[param] !== undefined) {
        params.push(param + '=' + codec.parameters[param]);
      } else {
        params.push(param);
      }
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses a rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function (line) {
  var parts = line.substring(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};

// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function (codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function (fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
    });
  }
  return lines;
};

// Parses a RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function (line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substring(7, sp), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substring(sp + 1, colon);
    parts.value = line.substring(colon + 1);
  } else {
    parts.attribute = line.substring(sp + 1);
  }
  return parts;
};

// Parse a ssrc-group line (see RFC 5576). Sample input:
// a=ssrc-group:semantics 12 34
SDPUtils.parseSsrcGroup = function (line) {
  var parts = line.substring(13).split(' ');
  return {
    semantics: parts.shift(),
    ssrcs: parts.map(function (ssrc) {
      return parseInt(ssrc, 10);
    })
  };
};

// Extracts the MID (RFC 5888) from a media section.
// Returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function (mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
  if (mid) {
    return mid.substring(6);
  }
};

// Parses a fingerprint line for DTLS-SRTP.
SDPUtils.parseFingerprint = function (line) {
  var parts = line.substring(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
    value: parts[1].toUpperCase() // the definition is upper-case in RFC 4572.
  };
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
  // Note: a=setup line is ignored since we use the 'auto' role in Edge.
  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function (params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function (fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};

// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
SDPUtils.parseCryptoLine = function (line) {
  var parts = line.substring(9).split(' ');
  return {
    tag: parseInt(parts[0], 10),
    cryptoSuite: parts[1],
    keyParams: parts[2],
    sessionParams: parts.slice(3)
  };
};

SDPUtils.writeCryptoLine = function (parameters) {
  return 'a=crypto:' + parameters.tag + ' ' + parameters.cryptoSuite + ' ' + (_typeof(parameters.keyParams) === 'object' ? SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') + '\r\n';
};

// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
SDPUtils.parseCryptoKeyParams = function (keyParams) {
  if (keyParams.indexOf('inline:') !== 0) {
    return null;
  }
  var parts = keyParams.substring(7).split('|');
  return {
    keyMethod: 'inline',
    keySalt: parts[0],
    lifeTime: parts[1],
    mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
    mkiLength: parts[2] ? parts[2].split(':')[1] : undefined
  };
};

SDPUtils.writeCryptoKeyParams = function (keyParams) {
  return keyParams.keyMethod + ':' + keyParams.keySalt + (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') + (keyParams.mkiValue && keyParams.mkiLength ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength : '');
};

// Extracts all SDES parameters.
SDPUtils.getCryptoParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=crypto:');
  return lines.map(SDPUtils.parseCryptoLine);
};

// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
  var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-ufrag:')[0];
  var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-pwd:')[0];
  if (!(ufrag && pwd)) {
    return null;
  }
  return {
    usernameFragment: ufrag.substring(12),
    password: pwd.substring(10)
  };
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function (params) {
  var sdp = 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
  if (params.iceLite) {
    sdp += 'a=ice-lite\r\n';
  }
  return sdp;
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function (mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  description.profile = mline[2];
  for (var i = 3; i < mline.length; i++) {
    // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default:
          // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  var wildcardRtcpFb = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:* ').map(SDPUtils.parseRtcpFb);
  description.codecs.forEach(function (codec) {
    wildcardRtcpFb.forEach(function (fb) {
      var duplicate = codec.rtcpFeedback.find(function (existingFeedback) {
        return existingFeedback.type === fb.type && existingFeedback.parameter === fb.parameter;
      });
      if (!duplicate) {
        codec.rtcpFeedback.push(fb);
      }
    });
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function (kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' ' + (caps.profile || 'UDP/TLS/RTP/SAVPF') + ' ';
  sdp += caps.codecs.map(function (codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';

  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function (codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function (codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });
  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }

  if (caps.headerExtensions) {
    caps.headerExtensions.forEach(function (extension) {
      sdp += SDPUtils.writeExtmap(extension);
    });
  }
  // FIXME: write fecMechanisms.
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc = void 0;

  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
    var parts = line.substring(17).split(' ');
    return parts.map(function (part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function (codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10)
      };
      if (primarySsrc && secondarySsrc) {
        encParam.rtx = { ssrc: secondarySsrc };
      }
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: primarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substring(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substring(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
    } else {
      bandwidth = undefined;
    }
    encodingParameters.forEach(function (params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function (mediaSection) {
  var rtcpParameters = {};

  // Gets the first SSRC. Note that with RTX there might be multiple
  // SSRCs.
  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (obj) {
    return obj.attribute === 'cname';
  })[0];
  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  }

  // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize
  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0;

  // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.
  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;

  return rtcpParameters;
};

SDPUtils.writeRtcpParameters = function (rtcpParameters) {
  var sdp = '';
  if (rtcpParameters.reducedSize) {
    sdp += 'a=rtcp-rsize\r\n';
  }
  if (rtcpParameters.mux) {
    sdp += 'a=rtcp-mux\r\n';
  }
  if (rtcpParameters.ssrc !== undefined && rtcpParameters.cname) {
    sdp += 'a=ssrc:' + rtcpParameters.ssrc + ' cname:' + rtcpParameters.cname + '\r\n';
  }
  return sdp;
};

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function (mediaSection) {
  var parts = void 0;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
  if (spec.length === 1) {
    parts = spec[0].substring(7).split(' ');
    return { stream: parts[0], track: parts[1] };
  }
  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (msidParts) {
    return msidParts.attribute === 'msid';
  });
  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return { stream: parts[0], track: parts[1] };
  }
};

// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
SDPUtils.parseSctpDescription = function (mediaSection) {
  var mline = SDPUtils.parseMLine(mediaSection);
  var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
  var maxMessageSize = void 0;
  if (maxSizeLine.length > 0) {
    maxMessageSize = parseInt(maxSizeLine[0].substring(19), 10);
  }
  if (isNaN(maxMessageSize)) {
    maxMessageSize = 65536;
  }
  var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
  if (sctpPort.length > 0) {
    return {
      port: parseInt(sctpPort[0].substring(12), 10),
      protocol: mline.fmt,
      maxMessageSize: maxMessageSize
    };
  }
  var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
  if (sctpMapLines.length > 0) {
    var parts = sctpMapLines[0].substring(10).split(' ');
    return {
      port: parseInt(parts[0], 10),
      protocol: parts[1],
      maxMessageSize: maxMessageSize
    };
  }
};

// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
SDPUtils.writeSctpDescription = function (media, sctp) {
  var output = [];
  if (media.protocol !== 'DTLS/SCTP') {
    output = ['m=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctp-port:' + sctp.port + '\r\n'];
  } else {
    output = ['m=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'];
  }
  if (sctp.maxMessageSize !== undefined) {
    output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
  }
  return output.join('');
};

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function () {
  return Math.random().toString().substr(2, 22);
};

// Write boiler plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
  var sessionId = void 0;
  var version = sessVer !== undefined ? sessVer : 2;
  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }
  var user = sessUser || 'thisisadapterortc';
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function (mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substring(2);
      default:
      // FIXME: What should happen here?
    }
  }
  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};

SDPUtils.getKind = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substring(2);
};

SDPUtils.isRejected = function (mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};

SDPUtils.parseMLine = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var parts = lines[0].substring(2).split(' ');
  return {
    kind: parts[0],
    port: parseInt(parts[1], 10),
    protocol: parts[2],
    fmt: parts.slice(3).join(' ')
  };
};

SDPUtils.parseOLine = function (mediaSection) {
  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
  var parts = line.substring(2).split(' ');
  return {
    username: parts[0],
    sessionId: parts[1],
    sessionVersion: parseInt(parts[2], 10),
    netType: parts[3],
    addressType: parts[4],
    address: parts[5]
  };
};

// a very naive interpretation of a valid SDP.
SDPUtils.isValidSDP = function (blob) {
  if (typeof blob !== 'string' || blob.length === 0) {
    return false;
  }
  var lines = SDPUtils.splitLines(blob);
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
      return false;
    }
    // TODO: check the modifier a bit more.
  }
  return true;
};

// Expose public methods.
if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
  module.exports = SDPUtils;
}
},{}]},{},[1])(1)
});


/***/ }),

/***/ 4977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4188);
var tryToString = __webpack_require__(3174);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 4121:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isPossiblePrototype = __webpack_require__(6712);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 5458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(4282);
var create = __webpack_require__(7065);
var defineProperty = (__webpack_require__(4466).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 3770:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(831);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 1458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(380);
var toAbsoluteIndex = __webpack_require__(675);
var lengthOfArrayLike = __webpack_require__(9389);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4224:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var isArray = __webpack_require__(6719);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 8689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 5438:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(9345);
var isCallable = __webpack_require__(4188);
var classofRaw = __webpack_require__(8689);
var wellKnownSymbol = __webpack_require__(4282);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 8657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(4418);
var ownKeys = __webpack_require__(3168);
var getOwnPropertyDescriptorModule = __webpack_require__(9304);
var definePropertyModule = __webpack_require__(4466);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8088:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var definePropertyModule = __webpack_require__(4466);
var createPropertyDescriptor = __webpack_require__(9123);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9123:
/***/ ((module) => {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 997:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var makeBuiltIn = __webpack_require__(4530);
var defineProperty = __webpack_require__(4466);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 7509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4188);
var definePropertyModule = __webpack_require__(4466);
var makeBuiltIn = __webpack_require__(4530);
var defineGlobalProperty = __webpack_require__(4798);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 4798:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ 6893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(5234);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 5926:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);
var isObject = __webpack_require__(831);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 2197:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 1274:
/***/ ((module) => {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 8060:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 7308:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 5382:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createNonEnumerableProperty = __webpack_require__(8088);
var clearErrorStack = __webpack_require__(7308);
var ERROR_STACK_INSTALLABLE = __webpack_require__(4582);

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};


/***/ }),

/***/ 4582:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(5234);
var createPropertyDescriptor = __webpack_require__(9123);

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 5613:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);
var getOwnPropertyDescriptor = (__webpack_require__(9304).f);
var createNonEnumerableProperty = __webpack_require__(8088);
var defineBuiltIn = __webpack_require__(7509);
var defineGlobalProperty = __webpack_require__(4798);
var copyConstructorProperties = __webpack_require__(8657);
var isForced = __webpack_require__(8489);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 5234:
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(9055);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 9055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(5234);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9944:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(9055);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 2735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var hasOwn = __webpack_require__(4418);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1025:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);
var aCallable = __webpack_require__(4977);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 6881:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(9055);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5604:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);
var isCallable = __webpack_require__(4188);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ 2913:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(4977);
var isNullOrUndefined = __webpack_require__(4318);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 9117:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 4418:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);
var toObject = __webpack_require__(3628);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 7588:
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ 7458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5604);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 9622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var fails = __webpack_require__(5234);
var createElement = __webpack_require__(5926);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 7568:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);
var fails = __webpack_require__(5234);
var classof = __webpack_require__(8689);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 4166:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4188);
var isObject = __webpack_require__(831);
var setPrototypeOf = __webpack_require__(5054);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 3029:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);
var isCallable = __webpack_require__(4188);
var store = __webpack_require__(2694);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(831);
var createNonEnumerableProperty = __webpack_require__(8088);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 3086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(5945);
var globalThis = __webpack_require__(9117);
var isObject = __webpack_require__(831);
var createNonEnumerableProperty = __webpack_require__(8088);
var hasOwn = __webpack_require__(4418);
var shared = __webpack_require__(2694);
var sharedKey = __webpack_require__(168);
var hiddenKeys = __webpack_require__(7588);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 6719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(8689);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4188:
/***/ ((module) => {

"use strict";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 8489:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(5234);
var isCallable = __webpack_require__(4188);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 4318:
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 831:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(4188);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 6712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(831);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ 1942:
/***/ ((module) => {

"use strict";

module.exports = false;


/***/ }),

/***/ 6032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5604);
var isCallable = __webpack_require__(4188);
var isPrototypeOf = __webpack_require__(4578);
var USE_SYMBOL_AS_UID = __webpack_require__(9809);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 9389:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(7611);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 4530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);
var fails = __webpack_require__(5234);
var isCallable = __webpack_require__(4188);
var hasOwn = __webpack_require__(4418);
var DESCRIPTORS = __webpack_require__(6893);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(2735).CONFIGURABLE);
var inspectSource = __webpack_require__(3029);
var InternalStateModule = __webpack_require__(3086);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 142:
/***/ ((module) => {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 9866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toString = __webpack_require__(2618);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 7065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(3770);
var definePropertiesModule = __webpack_require__(30);
var enumBugKeys = __webpack_require__(1274);
var hiddenKeys = __webpack_require__(7588);
var html = __webpack_require__(7458);
var documentCreateElement = __webpack_require__(5926);
var sharedKey = __webpack_require__(168);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3315);
var definePropertyModule = __webpack_require__(4466);
var anObject = __webpack_require__(3770);
var toIndexedObject = __webpack_require__(380);
var objectKeys = __webpack_require__(7137);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 4466:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var IE8_DOM_DEFINE = __webpack_require__(9622);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3315);
var anObject = __webpack_require__(3770);
var toPropertyKey = __webpack_require__(2344);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 9304:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var call = __webpack_require__(9944);
var propertyIsEnumerableModule = __webpack_require__(4416);
var createPropertyDescriptor = __webpack_require__(9123);
var toIndexedObject = __webpack_require__(380);
var toPropertyKey = __webpack_require__(2344);
var hasOwn = __webpack_require__(4418);
var IE8_DOM_DEFINE = __webpack_require__(9622);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 5629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(1843);
var enumBugKeys = __webpack_require__(1274);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 156:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 4578:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1843:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);
var hasOwn = __webpack_require__(4418);
var toIndexedObject = __webpack_require__(380);
var indexOf = (__webpack_require__(1458).indexOf);
var hiddenKeys = __webpack_require__(7588);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 7137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(1843);
var enumBugKeys = __webpack_require__(1274);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 4416:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 5054:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(1025);
var isObject = __webpack_require__(831);
var requireObjectCoercible = __webpack_require__(9509);
var aPossiblePrototype = __webpack_require__(4121);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2287:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9944);
var isCallable = __webpack_require__(4188);
var isObject = __webpack_require__(831);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3168:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5604);
var uncurryThis = __webpack_require__(6881);
var getOwnPropertyNamesModule = __webpack_require__(5629);
var getOwnPropertySymbolsModule = __webpack_require__(156);
var anObject = __webpack_require__(3770);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 8679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineProperty = (__webpack_require__(4466).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 9509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isNullOrUndefined = __webpack_require__(4318);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 168:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(746);
var uid = __webpack_require__(6209);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 2694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IS_PURE = __webpack_require__(1942);
var globalThis = __webpack_require__(9117);
var defineGlobalProperty = __webpack_require__(4798);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.38.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.38.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var store = __webpack_require__(2694);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 8944:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(173);
var fails = __webpack_require__(5234);
var globalThis = __webpack_require__(9117);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(6744);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7568);
var requireObjectCoercible = __webpack_require__(9509);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 6744:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var trunc = __webpack_require__(142);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7611:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(6744);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 3628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var requireObjectCoercible = __webpack_require__(9509);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(9944);
var isObject = __webpack_require__(831);
var isSymbol = __webpack_require__(6032);
var getMethod = __webpack_require__(2913);
var ordinaryToPrimitive = __webpack_require__(2287);
var wellKnownSymbol = __webpack_require__(4282);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 2344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(290);
var isSymbol = __webpack_require__(6032);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 9345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(4282);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 2618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(5438);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 3174:
/***/ ((module) => {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 6209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(6881);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 9809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8944);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3315:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var fails = __webpack_require__(5234);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 9445:
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 5945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);
var isCallable = __webpack_require__(4188);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 4282:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);
var shared = __webpack_require__(746);
var hasOwn = __webpack_require__(4418);
var uid = __webpack_require__(6209);
var NATIVE_SYMBOL = __webpack_require__(8944);
var USE_SYMBOL_AS_UID = __webpack_require__(9809);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 6208:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5604);
var hasOwn = __webpack_require__(4418);
var createNonEnumerableProperty = __webpack_require__(8088);
var isPrototypeOf = __webpack_require__(4578);
var setPrototypeOf = __webpack_require__(5054);
var copyConstructorProperties = __webpack_require__(8657);
var proxyAccessor = __webpack_require__(8679);
var inheritIfRequired = __webpack_require__(4166);
var normalizeStringArgument = __webpack_require__(9866);
var installErrorCause = __webpack_require__(8257);
var installErrorStack = __webpack_require__(5382);
var DESCRIPTORS = __webpack_require__(6893);
var IS_PURE = __webpack_require__(1942);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 2234:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(5613);
var $includes = (__webpack_require__(1458).includes);
var fails = __webpack_require__(5234);
var addToUnscopables = __webpack_require__(5458);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 9375:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(5613);
var toObject = __webpack_require__(3628);
var lengthOfArrayLike = __webpack_require__(9389);
var setArrayLength = __webpack_require__(4224);
var doesNotExceedSafeInteger = __webpack_require__(2197);
var fails = __webpack_require__(5234);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 7107:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(5613);
var globalThis = __webpack_require__(9117);
var apply = __webpack_require__(646);
var wrapErrorConstructorWithCause = __webpack_require__(6208);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 1412:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineBuiltIn = __webpack_require__(7509);
var uncurryThis = __webpack_require__(6881);
var toString = __webpack_require__(2618);
var validateArgumentsLength = __webpack_require__(9445);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var append = uncurryThis(URLSearchParamsPrototype.append);
var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
var push = uncurryThis([].push);
var params = new $URLSearchParams('a=1&a=2&b=3');

params['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params['delete']('b', undefined);

if (params + '' !== 'a=2') {
  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength(length, 1);
    var key = toString(name);
    var value = toString($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries[dindex++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 1883:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineBuiltIn = __webpack_require__(7509);
var uncurryThis = __webpack_require__(6881);
var toString = __webpack_require__(2618);
var validateArgumentsLength = __webpack_require__(9445);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
var $has = uncurryThis(URLSearchParamsPrototype.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 286:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(6893);
var uncurryThis = __webpack_require__(6881);
var defineBuiltInAccessor = __webpack_require__(997);

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}


/***/ }),

/***/ 173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(9117);
var userAgent = __webpack_require__(8060);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(3629);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=webrtc.remote.js.map