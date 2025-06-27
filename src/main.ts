import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '@boilerplate/filters/http-exception.filter';
import { SERVICE_FULL_NAME } from '@/boilerplate/app/configs/app.config';
import { APP_NAME, APP_VERSION } from './version';

async function bootstrap() {
  console.log(`Starting ${APP_NAME} ${APP_VERSION}`);

  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
    bufferLogs: true,
    autoFlushLogs: true,
    forceCloseConnections: true,
    snapshot: false,
    abortOnError: true,
  });

  // Get logger (pino)
  const logger = app.get(Logger);

  try {
    // Exception configuration
    app.useGlobalFilters(new HttpExceptionFilter());

    // Logger configuration
    app.useLogger(app.get(Logger));
    app.useGlobalInterceptors(new LoggerErrorInterceptor());

    // Api configuration
    app.setGlobalPrefix('api', { exclude: ['/metrics'] });
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    // Swagger configuration
    const swaggerConfig = new DocumentBuilder()
        .setTitle(`${SERVICE_FULL_NAME}`)
        .setDescription('The example API description')
        .setVersion('1.0')
        .build(),
      swaggerDocumentOptions: SwaggerDocumentOptions = {
        // Uncomment if want to include only this modules
        // include: [TestModule],
      },
      document = SwaggerModule.createDocument(
        app,
        swaggerConfig,
        swaggerDocumentOptions,
      );
    SwaggerModule.setup('api', app, document);

    const config = app.get(ConfigService);
    const port: number = config.get('PORT') ? +config.get('PORT') : 3000;

    logger.log(`🚀 "${SERVICE_FULL_NAME}", ${APP_VERSION}`);
    logger.log(`🌐 Application is listening on port ${port}`);
    await app.listen(port);
  } catch (error) {
    logger.fatal('❌ Failed to start application', error);
    process.exit(1);
  }
}
bootstrap().catch((error) => {
  console.error('Fatal bootstrap error:', error); // fallback
  process.exit(1);
});
