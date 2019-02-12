import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = ( client: Socket ) => {
    client.on( 'disconnect', () => {
        console.log('Cliente desconectado');
    });
}

export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'message', ( payload: { from: string, message: string }) => {
        console.log('Message recived', payload.from, payload.message );

        io.emit( 'new-message', payload );
    });
}