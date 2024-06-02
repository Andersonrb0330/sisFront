import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AulaModel } from '../../models/aula.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  private urlApi = 'http://localhost:5198/api/aula';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<AulaModel[]> {
    return this.http.get<AulaModel[]>(this.urlApi);
  }

  public getById(id: number): Observable<AulaModel> {
    return this.http.get<AulaModel>(`${this.urlApi}/${id}`);
  }

  public create(aula: AulaModel): Observable<AulaModel> {
    return this.http.post<AulaModel>(this.urlApi, aula);
  }

  public update(id: number, aula: AulaModel): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, aula);
  }
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
