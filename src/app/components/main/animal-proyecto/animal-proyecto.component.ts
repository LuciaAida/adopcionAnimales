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

  ngOnInit(): void {
    this.animales =this.AnimalServiceService.getAnimales();
  }

  deleteAnimal(id: number){
    this.AnimalServiceService.deleteAnimal(id);
  }

  viewAnimal(id: number){
    this.router.navigate(['/animal', id]);
  }

  getShortDescription(description: string, limit: number = 2): string {//limitar el numero de caracteres de la descripcion
    if (description.length > limit) {
      return description.substring(0, limit) + '...';
    }
    return description;
  }
}
