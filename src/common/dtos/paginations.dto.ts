import { Type } from "class-transformer";
import { IsOptional, IsPositive, } from "class-validator";

export class PaginationDto {


    @IsOptional()
    @IsPositive()
   @Type( () => Number ) //Transforma el valor a number
    limit?: number;

    @IsOptional()
    @IsPositive()
   @Type( () => Number ) //Transforma el valor a number
    offset?:number;

}