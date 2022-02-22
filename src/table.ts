import { INDEX_TYPE, Table } from '@typedorm/common';

export const dynamoDBSampleAppTable = new Table({
  name: 'KCP',
  partitionKey: 'PK',
  sortKey: 'SK',
  indexes: {
    GSI1: {
      partitionKey: 'PK1',
      sortKey: 'SK1',
      type: INDEX_TYPE.GSI,
    },
  },
});