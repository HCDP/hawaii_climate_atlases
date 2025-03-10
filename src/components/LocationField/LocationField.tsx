import React from "react";
import { Input } from "@heroui/input";

const LocationField: React.FC<{
  onLocationChange: (input: string) => void,
}> = ({ onLocationChange }) => {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      const input: string = new FormData(e.target as HTMLFormElement).get("locationInput") as string;
      onLocationChange(input);
    }}>
      <Input
        name="locationInput"
        color="default"
        radius="sm"
        placeholder="Location: Latitude, Longitude (degrees)"
        className="shadow-md rounded-lg"
        style={{ width: "20rem" }}
      />
    </form>
  );
}

export default LocationField;
