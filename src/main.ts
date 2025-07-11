import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/transform.interceptor';
import { GlobalValidationPipe } from './core';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 5176;

  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // config api version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');

  // validation config for class-validator
  app.useGlobalPipes(new GlobalValidationPipe());

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('Ionic API')
    .setDescription('API documentation for the Ionic')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
  console.log(
    `Application is running on: http://localhost:${port} successfully.`,
  );
}
bootstrap();
