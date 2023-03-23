import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/Producto';
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private url = 'http://localhost:8080/carrito'; // URL de la API

  constructor(private http: HttpClient) {}
  agregarProducto(idCarrito: number, idProducto: number): Observable<any> {
    const endpoint = `${this.url}/${idCarrito}/productos/${idProducto}`;
    return this.http.post(endpoint, {});
  }
  eliminarProducto(id_usuario: number, idProducto: number): Observable<any> {
    const endpoint = `${this.url}/${id_usuario}/eliminar/${idProducto}`;
    return this.http.delete(endpoint);
  }
  getProductosDelCarrito(idUsuario: number): Observable<Producto[]> {
    const endpoint = `${this.url}/usuario/productos/${idUsuario}`;
    return this.http.get<Producto[]>(endpoint);
  }
}
