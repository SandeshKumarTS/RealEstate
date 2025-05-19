
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
  squareFeet: number | undefined;
  square_feet: number;
  description: string | null;
  images?: string[];
  latitude: number | null;
  longitude: number | null;
  features: string[] | null;
  propertyType?: 'house' | 'apartment' | 'condo' | 'townhouse';
  property_type: string;
  yearBuilt?: number | null;
  year_built: number | null;
  isFeatured?: boolean;
  is_featured?: boolean | null;
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface FilterOptions {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
  features: string[];
}
