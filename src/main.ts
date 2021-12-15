import { NestFactory } from '@nestjs/core';
import AppModule  from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {TransformInterceptor} from "@src/common/interceptors/transform.interceptor"
import fastifyCookie from 'fastify-cookie';
import secureSession from 'fastify-secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // app.register(fastifyCookie, {
  //   secret: 'my-nest-njk-secret', // for cookies signature
  // });
  app.register(secureSession, {
    secret: 'averylogphrasebiggerthanthirtytwochars',
    salt: 'mq9hDxBVDbspDR6n',
    cookie: {
      path: '/',
      httpOnly: true // Use httpOnly for all production purposes
      // options for setCookie, see https://github.com/fastify/fastify-cookie
    }
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle('文档')
    .setDescription('不想写描述就这样吧')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  
  await app.listen(3000);
}
bootstrap();
