import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ITag, Tag } from '../tag.model';
import { TagsService } from '../../services/tags.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent {
  @Output() tagAdded: EventEmitter<any> = new EventEmitter();
  @ViewChild('tagForm') tagForm: NgForm | undefined;

  @Input() showSubmitButton: boolean = true;

  public newTagNames: string = '';
  public newTagColor: string = '';

  constructor(private tagsService: TagsService) {}

  public addTag(): void {
    if (this.tagForm?.valid) {
      const tagNamesArray: string[] = this.newTagNames.split(',').map(name => name.trim());
      tagNamesArray.forEach(tagName => {
        const existingTag: ITag | undefined = this.tagsService.getAllTags().find(tag => tag.name === tagName);
        if (existingTag) {
          this.tagAdded.emit(existingTag);
        } else {
          const newTag: ITag = new Tag(tagName, this.newTagColor);
          this.tagsService.addTag(newTag);
          this.tagAdded.emit(newTag);
        }
      });

      this.resetForm();
    }
  }

  private tagNameIsValid(tagName: string): boolean {
    return /^[a-zA-Z\s]*$/.test(tagName);
  }

  private resetForm(): void {
    this.newTagNames = '';
    this.newTagColor = '';
  }
}
