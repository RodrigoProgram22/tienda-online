import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductosService } from 'src/app/service/productos.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  previsualizacion: string | undefined;
  fileImg!: File;
  produc: any = {};
  usuario_registrado: any;
  proveedor_valido: boolean | undefined;
  isLogged: boolean = false;
  loader: boolean = false;
  msj: string = '';
  imgPath: string = '';
  imgUrl: string = '';
  constructor(
    public router: Router,
    private producS: ProductosService,
    private activateRouter: ActivatedRoute,
    private authS: AuthService,
    private storage: Storage,
    private ngZone: NgZone
  ) {}
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
    this.loader = true;
    const nombre = form.value.nombreProducto;
    const etiquetas = form.value.etiquetasProducto;
    const descripcion = form.value.descripcionProducto;
    const precio = form.value.precioProducto;
    const cantidad = form.value.cantidadProducto;
    if (
      !nombre ||
      !etiquetas ||
      !descripcion ||
      !precio ||
      !cantidad ||
      !this.fileImg
    ) {
      this.loader = false;
      this.msj =
        '<p class="fw-bold text-danger">Todos los campos deben estar llenos.</p>';
      return;
    }
    const imgRef = ref(this.storage, `images/${this.fileImg.name}`);
    uploadBytes(imgRef, this.fileImg)
      .then((response) => {
        this.ngZone.run(() => {
          this.imgPath = response.metadata.fullPath;
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        const imgRefTraer = ref(this.storage, 'images');
        listAll(imgRefTraer)
          .then(async (response) => {
            for (let item of response.items) {
              if (item.fullPath === this.imgPath) {
                try {
                  this.imgUrl = await getDownloadURL(item);
                } catch (error) {
                  console.log(error);
                }
              }
            }
          })
          .catch((error) => console.log(error))
          .finally(() => {
            const imagen = this.imgUrl;
            const producto = new Producto(
              nombre,
              etiquetas,
              descripcion,
              precio,
              imagen,
              cantidad
            );
            const id = this.activateRouter.snapshot.params['id'];
            this.producS.actualizarProducto(id!, producto).subscribe(
              (respuesta) => {},
              (error) => console.error(error)
            );
            this.msj =
              '<p class="fw-bold text-success">Producto Actualizado</p>';
            this.loader = false;
          });
        this.loader = false;
      });
  }
  onFileSelected(event: any) {
    this.fileImg = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileImg);
    reader.onload = () => {
      const base64Img: string = reader.result as string;
      // aquí puedes hacer lo que quieras con la imagen en formato base64
      this.previsualizacion = base64Img;
    };
  }
}
