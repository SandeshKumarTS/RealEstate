
import React from "react";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PropertyCardProps {
  property: Property;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="property-card group block">
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </AspectRatio>
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="bg-real-blue hover:bg-real-accent">
            {property.propertyType}
          </Badge>
        </div>
        {property.isFeatured && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="default" className="bg-real-dark">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xl font-bold text-real-dark">{formatPrice(property.price)}</span>
        </div>
        <h3 className="text-lg font-medium line-clamp-1 mb-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
          {property.address}, {property.city}, {property.state} {property.zip}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span>{property.bedrooms} bd</span>
            <span className="text-muted-foreground">|</span>
            <span>{property.bathrooms} ba</span>
            <span className="text-muted-foreground">|</span>
            <span>{property.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
