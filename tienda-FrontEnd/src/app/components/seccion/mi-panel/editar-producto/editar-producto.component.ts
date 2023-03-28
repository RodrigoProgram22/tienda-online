import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductosService } from 'src/app/service/productos.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  constructor(
    public router: Router,
    private producS: ProductosService,
    private activateRouter: ActivatedRoute,
    private authS: AuthService
  ) {}
  msj: string = '';
  produc: any = {};
  usuario_registrado: any;
  proveedor_valido: boolean | undefined;

  ngOnInit(): void {
    // Obtengo el Id del usuario registrado
    this.authS.obtenerUsuario().subscribe((user) => {
      this.usuario_registrado = user.id_usuario;
    });
    const id = this.activateRouter.snapshot.params['id'];
    this.producS.buscarProducto(id).subscribe(
      (data) => {
        // Guardo el producto en el objeto produc
        this.produc = data;
        // Verifico si el id del usuario registrado es el mismo del proveedor
        if (this.produc.proveedor.id_usuario === this.usuario_registrado) {
          console.log('Puedes modificar estes producto.');
          this.proveedor_valido = true;
        } else {
          this.proveedor_valido = false;
          console.log('No puedes modificar este producto.');
        }
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['mi-perfil']);
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
