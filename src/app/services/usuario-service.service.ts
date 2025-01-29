import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioModel } from '../components/main/usuarios/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private baseUrl = 'http://192.168.0.111:80/api/lucia/usuarios.php?table=usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Agregar un usuario
  addUsuario(usuario: usuarioModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl, usuario, { headers });
  }

  // Eliminar un usuario por ID
  deleteUsuario(usuarioId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { usuario_id: usuarioId };
    return this.http.delete(this.baseUrl, { headers, body });
  }

  // Actualizar un usuario
  updateUsuario(updatedUsuario: usuarioModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/${updatedUsuario.id}`, updatedUsuario, { headers });
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
