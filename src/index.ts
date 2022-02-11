import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { createConnection } from '@typedorm/core';
import { dynamoDBSampleAppTable } from './table'
import path from 'path';
var AWS = require('aws-sdk');
AWS.config.update({ endpoint: new AWS.Endpoint('http://localhost:8000'), region: "us-east-1" });

// Start the server
const port = Number(process.env.PORT || 3000);

createConnection({
  table: dynamoDBSampleAppTable,
  //entities: [User],
  entities: path.resolve(__dirname, './entities/*.ts')
});


app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
