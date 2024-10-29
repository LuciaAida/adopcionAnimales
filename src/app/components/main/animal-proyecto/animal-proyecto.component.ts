import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AnimalServiceService } from '../../../services/animal-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-proyecto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-proyecto.component.html',
  styleUrl: './animal-proyecto.component.css'
})
export class AnimalProyectoComponent implements OnInit{

  tiposAnimal: string[]=['Gato','Perro'];
  tiposSexo:string[]=['Macho','Hembra'];
  tiposTamanio: string[] = ['Pequeño','Mediano','Grande','Gigante'];
  

  animales: {id:number, url:string, name: string, type: string, sexo: string,tamanio: string, description:string} []= [];

  editingIndex: number | null = null;
  dialog: any;

  constructor(private AnimalServiceService: AnimalServiceService, private router:Router){}
  mostrarModal: boolean = false;
  modalMensaje: string = '';
  idAnimal: number|null = null; //guarda temporalmente el id

  ngOnInit(): void {
    this.animales =this.AnimalServiceService.getAnimales();
  }
  cerrarModal() {
    this.mostrarModal = false; // Oculta el modal
    this.idAnimal = null; 
  }

  eliminarAnimal(id: number){
    this.modalMensaje = '¿Estás seguro que deseas eliminar el animal?';
    this.mostrarModal = true;
    this.idAnimal = id;
    
  }

  confirmarEliminacion(){
    if(this.idAnimal != null){
      console.log(this.idAnimal);
      console.log(this.animales);
      this.animales.splice(this.idAnimal, 1);
      console.log(this.animales);
      this.mostrarModal = false;
      this.idAnimal = null; //se pone a null, para ver el siguiente
      this.router.navigate(['/list']);
    }else{
      this.mostrarModal = false;
      this.idAnimal = null; 
    }
  }

  viewAnimal(id: number){
    this.router.navigate(['/animal', id]);
  }

  //comprobamos si la imagen es grande o pequeña
  //luego vemos la longitud de la descripcion, si es mayor al limite entonces se acorta 
  acortarDescripcion(description: string, esImagenGrande: boolean, limitPequeno: number = 15, limitGrande: number = 50): string {
    const limit = esImagenGrande ? limitPequeno : limitGrande; 
    return description.length > limit ? description.substring(0, limit) + '...' : description; 
  }
}
