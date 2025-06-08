import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  }
];
