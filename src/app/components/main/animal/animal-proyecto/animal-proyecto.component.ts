import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AnimalServiceService } from '../../../../services/animal-service.service';
import { Router } from '@angular/router';
import { animalModel } from '../model/animal.model';

@Component({
  selector: 'app-animal-proyecto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-proyecto.component.html',
  styleUrl: './animal-proyecto.component.css'
})
 export class AnimalProyectoComponent /*implements OnInit*/{
  
  animales: animalModel[]=[];
  animal: any;
  editingIndex: number | null = null;
  dialog: any;
  tiposAnimal = [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' }
  ];
  

  constructor(private AnimalServiceService: AnimalServiceService, private router:Router){}
  mostrarModal: boolean = false;
  modalMensaje: string = '';
  animal_id: number|null = null; //guarda temporalmente el id
  
  ngOnInit(): void {
    this.AnimalServiceService.getAnimales().subscribe(
      (data: animalModel[]) => {
        this.animales = data;
        console.log('Lista de animales:', this.animales); // Verifica si llegan bien los datos
      },
      (error) => {
        console.error('Error al cargar animales:', error);
      }
    );
  }

  getTipoNombre(tipoId: number): string {
    console.log('Tipo recibido:', tipoId); // <-- Depuración
    const tipo = this.tiposAnimal.find(t => t.id === tipoId);
    return tipo ? tipo.nombre : 'Desconocido';
  }
  
  cerrarModal() {
    this.mostrarModal = false; // Oculta el modal
    this.animal_id = null; 
  }

  eliminarAnimal(animal_id: number) {
    this.modalMensaje = '¿Estás seguro que deseas eliminar el animal?';
    this.mostrarModal = true;
    this.animal_id = animal_id;
  }

  confirmarEliminacion(){
    if(this.animal_id != null){
    this.AnimalServiceService.deleteAnimal(this.animal_id).subscribe((data) => {
        console.log(data);
        this.mostrarModal = false;
        this.animales = this.animales.filter(animal => animal.animal_id !== this.animal_id); //eliminar del array
        this.animal_id = null;
    });
    }else{
        this.mostrarModal = false;
        this.animal_id = null; 
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
