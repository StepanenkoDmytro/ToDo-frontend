import { Injectable } from '@angular/core';
import { StatDAO } from '../interface/StatDAO';
import { Observable } from 'rxjs';
import { Stat } from 'src/app/model/Stat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatService implements StatDAO {
  url = 'http://localhost:8080/stat';

  constructor(private httpClient: HttpClient) { }
  
  public getOverallStat(): Observable<Stat> {
    return this.httpClient.get<Stat>(this.url);
  }
}
