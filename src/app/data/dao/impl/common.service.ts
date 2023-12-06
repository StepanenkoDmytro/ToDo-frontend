import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {
  protected readonly url: string;
  protected readonly httpClient: HttpClient; 

  constructor(
    @Inject('url') url: string,
    httpClient: HttpClient
  ) {
    this.url = url;
    this.httpClient = httpClient; 
  }

  public getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url + '/all');
  }

  public get(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/id/' + id);
  }

  public add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }

  public update(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/update', t);
  }

  public delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/delete/' + id);
  }
}
