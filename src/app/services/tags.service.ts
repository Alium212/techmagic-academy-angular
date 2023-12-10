import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITag } from '../tag/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly _tags$: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public readonly tags$ = this._tags$.asObservable();

  get tags(): ITag[] {
    return this._tags$.getValue();
  }

  private set tags(tags: ITag[]) {
    this._tags$.next(tags);
  }

  public setTags(tags: ITag[]): void {
    this.tags = tags;
  }

  public addTag(newTag: ITag): void {
    const updatedTags = [...this.tags, newTag];
    this.tags = updatedTags;
  }

  public deleteTag(tagId: string): void {
    const updatedTags = this.tags.filter(tag => tag.name !== tagId);
    this.tags = updatedTags;
  }

  public updateTag(updatedTag: ITag): void {
    const updatedTags = this.tags.map(tag => {
      if (tag.name === updatedTag.name) {
        return { ...tag, ...updatedTag };
      }
      return tag;
    });
    this.tags = updatedTags;
  }

  public clearTags(): void {
    this.tags = [];
  }

  public getAllTags(): ITag[] {
    return this.tags;
  }
}
