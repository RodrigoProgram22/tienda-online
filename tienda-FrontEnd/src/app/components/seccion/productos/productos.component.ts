import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { ProductosService } from 'src/app/service/productos.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public productos: Array<Producto> = [];
  etiquetas: any[] = [];
  nombreBusqueda: string = '';
  loader: boolean = false;
  constructor(private productoS: ProductosService) {}
  ngOnInit(): void {
    this.cargarProductos();
  }
  buscar(nombre: string) {
    this.loader = true;
    if (nombre === '') {
      this.cargarProductos();
      return console.info('Buscador vacio');
    }
    this.productoS.obtenerProductosPorNombre(nombre).subscribe((filtro) => {
      this.productos = filtro;
    });
    this.loader = false;
  }
  cargarProductos() {
    this.loader = true;
    this.productoS.obtenerProductos().subscribe((data) => {
      this.productos = data;
      this.etiquetas = [];
      // Iterar por cada producto
      this.productos.forEach((producto) => {
        // Separar las etiquetas en un array
        const etiquetasArray = producto.etiquetas.split(', ');
        // Agregar las etiquetas del producto al array de etiquetas
        etiquetasArray.forEach((etiqueta) => {
          if (!this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta);
          }
        });
      });
    });
    this.loader = false;
  }
  celularFiltro() {
    this.productos = this.productos.filter((producto) => {
      return producto.etiquetas.includes('celular');
    });
  }
  gamerFiltro() {
    this.productos = this.productos.filter((producto) => {
      return producto.etiquetas.includes('gamer');
    });
  }
  notebookFiltro() {
    this.productos = this.productos.filter((producto) => {
      return producto.etiquetas.includes('notebook');
    });
  }
  appleFiltro() {
    this.productos = this.productos.filter((producto) => {
      return producto.etiquetas.includes('apple');
    });
  }
  samsungFiltro() {
    this.productos = this.productos.filter((producto) => {
      return producto.etiquetas.includes('samsung');
    });
  }
  sonyFiltro() {
    this.productos = this.productos.filter((producto) => {
      return producto.etiquetas.includes('sony');
    });
  }
}
