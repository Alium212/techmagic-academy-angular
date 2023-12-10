import { Component, Input } from '@angular/core';
import { IProduct } from '../product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() selectedProduct: IProduct | undefined;
  private originalDescription: string = '';
  private originalName: string = '';
  private originalPrice: number = 0;
  public isEditMode: boolean = false;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.selectedProduct = this.productService.getProductById(Number(id));
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.selectedProduct!.description = this.originalDescription;
      this.selectedProduct!.name = this.originalName;
      this.selectedProduct!.price = this.originalPrice;
    } else {
      this.originalDescription = this.selectedProduct!.description;
      this.originalName = this.selectedProduct!.name;
      this.originalPrice = this.selectedProduct!.price;
    }
  }

  public onFieldChange(event: Event, field: string): void {
    const element = event.target as HTMLDivElement;
    const selection = window.getSelection();
    if (element.innerText) {
      if (field === 'name') {
        this.selectedProduct!.name = element.innerText;
      } else if (field === 'description') {
        this.selectedProduct!.description = element.innerText;
      } else if (field === 'price') {
        const enteredValue = element.innerText.replace(/[^0-9.]/g, '');
        element.innerText = enteredValue;
        this.selectedProduct!.price = parseFloat(enteredValue);
      }
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
  

  public updateProduct(): void {
    this.productService.updateProduct(this.selectedProduct!);
    this.isEditMode = false;
  }

  public deleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.selectedProduct!.id);
      this.goBack();
    }
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
