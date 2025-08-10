import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'system-management',
  //   loadChildren: () => import('./modules/system-management/system-management-module').then(m => m.SystemManagermentModule)
  // }
  {
    path: 'system-management',
    loadComponent: () => import('./layouts/system-management-layout/system-management-layout').then(c => c.SystemManagementLayout),
    children:[
      {
        path: '',
        loadComponent: () => import('./pages/system-management/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/system-management/user/user.component').then(c => c.UserComponent)
      }
    ]
  }
];
