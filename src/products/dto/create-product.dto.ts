import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;


    @IsString({ each: true })
    @IsArray()
    @IsNotEmpty()
    sizes: string[];

    @IsIn(['men', 'women', 'kid', 'unisex'])
    @IsNotEmpty()
    gandes: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    //tags
    //images
}
