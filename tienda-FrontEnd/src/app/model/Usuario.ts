import { Producto } from './Producto';
import { Carrito } from './Carrito';

export class Usuario {
  id_usuario?: number;
  nombre_usuario: string;
  nombre_apellido: string;
  password: string;
  email: string;
  telefono: string;
  ubicacion: string;
  productos: Producto[];
  carrito: Carrito;

  constructor(
    nombre_usuario: string,
    nombre_apellido: string,
    password: string,
    email: string,
    telefono: string,
    ubicacion: string,
    productos: Producto[],
    carrito: Carrito
  ) {
    this.nombre_usuario = nombre_usuario;
    this.nombre_apellido = nombre_usuario;
    this.password = password;
    this.email = email;
    this.telefono = telefono;
    this.ubicacion = ubicacion;
    this.productos = productos;
    this.carrito = carrito;
  }
}
