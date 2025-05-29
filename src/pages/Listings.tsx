
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import PropertyList from "@/components/PropertyList";
import PropertyFilter from "@/components/PropertyFilter";
import { Property, FilterOptions } from "@/types/property";
import { useProperties } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Listings = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    bedrooms: null,
    bathrooms: null,
    propertyType: null,
    features: [],
  });
  
  const { properties, loading: isLoading } = useProperties(filters);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Property Listings</h1>
              <p className="text-muted-foreground">
                Find your perfect property from our {properties.length} available listings
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/map">View Map</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <PropertyFilter onFilterChange={handleFilterChange} />
            </div>
            
            <div className="lg:col-span-3">
              <PropertyList properties={properties} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RealEstate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Listings;
