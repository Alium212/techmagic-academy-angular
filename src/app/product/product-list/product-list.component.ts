import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, Product } from '../product.model';
import { ProductsService } from '../../services/products.service';
import { Tag } from '../../tag/tag.model';
import { TagsService } from '../../services/tags.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products$: Observable<IProduct[]> = this.productsService.products$;
  public selectedProduct: IProduct | undefined;
  public tags: Tag[] = [];
  public selectedTag: string = 'all';
  public showProductForm: boolean = false;
  public toggleButtonText: string = 'Create New Product';
  public editMode: boolean = false;
  public selectedProductId: number | undefined;

  @Input() productId: number | undefined;

  constructor(
    private productsService: ProductsService,
    private tagsService: TagsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.selectedTagName$.subscribe(tagName => {
      this.selectedTag = tagName;
    });
  }

  public navigateToProduct(productId: number | undefined): void {
    this.router.navigate(['product', productId]);
  }

  public matchesTag(product: IProduct): boolean {
    if (this.selectedTag === 'all') {
      return true;
    }
    return product.tags.some(tag => tag.name.trim() === this.selectedTag.trim());
  }

  public toggleProductForm(): void {
    this.showProductForm = !this.showProductForm;
    this.toggleButtonText = this.showProductForm ? 'Close Form' : 'Create New Product';
  }

  public editProduct(productId: number | undefined, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedProduct = this.productsService.getProductById(productId);
    this.editMode = true;
    this.selectedProductId = productId;
    this.toggleProductForm();
  }

  public cancelEdit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.editMode = false;
    this.selectedProductId = undefined;
    this.showProductForm = true;
    this.toggleButtonText = 'Create New Product';
    this.toggleProductForm();
  }

  public deleteProduct(productId: number | undefined, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(productId);
    }
  }
}