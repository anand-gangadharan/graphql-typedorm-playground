import {
  Attribute,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Entity,
  INDEX_TYPE,
} from '@typedorm/common';

@Entity({
  name: 'kcpinfo', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'USR#1',
    sortKey: 'FAV#111222',
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: 'PK1',
      sortKey: 'SK1',
      type: INDEX_TYPE.GSI,
    },
  },
})


class KCPInfo {
    public contentId: string;
    public name: string;
    public doc_type: string;
    public resourceId:string;
    public userId:string;
    public operation:string;
    public updatedAt:string;
    public configurationKey:string;
    public progress:string;
    public success:boolean;
  }
  
  export default KCPInfo;