
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";

// Sample properties data for Bangalore
const bangaloreProperties = [
  {
    title: "Luxury Villa in Koramangala",
    description: "Beautiful 4BHK villa with modern amenities in a gated community with 24/7 security. Features include a private garden, swimming pool, and home theater.",
    address: "19, 4th Cross, Koramangala 3rd Block",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560034",
    price: 12500000,
    bedrooms: 4,
    bathrooms: 4.5,
    square_feet: 3200,
    year_built: 2018,
    property_type: "house",
    latitude: 12.9347,
    longitude: 77.6172,
    features: ["Swimming Pool", "Garden", "Home Theater", "Security", "Modular Kitchen", "Gym"],
    is_featured: true,
  },
  {
    title: "Modern Apartment in Indiranagar",
    description: "Spacious 3BHK apartment with premium finishes and large balconies. Located near Indiranagar Metro Station with excellent connectivity to IT hubs.",
    address: "74, 12th Main, HAL 2nd Stage, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560038",
    price: 8500000,
    bedrooms: 3,
    bathrooms: 3,
    square_feet: 1800,
    year_built: 2020,
    property_type: "apartment",
    latitude: 12.9784,
    longitude: 77.6408,
    features: ["Balcony", "Gym", "Covered Parking", "24x7 Water Supply", "Power Backup", "Children's Play Area"],
    is_featured: true,
  },
  {
    title: "Premium Villa in Whitefield",
    description: "Luxurious 5BHK villa in Prestige Golfshire with panoramic views of the golf course. Perfect for families looking for luxury and comfort.",
    address: "Prestige Golfshire, Nandi Hills Road, Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560067",
    price: 25000000,
    bedrooms: 5,
    bathrooms: 5.5,
    square_feet: 4500,
    year_built: 2019,
    property_type: "house",
    latitude: 13.1052,
    longitude: 77.7266,
    features: ["Golf Course View", "Private Pool", "Smart Home", "Wine Cellar", "Movie Theater", "Jacuzzi"],
    is_featured: true,
  },
  {
    title: "Affordable 2BHK in Electronic City",
    description: "Well-maintained 2BHK apartment close to major IT parks. Perfect for working professionals with all necessary amenities.",
    address: "42, Neeladri Road, Electronic City Phase 1",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560100",
    price: 4500000,
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1200,
    year_built: 2015,
    property_type: "apartment",
    latitude: 12.8399,
    longitude: 77.6770,
    features: ["Security", "Park", "Gym", "Parking", "Children's Play Area"],
    is_featured: false,
  },
  {
    title: "Penthouse in Central Bangalore",
    description: "Exclusive penthouse with 360-degree views of the city skyline. Featuring luxury finishes and a private terrace garden.",
    address: "UB City, Vittal Mallya Road",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560001",
    price: 35000000,
    bedrooms: 4,
    bathrooms: 4.5,
    square_feet: 3800,
    year_built: 2017,
    property_type: "apartment",
    latitude: 12.9719,
    longitude: 77.5968,
    features: ["Terrace Garden", "Private Elevator", "Home Automation", "City View", "Concierge Service"],
    is_featured: true,
  },
  {
    title: "Cozy 3BHK in JP Nagar",
    description: "Family-friendly 3BHK apartment in a quiet residential area with good schools nearby and excellent amenities.",
    address: "28, 15th Cross, JP Nagar 6th Phase",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560078",
    price: 7200000,
    bedrooms: 3,
    bathrooms: 3,
    square_feet: 1650,
    year_built: 2016,
    property_type: "apartment",
    latitude: 12.9077,
    longitude: 77.5831,
    features: ["School Nearby", "Park", "Gym", "Swimming Pool", "Children's Play Area"],
    is_featured: false,
  }
];

export const useSeedProperties = () => {
  const [seeding, setSeeding] = useState(false);
  const [complete, setComplete] = useState(false);

  const seedProperties = async (userId: string) => {
    if (seeding || complete) return;
    
    setSeeding(true);
    
    try {
      // Check if properties already exist to avoid duplicates
      const { data: existingProperties } = await supabase
        .from("properties")
        .select("title")
        .limit(1);
        
      if (existingProperties && existingProperties.length > 0) {
        setComplete(true);
        setSeeding(false);
        return;
      }

      // Add sample properties
      for (const property of bangaloreProperties) {
        // Insert the property
        const { data: propertyData, error: propertyError } = await supabase
          .from("properties")
          .insert({
            ...property,
            user_id: userId
          })
          .select("id")
          .single();

        if (propertyError) {
          console.error("Error inserting property:", propertyError);
          continue;
        }

        const propertyId = propertyData.id;

        // Create a mock image path for each property
        const imagePath = `sample/${propertyId}/sample-property.jpg`;

        // Insert a reference to the property_images table
        await supabase
          .from("property_images")
          .insert({
            property_id: propertyId,
            storage_path: `sample/${propertyId}/sample-property.jpg`,
            is_primary: true
          });
      }

      setComplete(true);
      toast.success("Sample properties added successfully!");
    } catch (error) {
      console.error("Error seeding properties:", error);
    } finally {
      setSeeding(false);
    }
  };

  return { seedProperties, seeding, complete };
};
