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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
