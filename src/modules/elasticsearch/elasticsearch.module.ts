import { DynamicModule, Module } from '@nestjs/common';

import { ElasticsearchCoreModule } from '@/modules/elasticsearch/elasticsearch-core.module';
import { ElasticsearchAsyncOptions } from '@/modules/elasticsearch/interfaces';

@Module({})
export class ElasticsearchModule {
    static forRootSync(options: ElasticsearchAsyncOptions): DynamicModule {
        return {
            module: ElasticsearchCoreModule,
            imports: [ElasticsearchCoreModule.forRootSync(options)],
        };
    }
}
