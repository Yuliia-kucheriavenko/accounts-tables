import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="addon-wrapping"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
