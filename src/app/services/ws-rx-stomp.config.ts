import { RxStompConfig } from '@stomp/rx-stomp';

export const WsRxStompConfig: RxStompConfig = {
  // Which server?
  brokerURL:"ws://"+window.location.hostname+":8080/ws",

  // connectHeaders: {
  //   login: 'guest',
  //   passcode: 'guest',
  // },

  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  reconnectDelay: 200,


  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },

};
