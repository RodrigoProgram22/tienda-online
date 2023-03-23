import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
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
    private authS: AuthService
  ) {}
  usuario: any = {};
  ngOnInit(): void {
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // el ID del usuario que se esta logueado
      this.usuarioService.buscarUsuario(id!).subscribe((usuario) => {
        this.usuario = usuario;
      });
    });
  }
}
