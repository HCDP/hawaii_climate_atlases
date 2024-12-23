import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#708090] text-white py-4">
      <div className="flex flex-col text-center text-sm">
        <div>
          Geography Department - University of Hawaii at Manoa
        </div>
        <div>
          Contact us: <a href="mailto:rainfall@hawaii.edu" className="hover:underline">rainfall@hawaii.edu</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
