import { Component, NgZone, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/model/Producto';
import { NgForm } from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css'],
})
export class VenderComponent implements OnInit {
  previsualizacion: string | undefined;
  fileImg!: File;
  imgPath: string = '';
  imgUrl: string = '';
  isLogged: boolean = false;
  loader: boolean = false;
  errorDeCampos: boolean = false;
  respuestaExitosa: boolean = false;
  constructor(
    public router: Router,
    private producService: ProductosService,
    private authS: AuthService,
    private tokenServi: TokenService,
    private storage: Storage,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    if (this.tokenServi.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  crearProducto(form: NgForm) {
    this.loader = true;
    const nombre = form.value.nombreProducto;
    const etiquetas = form.value.etiquetasProducto;
    const descripcion = form.value.descripcionProducto;
    const precio = form.value.precioProducto;
    const cantidad = form.value.cantidadProducto;

    if (!nombre || !etiquetas || !descripcion || !precio || !cantidad) {
      this.loader = false;
      this.errorDeCampos = true;
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
            this.authS.obtenerUsuario().subscribe(
              (user) => {
                const id = user.id_usuario; // ID del usuario que esta logueado
                this.producService.crearProducto(producto, id!).subscribe(
                  (respuesta) => {},
                  (error) => {
                    console.error(error);
                    this.loader = false;
                  }
                );
              },
              (error) => {
                console.error(error);
                this.loader = false;
              }
            );
            this.respuestaExitosa = true;
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
