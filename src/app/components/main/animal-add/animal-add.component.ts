import { Component } from '@angular/core';
import { AnimalServiceService } from '../../../services/animal-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-add.component.html',
   styleUrl: './animal-add.component.css'
})
export class AnimalAddComponent {
  showModal: boolean = false;
  modalMessage: string = '';

  tiposAnimal: string [] = ['Perro', 'Gato'];
  tiposSexo:string[] = ['Macho','Hembra'];
  tiposTamanio: string[] = ['Pequeño','Mediano','Grande','Gigante'];
  
  constructor(private AnimalServiceService: AnimalServiceService){}

  addAnimales(url:string,name: string, type: string, sexo:string,tamanio:string,description:string ){
    this.AnimalServiceService.addAnimal( url,name, type, sexo, tamanio, description);
    this.modalMessage = 'Animal ' + name +' añadido con éxito';
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false; // Oculta el modal
  }
  
}
