import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../../../core/services/cars.service';
import { Vehicle, VehicleQuery } from '../../../models/vehicle.model';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  private carsService = inject(CarsService);
  private router = inject(Router);

  vehicles = signal<Vehicle[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  currentPage = signal(1);
  totalPages = signal(1);
  total = signal(0);
  limit = 10;

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.loading.set(true);
    this.error.set(null);

    const query: VehicleQuery = {
      page: this.currentPage(),
      limit: this.limit
    };

    this.carsService.getCars(query).subscribe({
      next: (response) => {
        this.vehicles.set(response.items);
        this.totalPages.set(response.meta.totalPages);
        this.total.set(response.meta.totalItems);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los vehículos');
        this.loading.set(false);
      }
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadVehicles();
  }

  goToCreate() {
    this.router.navigate(['/cars/new']);
  }
}
