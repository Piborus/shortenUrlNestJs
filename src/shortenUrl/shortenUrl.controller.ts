import { Controller, Post, Body, Get, Redirect, Param, Query } from '@nestjs/common';
import { ShortenUrlService } from './shortenUrl.service';
import { PaginationDto } from './dto/pagination.dto';
@Controller('/urls')
export class ShortenUrlController {
  constructor(private readonly urlService: ShortenUrlService) {}

  @Post()
  async createShortUrl(@Body('longUrl') longUrl: string): Promise<{ shortUrl: string }> {
    const shortUrl = await this.urlService.shortenUrl(longUrl); // Call the service method to encode and save the long URL
    return { shortUrl }; // Return the short URL in the response
  }

  @Get('/longurl/:shortUrl')
  async getUrlByShortUrl(@Param('shortUrl') shortUrl: string): Promise<any> {
    return this.urlService.getLongUrlAndUpdateAccessNumber(shortUrl);
  }

  
  @Get('/:shortUrl')
  @Redirect()
  async redirectToLongUrl(@Param('shortUrl') shortUrl: string): Promise<{ url: string }> {
    const longUrl = await this.urlService.getUrlByShortUrl(shortUrl);
    return { url: longUrl }; 
  }

  @Get()
  async getPaginatedUrls(@Query() paginationDto: PaginationDto): Promise<any> {
    return this.urlService.getPaginatedUrls(paginationDto);
  }
}