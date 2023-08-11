import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
})
export class MiPerfilComponent implements OnInit {
  constructor(
    public router: Router,
    private usuarioService: UsuariosService,
    private authS: AuthService
  ) {}
  usuario!: Usuario;
  ngOnInit(): void {
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // ID del usuario que esta logueado
      this.usuarioService.buscarUsuario(id!).subscribe((usuario) => {
        this.usuario = usuario;
      });
    });
  }
}
