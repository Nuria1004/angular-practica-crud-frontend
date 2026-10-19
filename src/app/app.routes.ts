import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CarFormComponent } from './features/cars/car-form/car-form.component';
import { CarListComponent } from './features/cars/car-list/car-list.component';
import { CarsLayoutComponent } from './features/cars/layout/cars-layout.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'cars',
    component: CarsLayoutComponent,
	  children: [
		  { path: '', component: CarListComponent },
		  { path: 'new', component: CarFormComponent },
	  ]
  },
  { path: '**', redirectTo: 'cars' }
];