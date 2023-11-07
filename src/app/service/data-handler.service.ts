import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { TestData } from '../data/TestData';
import { Task } from '../model/Task';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskDAOImpl } from '../data/dao/impl/TaskDAOImpl';
import { CategoryDAOImpl } from '../data/dao/impl/CategoryDAOImpl';
import { Priority } from '../model/Priority';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskDAO = new TaskDAOImpl();
  private categoryDAO = new CategoryDAOImpl();

  //old code
  public tasks$ = new BehaviorSubject<Task[]>(TestData.tasks);
  public categories$ = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { }

  public getAllTasks(): Observable<Task[]> {
    return this.taskDAO.getAll();
  }

  public getAllCategories(): Observable<Category[]> {
    return this.categoryDAO.getAll();
  }

  public searchTasks(category:Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDAO.search(category, searchText, status, priority);
  }
}
