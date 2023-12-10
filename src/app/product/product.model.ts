import { ITag } from '../tag/tag.model';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    tags: ITag[];
    id?: number | undefined;
    imageUrl?: string | undefined;
}

export class Product implements IProduct {
    private static idCounter: number = 1;
    private readonly _id: number;

    name: string;
    description: string;
    price: number;
    tags: ITag[];
    imageUrl?: string | undefined;

    constructor(
        name: string,
        description: string,
        price: number,
        tags: ITag[],
        imageUrl?: string | undefined
    ) {
        this._id = Product.generateId();
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.tags = tags;
    }

    get id(): number {
        return this._id;
    }
    
    private static generateId(): number {
        return Product.idCounter++;
    }
}
