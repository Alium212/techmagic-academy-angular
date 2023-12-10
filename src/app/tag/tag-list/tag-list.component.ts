import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITag } from '../tag.model';
import { TagsService } from '../../services/tags.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  public tags$: Observable<ITag[]> | undefined;

  constructor(
    private tagsService: TagsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.tags$ = this.tagsService.tags$;

    this.productsService.products$.subscribe(products => {
      const tags: ITag[] = [];
      products.forEach(product => {
        product.tags.forEach(tag => {
          const existingTag = tags.find(t => t.name === tag.name);
          if (!existingTag) {
            tags.push(tag);
          }
        });
      });
      this.tagsService.setTags(tags);
    });
  }

  deleteTag(tagId: string): void {
    this.tagsService.deleteTag(tagId);
  }

  filterProductsByTag(tagName: string): void {
    this.productsService.filterProductsByTagName(tagName);
  }
}
