import React, { useContext } from "react";
import { ConditionsOfUseContext } from "@/components/ConditionsOfUse";

const Footer = () => {
  const { onOpenConditionsOfUse } = useContext(ConditionsOfUseContext);
  return (
    <footer className="flex justify-center bg-[#708090] text-white py-4">
      <div className="flex flex-col text-center text-sm">
        <div>
          Geography Department -  University of Hawaiʻi at Mānoa
        </div>
        <div>
          Contact us: <a href="mailto:rainfall@hawaii.edu" className="hover:underline">rainfall@hawaii.edu</a>
        </div>
        <div>
          <a
            className="hover:underline"
            href="#"
            onClick={(e) => {
              e.preventDefault();
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
