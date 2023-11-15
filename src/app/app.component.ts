import { Component, OnInit } from '@angular/core';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';
import { Category } from './model/Category';
import { Priority } from './model/Priority';
import { zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showStat: boolean = true;

  public tasks: Task[];
  public categories: Category[];
  public priorities: Priority[];
  public selectedCategory: Category | null;


  public totalTasksCountInCategory: number;
  public completeTasksCountInCategory: number;
  public uncompleteTasksCountInCategory: number;
  private uncompleteTotalTasksCountInCategory: number;

  private searchText: string;
  private statusFilter: boolean | null;
  private priorityFilter: Priority | null;
  private searchCategoryText: string;

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
      this.updateTasksAndStat();
    });
  }

  public onDeleteTask(task: Task): void {
    if (task.id) {
      this.dataHandler.deleteTask(task.id).subscribe(() => {
        this.updateTasksAndStat();
      });
    }
  }

  public onAddTask(task: Task): void {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasksAndStat();
    })
  }

  public onAddCategory(category: string): void {
    this.dataHandler.addCategory(category).subscribe(() => {
      this.updateCategories();
    })
  }

  public onSelectCategory(category: Category | null) {
    this.selectedCategory = category;

    this.updateTasksAndStat();
  }

  public onDeleteCategory(category: Category): void {
    if (category.id) {
      this.dataHandler.deleteCategory(category.id).subscribe(() => {
        this.onSelectCategory(null);
      })
    }
  }

  public onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    })
  }

  public onFilterTaskByTitle(search: string): void {
    this.searchText = search;
    this.updateTasksAndStat();
  }

  public onFilterTaskByStatus(status: boolean | null): void {
    this.statusFilter = status;
    this.updateTasksAndStat();
  }

  public onFilterTaskByPriority(priority: Priority | null): void {
    this.priorityFilter = priority;
    this.updateTasksAndStat();
  }

  public onSearchCategory(search: string): void {
    this.searchCategoryText = search;

    this.dataHandler.searchCategories(search).subscribe(categories => this.categories = categories);
  }

  private updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  private updateTasksAndStat(): void {
    this.updateTasks();
    this.updateStat();
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

  private updateStat(): void {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompleteTotalCount()
    ).subscribe(array => {
      this.totalTasksCountInCategory = array[0];
      this.completeTasksCountInCategory = array[1];
      this.uncompleteTasksCountInCategory = array[2];
      this.uncompleteTotalTasksCountInCategory = array[3];
    })
  }

  public toggleStat(stat: boolean): void {
    this.showStat = stat;
  }

}
