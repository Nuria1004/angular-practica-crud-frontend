import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BrandsService {
  private http = inject(HttpClient);

  getBrands() {
    return this.http.get<{id: string, name: string}[]>('/api/brands', { withCredentials: true });
  }

  getModelsByBrand(brandId: string) {
    return this.http.get<{id: string, name: string}[]>(`/api/brands/${brandId}/models`, { withCredentials: true });
  }
}