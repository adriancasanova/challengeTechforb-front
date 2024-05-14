import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard/dashboard.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DetalleSensoresComponent } from './componentes/dashboard/detalle-sensores/detalle-sensores.component';
import { ConfiguracionComponent } from './componentes/dashboard/configuracion/configuracion.component';
import { MainComponent } from './componentes/dashboard/main/main.component';
import { guardGuard } from './guard.guard';
import { inject } from '@angular/core';
import { LoginServiceService } from './servicios/login-service.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [guardGuard],
  children: [
    {
        path: 'enterprise',
        component: MainComponent,
    },
    {
      path: 'detalle-sensores',
      component: DetalleSensoresComponent,
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
}
]

  },


];
