import { LoginModel } from './../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlApi = 'http://localhost:5198/api/login';

  constructor(private http: HttpClient) {}
}
