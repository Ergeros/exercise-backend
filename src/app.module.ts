import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { CommentModule } from "./comment/comment.module";
import { UserModule } from "./user/user.module";
import { UploadModule } from "./upload/upload.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get("DATABASE_CONNECTION"),
          host: configService.get("DATABASE_HOST", "localhost"),
          port: configService.get<number>("DATABASE_PORT", 5432),
          username: configService.get("DATABASE_USERNAME", "postgres"),
          password: configService.get("DATABASE_PASSWORD", "postgres"),
          database: configService.get("DATABASE_SCHEMA", "dev"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: true,
        } as TypeOrmModuleOptions),
    }),
    ArticleModule,
    CommentModule,
    UserModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
