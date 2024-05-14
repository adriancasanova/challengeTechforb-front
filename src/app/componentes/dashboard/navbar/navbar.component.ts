import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  providers: [CookieService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  usuarioNombre: any;

  constructor(private cookieService: CookieService) {
    this.usuarioNombre = this.cookieService.get('usuarioNombre');
  }
}
