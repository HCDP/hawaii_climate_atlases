import React, { SetStateAction } from "react";
import { Input } from "@heroui/input";

const LocationField: React.FC<{
  locationInput: string,
  setLocationInput: React.Dispatch<SetStateAction<string>>,
  handleLocationChange: () => void,
  placeholder?: string,
  error?: string | null,
  className?: string,
}> = ({ locationInput, setLocationInput, handleLocationChange, placeholder, error, className }) => {
  return (
    <form
      className="flex flex-col gap-1.5"
      onSubmit={e => {
        e.preventDefault();
        handleLocationChange();
      }}>
      <Input
        name="locationInput"
        value={locationInput}
        onValueChange={setLocationInput}
        color="default"
        radius="sm"
        placeholder={placeholder}
        className={className}
      />
      {error && <p className="text-red-700 pl-3">{error}</p>}
    </form>
  );
}

export default LocationField;
