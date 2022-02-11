import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import Channel from '../entities/Channel';
import Event from '../entities/Event';
import { getEntityManager } from '@typedorm/core';


const router = Router();
const { OK } = StatusCodes;



/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {

    res.status(OK).json({});
});

router.post('/add', async (req: Request, res: Response) => {
    let channel = req.body.channel;
    console.log(channel);
    let c = new Channel();
    c.name = channel.name;
    c.number = channel.number;
    c.events = channel.events.map((event: any) => {
        let p = new Event();
        p.name = event.name;
        p.channelNo = channel.number;
        return p;
    });
    let response = await getEntityManager().create(c);
    let id = response.id;
    // console.log(response);
    // for (let i = 0; i < channel.events.length; i++) {
    //     let p = new Event();
    //     p.id = id;
    //     p.name = channel.events[i].name;
    //     p.channelNo = channel.number;
    //     const response = await getEntityManager().create(p);
    //     console.log(response);
    // }


    console.log(response);
    res.status(OK).json({});
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
