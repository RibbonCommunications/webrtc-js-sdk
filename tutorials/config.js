// TODO: Update DEFAULTCONFIGNAME, DEFAULTCONFIGACCESS, SUBSCRIPTIONFQDN, WEBSOCKETFQDN when changes are also covered by backend.
//       Update DEFAULTCONFIGURL when WebRTC SDK is published to npm site.
//       May want to add further RIBBONTURN* entries when uspported by backend.
export const configs = [
  {
    name: 'blue',
    data: {
      DEFAULTCONFIGNAME: '@kandy-io/webrtc-js-config-blue',
      DEFAULTCONFIGACCESS: 'Webrtc.js.support.blue.config',
      DEFAULTCONFIGURL: 'https://unpkg.com/@kandy-io/link-config-us@2.0.0/dist/index.umd.js',
      SUBSCRIPTIONFQDN: 'webrtc-blue.rbbn.com',
      WEBSOCKETFQDN: 'webrtc-blue.rbbn.com',
      RIBBONTURN1: 'turns:turn-blue.rbbn.com:443?transport=tcp',
      RIBBONSTUN1: 'stun:turn-blue.rbbn.com:3478',
      SERVERBASE: 'blue.rbbn.com'
    }
  }
]
