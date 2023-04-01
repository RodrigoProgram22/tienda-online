import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ProductosService } from 'src/app/service/productos.service';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  constructor(private producS: ProductosService, private router: Router) {}
  producPlay: any = {};
  producXbox: any = {};
  producPc: any = {};
  producLenovo: any = {};
  public productos: Array<Producto> = [];
  ngOnInit(): void {
    this.recomendados();
    this.cargarOfertas();
  }
  cargarOfertas() {
    this.producS.obtenerProductos().subscribe((data) => {
      this.productos = data.slice(3, 7);
    });
  }
  recomendados() {
    this.producS.buscarProducto(46).subscribe(
      (data) => {
        this.producPlay = data;
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['inicio']);
      }
    );
    this.producS.buscarProducto(47).subscribe(
      (data) => {
        this.producXbox = data;
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['inicio']);
      }
    );
    this.producS.buscarProducto(48).subscribe(
      (data) => {
        this.producPc = data;
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['inicio']);
      }
    );
    this.producS.buscarProducto(49).subscribe(
      (data) => {
        this.producLenovo = data;
      },
      (err) => {
        alert('Error al ver el producto');
        this.router.navigate(['inicio']);
      }
    );
  }
}
