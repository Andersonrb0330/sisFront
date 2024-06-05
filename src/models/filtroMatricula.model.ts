export interface FiltroMatriculaModel {
  limite: number;
  pagina: number;
  estado: string;
  fecha: Date | null;
  idAlumno?: number | null;
  idLogin?: number | null;
}
