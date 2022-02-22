import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';

const createUser = async function (root: any, { input }: any, context: any) {
    const user = await CreateUser(input);
    return user
}

const getUser = async function (root: any, args: any, context: any) {
    const res = await getEntityManager().find(User, { id: args.id })
    return res.items;
}
export const Query = {
    getUser
}

export const Mutation = {
    createUser
}

async function CreateUser(input: any) {
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    const response = await getEntityManager().create(user);
    return response;

}





