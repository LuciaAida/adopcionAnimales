export interface animalModel {
    animal_id: number;
    foto_url: string;  // Si es siempre una cadena, no debería ser opcional
    nombre: string;
    tipo_id: number;
    sexo: string;
    tamanio: string;
    descripcion: string;  // Debería ser siempre una cadena
    edad?: number;
    fecha_ingreso?: Date;
    disponible?: boolean;
  }
  