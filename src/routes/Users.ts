import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';
//import { createConnection, getRepository } from '@typedorm/common';

const router = Router();
const { OK } = StatusCodes;
/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
  let users = await getEntityManager().find(User, { id: "148a3fed-ca46-4c74-8b7f-a523da9d9bf9", name: "Tresa" })
  console.log(users)
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
