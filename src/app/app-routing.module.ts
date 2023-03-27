import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './authGuard/admin.guard';
import { EmployeeGuard } from './authGuard/employee.guard';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './module/admin/admin.module';
import { StaffModule } from './module/staff/staff.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./module/admin/admin.module').then((m) => AdminModule),canActivate:[AdminGuard] },
  { path: 'staff', loadChildren: () => import('./module/staff/staff.module').then((m) => StaffModule),canActivate:[EmployeeGuard] },
  { path: 'staff:/id', loadChildren: () => import('./module/staff/staff.module').then((m) => StaffModule),canActivate:[EmployeeGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
