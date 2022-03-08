import {
    Attribute,
    Entity,
    INDEX_TYPE,
  } from '@typedorm/common';
  
  @Entity({
    name: 'like', // name of the entity that will be added to each item as an attribute
    // primary key
    primaryKey: {
        partitionKey: 'LIKE',
        sortKey: 'USR#{{userId}}-CONT#{{contentId}}'
    },
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'USR#{{userId}}',
            sortKey: 'CONT#{{contentId}}'
        },
    },
})
  
  class Like {
      @Attribute()
      public userId: string;

      @Attribute()
      public doc_type: string;

      @Attribute()
      public contentId: string;

  }

    
export default Like;