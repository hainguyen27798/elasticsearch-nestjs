import fs from 'node:fs';

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { Model } from 'mongoose';

import { PageOptionsDto, SuccessDto } from '@/dto/core';
import { CsvUtils } from '@/helpers';
import { Product } from '@/modules/product/schemas/product.schema';
import { TProduct } from '@/modules/product/types/product';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly _ProductModel: Model<Product>) {}

    async importData(filename: string) {
        const jsonData = await CsvUtils.csvToJson(`./data/${filename}.csv`);

        const products = jsonData.map(
            (product): TProduct => ({
                name: _.get(product, 'name'),
                category: _.get(product, 'main_category'),
                subCategory: _.get(product, 'sub_category'),
                image: _.get(product, 'image'),
                link: _.get(product, 'link'),
                ratings: _.toNumber(_.get(product, 'ratings')) || 0,
                noOfRatings: _.toNumber(_.get(product, 'no_of_ratings')) || 0,
                discountPrice: _.toNumber(_.replace(_.get(product, 'discount_price'), /[^0-9.-]+/g, '')) || 0,
                actualPrice: _.toNumber(_.replace(_.get(product, 'actual_price'), /[^0-9.-]+/g, '')) || 0,
            }),
        );

        await this._ProductModel.deleteMany({ subCategory: filename });
        await this._ProductModel.insertMany(plainToInstance(Product, products));

        return new SuccessDto('Fake products successfully', HttpStatus.CREATED);
    }

    async readFileNames() {
        const filenames = fs.readdirSync('data').map((name) => name.replace(new RegExp(/.csv$/), ''));
        return new SuccessDto(null, HttpStatus.OK, filenames);
    }

    async searchProduct(pageOption: PageOptionsDto) {
        return {};
    }
}
