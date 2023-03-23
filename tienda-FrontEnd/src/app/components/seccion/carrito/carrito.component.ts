import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { AuthService } from 'src/app/service/auth.service';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = [];
  sumatotal: number = 0;
  constructor(
    private carritoService: CarritoService,
    private authS: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos() {
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // el ID del usuario que se esta logueado
      this.carritoService.getProductosDelCarrito(id!).subscribe((data) => {
        this.productos = data;
        for (let i = 0; i < this.productos.length; i++) {
          this.sumatotal += this.productos[i].precio;
        }
      });
    });
  }
  eliminar(id: any) {
    this.authS.obtenerUsuario().subscribe((user) => {
      const id_user = user.id_usuario; // el ID del usuario que se esta logueado
      this.carritoService.eliminarProducto(id_user!, id).subscribe((data) => {
        this.cargarProductos();
      });
    });
  }
}
