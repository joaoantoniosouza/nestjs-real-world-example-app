import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ArticleCreateDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres.' })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @IsArray()
  @IsOptional()
  readonly tagList?: string[];
}
