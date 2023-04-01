import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  realRol: string = '';

  constructor(private tokenS: TokenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenS.getAuthorities();
    this.realRol = 'user';
    roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.realRol = 'admin';
      }
    });
    if (!this.tokenS.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/inicio']);
      // alert('Lo siento debes registrarte');
      return false;
    }
    return true;
  }
}
