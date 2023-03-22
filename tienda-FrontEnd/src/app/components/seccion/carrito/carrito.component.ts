import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = [];
  sumatotal: number = 0;
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos() {
    this.carritoService.getProductosDelCarrito(1).subscribe((data) => {
      this.productos = data;
      for (let i = 0; i < this.productos.length; i++) {
        this.sumatotal += this.productos[i].precio;
      }
    });
  }
  eliminar(id: any) {
    this.carritoService.eliminarProducto(1, id).subscribe((data) => {
      this.cargarProductos();
    });
  }
}
