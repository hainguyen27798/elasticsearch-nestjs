import { ClientOptions } from '@elastic/elasticsearch';
import { DynamicModule, ForwardReference, InjectionToken, OptionalFactoryDependency, Type } from '@nestjs/common';

export interface ElasticsearchAsyncOptions {
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory: (...args: any[]) => ClientOptions | Promise<ClientOptions>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
}
