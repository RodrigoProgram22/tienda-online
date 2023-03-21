import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/model/Producto';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
})
export class VenderComponent implements OnInit {
  constructor(public router: Router, private producService: ProductosService) {}
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
    this.producService.crearProducto(producto, 2).subscribe(
      (respuesta) => console.log('Producto creado'),
      (error) => console.error(error)
    );
  }
}
