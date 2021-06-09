import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListArticlesQuery {
  @IsString()
  @IsOptional()
  readonly author?: string;

  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @IsInt()
  @IsOptional()
  readonly offset?: number;
}
