import { MatriculaModel } from './matricula.model';

export interface ResponseMatriculaModel {
  totalItems: number;
  paginaActual: number;
  totalPaginas: number;
  items: MatriculaModel[];
}
