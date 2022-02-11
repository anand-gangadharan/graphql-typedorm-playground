import {
    Attribute,
    AutoGenerateAttribute,
    AUTO_GENERATE_ATTRIBUTE_STRATEGY,
    Entity,
    INDEX_TYPE,
} from '@typedorm/common';
import Program from './Program';


@Entity({
    name: 'channel',
    primaryKey: {
        partitionKey: 'channel#{{id}}',
        sortKey: 'channel',
    },
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'SERIES',
            sortKey: 'Channel#{{name}}',
        },
    },
})
export default class Channel {

    @AutoGenerateAttribute({
        strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
    })
    public id: number;

    @Attribute()
    public number: number;

    @Attribute()
    public name: string;

    @Attribute()
    public events: Event[];
}
