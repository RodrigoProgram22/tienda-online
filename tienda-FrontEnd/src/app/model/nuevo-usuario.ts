export class NuevoUsuario {
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  telefono!: string;
  ubicacion!: string;
  constructor(
    nombre: string,
    nombreUs: string,
    email: string,
    password: string,
    telefono: string,
    ubicacion: string
  ) {
    this.nombre = nombre;
    this.nombreUsuario = nombreUs;
    this.email = email;
    this.password = password;
    this.telefono = telefono;
    this.ubicacion = ubicacion;
  }
}
