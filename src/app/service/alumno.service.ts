import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoModel } from '../../models/alumno.model';
import { FiltroAlumnoModel } from '../../models/filtroAlumno.model';
import { ResponseAlumnoModel } from '../../models/responseAlumno.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private urlApi = 'http://localhost:5198/api/alumnos';

  constructor(private http: HttpClient) {}

  public getAlumnoPaginado(
    filtro: FiltroAlumnoModel
  ): Observable<ResponseAlumnoModel> {
    return this.http.post<ResponseAlumnoModel>(
      `${this.urlApi}/paginado`,
      filtro
    );
  }

  public getAll(): Observable<AlumnoModel[]> {
    return this.http.get<AlumnoModel[]>(this.urlApi);
  }

  public getById(id: number): Observable<AlumnoModel> {
    return this.http.get<AlumnoModel>(`${this.urlApi}/${id}`);
  }

  public create(alumno: AlumnoModel): Observable<AlumnoModel> {
    return this.http.post<AlumnoModel>(this.urlApi, alumno);
  }

  public update(id: number, alumno: AlumnoModel): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, alumno);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
