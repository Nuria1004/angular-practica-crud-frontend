import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from '../../../core/services/cars.service';
import { BrandsService } from '../../../core/services/brands.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private carsService = inject(CarsService);
  private brandsService = inject(BrandsService);
  private router = inject(Router);

  brands = signal<{id: string, name: string}[]>([]);
  models = signal<{id: string, name: string}[]>([]);
  errorMsg = signal<string | null>(null);

  carForm = this.fb.group({
    brandId: ['', Validators.required],
    modelId: ['', Validators.required],
    registrationDate: ['', Validators.required],
    mileage: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(1)]],
    manufactureYear: [2020, [Validators.required, Validators.min(1900), Validators.max(2026)]],
    currency: ['EUR'],
    availability: [true],
    color: [''],
    description: [''],
    licensePlate: ['', [Validators.required, Validators.pattern(/^[0-9]{4}\s?[BCDFGHJKLMNPRSTVWXYZ]{3}$/)]]
  });

  ngOnInit() {
    this.carForm.get('modelId')!.disable();

    this.brandsService.getBrands().subscribe(brands => this.brands.set(brands));

    this.carForm.get('brandId')!.valueChanges.subscribe(brandId => {
      this.models.set([]);
      this.carForm.get('modelId')!.reset('');

      if (brandId) {
        this.brandsService.getModelsByBrand(brandId).subscribe(models => {
          this.models.set(models);
          this.carForm.get('modelId')!.enable();
        });
      } else {
        this.carForm.get('modelId')!.disable();
      }
    });
  }

  onSubmit() {
    if (this.carForm.invalid) return;

    this.errorMsg.set(null);

    const { brandId, modelId, registrationDate, mileage, price,
            manufactureYear, currency, availability, color, description, licensePlate } = this.carForm.value;

    const payload = {
      brandId,
      modelId,
      carDetails: [{
        registrationDate: new Date(registrationDate!).toISOString(),
        mileage,
        price,
        manufactureYear,
        currency,
        availability,
        color,
        description,
        licensePlate
      }]
    };

    this.carsService.createCar(payload).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err) => {
        const msg = err?.error?.message ?? 'Error al crear el vehículo';
        this.errorMsg.set(msg);
      }
    });
  }
}
