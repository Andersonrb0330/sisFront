import { AlumnoModel } from './alumno.model';
import { LoginModel } from './login.model';

export interface MatriculaModel {
  id: number;
  fecha?: Date | null;
  estado: string;
  idAlumno: number;
  alumno?: AlumnoModel;
  idLogin: number;
  login?: LoginModel;
}
