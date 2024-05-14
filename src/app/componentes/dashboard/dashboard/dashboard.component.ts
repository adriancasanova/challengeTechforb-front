import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MainComponent } from '../main/main.component';
import { RouterOutlet } from '@angular/router';
import { DetalleSensoresComponent } from '../detalle-sensores/detalle-sensores.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, MainComponent, RouterOutlet, DetalleSensoresComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
