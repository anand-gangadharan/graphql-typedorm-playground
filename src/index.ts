/* eslint-disable no-var */
import './pre-start'; // Must be the first import
import app from './Server';
import logger from './shared/Logger';
import { createConnection } from '@typedorm/core';
import { dynamoDBSampleAppTable } from './table'
import mergedResolvers from './resolvers'
//import { createUser, getUser } from './resolvers/users';
import path from 'path';
import { ApolloError, ApolloServer, gql } from "apollo-server";
import schema from './schema';
import { makeExecutableSchema } from "graphql-tools";
// eslint-disable-next-line @typescript-eslint/no-var-requires
var AWS = require('aws-sdk');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
AWS.config.update({ endpoint: new AWS.Endpoint('http://localhost:8000'), region: "us-east-1" });



const typeDefs = schema;

// Provide resolver functions for your schema fields
console.log(mergedResolvers)
const resolvers = mergedResolvers

const executableSchema = makeExecutableSchema({
  resolverValidationOptions: {
    requireResolversForArgs: false,
    requireResolversForNonScalar: false,
    requireResolversForAllFields: false,
    requireResolversForResolveType: false,
    allowResolversNotInSchema: true,
  },
  allowUndefinedInResolve: true,
  inheritResolversFromInterfaces: true,
  resolvers,
  typeDefs: schema
});

const apollo = new ApolloServer({
  schema: executableSchema,
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
  logger.info('Express server started on port: 4000');
});


