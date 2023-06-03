import { RxStompConfig } from '@stomp/rx-stomp';

export const WsRxStompConfig: RxStompConfig = {
  brokerURL:"ws://"+window.location.hostname+":8080/ws",

  // connectHeaders: {
  //   login: 'guest',
  //   passcode: 'guest',
  // },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 200,


  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },

};
