
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import PropertyList from "@/components/PropertyList";
import { properties } from "@/data/properties";

const Index = () => {
  // Get featured properties
  const featuredProperties = properties.filter(property => property.isFeatured);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 bg-real-blue/10 border-b">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-4 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Find Your Dream Home
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our carefully selected properties and find the perfect place to call home.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
              <Button asChild size="lg">
                <Link to="/listings">Browse Properties</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/map">View Map</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
              alt="Luxury home"
              className="rounded-lg shadow-lg object-cover"
              width={500}
              height={400}
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-sm">Available Now</span>
              </div>
              <p className="text-sm text-muted-foreground">
                New listings added every week. Don't miss out!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Properties</h2>
              <p className="text-muted-foreground">
                Explore our handpicked selection of premium properties
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/listings">View All</Link>
            </Button>
          </div>
          
          <PropertyList properties={featuredProperties.length ? featuredProperties : properties.slice(0, 3)} />
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Why Choose RealEstate</h2>
            <p className="text-muted-foreground mt-2">
              We make finding your perfect property simple and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-real-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Smart Search</h3>
                <p className="text-muted-foreground">
                  Find the perfect property with our advanced filters and search tools.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-real-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Verified Listings</h3>
                <p className="text-muted-foreground">
                  All our properties are carefully verified for your peace of mind.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-real-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Expert Support</h3>
                <p className="text-muted-foreground">
                  Our real estate experts are always available to assist you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 bg-real-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to find your dream home?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Browse our extensive collection of properties and find the perfect place for you and your family.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/listings">Start Browsing</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-real-blue mb-4">RealEstate</h3>
              <p className="text-muted-foreground max-w-xs">
                Finding your dream home has never been easier.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-muted-foreground hover:text-real-blue">Home</Link></li>
                  <li><Link to="/listings" className="text-muted-foreground hover:text-real-blue">Listings</Link></li>
                  <li><Link to="/map" className="text-muted-foreground hover:text-real-blue">Map</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-real-blue">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-real-blue">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-muted-foreground">info@realestate.com</li>
                  <li className="text-muted-foreground">(123) 456-7890</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} RealEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
