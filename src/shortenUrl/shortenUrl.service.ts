import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortenUrlEntity } from './shortenUrl.entity';
import * as crypto from 'crypto';
import { PaginationDto } from './dto/pagination.dto';
import { AtualizarShortenUrlDTO } from './dto/atualizarShortenUrl.dto';

@Injectable()
export class ShortenUrlService {
  constructor(
    @InjectRepository(ShortenUrlEntity)
    private readonly shortenUrlRepository: Repository<ShortenUrlEntity>,
  ) {}

  async shortenUrl(longUrl: string): Promise<string> {
    const existingShortUrl = await this.shortenUrlRepository.findOne({
      where: { longUrl },
    });

    if (existingShortUrl) {
      return existingShortUrl.shortUrl;
    } else {
      const shortUrl = await this.generateShortUrl();
      const newShortenUrl = this.shortenUrlRepository.create({
        longUrl,
        shortUrl,
        acessNumber: 0,
      });
      await this.shortenUrlRepository.save(newShortenUrl);
      return shortUrl;
    }
  }

  async generateShortUrl(): Promise<string> {
    const randomBytes = crypto.randomBytes(6);
    const shortUrl = Buffer.from(randomBytes).toString('base64');
    return shortUrl;
  }

  async getLongUrl(shortUrl: string): Promise<string> {
    const existingShortUrl = await this.shortenUrlRepository.findOne({
      where: { shortUrl },
    });

    if (!existingShortUrl) {
      throw new NotFoundException('Short URL not found');
    }

    // Increase access number
    existingShortUrl.acessNumber++;
    await this.shortenUrlRepository.save(existingShortUrl);

    return existingShortUrl.longUrl;
  }

  async getLongUrlAndUpdateAccessNumber(shortUrl: string): Promise<string> {
    const existingShortUrl = await this.shortenUrlRepository.findOne({
      where: { shortUrl },
    });

    if (!existingShortUrl) {
      throw new NotFoundException('Short URL not found');
    }

    existingShortUrl.acessNumber++;
    await this.shortenUrlRepository.save(existingShortUrl);

    return existingShortUrl.longUrl;
  }

  async getPaginatedUrls(paginationDto: PaginationDto): Promise<any> {
    const { page, limit } = paginationDto;

    const parsedPage = Math.max(1, parseInt(page as any, 10) || 1);

    const [urls, total] = await this.shortenUrlRepository.findAndCount({
      take: 10,
      skip: 10 * (parsedPage - 1),
      order: { acessNumber: 'DESC' },
    });

    return {
      urls,
      total,
      page: parsedPage,
      limit: 10,
      totalPages: Math.ceil(total / 10),
    };
  }

  async getUrlByShortUrl(shortUrl: string): Promise<any> {
    const url = await this.shortenUrlRepository.findOne({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return {
      id: url.id,
      longUrl: url.longUrl,
      accessNumber: url.acessNumber,
    };
  }

  async updateShortUrl(
    id: number,
    atualizarLongUrl: Partial<AtualizarShortenUrlDTO>,
  ) {
    const urlAtulazada = await this.shortenUrlRepository.update(
      id,
      atualizarLongUrl,
    );
  }

  async removeLongUrl(id: number) {
    const usuarioRemovido = await this.shortenUrlRepository.delete(id);
  }
}
