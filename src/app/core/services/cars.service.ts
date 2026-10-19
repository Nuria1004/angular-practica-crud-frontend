import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleListResponse, VehicleQuery } from '../../models/vehicle.model';


@Injectable({ providedIn: 'root' })
export class CarsService {
  private http = inject(HttpClient);

getCars(query?: VehicleQuery): Observable<VehicleListResponse> {
    let params = new HttpParams();
    if (query) {
      if (query.page)      params = params.set('page', query.page);
      if (query.limit)     params = params.set('limit', query.limit);
      if (query.search)    params = params.set('search', query.search);
      if (query.brand)     params = params.set('brand', query.brand);
      if (query.sortBy)    params = params.set('sortBy', query.sortBy);
      if (query.sortOrder) params = params.set('sortOrder', query.sortOrder);
    }
    return this.http.get<VehicleListResponse>('/api/cars', { params, withCredentials: true });
  }
  
  createCar(payload: any): Observable<Vehicle> {
    return this.http.post<Vehicle>('/api/cars', payload, { withCredentials: true });
  }
}