import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { TestData } from '../data/TestData';
import { Task } from '../model/Task';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskDAOImpl } from '../data/dao/impl/TaskDAOImpl';
import { CategoryDAOImpl } from '../data/dao/impl/CategoryDAOImpl';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskDAO = new TaskDAOImpl();
  private categoryDAO = new CategoryDAOImpl();

  //old code
  public tasks$ = new BehaviorSubject<Task[]>(TestData.tasks);
  public categories$ = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { 
    //old code
    this.fillTasks();
  }

  //old code
  public fillTasks(): void {
    this.tasks$.next(TestData.tasks)
  }

  //old code
  public fillTasksByCategory(category: Category): void {
    const sortedTasks = TestData.tasks.filter(task => task.category === category);
    this.tasks$.next(sortedTasks);
  }

  public getAllTasks(): Observable<Task[]> {
    return this.taskDAO.getAll();
  }

  public getAllCategories(): Observable<Category[]> {
    return this.categoryDAO.getAll();
  }
}
