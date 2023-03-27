import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/seccion/header/header.component';
import { OfertasComponent } from './components/seccion/ofertas/ofertas.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/seccion/login/login.component';
import { RegistroComponent } from './components/seccion/registro/registro.component';
import { VerProductoComponent } from './components/seccion/ver-producto/ver-producto.component';
import { CarritoComponent } from './components/seccion/carrito/carrito.component';
import { ProductosComponent } from './components/seccion/productos/productos.component';
import { VenderComponent } from './components/seccion/mi-panel/vender/vender.component';
import { MiPerfilComponent } from './components/seccion/mi-panel/mi-perfil/mi-perfil.component';
import { MisProductosComponent } from './components/seccion/mi-panel/mis-productos/mis-productos.component';
import { AyudaComponent } from './components/seccion/ayuda/ayuda.component';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProvider } from './interseptors/interceptor.service';
import { EditarProductoComponent } from './components/seccion/mi-panel/editar-producto/editar-producto.component';
import { AdministrarComponent } from './components/seccion/mi-panel/administrar/administrar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    OfertasComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    VerProductoComponent,
    CarritoComponent,
    ProductosComponent,
    VenderComponent,
    MiPerfilComponent,
    MisProductosComponent,
    AyudaComponent,
    EditarProductoComponent,
    AdministrarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
