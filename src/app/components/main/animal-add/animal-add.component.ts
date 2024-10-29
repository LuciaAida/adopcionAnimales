import { Component } from '@angular/core';
import { AnimalServiceService } from '../../../services/animal-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-add.component.html',
   styleUrl: './animal-add.component.css'
})
export class AnimalAddComponent {
  mostrarModal: boolean = false;
  modalMensaje: string = '';

  tiposAnimal: string [] = ['Perro', 'Gato'];
  tiposSexo:string[] = ['Macho','Hembra'];
  tiposTamanio: string[] = ['Pequeño','Mediano','Grande','Gigante'];
  
  constructor(private AnimalServiceService: AnimalServiceService, private router: Router){}

  addAnimales(url:string,name: string, type: string, sexo:string,tamanio:string,description:string ){
    this.AnimalServiceService.addAnimal( url,name, type, sexo, tamanio, description);
    this.modalMensaje = 'Animal ' + name +' añadido con éxito';
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false; // Oculta el modal
  }

  volverAtras(){
    this.router.navigate(['/list']);
  }
  
}
