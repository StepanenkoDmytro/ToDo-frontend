import { Injectable } from '@angular/core';
import { CategoryDAO } from '../interface/CategoryDAO';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategorySearchValues } from '../search/SearchObjects';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements CategoryDAO {
  url = 'http://localhost:8080/category';

  constructor(private httpClient: HttpClient) { }

  public findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.httpClient.post<Category[]>(this.url + '/search', categorySearchValues);
  }

  public getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + '/all');
  }

  public get(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + '/id/' + id);
  }

  public add(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.url + '/add', category);
  }

  public update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.url + '/update', category);
  }

  public delete(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(this.url + '/delete/' + id);
  }
}
