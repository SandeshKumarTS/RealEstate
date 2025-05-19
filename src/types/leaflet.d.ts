
// Type definitions for Leaflet that's dynamically loaded
declare global {
  interface Window {
    L: {
      map: (container: HTMLElement, options?: any) => any;
      tileLayer: (url: string, options?: any) => any;
      marker: (coordinates: [number, number]) => any;
      featureGroup: (markers: any[]) => any;
      latLng: (lat: number, lng: number) => any;
    };
  }
}

export {};
