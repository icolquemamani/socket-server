import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;
    
    public app: express.Application;
    public port: number;
    
    public io: socketIO.Server;
    private _httpServer: http.Server;
    
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this._httpServer = new http.Server( this.app );
        this.io = socketIO( this._httpServer );
        this.listenSockets();     
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private listenSockets() {
        console.log('listen connections');

        this.io.on('connection', client => {
            console.log(client.id);
            //connect client
            socket.connectClient( client );
            // user configuration
            socket.userConfig( client, this.io );

            // message
            socket.message( client, this.io );

            // disconnect client
           socket.disconnect( client );
        })
    }

    start( callback: Function) {
        this._httpServer.listen( this.port, callback );
    }
}