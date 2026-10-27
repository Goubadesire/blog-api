import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto {
    @Transform(({value}) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    @MaxLength(255, {message: `L'email de doit pas depasser 255 caractères`})
    @IsEmail({}, {message: `Entrer une adresse mail valide`})
    @IsNotEmpty({message: `L'email est obligatoire`})
    email: string
    
    @MaxLength(150, {message: `Le mot de passe ne doit pas depasser 150 caractères`})
    @MinLength(8, {message: `Le mot de passe doit au minimum etre de 8 caractères`})
    @IsString({message: `Le mot de passe doit etre une chaine de caractères`})
    @IsNotEmpty({message: `Le mot de passe est obligatoire`})
    password: string
}