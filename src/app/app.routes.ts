import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path:'', component:HomeComponent},
            {path:'other', component:OtherComponent}
        ]
    },
    { path: '**', redirectTo: '' }
];
