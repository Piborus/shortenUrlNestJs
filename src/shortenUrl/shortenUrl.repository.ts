import { Injectable } from "@nestjs/common";
import { ShortenUrlEntity } from "./shortenUrl.entity";

@Injectable()
export class ShortenUrlRepository{
    private shortenedURLs: ShortenUrlEntity[] = [];

    async salva(url: ShortenUrlEntity){
        this.shortenedURLs.push(url);
    }

    async listar(){
        return this.shortenedURLs;
    }

    private buscaPorId(id: string){
        const possivelShortUrl = this.shortenedURLs.find(
          usuarioSalvo => possivelShortUrl.id === id);
          if(!possivelShortUrl){
            throw new Error('Não foi encontrado o usuário com esse ID');
          }
    
          return possivelShortUrl;
      }
}