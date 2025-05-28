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
import { SERVICE_FULL_NAME } from '@/boilerplate/app/consts/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
    bufferLogs: true,
    autoFlushLogs: true,
    forceCloseConnections: true,
    snapshot: false,
    abortOnError: true,
  });

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

  console.log(`Start app listen on :${port}`);
  await app.listen(port);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
