import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css'],
})
export class MisProductosComponent implements OnInit {
  constructor(public router: Router, private usuarioService: UsuariosService) {}
  usuario: any = {};
  ngOnInit(): void {
    const id = 1; // el ID del usuario que deseas buscar
    this.usuarioService.buscarUsuario(id).subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
}
