import { Component, OnInit } from '@angular/core';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';
import { Category } from './model/Category';
import { Priority } from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public tasks: Task[];
  public categories: Category[];

  public selectedCategory: Category | null;

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    // this.onSelectCategory(null);

    this.totalTasksCountInCategory = 10;
    this.completedCountInCategory = 1;
    this.uncompletedCountInCategory = 5;
    this.uncompletedTotalTasksCount = 5;
  }

  public onUpdateTask(task: Task): void {
    const mockPriority = new Priority(12, "Lol", '');
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        '',
        false,
        mockPriority
      ).subscribe(task => {
        this.tasks = task;
      });
    });
  }

  public onDeleteTask(task: Task): void {
    const mockPriority = new Priority(12, "Lol", '');
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        '',
        false,
        mockPriority
      ).subscribe(task => {
        this.tasks = task;
      });
    });
  }


  public onSelectCategory(category: Category | null) {
    this.selectedCategory = category;
    const mockPriority = new Priority(12, "Lol", '');

    this.dataHandler.searchTasks(
      this.selectedCategory,
      '',
      false,
      mockPriority
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }

  public onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe( () => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    })
  }

  public onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe( () => {
      this.onSelectCategory(this.selectedCategory);
    })
  }
}
