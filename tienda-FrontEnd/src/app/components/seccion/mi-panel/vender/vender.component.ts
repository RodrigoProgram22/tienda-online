import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/model/Producto';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
})
export class VenderComponent implements OnInit {
  constructor(
    public router: Router,
    private producService: ProductosService,
    private authS: AuthService,
    private tokenServi: TokenService
  ) {}
  isLogged: boolean = false;
  msj: any = '';
  ngOnInit(): void {
    if (this.tokenServi.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  crearProducto(form: NgForm) {
    const nombre = form.value.nombreProducto;
    const etiquetas = form.value.etiquetasProducto;
    const descripcion = form.value.descripcionProducto;
    const precio = form.value.precioProducto;
    const imagen = form.value.imagenProducto;
    const cantidad = form.value.cantidadProducto;
    if (!nombre || !etiquetas || !descripcion || !precio || !cantidad) {
      this.msj =
        '<p class="fw-bold text-danger">Error: Todos los campos deben estar llenos.</p>';
      return;
    }
    const producto = new Producto(
      nombre,
      etiquetas,
      descripcion,
      precio,
      'https://via.placeholder.com/150x150.png',
      cantidad
    );
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // ID del usuario que esta logueado
      this.producService.crearProducto(producto, id!).subscribe(
        (respuesta) => {
          console.log(respuesta.mensaje); // muestra el mensaje devuelto por el controlador del backend
        },
        (error) => console.error(error)
      );
    });
    this.msj =
      '<p class="fw-bold text-success">El producto se agregó correctamente.</p>';
  }
}
