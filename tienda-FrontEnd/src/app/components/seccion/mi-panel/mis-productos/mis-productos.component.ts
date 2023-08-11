import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/service/auth.service';
import { ProductosService } from 'src/app/service/productos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css'],
})
export class MisProductosComponent implements OnInit {
  constructor(
    public router: Router,
    private usuarioService: UsuariosService,
    private produS: ProductosService,
    private authS: AuthService
  ) {}
  editBoolean: boolean = false;
  usuario: any = {};
  productos: any[] = [];
  loader: boolean = false;
  imgUrl: string = '';
  ngOnInit(): void {
    this.obtenerListaProductos();
  }
  obtenerListaProductos() {
    this.loader = true;
    this.authS.obtenerUsuario().subscribe(
      (user) => {
        const id = user.id_usuario; // ID del usuario que esta logueado
        this.usuarioService.buscarUsuario(id!).subscribe(
          (usuario) => {
            this.usuario = usuario;
            this.productos = usuario.productos; // Almacenar los productos del usuario en una propiedad
            this.loader = false;
          },
          (error) => {
            this.loader = false;
          }
        );
      },
      (error) => {
        this.loader = false;
      }
    );
  }
  editarProducto() {
    if (!this.editBoolean) {
      this.editBoolean = true;
    } else {
      this.editBoolean = false;
    }
  }
  eliminarProduc(id: number) {
    if (id != undefined) {
      this.produS.eliminarProducto(id).subscribe(
        (data) => {
          this.obtenerListaProductos();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
