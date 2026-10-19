import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cars-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './cars-layout.component.html'
})
export class CarsLayoutComponent {}
