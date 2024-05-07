import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AbstractSchema } from '@/database/schemas/abstract.schema';

const COLLECTION_NAME = 'products';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: COLLECTION_NAME })
export class Product extends AbstractSchema {
    @Prop({ trim: true, required: true })
    name: string;

    @Prop({ trim: true, required: true })
    category: string;

    @Prop({ trim: true, required: true })
    subCategory: string;

    @Prop({ trim: true })
    image: string;

    @Prop({ trim: true })
    link: string;

    @Prop({ trim: true, default: 0 })
    ratings: number;

    @Prop({ trim: true, default: 0 })
    noOfRatings: number;

    @Prop({ trim: true, default: 0 })
    discountPrice: number;

    @Prop({ trim: true, default: 0 })
    actualPrice: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
