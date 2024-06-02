export interface FiltroAlumnoModel {
  limite: number;
  pagina: number;
  nombres: string;
  apellidos: string;
  idAula?: number | null;
  idCategoria?: number | null;
}
