import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductosService } from 'src/app/service/productos.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  constructor(
    public router: Router,
    private producS: ProductosService,
    private activateRouter: ActivatedRoute
  ) {}
  msj: string = '';
  produc: any = {};
  ngOnInit(): void {
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
  editarProducto(form: NgForm) {
    const nombre = form.value.nombreProducto;
    const etiquetas = form.value.etiquetasProducto;
    const descripcion = form.value.descripcionProducto;
    const precio = form.value.precioProducto;
    const imagen = form.value.imagenProducto;
    const cantidad = form.value.cantidadProducto;
    if (!nombre || !etiquetas || !descripcion || !precio || !cantidad) {
      this.msj =
        '<p class="fw-bold text-danger">Todos los campos deben estar llenos.</p>';
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
    const id = this.activateRouter.snapshot.params['id'];
    this.producS.actualizarProducto(id!, producto).subscribe(
      (respuesta) => {},
      (error) => console.error(error)
    );
    this.msj = '<p class="fw-bold text-success">Producto Actualizado</p>';
  }
}
