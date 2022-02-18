import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';
import logger from '@shared/Logger';
import { getScanManager } from '@typedorm/core'

//import { createConnection, getRepository } from '@typedorm/common';

const router = Router();
const { OK } = StatusCodes;
/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/


router.get('/all', async (req: Request, res: Response) => {  
  const users = await getEntityManager().find(User, { id: "9319325b-9ee3-4639-88e9-890a8d4baf3a", name: "JINN" })  
  res.status(OK).json({ "users": users.items });
});



router.get('/allUser', async (req: Request, res: Response) => {
  let users = await getEntityManager().find(User, {_en: "user"}, { queryIndex: 'GSI1', keyCondition: { BEGINS_WITH: 'USER#', } })
  res.status(OK).json({ "users": users.items });

});

router.post('/add', async (req: Request, res: Response) => {
  console.log(req.body);
  let user = new User();
  user.name = req.body.user.name;
  user.email = req.body.user.email
  const response = await getEntityManager().create(user);
  console.log(response);
  res.status(OK).json({});
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
