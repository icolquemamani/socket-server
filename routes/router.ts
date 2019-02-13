import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usersConnected } from '../sockets/sockets';

const router = Router();

router.get('/messages', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        message: 'Todo esta bien!!'
    })

});

router.post('/messages', ( req: Request, res: Response ) => {

    const message = req.body.message;
    const from    = req.body.from;
    const payload = {
        from,
        message
    };
    const server = Server.instance;

    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        message,
        from
    })

});

router.post('/messages/:id', ( req: Request, res: Response ) => {

    const message = req.body.message;
    const from    = req.body.from;
    const id      = req.params.id;

    const payload = {
        from,
        message
    };
    const server = Server.instance;

    server.io.in( id ).emit('new-message-private', payload);

    res.json({
        ok: true,
        message,
        from,
        id
    })

});

// service for grt users id
router.get('/users', ( req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( ( err: any, clients: any ) => {
        console.log(err, clients );
        if ( err ) {
            return res.json({
                ok: false,
                err,
            })
        } else {
            return res.json({
                ok: true,
                clients,
            })
        }
    });
});

// Get users data
router.get('/users/detail', ( req: Request, res: Response ) => {
    
    return res.json({
        ok: true,
        clients: usersConnected.getList()
    });
});

export default router;