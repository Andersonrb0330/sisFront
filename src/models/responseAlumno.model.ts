import { AlumnoModel } from './alumno.model';

export interface ResponseAlumnoModel {
  totalItems: number;
  paginaActual: number;
  totalPaginas: number;
  items: AlumnoModel[];
}
