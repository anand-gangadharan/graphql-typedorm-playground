import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
    INDEX_TYPE,
} from '@typedorm/common';
import Program from './Program';


@Entity({
    name: 'event',
    primaryKey: {
        partitionKey: 'channel#{{id}}',
        sortKey: 'event#{{progId}}',
    },
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'SERIES',
            sortKey: 'Channel#{{name}}',
        },
    },
})
export default class Event {

    @Attribute()
    public id: number;

    @AutoGenerateAttribute({
        strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    public progId: number;

    @Attribute()
    public name: string;

    @Attribute()
    public channelNo: string;
}
