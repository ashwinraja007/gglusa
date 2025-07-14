import React, { useState } from "react";
type LocationKey = "NewYork" | "LosAngeles";
const LocationsSection: React.FC = () => {
  const [location, setLocation] = useState<LocationKey>("NewYork");
  const [showDetails, setShowDetails] = useState(true);
  const mapIframes: Record<LocationKey, string> = {
    NewYork: "https://www.google.com/maps/d/u/0/embed?mid=1WjWYKoN9Ce3enb8smz4GV3J9pVMJUhg&ehbc=2E312F&noprof=1",
    LosAngeles: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.276742654!2d-118.24532502348!3d33.9394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c9234567890!2s2250%20S%20Central%20Ave%2C%20Compton%2C%20CA%2090220%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
  };
  const locationDetails: Record<LocationKey, {
    address: string;
    phone: string;
    email: string;
  }> = {
    NewYork: {
      address: `New Jersey Branch
33 Wood Avenue South
Suite 600, Iselin, NJ 08830`,
      phone: `+1 732 456 6780`,
      email: `info@gglusa.us`
    },
    LosAngeles: {
      address: `2250 South Central Avenue
Compton, CA 90220`,
      phone: `+1 310 928 3903`,
      email: `info@gglusa.us`
    }
  };
  const locations = [{
    key: "NewYork",
    label: "New York"
  }, {
    key: "LosAngeles",
    label: "Los Angeles"
  }];
  return <section className="py-12 bg-white relative">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-gray-800">
          Visit Our Locations
        </h2>
        <p className="text-lg text-gray-600">
          Find us at our convenient office locations across USA
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4">
        {/* Location Selector */}
        <div className="w-full md:w-[30%] p-6 shadow rounded-lg flex flex-col gap-4 bg-slate-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Select Location</h3>
          {locations.map(({
          key,
          label
        }) => <button key={key} onClick={() => {
          setLocation(key as LocationKey);
          setShowDetails(true);
        }} className={`p-4 text-left border rounded transition-all duration-200 ${location === key ? "bg-blue-900 text-white border-blue-900" : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"}`}>
              {label}
            </button>)}
        </div>

        {/* Address First, Then Map */}
        <div className="w-full md:w-[70%] space-y-6">
          {/* Address Section */}
          {showDetails && <div className="transition-all duration-500 p-6 border border-gray-300 rounded-lg shadow-sm bg-slate-100">
              <h4 className="text-xl font-bold text-gray-800 mb-2">OUR OFFICE</h4>
              <p className="whitespace-pre-line text-gray-700 mb-4">{locationDetails[location].address}</p>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Phone:</h4>
              <p className="whitespace-pre-line text-gray-700 mb-4">{locationDetails[location].phone}</p>
              <h4 className="text-xl font-bold text-gray-800 mb-2">E-MAIL US:</h4>
              <p className="whitespace-pre-line text-gray-700">{locationDetails[location].email}</p>
            </div>}

          {/* Map Section */}
          <div className="relative shadow-2xl rounded-lg overflow-hidden h-[480px]">
            <div className="absolute top-0 left-0 w-full h-[80px] bg-white z-20"></div>
            <div className="absolute top-0 left-0 w-full text-center font-semibold text-black py-2 z-30 bg-[#f6b100]">
              GGL - {location} Location
            </div>
            <iframe src={mapIframes[location]} width="100%" height="100%" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${location} Map`} className="absolute top-0 left-0 w-full h-full z-10" />
          </div>
        </div>
      </div>
    </section>;
};
export default LocationsSection;
