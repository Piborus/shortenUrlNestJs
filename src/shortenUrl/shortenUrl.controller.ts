import {
  Controller,
  Post,
  Body,
  Get,
  Redirect,
  Param,
  Query,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ShortenUrlService } from './shortenUrl.service';
import { PaginationDto } from './dto/pagination.dto';
import { AtualizarShortenUrlDTO } from './dto/atualizarShortenUrl.dto';
import { ApiBody } from '@nestjs/swagger';
@Controller('/urls')
export class ShortenUrlController {
  constructor(private readonly urlService: ShortenUrlService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({
    description: 'Long URL to shorten',
    type: String,
  })
  async createShortUrl(
    @Body('longUrl') longUrl: string,
  ): Promise<{ shortUrl: string }> {
    const shortUrl = await this.urlService.shortenUrl(longUrl);
    return { shortUrl };
  }

  @Get('/longurl/:shortUrl')
  async getUrlByShortUrl(@Param('shortUrl') shortUrl: string): Promise<any> {
    return this.urlService.getLongUrlAndUpdateAccessNumber(shortUrl);
  }

  @Get('/:shortUrl')
  @Redirect()
  async redirectToLongUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ url: string }> {
    const longUrl = await this.urlService.getLongUrl(shortUrl);
    return { url: longUrl };
  }

  @Get()
  async getPaginatedUrls(@Query() paginationDto: PaginationDto): Promise<any> {
    return this.urlService.getPaginatedUrls(paginationDto);
  }

  @Put('/:id')
  @HttpCode(200)
  async updateShortUrl(
    @Param('id') id: number,
    @Body() ShortenUrlEntity: AtualizarShortenUrlDTO,
  ) {
    const url = await this.urlService.updateShortUrl(id, ShortenUrlEntity);
    return {
      url: url,
      message: 'URL atualizada com sucesso!',
    };
  }

  @Delete('/:id')
  @HttpCode(204)
  async removeShorturl(@Param('id') id: number) {
    const url = await this.urlService.removeLongUrl(id);
    return {
      url: url,
      message: 'URL removida com sucesso!',
    };
  }
}
