import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/seccion/header/header.component';
import { LoginComponent } from './components/seccion/login/login.component';
import { RegistroComponent } from './components/seccion/registro/registro.component';
import { VerProductoComponent } from './components/seccion/ver-producto/ver-producto.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: '', redirectTo: '/header', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ver-producto', component: VerProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
