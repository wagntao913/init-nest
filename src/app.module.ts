import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './logical/users/users.module';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { UsersController } from './logical/users/users.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController,UsersController],
  providers: [AppService],
})
export class AppModule {}
