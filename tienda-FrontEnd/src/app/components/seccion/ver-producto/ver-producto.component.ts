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
  loaderProduc : boolean = false;
  usuario_registrado: any;
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
    // Obtengo el Id del usuario registrado
    this.authS.obtenerUsuario().subscribe((user) => {
      this.usuario_registrado = user.id_usuario;
    });
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
    this.loaderProduc = true;
    this.authS.obtenerUsuario().subscribe(
      (user) => {
        const id = this.activateRouter.snapshot.params['id'];
        const id_user = user.id_usuario; // el ID del usuario que se esta logueado
        this.carritoS.agregarProducto(id_user!, id).subscribe((data) => {
          this.msjCarrito =
            '<p class="fw-bold text-success">El producto se agregó al carrito.</p>';
          this.loaderProduc = false;
        });
        this.loaderProduc = false;
      },
      (err) => {
        if (this.usuario_registrado) {
          this.msjCarrito =
            '<p class="fw-bold text-danger">Error al agregar producto.</p>';
            this.loaderProduc = false;
        } else {
          this.loaderProduc = false;
          this.msjCarrito =
            '<p class="fw-bold text-danger">Error, primero debes Iniciar Sesión.</p>';
        }
      }
    );
    this.loaderProduc = false;
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
    this.loaderProduc = true;
    this.msjCarrito =
      '<p class="fw-bold text-warning">Esta funcion está en mantenimiento.</p>';
    this.loaderProduc = false;
  }
}
