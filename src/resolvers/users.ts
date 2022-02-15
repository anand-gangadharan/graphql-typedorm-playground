import { Request, Response, Router } from 'express';
import User from '../entities/UserEntity';
import { getEntityManager } from '@typedorm/core';

const createUser = async function(root: any, { input }: any, context: any) {
    const user = await CreateUser(input);
    console.log(user);
    const response = {
        statusCode: 200,
        statusMessage: "Created Entry"
    }
    return response
}

export default createUser

async function CreateUser(input: any) {
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    const response = await getEntityManager().create(user);
    console.log(response);

}





