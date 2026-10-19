export interface Vehicle {
  id: string;
  brand: { id: string; name: string };
  model: { id: string; name: string };
  total: number;
  imageUrl?: string;
}

export interface VehicleListResponse {
  items: Vehicle[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface VehicleQuery {
  page: number;
  limit: number;
  search?: string;
  brand?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

