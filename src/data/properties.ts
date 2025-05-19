
import { Property } from "../types/property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    description: "Stunning modern apartment in the heart of downtown with amazing city views. This luxurious 2-bedroom, 2-bathroom apartment features high ceilings, floor-to-ceiling windows, and a spacious open floor plan. The gourmet kitchen is equipped with stainless steel appliances, granite countertops, and custom cabinetry. The master suite includes a walk-in closet and an ensuite bathroom with a soaking tub. Additional amenities include in-unit laundry, central air conditioning, and a private balcony.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    ],
    latitude: 30.2672,
    longitude: -97.7431,
    features: ["Balcony", "Gym", "Pool", "Pet Friendly", "In-unit Laundry"],
    propertyType: "apartment",
    yearBuilt: 2018,
    isFeatured: true
  },
  {
    id: "2",
    title: "Charming Suburban Home",
    address: "456 Oak Lane",
    city: "Round Rock",
    state: "TX",
    zip: "78664",
    price: 625000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    description: "Beautiful family home in a quiet suburban neighborhood. This spacious 4-bedroom, 3-bathroom house features a large living room with a fireplace, a formal dining room, and an updated eat-in kitchen with quartz countertops and a breakfast nook. The master suite boasts a luxurious bathroom with a double vanity, a walk-in shower, and a soaking tub. The backyard includes a covered patio, a BBQ area, and plenty of green space for outdoor activities.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5"
    ],
    latitude: 30.5083,
    longitude: -97.6789,
    features: ["Garage", "Fireplace", "Backyard", "Central AC", "Hardwood Floors"],
    propertyType: "house",
    yearBuilt: 2005
  },
  {
    id: "3",
    title: "Luxury Lakefront Villa",
    address: "789 Lakeview Drive",
    city: "Austin",
    state: "TX",
    zip: "78732",
    price: 1250000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    description: "Exquisite lakefront villa with breathtaking water views. This custom-built 5-bedroom, 4.5-bathroom luxury home features high-end finishes throughout, including marble floors, crown moldings, and designer light fixtures. The chef's kitchen is equipped with professional-grade appliances, a large island, and a walk-in pantry. The master suite offers a private balcony, a spa-like bathroom, and two walk-in closets. Additional highlights include a home theater, a wine cellar, and a home office with built-in bookshelves.",
    images: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    ],
    latitude: 30.3884,
    longitude: -97.9908,
    features: ["Waterfront", "Pool", "Hot Tub", "Home Theater", "Wine Cellar"],
    propertyType: "house",
    yearBuilt: 2015,
    isFeatured: true
  },
  {
    id: "4",
    title: "Downtown Loft Condo",
    address: "101 Congress Ave",
    city: "Austin",
    state: "TX",
    zip: "78701",
    price: 525000,
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 1050,
    description: "Stylish downtown loft with industrial-chic design. This unique 1-bedroom, 1.5-bathroom condo features exposed brick walls, concrete floors, and large factory windows offering abundant natural light. The open-concept living space includes a modern kitchen with a breakfast bar, high-end appliances, and custom cabinetry. The spacious bedroom includes a walk-in closet and an ensuite bathroom with a rainfall shower. Building amenities include a rooftop terrace, a fitness center, and 24-hour security.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    latitude: 30.2646,
    longitude: -97.7475,
    features: ["Exposed Brick", "High Ceilings", "24-hour Security", "Fitness Center", "Rooftop Terrace"],
    propertyType: "condo",
    yearBuilt: 2010
  },
  {
    id: "5",
    title: "Family-Friendly Townhouse",
    address: "202 Cedar St",
    city: "Austin",
    state: "TX",
    zip: "78702",
    price: 399000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1800,
    description: "Spacious townhouse in a family-friendly community. This modern 3-bedroom, 2.5-bathroom townhome features an open floor plan, a gourmet kitchen with a center island, and a cozy living room with a fireplace. The master bedroom includes an ensuite bathroom with a double vanity and a walk-in shower. The private fenced backyard offers a patio perfect for outdoor entertaining. Additional features include a two-car garage, energy-efficient appliances, and smart home technology.",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
    ],
    latitude: 30.2669,
    longitude: -97.7252,
    features: ["Garage", "Patio", "Smart Home", "Fireplace", "Fenced Yard"],
    propertyType: "townhouse",
    yearBuilt: 2019
  },
  {
    id: "6",
    title: "Historic Bungalow",
    address: "303 Elm Rd",
    city: "Austin",
    state: "TX",
    zip: "78704",
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1650,
    description: "Charming historic bungalow with modern updates. This beautifully restored 3-bedroom, 2-bathroom home features original hardwood floors, built-in bookshelves, and a cozy front porch. The updated kitchen includes quartz countertops, a farmhouse sink, and new appliances. The spacious backyard offers mature trees, a garden area, and a detached studio perfect for a home office or guest quarters. Located in a walkable neighborhood close to restaurants, shops, and parks.",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
      "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15"
    ],
    latitude: 30.2497,
    longitude: -97.7661,
    features: ["Historic", "Hardwood Floors", "Front Porch", "Garden", "Detached Studio"],
    propertyType: "house",
    yearBuilt: 1935
  }
];

export const availableFeatures = [
  "Balcony",
  "Garage",
  "Pool",
  "Pet Friendly", 
  "Gym",
  "In-unit Laundry",
  "Fireplace",
  "Backyard",
  "Central AC",
  "Hardwood Floors",
  "Waterfront",
  "Hot Tub",
  "Home Theater",
  "Wine Cellar",
  "Exposed Brick",
  "High Ceilings",
  "24-hour Security",
  "Fitness Center",
  "Rooftop Terrace",
  "Patio",
  "Smart Home",
  "Fenced Yard",
  "Historic",
  "Front Porch",
  "Garden",
  "Detached Studio"
];

export const getPropertiesInPriceRange = (min: number, max: number): Property[] => {
  return properties.filter(property => property.price >= min && property.price <= max);
};

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};
