import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Configuration } from '@/config/configuration';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    // validate input before jump into controller
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(Configuration.instance.port);
}
bootstrap().then(() => {
    Logger.log(`Server running at: http://localhost:${Configuration.instance.port}`);
});
