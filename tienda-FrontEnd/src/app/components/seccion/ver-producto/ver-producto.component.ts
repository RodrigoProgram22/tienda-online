import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  loader: boolean = false;
  loaderCarrito: boolean = false;
  errorBack: boolean = false;
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
    this.loader = true;
    const id = this.activateRouter.snapshot.params['id'];
    this.producS.buscarProducto(id).subscribe(
      (data) => {
        this.produc = data;
        this.loader = false;
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['inicio']);
        this.errorBack = true;
        this.loader = false;
      }
    );
  }
  agregarCarrito() {
    this.loaderCarrito = true;
    this.authS.obtenerUsuario().subscribe(
      (user) => {
        const id = this.activateRouter.snapshot.params['id'];
        const id_user = user.id_usuario; // el ID del usuario que se esta logueado
        this.carritoS.agregarProducto(id_user!, id).subscribe((data) => {
          this.msjCarrito =
            '<p class="fw-bold bg-success border rounded text-dark p-2">El producto se agregó al carrito.</p>';
          this.loaderCarrito = false;
        });
      },
      (err) => {
        if (this.usuario_registrado) {
          this.msjCarrito =
            '<p class="fw-bold bg-danger border rounded text-dark p-2">Error al agregar producto.</p>';
          this.loaderCarrito = false;
        } else {
          this.msjCarrito =
            '<p class="fw-bold bg-danger text-dark border rounded p-2">Error, primero debes Iniciar Sesión.</p>';
          this.loaderCarrito = false;
        }
      }
    );
  }
  cargarRecomendados() {
    this.loader = true;
    this.producS.obtenerProductos().subscribe(
      (data) => {
        while (this.productosAleatorios.length < 4) {
          const indiceAleatorio = Math.floor(Math.random() * data.length);
          const productoAleatorio = data[indiceAleatorio];
          if (!this.productosAleatorios.includes(productoAleatorio)) {
            this.productosAleatorios.push(productoAleatorio);
            this.loader = false;
          }
          this.loader = false;
        }
      },
      (error) => {
        this.errorBack = true;
        this.loader = false;
      }
    );
  }
  comprar() {
    this.loader = true;
    this.msjCarrito =
      '<p class="fw-bold bg-warning text-dark border rounded p-2">Esta funcion está en mantenimiento.</p>';
    this.loader = false;
  }
}
