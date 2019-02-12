import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../class/user-list';
import { User } from '../class/user';

export const usersConnected = new UserList();

export const connectClient = ( client: Socket ) => {
    const user = new User( client.id );
    usersConnected.add( user );
};

export const disconnect = ( client: Socket ) => {
    client.on( 'disconnect', () => {
        console.log('Cliente desconectado');
        usersConnected.deleteUser( client.id );
    });
};

export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'message', ( payload: { from: string, message: string }) => {
        console.log('Message recived', payload.from, payload.message );

        io.emit( 'new-message', payload );
    });
};

export const userConfig = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'user-config', ( payload: { name: string }, callback: Function) => {
         
        usersConnected.updateName( client.id, payload.name );

        callback({
            ok: true,
            message: `Usuario ${ payload.name }, configured`
        })
    });
};