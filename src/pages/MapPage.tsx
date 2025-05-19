
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import PropertyMap from "@/components/PropertyMap";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import { Property, FilterOptions } from "@/types/property";
import { properties } from "@/data/properties";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MapPage = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filters: FilterOptions) => {
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
    if (filtered.length > 0) {
      setSelectedPropertyId(filtered[0].id);
    } else {
      setSelectedPropertyId(undefined);
    }
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedPropertyId(property.id);
  };

  const selectedProperty = filteredProperties.find(p => p.id === selectedPropertyId);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Property Map</h1>
              <p className="text-muted-foreground">
                Explore {filteredProperties.length} properties on the map
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button asChild variant="outline">
                <Link to="/listings">View List</Link>
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mb-6">
              <PropertyFilter onFilterChange={handleFilterChange} />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
            <div className="lg:col-span-2 h-full">
              <PropertyMap 
                properties={filteredProperties} 
                onPropertySelect={handlePropertySelect} 
                selectedPropertyId={selectedPropertyId}
              />
            </div>
            
            <div className="h-full overflow-y-auto border rounded-lg bg-white">
              <Tabs defaultValue="properties" className="w-full">
                <div className="p-4 border-b">
                  <TabsList className="w-full">
                    <TabsTrigger value="properties" className="flex-1">Properties</TabsTrigger>
                    <TabsTrigger value="selected" className="flex-1">Selected</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="properties" className="p-4">
                  {filteredProperties.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No properties match your filters.</p>
                      <Button 
                        variant="link" 
                        onClick={() => handleFilterChange({
                          priceRange: [100000, 2000000],
                          bedrooms: null,
                          bathrooms: null,
                          propertyType: null,
                          features: []
                        })}
                      >
                        Reset filters
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredProperties.map(property => (
                        <div 
                          key={property.id}
                          onClick={() => handlePropertySelect(property)}
                          className={`cursor-pointer border rounded transition-colors ${
                            selectedPropertyId === property.id ? 'border-real-blue' : 'border-transparent'
                          }`}
                        >
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="selected" className="p-4">
                  {selectedProperty ? (
                    <div>
                      <PropertyCard property={selectedProperty} />
                      <div className="mt-4">
                        <Button asChild className="w-full">
                          <Link to={`/property/${selectedProperty.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No property selected.</p>
                      <p className="text-muted-foreground">Click on a map marker to view details.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RealEstate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MapPage;
