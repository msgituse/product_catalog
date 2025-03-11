import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for cross-origin requests
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}

// Handle uncaught errors
bootstrap().catch((error) => {
  console.error('❌ Error starting the application:', error);
  process.exit(1);
});
