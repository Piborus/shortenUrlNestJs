import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class AtualizarShortenUrlDTO{

    @IsOptional()
    @IsUrl()
    @IsNotEmpty({message: 'O campo longUrl deve ser preenchido.'})
    longUrl: string

    @IsOptional()
    updateAt: string
}