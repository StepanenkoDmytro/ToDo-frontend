import { Inject, Injectable, InjectionToken } from '@angular/core';
import { CategoryDAO } from '../interface/CategoryDAO';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategorySearchValues } from '../search/SearchObjects';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> implements CategoryDAO {

  constructor(
    @Inject(CATEGORY_URL_TOKEN) private baseUrl: string,
    httpClient: HttpClient) {

      super(baseUrl, httpClient);
  }

  public findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.httpClient.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
