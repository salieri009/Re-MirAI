import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { SurveyModule } from './modules/survey/survey.module';
import { OpenAIModule } from './modules/openai/openai.module';
import { PersonaModule } from './modules/persona/persona.module';
import { ChatModule } from './modules/chat/chat.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    PrismaModule,
    OpenAIModule,
    AuthModule,
    SurveyModule,
    PersonaModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


