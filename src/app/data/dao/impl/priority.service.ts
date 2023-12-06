import { Inject, Injectable, InjectionToken } from '@angular/core';
import { PriorityDAO } from '../interface/PriorityDAO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategorySearchValues } from '../search/SearchObjects';
import { Priority } from 'src/app/model/Priority';
import { CommonService } from './common.service';


export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class PriorityService extends CommonService<Priority> implements PriorityDAO {

  constructor(
    @Inject(PRIORITY_URL_TOKEN) private baseUrl: string,
    httpClient: HttpClient) {

      super(baseUrl, httpClient);
  }

  public findPriorities(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.httpClient.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
