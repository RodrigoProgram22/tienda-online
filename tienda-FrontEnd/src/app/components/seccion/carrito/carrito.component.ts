import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/Producto';
import { AuthService } from 'src/app/service/auth.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = [];
  suma: number = 0;
  isLogged: boolean = false;
  productosVacio: boolean = true;
  msjCarrito: string = '';
  loaderCarrito: boolean = false;
  constructor(
    private carritoService: CarritoService,
    private authS: AuthService,
    private tokenServi: TokenService
  ) {}
  ngOnInit(): void {
    if (this.tokenServi.getToken()) {
      this.isLogged = true;
      this.cargarProductos();
    } else {
      this.isLogged = false;
    }
  }
  cargarProductos() {
    this.loaderCarrito = true;
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // ID del usuario que esta logueado
      this.carritoService.getProductosDelCarrito(id!).subscribe((data) => {
        this.productos = data;
        let sumaTotal: number = 0;
        for (let i = 0; i < this.productos.length; i++) {
          sumaTotal += this.productos[i].precio;
        }
        this.suma = sumaTotal;
        if (this.productos.length >= 1) {
          this.productosVacio = false;
          this.loaderCarrito = false;
        }
        this.loaderCarrito = false;
      });
    });
  }
  eliminar(id: any) {
    this.loaderCarrito = true;
    this.authS.obtenerUsuario().subscribe(
      (user) => {
        const id_user = user.id_usuario; // ID del usuario que esta logueado
        this.carritoService.eliminarProducto(id_user!, id).subscribe(
          (data) => {
            this.cargarProductos();
            this.loaderCarrito = false;
          },
          (error) => {
            this.loaderCarrito = false;
          }
        );
      },
      (error) => {
        this.loaderCarrito = false;
      }
    );
  }
  comprar() {
    this.msjCarrito =
      '<p class="fw-bold bg-warning text-dark border rounded p-2">Esta funcion está en mantenimiento.</p>';
  }
}
