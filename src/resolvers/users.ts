import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';

const createUser = async function (args:any) {    
    const user = await CreateUser(args);    
    return user
}

const getUser = async function (root: any, args: any, context: any) {    
    // eslint-disable-next-line max-len
    const res = await getEntityManager().find(User, { _en: "user" }, { queryIndex: 'GSI1', keyCondition: { BEGINS_WITH: 'USER#'}})    
    return res.items;
}

const getOneUser = async function (root: any, args: any, context: any) {    
    const res = await getEntityManager().find(User, { id: args.id })  
    return res.items;
}

const deleteUser = async function(root: any, input: any, context: any) {    
    await DeleteUser(input);    
    const response = {
        statusCode: 204,
        statusMessage: "Deleted User"
    }
    return response
}


export const Query = {
    getUser, getOneUser
}

export const Mutation = {
    createUser, deleteUser
}

async function CreateUser(input:any) {
    const user = new User();    
    user.name = input.name;
    user.email = input.email;
    const response = await getEntityManager().create(user);
    return response;
}


async function DeleteUser(input:any) {     
    const user = new User();    
    // eslint-disable-next-line max-len
    await getEntityManager().delete(User, { id:input.id, name:input.name, email:input.email})
    console.log("deleted")  
}
  




