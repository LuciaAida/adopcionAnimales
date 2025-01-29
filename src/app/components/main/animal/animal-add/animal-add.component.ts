import { Component } from '@angular/core';
import { AnimalServiceService } from '../../../../services/animal-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animalModel } from '../model/animal.model';


@Component({
  selector: 'app-animal-add',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './animal-add.component.html',
   styleUrl: './animal-add.component.css'
})
export class AnimalAddComponent {
  title = 'formulario';
  public form!: FormGroup;
  mostrarModal: boolean = false;
  modalMensaje: string = '';

  tiposAnimal: string [] = ['Perro', 'Gato'];
  tiposSexo:string[] = ['Macho','Hembra'];
  tiposTamanio: string[] = ['Pequeño','Mediano','Grande','Gigante'];
  
  constructor(private AnimalServiceService: AnimalServiceService, private router: Router, private formBuilder: FormBuilder){}
  addAnimales(animal:animalModel){
    this.AnimalServiceService.addAnimal(animal);
    this.modalMensaje = 'Animal ' + name +' añadido con éxito';
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false; // Oculta el modal
  }

  volverAtras(){
    this.router.navigate(['/list']);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      url: ['', [
        Validators.required
      ]],
    });
  }

  send(): any {
    console.log(this.form.value);
  }
}
