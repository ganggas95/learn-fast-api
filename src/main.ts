import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT).then(() => {
    console.log(`Your ap running in port :${PORT}`);
  });
}
bootstrap();
