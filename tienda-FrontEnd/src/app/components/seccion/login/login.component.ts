import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  // errMensj: string;
  loader: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  onLogin(): void {
    console.log(this.nombreUsuario + ' / ' + this.password);
  }
}
