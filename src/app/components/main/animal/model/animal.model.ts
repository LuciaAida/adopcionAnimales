export interface animalModel {
  animal_id: number;           
  foto_url: string;            
  nombre: string;             
  tipo_id: number;             
  sexo: string;              
  tamanio: string;           
  descripcion: string;        
  edad?: number;              
  fecha_ingreso?: string;     
  disponible?: boolean;      
}
