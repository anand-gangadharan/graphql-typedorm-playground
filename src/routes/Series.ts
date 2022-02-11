import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';
import Series from '@entities/Series';
import Program from '@entities/Program';


const router = Router();
const { OK } = StatusCodes;



/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
  let users = await getEntityManager().find(User, { id: "cb2afaf1-d4e5-460d-a2fb-6663a637650d", name: "Anand" })
  console.log(users)
  res.status(OK).json({ "users": users.items });
});

router.post('/add', async (req: Request, res: Response) => {
  let series = req.body.series;
  console.log(series);
  let s = new Series();
  s.name = series.name;
  s.programs = series.episodes.map((episode: any) => {
    let p = new Program();
    p.name = episode.name;
    return p;
  });
  const response = await getEntityManager().create(s);
  console.log(response);
  res.status(OK).json({});

});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
