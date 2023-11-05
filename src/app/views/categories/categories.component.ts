import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[];
  public selectedCategory: Category;

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.dataHandler.categories$.subscribe(categories => this.categories = categories);
  }

  public showTasksByCategory(category: Category) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    
    this.dataHandler.fillTasksByCategory(category);
  }
}
