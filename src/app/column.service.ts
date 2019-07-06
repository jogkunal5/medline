import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  api: string = "../../assets/json/apidata.json";
  columnData: Array<any>;
  columnDataSub: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  public getDataFromApi(): Observable<any> {
    return this.httpClient.get(this.api);
  }

  public addColumnData(form) {
    
  }

}
