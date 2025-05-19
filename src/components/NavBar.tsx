
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, Map, User } from "lucide-react";

const NavBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-real-blue">RealEstate</h1>
            <IndianRupee size={20} className="ml-1 text-real-blue" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-real-blue transition-colors">
              Home
            </Link>
            <Link to="/listings" className="text-sm font-medium hover:text-real-blue transition-colors">
              Listings
            </Link>
            <Link to="/map" className="text-sm font-medium hover:text-real-blue transition-colors">
              <div className="flex items-center gap-1">
                <Map size={16} />
                <span>Map</span>
              </div>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-60">
            <Input
              type="search"
              placeholder="Search properties..."
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-muted-foreground"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-1">
            <User size={16} />
            <span>Sign In</span>
          </Button>
          <Button>Contact Agent</Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
