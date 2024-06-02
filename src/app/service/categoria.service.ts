import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private urlApi = 'http://localhost:5198/api/categoria';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.urlApi);
  }

  public getById(id: number): Observable<CategoriaModel> {
    return this.http.get<CategoriaModel>(`${this.urlApi}/${id}`);
  }

  public create(aula: CategoriaModel): Observable<CategoriaModel> {
    return this.http.post<CategoriaModel>(this.urlApi, aula);
  }

  public update(id: number, aula: CategoriaModel): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, aula);
  }
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
