import { Client, ClientOptions } from '@elastic/elasticsearch';
import { Logger } from '@nestjs/common';

export class ElasticsearchCoreSync {
    static async init(options: ClientOptions) {
        const _Client = new Client(options);

        await _Client.cluster
            .health({
                wait_for_status: 'yellow',
                timeout: '5s',
            })
            .then((res) => Logger.log(`Elasticsearch cluster health status: ${res.status}`))
            .catch((err) => Logger.error(`Elasticsearch cluster health status: ${err.message}`));

        return _Client;
    }
}
