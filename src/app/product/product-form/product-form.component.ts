import { ChangeDetectorRef, Component, ViewChild, AfterViewInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { IProduct, Product } from '../product.model';
import { ProductsService } from '../../services/products.service';
import { NgForm } from '@angular/forms';
import { ITag } from '../../tag/tag.model';
import { TagFormComponent } from '../../tag/tag-form/tag-form.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements AfterViewInit {
  @Output() toggleForm: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(TagFormComponent) tagForm!: TagFormComponent;
  @Input() productToEdit: IProduct | undefined;

  private readonly placeholderImageUrl: string = 'https://placehold.co/300x300';
  private readonly defaultProduct: IProduct = {
    name: '',
    description: '',
    price: 0,
    tags: []
  };
  public newProduct: IProduct = new Product(
    this.defaultProduct.name,
    this.defaultProduct.description,
    this.defaultProduct.price,
    this.defaultProduct.tags
  );
  showProductForm: any;
  toggleButtonText: string | undefined;
  
  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.newProduct = { ...this.productToEdit };
    }
  }

  public toggleProduct(): void {
    this.toggleForm.emit();
  }

  public addProduct(): void {
    this.newProduct.imageUrl = this.newProduct.imageUrl || this.placeholderImageUrl;
    if (this.productToEdit) {
      this.productsService.updateProduct(this.newProduct, this.productToEdit.id);
    } else {
      this.productsService.addProduct(this.newProduct);
    }

    this.tagForm.addTag();
    this.cdr.detectChanges();
  }

  public handleSubmit(form: NgForm): void {
    if (form.valid && this.tagForm?.tagForm?.valid) {
      this.addProduct();
    }
  }

  public handleTagAdded(tag: ITag): void {
    this.newProduct.tags.push(tag);
  }
}
