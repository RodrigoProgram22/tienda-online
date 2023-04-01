import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  currentRoute: string = '';
  constructor(private router: Router, private tokenServi: TokenService) {}
  btnIni: boolean = true;
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (this.tokenServi.getToken()) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if ('/login' == event.url || this.isLogged) {
          this.btnIni = false;
        } else if ('/inicio' === event.url && !this.isLogged) {
          this.btnIni = true;
        }
      }
    });
  }
  onLogOut(): void {
    this.tokenServi.logOut();
    window.location.reload();
    this.router.navigate(['/inicio']);
  }
}
