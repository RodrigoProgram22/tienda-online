import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'],
})
export class AdministrarComponent implements OnInit {
  constructor(
    public router: Router,
    private usuarioService: UsuariosService,
    private authS: AuthService
  ) {}
  usuarios: any[] = [];
  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.authS.obtenerUsuario().subscribe((user) => {
      const id = user.id_usuario; // ID del usuario que esta logueado
      this.usuarioService.getUsuarios().subscribe((usuario) => {
        this.usuarios = usuario;
      });
    });
  }
  eliminarUser(id: number) {
    if (id != undefined) {
      this.usuarioService.borrarUsuario(id).subscribe(
        (data) => {
          this.cargarUsuarios();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
