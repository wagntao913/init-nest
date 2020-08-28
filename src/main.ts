import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';

import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 跨域设置
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // 监听路由，打印日志
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor())
  

  const options = new DocumentBuilder()
    .setTitle('nest 接口文档')
    .setDescription('接口文档')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3002);
  console.log('successfully: http://localhost:3002');
  console.log('api-docs: http://localhost:3002/api-docs');
}
bootstrap();
