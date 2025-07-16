
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';

interface CountryData {
  country: string;
  company: string;
  website: string;
  priority: number;
  flag?: string;
}

const countries: CountryData[] = [
  { country: "SINGAPORE", company: "GGL", website: "https://ggl.sg/", priority: 1, flag: "/sg.svg" },
  { country: "MALAYSIA", company: "OECL", website: "https://www.oecl.sg/malaysia/home", priority: 3, flag: "/my.svg" },
  { country: "INDONESIA", company: "OECL", website: "https://www.oecl.sg/indonesia/home", priority: 6, flag: "/id.svg" },
  { country: "THAILAND", company: "OECL", website: "https://www.oecl.sg/thailand/home", priority: 4, flag: "/th.svg" },
  { country: "MYANMAR", company: "GC", website: "https://www.globalconsol.com", priority: 5, flag: "/mm.svg" },
  { country: "AUSTRALIA", company: "GGL Aus", website: "https://www.gglaustralia.com", priority: 7, flag: "/au.svg" },
  { country: "BANGLADESH", company: "GC", website: "https://www.globalconsol.com", priority: 9, flag: "/bd.svg" },
  { country: "SRI LANKA", company: "GC", website: "https://www.globalconsol.com", priority: 10, flag: "/lk.svg" },
  { country: "PAKISTAN", company: "GC", website: "https://www.globalconsol.com", priority: 11, flag: "/pk.svg" },
  { country: "QATAR", company: "ONE G", website: "https://oneglobalqatar.com/", priority: 12, flag: "/qa.svg" },
  { country: "SAUDI ARABIA", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 13, flag: "/sa.svg" },
  { country: "UAE", company: "AMASS", website: "https://amassmiddleeast.com/", priority: 14, flag: "/ae.svg" },
  { country: "UK", company: "MOLTECH", website: "https://moltech.uk/", priority: 16, flag: "/gb.svg" }
];

// Find Australia in the countries list
const findAustraliaCountry = () => {
  return countries.find(country => country.country === "AUSTRALIA") || countries[0];
};

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sort countries by priority, with Australia first
  const sortedCountries = [...countries].sort((a, b) => {
    if (a.country === "AUSTRALIA") return -1;
    if (b.country === "AUSTRALIA") return 1;
    return a.priority - b.priority;
  });

  // Improved and more reliable redirect function with multiple fallbacks
  const handleCountrySelect = (country: CountryData) => {
    // Format URL properly
    let url = country.website;
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    console.log("Redirecting to:", url);
    
    // Close dropdown first to improve user experience
    setIsOpen(false);
    
    // Wait a moment after closing dropdown to ensure UI updates before redirect
    setTimeout(() => {
      // Method 1: Try window.open first (most reliable for new tabs)
      try {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        // If window.open succeeded and wasn't blocked, we're done
        if (newWindow && !newWindow.closed) {
          return;
        }
      } catch (e) {
        console.log("window.open failed, trying alternative method");
      }
      
      // Method 2: Create a hidden link and programmatically click it
      try {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Use a MouseEvent to simulate a more natural click
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        link.dispatchEvent(clickEvent);
        
        // Cleanup the DOM
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 100);
      } catch (e) {
        console.log("Link click simulation failed, using location as last resort");
        
        // Method 3: Last resort - direct location change
        // This is less ideal as it navigates away from the current page
        window.location.href = url;
      }
    }, 50); // Small delay to ensure the dropdown closes first
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="border-[#F6B100] bg-white text-gray-800 hover:bg-[#F6B100]/10 px-4 py-2 rounded-full flex items-center gap-2"
          >
            {/* Show globe icon instead of Australia flag */}
            <Globe className="w-6 h-6 text-[#F6B100]" />
            <span className="flex items-center gap-1">
              Switch Country <ChevronDown className="h-3 w-3 ml-1 text-gray-500" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
  align="center" 
  className="w-[280px] border border-amber-100 bg-white p-2 rounded-lg shadow-lg"
>
  <ScrollArea
  className="h-[300px] w-full pr-2"
  onPointerDown={(e) => e.stopPropagation()}
>
  <div className="grid grid-cols-1 gap-1 p-1">
    {sortedCountries.map((country) => (
      <div
        key={country.country}
        className="cursor-pointer hover:bg-amber-50 p-2 rounded-md flex items-center gap-2"
        onClick={() => handleCountrySelect(country)}
      >
        <div className="flex items-center">
          <img
            src={country.flag}
            alt={country.country}
            className="w-6 h-6 rounded-sm shadow-sm"
          />
          <div className="ml-3">
            <div className="text-sm font-medium">{country.country}</div>
            <div className="text-xs text-gray-500">{country.company}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</ScrollArea>

</DropdownMenuContent>

      </DropdownMenu>
    </div>
  );
};

export default CountrySelector;
