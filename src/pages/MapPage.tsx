
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useProperties } from "@/hooks/useProperties";
import { useAuth } from "@/context/AuthContext";
import { useSeedProperties } from "@/hooks/useSeedProperties";
import PropertyMap from "@/components/PropertyMap";
import { PropertyWithImages } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const { user } = useAuth();
  const { properties, loading } = useProperties();
  const { seedProperties } = useSeedProperties();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      // Seed properties if user is logged in
      seedProperties(user.id);
    }
  }, [user]);

  const handlePropertySelect = (property: PropertyWithImages) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="container mx-auto flex-1 p-4">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <div className="bg-card p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Properties Map</h2>
              <p className="text-muted-foreground mb-4">
                Explore properties across Bangalore with our interactive map. Click on a property marker to view more details.
              </p>
              {!user && (
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="text-sm mb-2">Sign in to list your own property or save favorites.</p>
                  <Button onClick={() => navigate("/auth")} size="sm" className="w-full">
                    Sign In / Register
                  </Button>
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Showing {properties.length} properties in Bangalore region.</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 h-[70vh]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mb-2"></div>
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              </div>
            ) : (
              <PropertyMap 
                properties={properties} 
                onPropertySelect={handlePropertySelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
