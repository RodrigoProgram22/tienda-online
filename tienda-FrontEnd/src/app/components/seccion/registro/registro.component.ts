import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario!: NuevoUsuario;
  nombre: string = '';
  nombreUsuario!: string;
  email!: string;
  password!: string;
  telefono!: string;
  ubicacion!: string;
  roles: string[] = [];
  errMensj!: string;
  isLogged = false;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }
  }
  onRegister() {
    this.nuevoUsuario = new NuevoUsuario(
      this.nombre,
      this.nombreUsuario,
      this.email,
      this.password,
      this.telefono,
      this.ubicacion
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      (data) => {
        this.isRegister = true;
        this.isRegisterFail = false;
        this.router.navigate(['login']);
        alert('Registrado correctamente.');
      },
      (err) => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errMensj = err.error.mensaje;
      }
    );
  }
}
