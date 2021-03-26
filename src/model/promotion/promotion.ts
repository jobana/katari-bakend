import { Discount } from './../product/discount';
export class Promotion {
    category: string;
    startDate: Date;
    endDate: Date;
    season: string;
    discount: Discount;
    product: [];
    size: [];
    imagePath: string;
}