import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatriculaModel } from '../../models/matricula.model';
import { FiltroMatriculaModel } from '../../models/filtroMatricula.model';
import { ResponseMatriculaModel } from '../../models/responseMatricula.model';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  private urlApi = 'http://localhost:5198/api/matriculas';

  constructor(private http: HttpClient) {}

  public getMatriculaPaginado(
    filtro: FiltroMatriculaModel
  ): Observable<ResponseMatriculaModel> {
    return this.http.post<ResponseMatriculaModel>(
      `${this.urlApi}/paginado`,
      filtro
    );
  }

  public getAll(): Observable<MatriculaModel[]> {
    return this.http.get<MatriculaModel[]>(this.urlApi);
  }

  public getById(id: number): Observable<MatriculaModel> {
    return this.http.get<MatriculaModel>(`${this.urlApi}/${id}`);
  }

  public create(matricula: MatriculaModel): Observable<MatriculaModel> {
    return this.http.post<MatriculaModel>(this.urlApi, matricula);
  }

  public update(id: number, matricula: MatriculaModel): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, matricula);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
