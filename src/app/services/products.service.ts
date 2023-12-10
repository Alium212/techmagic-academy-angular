import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct, Product } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  private readonly _selectedTagName$: BehaviorSubject<string> = new BehaviorSubject<string>('all');

  public readonly products$ = this._products$.asObservable();
  public readonly selectedTagName$ = this._selectedTagName$.asObservable();

  get products(): IProduct[] {
    return this._products$.getValue();
  }

  private set products(products: IProduct[]) {
    this._products$.next(products);
  }

  public setProducts(products: IProduct[]): void {
    this.products = products;
  }

  public addProduct(newProduct: IProduct): void {
    this.products = [...this.products, newProduct];
  }
  
  public getProductById(id: number | undefined): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  public getAllProducts(): IProduct[] {
    return this.products;
  }

  public updateProduct(updatedProduct: IProduct, updatedProductId?: number): void {
    const newProduct = {...updatedProduct, id: updatedProductId};
    const index = this.products.findIndex(product => product.id === updatedProductId);

    if (index !== -1) {
      this.products[index] = newProduct;
      this.products = [...this.products];
    }
  }

  public deleteProduct(id: number | undefined): void {
    const updatedProducts = this.products.filter(product => product.id !== id);
    this.products = updatedProducts;
  }

  public filterProductsByTagName(tagName: string): void {
    this._selectedTagName$.next(tagName);
  }
}
