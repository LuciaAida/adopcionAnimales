import { Component, OnInit } from '@angular/core';
import { AnimalServiceService } from '../../../../services/animal-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animalModel } from '../model/animal.model';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
 
  templateUrl: './animal-detail.component.html',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  title = 'Formulario';
  mostrarModal: boolean = false;
  modalMensaje: string = 'Animal actualizado correctamente';
  public form2!: FormGroup;
  animal: animalModel = {
    animal_id: 0,
    foto_url: '',
    nombre: '',
    tipo_id: 0,
    sexo: '',
    tamanio: '',
    descripcion: ''
  };
  isEditing = false;

  // Listas de tipos 
  tiposAnimal = [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' }
  ];
  
  tiposSexo = ['Macho', 'Hembra'];
  tiposTamanio = ['Pequeño', 'Mediano', 'Grande', 'Gigante'];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditing = false;

    // Obtén el animal desde la URL o servicio
    const animalId = this.route.snapshot.paramMap.get('id'); // Usa el id de la URL
    if (animalId) {
      this.getAnimal(Number(animalId));
    }
  }

  getAnimal(id: number): void {
    this.animalService.getItemById(id).subscribe((data: animalModel) => {
      this.animal = data;
      this.inicializarFormulario();
    });
  }

  inicializarFormulario(): void {
    this.form2 = this.formBuilder.group({
      nombre : [this.animal?.nombre || '', [Validators.required]],
      descripcion: [this.animal?.descripcion || '', [Validators.required]],
      tipo_id: [this.animal?.tipo_id || '', [Validators.required]],
      sexo: [this.animal?.sexo || '', [Validators.required]],
      tamanio: [this.animal?.tamanio || '', [Validators.required]]
    });
  }

  send(): void {
      const animalEdit: animalModel = {
        animal_id: this.animal.animal_id,
        foto_url: this.animal.foto_url,
        nombre: this.animal.nombre,
        edad: this.animal.edad,
        tipo_id: this.form2.value.tipo_id, 
        fecha_ingreso: this.animal.fecha_ingreso,
        sexo: this.form2.value.sexo,
        disponible: this.animal.disponible,
        tamanio: this.form2.value.tamanio,
        descripcion: this.form2.value.descripcion
      };
      this.animalService.updateAnimal(animalEdit).subscribe(response => {
        // Mostrar modal tras actualizar el animal
        console.log(response);
        this.mostrarModal = true;
        this.modalMensaje = 'Animal actualizado correctamente';
        this.form2.reset();
        
        // Actualiza los datos después de la actualización
        this.getAnimal(this.animal.animal_id);
      }, error => {
        this.mostrarModal = true;
        this.modalMensaje = 'Error al actualizar el animal';
        console.error(error);
      });
    }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarModal = false;

  }

  toggleEdit(): void {
    this.send();
    this.isEditing = !this.isEditing;
  }


  volverALaLista(): void {
    this.router.navigate(['/list']); // Redirige a la lista de animales
  }
}
