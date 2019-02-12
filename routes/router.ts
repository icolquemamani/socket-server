import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { message } from '../sockets/sockets';

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

export default router;