import React from "react";
import ClientInteractiveMap from "./ClientInteractiveMap";

// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {

  return (
    <ClientInteractiveMap />
  );
}
