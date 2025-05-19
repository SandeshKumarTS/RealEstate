
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import PropertyList from "@/components/PropertyList";
import PropertyFilter from "@/components/PropertyFilter";
import { Property, FilterOptions } from "@/types/property";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Listings = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFilterChange = (filters: FilterOptions) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = properties.filter(property => {
        // Price range filter
        if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
          return false;
        }
        
        // Bedrooms filter
        if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) {
          return false;
        }
        
        // Bathrooms filter
        if (filters.bathrooms !== null && property.bathrooms < filters.bathrooms) {
          return false;
        }
        
        // Property type filter
        if (filters.propertyType !== null && property.propertyType !== filters.propertyType) {
          return false;
        }
        
        // Features filter
        if (filters.features.length > 0) {
          const hasAllFeatures = filters.features.every(feature => 
            property.features.includes(feature)
          );
          if (!hasAllFeatures) {
            return false;
          }
        }
        
        return true;
      });
      
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
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
              <PropertyList properties={filteredProperties} isLoading={isLoading} />
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
