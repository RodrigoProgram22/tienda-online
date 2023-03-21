import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
})
export class MiPerfilComponent implements OnInit {
  constructor(public router: Router, private usuarioService: UsuariosService) {}
  usuario: any = {};
  ngOnInit(): void {
    const id = 1; // el ID del usuario que deseas buscar
    this.usuarioService.buscarUsuario(id).subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
}
