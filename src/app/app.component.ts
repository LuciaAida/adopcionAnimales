import { Component } from '@angular/core';
import { RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { AnimalProyectoComponent } from './components/main/animal-proyecto/animal-proyecto.component';
import { AnimalAddComponent } from "./components/main/animal-add/animal-add.component";
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from "./components/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, HeaderComponent, AnimalProyectoComponent, AnimalAddComponent, RouterLink, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ejLucia';
}
