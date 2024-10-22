import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {
  // Variable que se usará para guardar y recuperar los Digimon del localStorage
  private storageKey = 'animales';

  // Constructor
  constructor() {
      // Verifica si hay Digimon guardados en el localStorage. Si los encuentra, los carga en la propiedad 'digimons'.
      if (this.isLocalStorageAvailable()) {
        const savedAnimales = localStorage.getItem(this.storageKey);
        if (savedAnimales) {
          this.animales = JSON.parse(savedAnimales);
        }
      }
  }
  
  animales = [
    {id: 1,url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b', name: 'Junior', type:'Perro', sexo:'Macho', tamanio: 'Grande', description:'Delicado y buenísimo.Llegó muy asustado, procede de haber sido rescatado de la calle y temía a los humanos, pero ha progresado muchísimo y sabemos que está más qué listo para encontrar una definitiva.'},
    {id: 2,url:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQln3rtFGOywuGgcqXfOPkr1c-Q028N_6WfrgjuTmvFG3cgLwqYPaJtKG-XcfCfOyRVHWISDGWXi5tuKu_0v_MkB27SoWcSfcJw4dCIMQQ',name: 'Croqueta', type:'Gato',sexo:'Hembra',tamanio: 'Mediano', description: 'En casa no da ningún problema, pasea fenomenal y se lleva bien con todos los gatitos. Cada vez es más cariñosa, aunque de primeras va a tener algo de miedo como es normal, pero poco a poco te conoce y lo va perdiendo.'},
    {id: 3,url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7lkawcqjiHdmN-FquvzilxYI1outSpfO-YA&s',name: 'Josy', type:'Perro', sexo:'Macho',tamanio: 'Pequeño',description: 'Es sensible, dulce, delicado y buenísimo. No lo pienses más, ven a conocerlo.'}
  ];

  
  getItemById(id: number): any {
    return this.animales.find(animales => animales.id === id);
  }
  getAnimales(){
    return this.animales;
  }

  addAnimal(url:string,name: string, type: string, sexo:string,tamanio:string,description:string){
    const newId = this.animales.length > 0 
    ? Math.max(...this.animales.map(animal => animal.id)) + 1 
    : 1;

    const animal = {id: newId,url, name, type, sexo, tamanio,description};

    
    this.animales.push(animal);
    // Guarda el vector actualizado en localStorage
    this.saveToLocalStorage();   
  }

  deleteAnimal(index: number){
    this.animales.splice(index, 1);
    this.saveToLocalStorage();
  }

  // Método para guardar la lista de Animal en localStorage como un string JSON.
  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.animales)); // Convierte el arreglo a JSON y lo guarda
  }

  // Método que verifica si localStorage está disponible en el entorno actual
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }
  updateAnimal(updatedAnimal: any) {
    const index = this.animales.findIndex(animal => animal.id === updatedAnimal.id); //busca el indice del animal en la lista(array animales coincide con id de update)
    if (index !== -1) { //si lo ha encontrado en el array
      this.animales[index] = updatedAnimal; //actualiza el animal en la posicion encontrada
      this.saveToLocalStorage();
    }
  }
  loadFromLocalStorage() {
    const storedAnimales = localStorage.getItem('animales');
    if (storedAnimales) {
      this.animales = JSON.parse(storedAnimales);
    }
  }

  

}
