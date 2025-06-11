import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { PreferenceComponent } from './components/register/preference/preference';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro',
  },
  {
    path: 'register/preference',
    component: PreferenceComponent,
    title: 'Preferências',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
];
