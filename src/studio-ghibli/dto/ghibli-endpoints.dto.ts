import { IsArray, IsEnum, IsNumber, IsOptional, IsUUID, Min } from "class-validator";
import { Film } from "../enums/films.enum";
import { Location } from "../enums/locations.enum";
import { Species } from "../enums/species.enum";
import { People } from "../enums/people.enum";
import { Vehicles } from "../enums/vehicles.enum";
import { Transform, Type } from "class-transformer";

export class GhibliQueryConfigDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => transformToArray(value))
  @IsEnum(Film, {each: true, message: 'films must be an array of valid films properties'})
  films?: Film[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => transformToArray(value))
  @IsEnum(Location, {each: true, message: 'locations must be an array of valid locations properties'})
  locations?: Location[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => transformToArray(value))
  @IsEnum(Species, {each: true, message: 'species must be an array of valid species properties'})
  species?: Species[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => transformToArray(value))
  @IsEnum(People, {each: true, message: 'people must be an array of valid people properties'})
  people?: People[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => transformToArray(value))
  @IsEnum(Vehicles, {each: true, message: 'vehicles must be an array of valid vehicles properties'})
  vehicles?: Vehicles[]

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;
  
  @IsOptional()
  @IsUUID()
  idGhibli?: string
}

function transformToArray(value: any): string[] {
  return typeof value === 'string' ? value.split(',').map(String) : value;
}