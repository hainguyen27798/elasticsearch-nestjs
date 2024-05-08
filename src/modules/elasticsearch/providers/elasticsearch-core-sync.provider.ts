import { ClientOptions } from '@elastic/elasticsearch';
import { Provider } from '@nestjs/common';

import { ELASTICSEARCH_CLIENT, ELASTICSEARCH_OPTIONS } from '@/modules/elasticsearch/constants';
import { ElasticsearchAsyncOptions } from '@/modules/elasticsearch/interfaces';
import { ElasticsearchCoreSync } from '@/modules/elasticsearch/providers/elasticsearch-core-sync';

export const ElasticsearchCoreSyncProvider = (options: ElasticsearchAsyncOptions): Provider[] => [
    {
        provide: ELASTICSEARCH_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
    },
    {
        inject: [ELASTICSEARCH_OPTIONS],
        provide: ELASTICSEARCH_CLIENT,
        useFactory: async (options: ClientOptions) => {
            return await ElasticsearchCoreSync.init(options);
        },
    },
];
