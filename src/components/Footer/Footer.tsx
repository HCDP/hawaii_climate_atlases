import React, { useContext } from "react";
import { LayoutContext } from "@/components/LayoutContext";

const Footer = () => {
  const { onOpenConditionsOfUse } = useContext(LayoutContext);
  return (
    <footer className="flex justify-center bg-[#708090] text-white py-4">
      <div className="flex flex-col text-center text-sm">
        <div>
          Geography Department -  University of Hawaiʻi at Mānoa
        </div>
        <div>
          Contact us: <a href="mailto:rainfall@hawaii.edu" className="hover:underline hover:cursor-pointer">rainfall@hawaii.edu</a>
        </div>
        <div>
          <a
            className="hover:underline hover:cursor-pointer"
            onClick={() => {
              onOpenConditionsOfUse();
            }}
          >
            Conditions of Use
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
