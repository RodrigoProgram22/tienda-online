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
  constructor(private productoS: ProductosService) {}
  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos() {
    this.productoS.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }
}
