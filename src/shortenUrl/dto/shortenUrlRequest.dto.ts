import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class UrlResquestDTO{

    @IsString()
    @IsUrl()
    @IsNotEmpty({message: 'A url original não pode esta vazia.'})
    longUrl: string;
}