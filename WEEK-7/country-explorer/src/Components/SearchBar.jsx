import { useEffect, useRef } from "react";

function SearchBar({ onSearch }) {

  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <div className="flex justify-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search country..."
        onChange={handleChange}
        className="w-full max-w-md px-4 py-2 rounded-lg shadow-md border focus:outline-none focus:ring-2 focus:ring-gray-950"
      />
    </div>
  );
}

export default SearchBar;