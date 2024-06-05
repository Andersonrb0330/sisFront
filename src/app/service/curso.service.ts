import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoModel } from '../../models/curso.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private urlApi = 'http://localhost:5198/api/aula';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(this.urlApi);
  }
}
