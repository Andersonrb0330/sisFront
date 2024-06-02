import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { SeguridadModel } from '../../models/seguridad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private urlApi = 'http://localhost:5198/api/seguridad';

  constructor(private http: HttpClient) {}

  public logueo(data: LoginModel): Observable<SeguridadModel> {
    return this.http.post<SeguridadModel>(this.urlApi, data);
  }
}
