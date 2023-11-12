import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { TestData } from '../data/TestData';
import { Task } from '../model/Task';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskDAOImpl } from '../data/dao/impl/TaskDAOImpl';
import { CategoryDAOImpl } from '../data/dao/impl/CategoryDAOImpl';
import { Priority } from '../model/Priority';
import { PriorityDAOImpl } from '../data/dao/impl/PriorityDAOImpl';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskDAO = new TaskDAOImpl();
  private categoryDAO = new CategoryDAOImpl();
  private priorityDAO = new PriorityDAOImpl();

  constructor() { }

  public getAllTasks(): Observable<Task[]> {
    return this.taskDAO.getAll();
  }

  public getAllCategories(): Observable<Category[]> {
    return this.categoryDAO.getAll();
  }

  public getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAO.getAll();
  }

  public updateTask(task: Task): Observable<Task> {
    return this.taskDAO.update(task);
  }

  public deleteTask(taskID: number): Observable<Task> {
    return this.taskDAO.delete(taskID);
  }

  public searchTasks(category: Category | null, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDAO.search(category, searchText, status, priority);
  }

  public deleteCategory(categoryID: number): Observable<Category> {
    return this.categoryDAO.delete(categoryID);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.categoryDAO.update(category);
  }
}
