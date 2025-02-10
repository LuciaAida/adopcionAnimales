import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { animalModel } from '../components/main/animal/model/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {
  private baseUrl = 'https://c74f4156107e.ngrok.app/api/lucia/API.php?table=animales';

  constructor(private http: HttpClient) { }

  getAnimales(): Observable<animalModel[]> {
    return this.http.get<animalModel[]>(`${this.baseUrl}`);
  }

  addAnimal(animal: animalModel): Observable<animalModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<animalModel>(`${this.baseUrl}`,animal, { headers }); 
  }

  deleteAnimal(animalId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { animal_id: animalId };
    return this.http.delete(`${this.baseUrl}&animal_id=${animalId}`, { headers });
  }
  updateAnimal(updatedAnimal: animalModel): Observable<animalModel> {
    console.log("Datos enviados:", updatedAnimal);
    console.log("ID enviado:", updatedAnimal.animal_id);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}&id=${updatedAnimal.animal_id}`; // Agrega solo '&id='

    return this.http.put<animalModel>(url, updatedAnimal, { headers });
}


  getItemById(id: number): Observable<animalModel> {
  return this.http.get<animalModel>(`${this.baseUrl}&animal_id=${id}`);
}


getItemByTipoId(id: number): Observable<animalModel[]> {
  if (id=3)
    return this.http.get<animalModel[]>(`${this.baseUrl}`);
  else
    return this.http.get<animalModel[]>(`${this.baseUrl}&tipo_id=${id}`); 

}
}

