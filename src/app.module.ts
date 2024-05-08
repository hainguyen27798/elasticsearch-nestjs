import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Configuration } from '@/config/configuration';
import { DatabaseModule } from '@/database/database.module';
import { ElasticsearchModule } from '@/modules/elasticsearch/elasticsearch.module';
import { ProductModule } from '@/modules/product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
            load: [Configuration.init],
        }),
        DatabaseModule,
        ElasticsearchModule.forRootSync({
            useFactory: () => Configuration.instance.elasticsearch,
        }),
        ProductModule,
    ],
})
export class AppModule {}
