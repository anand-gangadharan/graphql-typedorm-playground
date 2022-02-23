import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';
import {Mutation } from '../resolvers/users';
import {Query } from '../resolvers/users'
import logger from '@shared/Logger';


//import { createConnection, getRepository } from '@typedorm/common';

const router = Router();
const { OK } = StatusCodes;
/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/


router.get('/allUser', async (req: Request, res: Response) => {
  //let users = await getEntityManager().find(User, { _en: "user" }, { queryIndex: 'GSI1', keyCondition: { BEGINS_WITH: 'USER#', } })
  let users = await Query.getUser(User, { _en: "user" }, { queryIndex: 'GSI1', keyCondition: { BEGINS_WITH: 'USER#'}})
  res.status(OK).json({ "users": users });
});

router.post('/User', async (req: Request, res: Response) => {
  let user = new User();
  user.id = req.body.user.id;  
  let users = await Query.getOneUser(User, user, { queryIndex: 'GSI1'});
  res.status(OK).json({ "users": users });
});

router.post('/add', async (req: Request, res: Response) => {  
  console.log(req.body);
  let user = new User();
  user.name = req.body.user.name;
  user.email = req.body.user.email
  await Mutation.createUser(user)  
  res.status(OK).json({});
});


router.delete('/delete', async (req: Request, res: Response) => { 
  let user = new User();
  user.name = req.body.user.name;
  user.email = req.body.user.email;
  user.id = req.body.user.id;
  console.log(user)  
  await Mutation.deleteUser(User,user, { queryIndex: 'GSI1'})
  res.status(OK).json({});
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
