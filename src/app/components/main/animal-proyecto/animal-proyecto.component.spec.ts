import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalProyectoComponent } from './animal-proyecto.component';

describe('ListaTareasComponent', () => {
  let component: AnimalProyectoComponent;
  let fixture: ComponentFixture<AnimalProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
