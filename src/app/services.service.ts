import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from './components/main/table/table.component.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) {
    this.getStates().subscribe(data => { });
  }

  public getStates(): Observable<State[]> {
    return this.http.get<State[]>("./assets/data.json");
  }
}
