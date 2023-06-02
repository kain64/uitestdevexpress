import { RxStompService } from './rx-stomp.service';
import {WsRxStompConfig} from "./ws-rx-stomp.config"


export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(WsRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
