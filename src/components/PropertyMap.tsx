
import React, { useRef, useEffect, useState } from 'react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PropertyWithImages } from '@/hooks/useProperties';

interface PropertyMapProps {
  properties: Property[] | PropertyWithImages[];
  onPropertySelect?: (property: Property | PropertyWithImages) => void;
  selectedPropertyId?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  onPropertySelect,
  selectedPropertyId 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      if (!window.L && !document.getElementById('leaflet-css')) {
        // Load Leaflet CSS
        const leafletCSS = document.createElement('link');
        leafletCSS.id = 'leaflet-css';
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCSS.crossOrigin = '';
        document.head.appendChild(leafletCSS);

        // Load Leaflet JS
        await new Promise<void>((resolve) => {
          const leafletScript = document.createElement('script');
          leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          leafletScript.crossOrigin = '';
          leafletScript.onload = () => resolve();
          document.head.appendChild(leafletScript);
        });
      }

      setMapLoaded(true);
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapContainer.current || !window.L) return;

    // Initialize map
    const map = window.L.map(mapContainer.current).setView([28.6139, 77.2090], 10); // Default to Delhi, India

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for properties
    const markers: any[] = [];
    const validProperties = properties.filter(property => 
      typeof property.latitude === 'number' && 
      typeof property.longitude === 'number'
    );

    if (validProperties.length > 0) {
      validProperties.forEach(property => {
        if (property.latitude && property.longitude) {
          const marker = window.L.marker([property.latitude, property.longitude])
            .addTo(map)
            .bindPopup(`<b>${property.title}</b><br>${property.address}`);
          
          marker.on('click', () => {
            if (onPropertySelect) {
              onPropertySelect(property);
            }
          });
          
          markers.push(marker);
        }
      });

      // Fit bounds to markers if we have any valid properties
      if (markers.length > 0) {
        const bounds = window.L.featureGroup(markers).getBounds();
        map.fitBounds(bounds, { padding: [30, 30] });
      }

      // Highlight selected property
      if (selectedPropertyId) {
        const selectedProperty = validProperties.find(p => p.id === selectedPropertyId);
        if (selectedProperty && selectedProperty.latitude && selectedProperty.longitude) {
          map.setView([selectedProperty.latitude, selectedProperty.longitude], 15);
        }
      }
    }

    return () => {
      map.remove();
    };
  }, [mapLoaded, properties, selectedPropertyId, onPropertySelect]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!mapLoaded) {
    return (
      <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="w-full h-full"></div>
      
      {/* Property markers display for invalid locations - simulation */}
      {properties.filter(property => !property.latitude || !property.longitude).length > 0 && (
        <div className="absolute bottom-4 right-4 bg-card p-3 rounded-md shadow-md max-w-xs">
          <p className="text-xs text-muted-foreground">
            Some properties don't have valid coordinates and aren't shown on the map.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
