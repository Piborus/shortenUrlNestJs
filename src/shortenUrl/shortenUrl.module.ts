import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenUrlEntity } from './shortenUrl.entity';
import { ShortenUrlController } from './shortenUrl.controller';
import { ShortenUrlRepository } from './shortenUrl.repository';
import { ShortenUrlService } from './shortenUrl.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortenUrlEntity])],
  controllers: [ShortenUrlController],
  providers: [ShortenUrlRepository, ShortenUrlService],
})
export class ShortenUrlModule {}
