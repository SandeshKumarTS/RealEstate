
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export interface DBProperty {
  id: string;
  user_id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  description: string | null;
  property_type: string;
  year_built: number | null;
  latitude: number | null;
  longitude: number | null;
  features: string[] | null;
  is_featured: boolean;
  owner_name: string | null;
  owner_phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyWithImages extends DBProperty {
  images: string[];
}

export const useProperties = (filters?: any) => {
  const [properties, setProperties] = useState<PropertyWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Build query based on filters
        let query = supabase
          .from("properties")
          .select("*");

        // Apply filters if they exist
        if (filters) {
          if (filters.priceRange && filters.priceRange[0] !== undefined) {
            query = query.gte("price", filters.priceRange[0]);
          }
          if (filters.priceRange && filters.priceRange[1] !== undefined) {
            query = query.lte("price", filters.priceRange[1]);
          }
          if (filters.bedrooms) {
            query = query.gte("bedrooms", filters.bedrooms);
          }
          if (filters.bathrooms) {
            query = query.gte("bathrooms", filters.bathrooms);
          }
          if (filters.propertyType) {
            query = query.eq("property_type", filters.propertyType);
          }
          // Features filter is more complex and would need a different approach
        }

        const { data: propertiesData, error: propertiesError } = await query;

        if (propertiesError) throw propertiesError;

        // For each property, fetch its images
        const propertiesWithImages = await Promise.all(
          (propertiesData || []).map(async (property: DBProperty) => {
            const { data: imagesData, error: imagesError } = await supabase
              .from("property_images")
              .select("storage_path")
              .eq("property_id", property.id);

            if (imagesError) throw imagesError;

            const images = imagesData.map(img => {
              const { data } = supabase.storage
                .from("property_images")
                .getPublicUrl(img.storage_path);
              return data.publicUrl;
            });

            return {
              ...property,
              images: images.length ? images : ["/placeholder.svg"],
            };
          })
        );

        setProperties(propertiesWithImages);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err as Error);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  return { properties, loading, error };
};

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<PropertyWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        const { data: propertyData, error: propertyError } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (propertyError) throw propertyError;

        const { data: imagesData, error: imagesError } = await supabase
          .from("property_images")
          .select("storage_path")
          .eq("property_id", id);

        if (imagesError) throw imagesError;

        const images = imagesData.map(img => {
          const { data } = supabase.storage
            .from("property_images")
            .getPublicUrl(img.storage_path);
          return data.publicUrl;
        });

        setProperty({
          ...propertyData,
          images: images.length ? images : ["/placeholder.svg"],
        });
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err as Error);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};
