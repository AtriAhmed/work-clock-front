import { FunnelIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

export function FilterDropdown({
  options,
  selectedOptions,
  onChange,
}: {
  options: any[];
  selectedOptions: any[];
  onChange: (any: any[]) => void;
}) {
  const handleCheckboxChange = (event: any) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      onChange(selectedOptions.filter((val) => val !== value));
    } else {
      onChange([...selectedOptions, value]);
    }
  };

  const dropdownRef = useRef<any>(null);

  const [show, setShow] = useState(false);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  // Attach click event listener to the document when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="absolute h-full w-full hover:bg-[rgba(0,0,0,0.1)] z-10 rounded-full transition"
      ></div>
      <div className="px-4 py-1 flex gap-2 items-center">
        <FunnelIcon className="h-6 w-6" /> Filtre d'état
      </div>
      <div
        className={`${
          show ? "" : "pointer-events-none opacity-0"
        } dark:bg-gray-900 transition font-normal text-sm absolute bg-white  p-2 rounded-lg top-[45px] flex flex-col justify-start min-w-[150px]`}
      >
        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`option-${index}`}
                type="checkbox"
                value={index}
                checked={selectedOptions.includes(index.toString())}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`option-${index}`}
                className="ml-3 text-sm font-medium text-gray-700 dark:text-white"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
