import React, { useState, useEffect, useRef } from 'react';
import { fetchProductAndServiceDetailBySearch } from '../api/searchProduct';
import { Search as SearchIcon } from 'lucide-react';

let debounceTimer: ReturnType<typeof setTimeout>;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('All services');
  const [results, setResults] = useState<
    { productName: string; services: { id: string; servicename: string }[] }[]
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleSearch(value);
    }, 600);
  };

  // Trigger search when selectedService changes
  useEffect(() => {
    if (searchQuery.trim()) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300);
    }
  }, [selectedService]);

  // Fetch logic (with optional custom input string)
  const handleSearch = async (query?: string) => {
    const searchTerm = (query ?? searchQuery).trim();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const data = await fetchProductAndServiceDetailBySearch(searchTerm);

      let filtered = data;
      if (selectedService !== 'All services') {
        filtered = data.filter(item =>
          item.services.some(service => service.servicename === selectedService)
        );
      }

      setResults(filtered);
      setDropdownOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-50" ref={wrapperRef}>
      {/* Search Box */}
      <div className="flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="pl-4 text-gray-300">
          <SearchIcon className="w-4 h-4" />
        </div>

        <input
          type="text"
          placeholder="Search services, products..."
          className="flex-grow px-4 py-2 text-sm text-white placeholder-gray-300 bg-transparent"
          value={searchQuery}
          onChange={handleInputChange}
        />

        <select
          className="bg-transparent text-sm text-white px-3 py-2 outline-none border-none focus:ring-0 cursor-pointer"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option className='bg-black text-white'>All services</option>
          <option className='bg-black text-white'>Account</option>
          <option className='bg-black text-white'>Gift Card</option>
          <option className='bg-black text-white'>CS2 Boosting</option>
        </select>

        <button
          onClick={() => handleSearch()}
          className="bg-gradient-to-r from-cyan-500 to-blue-700 p-3 rounded-full hover:from-cyan-600 hover:to-blue-800 transition-colors"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.41-1.41l4.58 4.58a1 1 0 01-1.42 1.42l-4.57-4.59zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Panel */}
      {/* {dropdownOpen && results.length > 0 && (
        <div className="absolute z-50 w-full bg-zinc-900/90 border border-white/10 backdrop-blur-md rounded-xl shadow-lg max-h-96 overflow-y-auto mt-2">
          {loading ? (
            <div className="p-4 text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-white/5 hover:bg-white/10 transition p-3 rounded-lg"
                >
                  <p
                    className="font-semibold text-sm text-white truncate"
                    title={item.productName}
                  >
                    {item.productName}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.services.map((service, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-cyan-700/80 text-white px-3 py-1 rounded-full truncate"
                        title={service.servicename}
                      >
                        {service.servicename}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}
      {dropdownOpen && (
        <div className="absolute z-50 w-full bg-zinc-900/90 border border-white/10 backdrop-blur-md rounded-xl shadow-lg max-h-96 overflow-y-auto mt-2">
          {loading ? (
            <div className="p-4 text-gray-400">Loading...</div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-white/5 hover:bg-white/10 transition p-3 rounded-lg"
                >
                  <p
                    className="font-semibold text-sm text-white truncate"
                    title={item.productName}
                  >
                    {item.productName}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.services.map((service, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-cyan-700/80 text-white px-3 py-1 rounded-full truncate"
                        title={service.servicename}
                      >
                        {service.servicename}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() !== '' ? (
            <div className="p-4 text-gray-400">No results found.</div>
          ) : null}
        </div>
      )}

    </div>
  );
};

export default SearchBar;
