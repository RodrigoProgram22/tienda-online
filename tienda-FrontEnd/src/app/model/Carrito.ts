import { Producto } from './Producto';
import { Usuario } from './Usuario';

export class Carrito {
  id_carrito: number;
  usuario: Usuario;
  productos: Producto[];

  constructor(carrito: Carrito) {
    this.id_carrito = carrito.id_carrito;
    this.usuario = carrito.usuario;
    this.productos = carrito.productos.map(
      (producto) =>
        new Producto(
          // producto.proveedor,
          producto.nombre,
          producto.etiquetas,
          producto.descripcion,
          producto.precio,
          producto.imagen,
          producto.cantidad
        )
    );
  }
}
