import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Then combine it with a RabbitMQ microservice
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port: 3210,
      },
    });

  // await app.startAllMicroservices();
  const config = new DocumentBuilder()
    .setTitle('Marvel API')
    .setDescription('The marvel API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  microservice.listen();
  await app.listen(3000);
}
bootstrap();
