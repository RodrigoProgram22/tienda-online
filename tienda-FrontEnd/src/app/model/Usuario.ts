import { Producto } from './Producto';
import { Carrito } from './Carrito';

export class Usuario {
  id_usuario?: number;
  nombreUsuario: string;
  nombreApellido: string;
  password: string;
  email: string;
  telefono: string;
  ubicacion: string;
  productos: Producto[];
  carrito: Carrito;

  constructor(
    nombreUsuario: string,
    nombreApellido: string,
    password: string,
    email: string,
    telefono: string,
    ubicacion: string,
    productos: Producto[],
    carrito: Carrito
  ) {
    this.nombreUsuario = nombreUsuario;
    this.nombreApellido = nombreApellido;
    this.password = password;
    this.email = email;
    this.telefono = telefono;
    this.ubicacion = ubicacion;
    this.productos = productos;
    this.carrito = carrito;
  }
}
