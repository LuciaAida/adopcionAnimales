import { Component } from '@angular/core';
import { RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { AnimalProyectoComponent } from './components/main/animal/animal-proyecto/animal-proyecto.component';
import { AnimalAddComponent } from "./components/main/animal/animal-add/animal-add.component";
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, HeaderComponent, AnimalProyectoComponent, AnimalAddComponent, RouterLink, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ejLucia';
}
