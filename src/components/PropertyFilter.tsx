
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterOptions } from "@/types/property";
import { availableFeatures } from "@/data/properties";

interface PropertyFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const formatPriceLabel = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(price);
};

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([250000, 1000000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      bedrooms,
      bathrooms,
      propertyType,
      features: selectedFeatures,
    });
  };

  const resetFilters = () => {
    setPriceRange([250000, 1000000]);
    setBedrooms(null);
    setBathrooms(null);
    setPropertyType(null);
    setSelectedFeatures([]);
    
    onFilterChange({
      priceRange: [250000, 1000000],
      bedrooms: null,
      bathrooms: null,
      propertyType: null,
      features: [],
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Price Range</Label>
            <div className="text-sm text-gray-500">
              {formatPriceLabel(priceRange[0])} - {formatPriceLabel(priceRange[1])}
            </div>
          </div>
          <Slider
            defaultValue={[250000, 1000000]}
            min={100000}
            max={2000000}
            step={50000}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="my-6"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select
              value={bedrooms?.toString() || undefined}
              onValueChange={(value) => setBedrooms(value ? parseInt(value) : null)}
            >
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select
              value={bathrooms?.toString() || undefined}
              onValueChange={(value) => setBathrooms(value ? parseInt(value) : null)}
            >
              <SelectTrigger id="bathrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select
            value={propertyType || undefined}
            onValueChange={(value) => setPropertyType(value || null)}
          >
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="block mb-2">Features</Label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
            {availableFeatures.slice(0, 10).map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature}`}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                />
                <label
                  htmlFor={`feature-${feature}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
          <Button variant="outline" onClick={resetFilters} className="w-full">Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
