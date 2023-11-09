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

  private selectedCategory: Category;

  constructor(
    private dataHandlet: DataHandlerService
  ) { }

  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  ngOnInit(): void {
    this.dataHandlet.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandlet.getAllCategories().subscribe(categories => this.categories = categories);

    // this.onSelectCategory(null);

    this.totalTasksCountInCategory = 10;
    this.completedCountInCategory = 1;
    this.uncompletedCountInCategory = 5;
    this.uncompletedTotalTasksCount = 5;
  }

  public onUpdateTask(task: Task): void {
    const mockPriority = new Priority(12, "Lol", '');
    this.dataHandlet.updateTask(task).subscribe(() => {
      this.dataHandlet.searchTasks(
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
    this.dataHandlet.deleteTask(task.id).subscribe(() => {
      this.dataHandlet.searchTasks(
        this.selectedCategory,
        '',
        false,
        mockPriority
      ).subscribe(task => {
        this.tasks = task;
      });
    });
  }


  public onSelectCategory(category: Category) {
    this.selectedCategory = category;
    const mockPriority = new Priority(12, "Lol", '');

    this.dataHandlet.searchTasks(
      this.selectedCategory,
      '',
      false,
      mockPriority
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }
}
