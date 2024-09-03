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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'warn', 'error'],
    bufferLogs: true,
  });

  // Logger configuration
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Api configuration
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
      .setTitle('Service example')
      .setDescription('The example API description')
      .setVersion('1.0')
      .addTag('test')
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
  await app.listen(port);
}
bootstrap();
