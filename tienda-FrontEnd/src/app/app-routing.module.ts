import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/seccion/header/header.component';
import { LoginComponent } from './components/seccion/login/login.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/header', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
