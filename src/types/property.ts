
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
  features: string[];
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse';
  yearBuilt: number;
  isFeatured?: boolean;
}

export interface FilterOptions {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
  features: string[];
}
