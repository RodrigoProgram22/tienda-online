import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/model/Producto';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
})
export class VenderComponent implements OnInit {
  constructor(
    public router: Router,
    private producService: ProductosService,
    private authS: AuthService
  ) {}
  ngOnInit(): void {}
  crearProducto(form: NgForm) {
    const nombre = form.value.nombreProducto;
    const etiquetas = form.value.etiquetasProducto;
    const descripcion = form.value.descripcionProducto;
    const precio = form.value.precioProducto;
    const imagen = form.value.imagenProducto;
    const cantidad = form.value.cantidadProducto;

    const producto = new Producto(
      nombre,
      etiquetas,
      descripcion,
      precio,
      'https://via.placeholder.com/150x150.png',
      cantidad
    );
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // el ID del usuario que se esta logueado
      this.producService.crearProducto(producto, id!).subscribe(
        (respuesta) => console.log(respuesta),
        (error) => console.error(error)
      );
    });
  }
}
