import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { TestData } from '../data/TestData';
import { Task } from '../model/Task';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  public tasks$ = new BehaviorSubject<Task[]>(TestData.tasks);
  public categories$ = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { 
    this.fillTasks();
  }

  public fillTasks(): void {
    this.tasks$.next(TestData.tasks)
  }

  public fillTasksByCategory(category: Category): void {
    const sortedTasks = TestData.tasks.filter(task => task.category === category);
    this.tasks$.next(sortedTasks);
  }
}
