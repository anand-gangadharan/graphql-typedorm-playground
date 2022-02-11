import {
  Attribute,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Entity,
  INDEX_TYPE,
} from '@typedorm/common';



@Entity({
  name: 'user',
  primaryKey: {
    partitionKey: 'USER#{{id}}',
    sortKey: 'USER#{{name}}',
  },
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'USER',
      sortKey: 'USER#{{email}}',
    },
  },
})
class User {

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  public id: number;
  @Attribute()
  public name: string;
  @Attribute()
  public email: string;



  // constructor(nameOrUser: string | IUser, email?: string, id?: number) {
  //   if (typeof nameOrUser === 'string') {
  //     this.name = nameOrUser;
  //     this.email = email || '';
  //     this.id = id || -1;
  //   } else {
  //     this.name = nameOrUser.name;
  //     this.email = nameOrUser.email;
  //     this.id = nameOrUser.id;
  //   }
  // }
}

export default User;
