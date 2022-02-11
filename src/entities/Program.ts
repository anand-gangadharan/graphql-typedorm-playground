import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
    INDEX_TYPE,
} from '@typedorm/common';



@Entity({
    name: 'program',
    primaryKey: {
        partitionKey: 'program#{{id}}',
        sortKey: 'program#{{name}}',
    },
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'PROGRAM',
            sortKey: 'USER#{{name}}',
        },
    },
})
export default class Program {

    @AutoGenerateAttribute({
        strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    public id: number;
    @Attribute()
    public videoID: string;
    @Attribute()
    public name: string;
}
