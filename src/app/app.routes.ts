import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent, title:'Login'},
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {path:'', component:HomeComponent, title:'Home'},
            {path:'profile', component:ProfileComponent, title:'Profile'},
            {path:'employees', component:EmployeesComponent, title:'Employee List'},
            {path:'employees/create', component:CreateEmployeeComponent, title:'New Employee'},
            {path:'other', component:OtherComponent, title:'other'}
        ]
    },
    { path: '**', redirectTo: '' }
];
