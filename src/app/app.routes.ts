import { Routes } from '@angular/router';
import { AnimalProyectoComponent } from './components/main/animal-proyecto/animal-proyecto.component';
import { AnimalAddComponent } from './components/main/animal-add/animal-add.component';
import { AnimalDetailComponent } from './components/main/animal-detail/animal-detail.component';


export const routes: Routes = [
    { path: 'list', component: AnimalProyectoComponent },  //Redirige al componente de la lista
    { path: 'add', component: AnimalAddComponent },     //Redirige al componente de añadir
    { path: 'animal/:id', component: AnimalDetailComponent },     //Redirige al componente de añadir
    { path: '', redirectTo: '/list', pathMatch: 'full' },   //Redirige si no pones nada al componente de la lista
    { path: '**', redirectTo: '/list'}  //Redirige si pones algo inventado al componente de la lista
];