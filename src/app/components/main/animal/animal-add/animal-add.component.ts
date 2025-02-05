import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./animal-add.component.css']
})
export class AnimalAddComponent implements OnInit {
  title = 'Formulario';
  public form!: FormGroup;
  mostrarModal: boolean = false;
  modalMensaje: string = '';

  tiposAnimal = [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' }
  ];
  
  tiposSexo: string[] = ['Macho', 'Hembra'];
  tiposTamanio: string[] = ['Pequeño', 'Mediano', 'Grande', 'Gigante'];

  constructor(
    private AnimalServiceService: AnimalServiceService, 
    private router: Router, 
    private formBuilder: FormBuilder
  ) {}

  // Método para agregar un animal
  addAnimales() {
    const animal: animalModel = {
      animal_id: 0,                   
      foto_url: this.form.value.url,   
      nombre: this.form.value.name,    
      tipo_id: 1,                      
      sexo: this.form.value.sexo,      
      tamanio: this.form.value.tamanio, 
      descripcion: this.form.value.description, 
      edad: this.form.value.edad || 0,  // Edad opcional, si no la hay, pon un valor por defecto
      fecha_ingreso: this.form.value.fecha_ingreso || new Date().toISOString().split('T')[0], // Fecha actual si no se proporciona
      disponible: this.form.value.disponible || true,  
    };
  
    // Enviar la solicitud al backend
    this.AnimalServiceService.addAnimal(animal).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
        this.modalMensaje = 'Animal ' + animal.nombre + ' añadido con éxito';
        this.mostrarModal = true;
      },
      (error) => {
        console.error('Error al añadir el animal', error);
        this.modalMensaje = 'Hubo un error al añadir el animal.';
        this.mostrarModal = true;
      }
    );
  }
  
  

  // Cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Navegar a la lista de animales
  volverAtras() {
    this.router.navigate(['/list']);
  }

  // Inicializar el formulario
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]],
      tipo: [this.tiposAnimal[0].id, [Validators.required]],  // Asignamos el valor por defecto aquí
      sexo: [this.tiposSexo[0], [Validators.required]],   
      tamanio: [this.tiposTamanio[1], [Validators.required]] 
    });
  }
  

  // Método para enviar el formulario
  send(): any {
    if (this.form.valid) {
      this.addAnimales();
    } else {
      console.log('Formulario no válido');
    }
  }
}
