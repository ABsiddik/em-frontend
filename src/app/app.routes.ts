import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent, title:'Login'},
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {path:'', component:HomeComponent, title:'Home'},
            {path:'other', component:OtherComponent, title:'other'}
        ]
    },
    { path: '**', redirectTo: '' }
];
