export class Producto {
  id_producto?: number;
  id_proveedor: any;
  nombre: string;
  etiquetas: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
  constructor(
    nombre: string,
    etiquetas: string,
    descripcion: string,
    precio: number,
    imagen: string,
    cantidad: number
  ) {
    this.nombre = nombre;
    this.etiquetas = etiquetas;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = cantidad;
  }
}
