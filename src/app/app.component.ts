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
  public priorities: Priority[];
  public selectedCategory: Category | null;

  private searchText: string;
  private statusFilter: boolean | null;
  private priorityFilter: Priority | null;

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  public ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    this.onSelectCategory(null);
  }

  public onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.updateTasks();
    });
  }

  public onDeleteTask(task: Task): void {
    if (task.id) {
      this.dataHandler.deleteTask(task.id).subscribe(() => {
        this.updateTasks();
      });
    }
  }

  public onAddTask(task: Task): void {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasks()
    })
  }

  public onAddCategory(category: string): void {
    this.dataHandler.addCategory(category).subscribe(() => {
      this.updateCategories();
    })
  }

  public onSelectCategory(category: Category | null) {
    this.selectedCategory = category;

    this.updateTasks();
  }

  public onDeleteCategory(category: Category): void {
    if (category.id) {
      this.dataHandler.deleteCategory(category.id).subscribe(() => {
        this.selectedCategory = null;
        this.onSelectCategory(this.selectedCategory);
      })
    }
  }

  public onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    })
  }

  public onFilterTaskByTitle(search: string): void {
    this.searchText = search;
    this.updateTasks();
  }

  public onFilterTaskByStatus(status: boolean | null): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  public onFilterTaskByPriority(priority: Priority | null): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  private updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }

  private updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }
}
