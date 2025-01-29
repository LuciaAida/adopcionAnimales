import { Component } from '@angular/core';
import { AnimalServiceService } from '../../../../services/animal-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,ReactiveFormsModule],
  templateUrl: './animal-detail.component.html',
  styleUrl: './animal-detail.component.css'
})

export class AnimalDetailComponent {
   title = 'formulario';
  public form2!: FormGroup;
  animal: any;
   isEditing = false;

  //Listas de tipos y sexos
  tiposAnimal = ['Perro', 'Gato'];
  tiposSexo = ['Macho', 'Hembra'];
  tiposTamanio = ['Pequeño','Mediano','Grande','Gigante'];

   constructor(private route: ActivatedRoute, private animalService: AnimalServiceService, private formBuilder: FormBuilder) {}

   ngOnInit(): void {
     const id = +this.route.snapshot.paramMap.get('id')!; // Obtener el id de la URL
     this.animal = this.animalService.getItemById(id); // Obtener el elemento

     this.form2 = this.formBuilder.group({

       name: ['', [
         Validators.required
       ]],
       description: ['', [
         Validators.required
       ]]
     });
   }

    send(): any {
    console.log(this.form2.value);
    }

    toggleEdit() {
      this.isEditing = !this.isEditing;
      
      if (!this.isEditing) {
      this.saveAnimalDetails();
        }
      }
  

   saveAnimalDetails() {
     console.log('Datos guardados:', this.animal);
     this.animalService.updateAnimal(this.animal);
   }
}