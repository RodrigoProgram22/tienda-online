import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/seccion/header/header.component';
import { LoginComponent } from './components/seccion/login/login.component';
import { RegistroComponent } from './components/seccion/registro/registro.component';
import { ProductosComponent } from './components/seccion/productos/productos.component';
import { VerProductoComponent } from './components/seccion/ver-producto/ver-producto.component';
import { CarritoComponent } from './components/seccion/carrito/carrito.component';
import { VenderComponent } from './components/seccion/mi-panel/vender/vender.component';
import { MiPerfilComponent } from './components/seccion/mi-panel/mi-perfil/mi-perfil.component';
import { MisProductosComponent } from './components/seccion/mi-panel/mis-productos/mis-productos.component';
import { AyudaComponent } from './components/seccion/ayuda/ayuda.component';
const routes: Routes = [
  { path: 'inicio', component: HeaderComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ver-producto/:id', component: VerProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },
  { path: 'vender', component: VenderComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'mis-productos', component: MisProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
