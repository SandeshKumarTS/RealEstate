
import React from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPropertyById } from "@/data/properties";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || "");

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/listings">Back to Listings</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Link to="/listings" className="text-sm text-muted-foreground hover:text-real-blue">
              Listings
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium truncate">{property.title}</span>
          </div>
          
          <div className="mb-8">
            <ImageGallery images={property.images} title={property.title} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">{property.title}</h1>
                  <Badge className="bg-real-blue">{property.propertyType}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {property.address}, {property.city}, {property.state} {property.zip}
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{property.squareFeet.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Sq Ft</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{property.yearBuilt}</div>
                    <div className="text-sm text-muted-foreground">Year Built</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">About This Property</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {property.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-real-blue">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
                  <p className="text-muted-foreground text-sm">
                    Map would be displayed here with Mapbox integration
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-real-blue mb-1">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-muted-foreground">
                      {Math.round(property.price / property.squareFeet).toLocaleString()} per sqft
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full">Contact Agent</Button>
                    <Button variant="outline" className="w-full">Schedule Tour</Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Listing Agent</div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted"></div>
                        <div>
                          <div className="font-medium">John Smith</div>
                          <div className="text-sm text-muted-foreground">Real Estate Agent</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Contact</div>
                      <div className="text-sm">
                        <div className="mb-1">john@realestate.com</div>
                        <div>(123) 456-7890</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

export default PropertyDetail;
