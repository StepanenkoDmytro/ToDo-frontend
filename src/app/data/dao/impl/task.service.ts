import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategorySearchValues } from '../search/SearchObjects';
import { TaskDAO } from '../interface/TaskDAO';
import { Task } from 'src/app/model/Task';
import { CommonService } from './common.service';


export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CommonService<Task> implements TaskDAO {

  constructor(
    @Inject(TASK_URL_TOKEN) private baseUrl: string,
    httpClient: HttpClient) {

      super(baseUrl, httpClient);
  }

  public findTasks(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.httpClient.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
