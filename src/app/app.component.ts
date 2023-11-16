import { Component, OnInit } from '@angular/core';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';
import { Category } from './model/Category';
import { Priority } from './model/Priority';
import { concatMap, map, of, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public categoryMap = new Map<Category, number>();

  public showStat: boolean = true;

  public tasks: Task[];
  public categories: Category[];
  public priorities: Priority[];
  public selectedCategory: Category | null;


  public totalTasksCountInCategory: number;
  public completeTasksCountInCategory: number;
  public uncompleteTasksCountInCategory: number;
  public uncompleteTotalTasksCountInCategory: number;

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

    this.fillCategories();
    this.onSelectCategory(null);
  }

  public toggleStat(stat: boolean): void {
    this.showStat = stat;
  }

  public onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();

      this.updateTasksAndStat();
    })
  }

  public onDeleteTask(task: Task): void {
    if (task.id) {
      this.dataHandler.deleteTask(task.id).pipe(
        concatMap((deletedTask: Task) => {
          return deletedTask.category ? this.dataHandler.getUncompletedCountInCategory(deletedTask.category).pipe(
            map((count: number) => ({ t: deletedTask, count }))
          ) : of(null);
        })
      ).subscribe((result: { t: Task, count: number } | null) => {
        if (result) {
          const t = result.t as Task;
          if(t.category) this.categoryMap.set(t.category, result.count);
          this.updateTasksAndStat();
        }
      });
    }
  }

  public onAddTask(task: Task): void {
    this.dataHandler.addTask(task).pipe(
      concatMap((addTask: Task) => {
        return addTask.category ? this.dataHandler.getUncompletedCountInCategory(addTask.category).pipe(
          map((count: number) => ({ t: addTask, count }))
        ) : of(null);
      })
    ).subscribe((result: { t: Task, count: number } | null) => {
      if (result) {
        const t = result.t;

        if (t.category) {
          this.categoryMap.set(t.category, result.count);
        }

        this.updateTasksAndStat();
      }
    });
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
      this.dataHandler.deleteCategory(category.id).subscribe((cat) => {
        this.selectedCategory = null;
        this.categoryMap.delete(cat);
        this.onSelectCategory(this.selectedCategory);
        this.updateTasks();
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

  public fillCategories(): void {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });
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
}
