import { NestFactory } from '@nestjs/core';
import * as appModule from './modules/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(appModule.AppModule, { cors: true });
  await app.listen(3011, () => console.log(`listening on 3011`));
}
bootstrap();
