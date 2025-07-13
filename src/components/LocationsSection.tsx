import React, { useState } from "react";
type LocationKey = "Chennai" | "NaviMumbai" | "Delhi" | "Bangalore" | "Kolkata";
const LocationsSection: React.FC = () => {
  const [location, setLocation] = useState<LocationKey>("Chennai");
  const [showDetails, setShowDetails] = useState(true);
  const mapIframes: Record<LocationKey, string> = {
    Chennai: "https://www.google.com/maps/d/embed?mid=12Rtb_hQeXud-j4o3tW86ldm7Pk8yLk0&ehbc=2E312F&noprof=1",
    NaviMumbai: "https://www.google.com/maps/d/embed?mid=1S_e0QPhCx7XJpSpngt-uoCrhWZQApqw&ehbc=2E312F&noprof=1",
    Delhi: "https://www.google.com/maps/d/embed?mid=1BB5XPTfJLKxYbhz8G4m8LdKzN5LQi3o&ehbc=2E312F&noprof=1",
    Bangalore: "https://www.google.com/maps/d/embed?mid=1kvFU6arJH18wWA5qi9b2NJ-ci4ExfZA&ehbc=2E312F&noprof=1",
    Kolkata: "https://www.google.com/maps/d/embed?mid=1WkGohVbKN6TZsllkoDWeEWF4TV2bQt0&ehbc=2E312F&noprof=1"
  };
  const locationDetails: Record<LocationKey, {
    address: string;
    phone: string;
  }> = {
    Chennai: {
      address: `Old No G1, New G3, KAIZEN 2nd & 3rd Floor,
Plot No. 565Q, G Block, Annanagar East,
Chennai, Tamil Nadu - 600102`,
      phone: `+91 9123523496`
    },
    NaviMumbai: {
      address: `407, MAYURESH PLANET, PLOT NO - 42 & 43,
SECTOR-15, CBD BELAPUR,
NAVI MUMBAI, MAHARASHTRA - 400614`,
      phone: `Export Customer Service:
+91 2245174102, +91 2245174109, +91 2245174118

Export Docs Team:
+91 2245174103, +91 2245174105

Import Docs Team:
+91 2245174104, +91 2245174106

Import Customer Service:
+91 2245174113, +91 2245174110, +91 2245174107, +91 2245174112`
    },
    Delhi: {
      address: `JA 511, DLF Tower A,
Jasola District Centre, New Delhi - 110025`,
      phone: `+91 9999022030`
    },
    Bangalore: {
      address: `No 2M-216, First Floor,
2nd Main, East Of NGEF Layout,
Kasturinagar, Bangalore - 560043`,
      phone: `+91 9986949743`
    },
    Kolkata: {
      address: `Room No - 29, 4th Floor,
6, Jawaharlal Nehru Rd, Siddha Esplanade,
Adjacent to Metro Central (Previously Metro Cinema),
Kolkata, West Bengal - 700013`,
      phone: `+91 6290921534`
    }
  };
  const locations = [{
    key: "Chennai",
    label: "Chennai"
  }, {
    key: "NaviMumbai",
    label: "Navi Mumbai"
  }, {
    key: "Delhi",
    label: "Delhi"
  }, {
    key: "Bangalore",
    label: "Bangalore"
  }, {
    key: "Kolkata",
    label: "Kolkata"
  }];
  return <section className="py-12 bg-white relative">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-gray-800">
          Visit Our Locations
        </h2>
        <p className="text-lg text-gray-600">
          Find us at our convenient office locations across India
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
              <h4 className="text-xl font-bold text-gray-800 mb-2">Address:</h4>
              <p className="whitespace-pre-line text-gray-700 mb-4">{locationDetails[location].address}</p>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Phone:</h4>
              <p className="whitespace-pre-line text-gray-700">{locationDetails[location].phone}</p>
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