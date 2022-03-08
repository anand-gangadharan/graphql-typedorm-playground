import Like from '../entities/LikeEntity';
import { getEntityManager } from '@typedorm/core';


const likeContent = async function(root: any, { input }: any, context: any) {
    const user = await LikeContent(input);
    return user
}

const unlikeContent = async function(root: any, { input }: any, context: any) {
    const user = await UnlikeContent(input);
    if (user.success) {
        return {
            statusCode: 200,
            statusMessage: "Deleted User"
        }
    } else {
        return  {
            statusCode: 500,
            statusMessage: "Error Unliking content"
        }
    }
}

const userLikes = async function(root: any, { input }: any, context: any) {
    const likes = await getUserLikes(input);
    console.log(likes);
    return likes.items
}

export const Mutation = {
    likeContent , unlikeContent
}

export const Query = {
    userLikes
}

async function getUserLikes(input:any) {
    return await getEntityManager().find(Like,
        {userId: '644733'})
}

async function LikeContent (input:any){
    console.log(input)
    const likedContent = new Like();
    likedContent.contentId = input.contentId
    likedContent.userId = input.userId
    likedContent.doc_type = "LIKE"
    const response = await getEntityManager().create(likedContent);
    console.log(response)
    return response;

}

async function UnlikeContent(input:any) {        
    const response = await getEntityManager().delete(Like, { contentId:input.contentId, userId:input.userId})
    return response
}