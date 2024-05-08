import { DynamicModule, Global, Module } from '@nestjs/common';

import { ElasticsearchAsyncOptions } from '@/modules/elasticsearch/interfaces';
import { ElasticsearchCoreSyncProvider } from '@/modules/elasticsearch/providers';

@Global()
@Module({})
export class ElasticsearchCoreModule {
    static forRootSync(options: ElasticsearchAsyncOptions): DynamicModule {
        const providers = ElasticsearchCoreSyncProvider(options);
        return {
            module: ElasticsearchCoreModule,
            providers,
            exports: providers,
        };
    }
}
