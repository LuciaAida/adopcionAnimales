import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // Cambiado de styleUrl a styleUrls
})
export class FooterComponent {
  constructor(private router: Router) {}

  
}
