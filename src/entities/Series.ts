import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
    INDEX_TYPE,
} from '@typedorm/common';
import Program from './Program';

@Entity({
    name: 'series',
    primaryKey: {
        partitionKey: 'series#{{id}}',
        sortKey: 'program#{{name}}',
    },
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'SERIES',
            sortKey: 'Series#{{name}}',
        },
    },
})
export default class Series {

    @AutoGenerateAttribute({
        strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    public id: number;
    @Attribute()
    public name: string;
    @Attribute()
    public programs: Program[];
}
