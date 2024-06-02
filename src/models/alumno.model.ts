import { AulaModel } from './aula.model';
import { CategoriaModel } from './categoria.model';

export interface AlumnoModel {
  id: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  edad?: number;
  idAula?: number;
  aula?: AulaModel;
  idCategoria?: number;
  categoria?: CategoriaModel;
}
