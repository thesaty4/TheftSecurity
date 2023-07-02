import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/components/auth/auth.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { ResetPasswordComponent } from './core/auth/components/reset-password/reset-password.component';
import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./core/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./core/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
      },
    ],
  },
];

/**
 * @description To enable/disable tracing of route disable the ${switchForRouteTrace}.
 */
const switchForRouteTrace = false;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadModulesStrategy,
      enableTracing: switchForRouteTrace && !environment.production,
    }),
  ],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy],
})
export class AppRoutingModule {}
