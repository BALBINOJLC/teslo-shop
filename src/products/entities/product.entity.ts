//Un Entity es como se ve una tabla 

import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column(
        {
            type: 'text',
            nullable: true
        }
    )
    description: string;

    @Column({ type: 'text', unique: true })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text', {
        array: true
    })
    sizes: string[];

    @Column('text')
    gandes: string

    @Column({
        type: 'text',
        array: true,
        default: []
    })
    tags: string[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug)
            this.slug = this.title
                .toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
    }



    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.title
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }


    //tags
    //images

}
