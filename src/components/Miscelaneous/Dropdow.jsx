"use client"

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, PlusCircle } from "lucide-react";

export default function SearchDropdown({options}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);

  // Filter options based on input
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if personalized answser
  const shouldShowCustomOption =
    searchTerm.length > 0 && !options.includes(searchTerm);

  // Closes the dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Field */}
      <div className="flex items-center px-2.5 text-[12px] mt-2 w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200">
        <input
          type="text"
          className="w-full px-2 outline-none"
          placeholder="Select Answer"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button onClick={() => setIsOpen(!isOpen)}>
          <ChevronDown size={22} className="text-gray-600" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-10">
          <ul className="max-h-40 overflow-y-auto text-[12px]">
            {/* Mostra le opzioni filtrate */}
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedValue(option);
                  setSearchTerm(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}

            {/* Mostra l'opzione per aggiungere un nuovo valore se non esiste */}
            {shouldShowCustomOption && (
              <li
                className="px-4 py-2 text-blue-500 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedValue(searchTerm);
                  setIsOpen(false);
                }}
              >
                <PlusCircle size={16} /> Aggiungi: <span className="font-bold">{searchTerm}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
