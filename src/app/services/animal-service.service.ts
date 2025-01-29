import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { animalModel } from '../components/main/animal/model/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {
  private baseUrl = 'http://http://192.168.0.111/api/alumno1/alumnos.php?table=';

  constructor(private http: HttpClient) { }

  getAnimales(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addAnimal(animal: animalModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl, animal, { headers });
  }

  deleteAnimal(animalId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { animal_id: animalId };
    return this.http.delete(this.baseUrl, { headers, body });
  }
  updateAnimal(updatedAnimal: animalModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/${updatedAnimal.id}`, updatedAnimal, { headers });
  }
  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}

  


