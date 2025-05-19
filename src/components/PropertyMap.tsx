
import React, { useRef, useEffect, useState } from 'react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  selectedPropertyId?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  onPropertySelect,
  selectedPropertyId 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  // This is a placeholder for the actual Mapbox implementation
  // In a real application, you would load the Mapbox GL JS library
  // and initialize a map with the property locations
  
  const [showMapTokenInput, setShowMapTokenInput] = useState(true);

  useEffect(() => {
    // This effect would normally initialize the map
    // when the component mounts and the token is available
    if (mapApiLoaded && mapboxToken && mapContainer.current) {
      // Here you would initialize Mapbox
      console.log("Initializing map with token:", mapboxToken);
    }
  }, [mapApiLoaded, mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapboxToken') as string;
    if (token) {
      setMapboxToken(token);
      setShowMapTokenInput(false);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border">
      {showMapTokenInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Mapbox API Token Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To display the property map, please enter your Mapbox public token.
              You can find this in your Mapbox account dashboard.
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="mapboxToken" className="text-sm font-medium">
                  Mapbox Public Token
                </label>
                <input
                  id="mapboxToken"
                  name="mapboxToken"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="pk.eyJ1Ijoi..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  Load Map
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="w-full h-full">
            {/* Placeholder for the map that would be rendered by Mapbox */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Map would load here with proper Mapbox integration
              </p>
            </div>
          </div>
          
          {/* Property markers simulation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto
                    ${property.id === selectedPropertyId ? 'z-10' : 'z-0'}`}
                  style={{
                    // Position markers using relative coordinates for the simulation
                    left: `${(property.longitude + 98) * 10}%`,
                    top: `${(31 - property.latitude) * 10}%`,
                  }}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={property.id === selectedPropertyId ? "default" : "outline"}
                        className={`h-8 w-8 rounded-full p-0 ${
                          property.id === selectedPropertyId 
                            ? 'bg-real-blue text-white' 
                            : 'bg-white'
                        }`}
                        onClick={() => onPropertySelect?.(property)}
                      >
                        <span className="sr-only">View property</span>
                        ${property.price / 100000}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0">
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold">{property.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.address}, {property.city}
                        </p>
                        <p className="font-medium text-real-blue mt-1">
                          {formatPrice(property.price)}
                        </p>
                        <div className="flex text-xs mt-1">
                          <span>{property.bedrooms} bd</span>
                          <span className="mx-1">|</span>
                          <span>{property.bathrooms} ba</span>
                          <span className="mx-1">|</span>
                          <span>{property.squareFeet.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyMap;
