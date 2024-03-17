import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SocketEvents } from '../utils/constants/socket-events.constants';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class GameRoomsGateway {
  @WebSocketServer()

  @SubscribeMessage(SocketEvents.getGameRooms)
  handleMessage(@ConnectedSocket() client:Socket) {
    client.emit(SocketEvents.getGameRooms, 'Hello world!')
  }
}
