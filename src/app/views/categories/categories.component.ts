import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  public categories: Category[];

  @Output()
  public selectCategory = new EventEmitter<Category>();

  public selectedCategory: Category;

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void {
  }

  public showTasksByCategory(category: Category): void {
    if(this.selectedCategory === category) {
      return;
    }

    this.selectCategory.emit(this.selectedCategory);
  }
}
