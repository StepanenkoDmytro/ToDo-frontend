import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  @Input()
  public categories: Category[];
  @Input() 
  public selectedCategory: Category;

  @Output()
  public selectCategory = new EventEmitter<Category>();

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  public showTasksByCategory(category: Category): void {
    if(this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }
}
