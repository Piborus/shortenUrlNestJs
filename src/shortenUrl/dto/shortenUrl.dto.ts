import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";


export class UrlResponseDTO{

    @IsString()
    @IsUrl()
    @IsNotEmpty({message: 'A url encurtada não pode esta vazia.'})
    shortenUrl: string;
 
}

