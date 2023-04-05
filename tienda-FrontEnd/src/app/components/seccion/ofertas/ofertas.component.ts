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
  errorBack: boolean = false;
  errorBackOfertas: boolean = false;
  public productos: Array<Producto> = [];
  ngOnInit(): void {
    this.recomendados();
    this.cargarOfertas();
  }
  cargarOfertas() {
    this.producS.obtenerProductos().subscribe(
      (data) => {
        this.productos = data.slice(4, 7);
      },
      (err) => {
        this.errorBackOfertas = true;
        this.router.navigate(['inicio']);
      }
    );
  }
  recomendados() {
    this.producS.buscarProducto(1).subscribe(
      (data) => {
        this.producPlay = data;
      },
      (err) => {
        this.errorBack = true;
        this.router.navigate(['inicio']);
      }
    );
    this.producS.buscarProducto(2).subscribe(
      (data) => {
        this.producXbox = data;
      },
      (err) => {
        this.errorBack = true;
        this.router.navigate(['inicio']);
      }
    );
    this.producS.buscarProducto(3).subscribe(
      (data) => {
        this.producPc = data;
      },
      (err) => {
        this.errorBack = true;
        this.router.navigate(['inicio']);
      }
    );
    this.producS.buscarProducto(4).subscribe(
      (data) => {
        this.producLenovo = data;
      },
      (err) => {
        this.errorBack = true;
        this.router.navigate(['inicio']);
      }
    );
  }
}
