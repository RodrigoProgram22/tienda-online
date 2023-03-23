export class LoginUsuario {
  nombreUsuario: string;
  password: string;
  constructor(nombre: string, pass: string) {
    this.nombreUsuario = nombre;
    this.password = pass;
  }
}
