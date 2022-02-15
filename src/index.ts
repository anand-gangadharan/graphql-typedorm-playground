/* eslint-disable no-var */
import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { createConnection } from '@typedorm/core';
import { dynamoDBSampleAppTable } from './table'
import  createUser  from './resolvers/users';
import path from 'path';
import { ApolloError, ApolloServer, gql } from "apollo-server";
// eslint-disable-next-line @typescript-eslint/no-var-requires
var AWS = require('aws-sdk');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
AWS.config.update({ endpoint: new AWS.Endpoint('http://localhost:8000'), region: "us-east-1" });



const typeDefs = gql ` type User{
  name: String
  id: String
  email:String
      
}
type Query {
  user(id: ID!): [User]
}
type Status{
  statusCode: Int
  statusMessage: String
}

input InputUser{    
  name: String
  email: String 
}   

type Mutation{
  createUser(input: InputUser!): Status! 
  updateUser(input: InputUser!): Status!
  deleteInUser(input: InputUser!): Status!
}`


// Provide resolver functions for your schema fields
const resolvers = {
    Query: {      

        },   

    Mutation: {
      createUser  
           
    }
  };



const apollo = new ApolloServer({
    typeDefs,
    resolvers
})


//start graphql server
apollo.listen(8080, () => logger.info(`Server is running on the port 8080`))

// Start the server
const port = Number(process.env.PORT || 4000);

createConnection({
  table: dynamoDBSampleAppTable,
  //entities: [User],
  entities: path.resolve(__dirname, './entities/*.ts')
});


app.listen(4000, () => {
  logger.info('Express server started on port: 4000' );
});
