import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { AuthService } from 'src/app/service/auth.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { ProductosService } from 'src/app/service/productos.service';
@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css'],
})
export class VerProductoComponent implements OnInit {
  productosAleatorios: any[] = [];
  produc: any = {};
  msjCarrito: string = '';
  constructor(
    private producS: ProductosService,
    private carritoS: CarritoService,
    private activateRouter: ActivatedRoute,
    private authS: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cargarProducto();
    this.cargarRecomendados();
  }
  cargarProducto() {
    const id = this.activateRouter.snapshot.params['id'];
    this.producS.buscarProducto(id).subscribe(
      (data) => {
        this.produc = data;
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['inicio']);
      }
    );
  }
  agregarCarrito() {
    this.authS.obtenerUsuario().subscribe(
      (user) => {
        const id = this.activateRouter.snapshot.params['id'];
        const id_user = user.id_usuario; // el ID del usuario que se esta logueado
        this.carritoS.agregarProducto(id_user!, id).subscribe((data) => {
          this.msjCarrito =
            '<p class="fw-bold text-success">El producto se agregó al carrito.</p>';
        });
      },
      (err) => {
        this.msjCarrito =
          '<p class="fw-bold text-danger">Error al agregar producto.</p>';
      }
    );
  }
  cargarRecomendados() {
    this.producS.obtenerProductos().subscribe((data) => {
      while (this.productosAleatorios.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        const productoAleatorio = data[indiceAleatorio];
        if (!this.productosAleatorios.includes(productoAleatorio)) {
          this.productosAleatorios.push(productoAleatorio);
        }
      }
    });
  }
  comprar() {
    alert('Esta funcion está en mantenimiento');
  }
}
