import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private url = 'http://localhost:8080'; // URL de la API
  // private url = 'https://backend-mitec-api-production.up.railway.app'; // URL de la API
  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/productos`);
  }
  // Buscar un producto por su id
  buscarProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/producto/buscar/${id}`);
  }
  // Obtener productos por nombre
  obtenerProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.url}/producto/buscarNombre/${nombre}`
    );
  }
  // Crear un nuevo producto
  crearProducto(producto: Producto, idProveedor: number): Observable<any> {
    return this.http.post(
      `${this.url}/producto/crear?idProveedor=${idProveedor}`,
      producto
    );
  }
  // Actualizar un producto existente
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.url}/producto/editar/${id}`,
      producto
    );
  }
  // Eliminar un producto existente
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/producto/borrar/${id}`);
  }
}
