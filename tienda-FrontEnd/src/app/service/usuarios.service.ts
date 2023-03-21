import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080'; // La URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  // Crear un nuevo usuario
  public crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario/crear`, usuario);
  }

  // Obtener un usuario por su ID
  public buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/buscar/${id}`);
  }

  // Autenticar un usuario
  public iniciarSesion(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario/login`, usuario);
  }

  // Eliminar un usuario por su ID
  public borrarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuario/borrar/${id}`);
  }
}
