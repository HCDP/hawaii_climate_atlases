"use client"

import { useContext } from "react";
import useRequiredConditionsOfUse from "@/hooks/useRequiredConditionsOfUse";
import { ConditionsOfUseContext } from "@/components/ConditionsOfUse/ConditionsOfUseContext";

export default function HowToCite() {
  const { onOpenConditionsOfUse } = useContext(ConditionsOfUseContext);
  useRequiredConditionsOfUse();

  return (
    <div className="mt-14 max-w-[62rem] mx-auto">
      <h1 className="text-xl font-bold -mt-5">How do I cite material from this website?</h1>
      <p className="my-3">
        Please cite any products used from this website (including screen shots, copied data, saved graphs, downloaded
        products, and text) as follows:
      </p>
      <blockquote className="citation">
        Please keep in touch about the best way to cite - we will update the citation once the journal article has been published:
      </blockquote>
      <p className="ml-8 my-3">
Giambelluca, T.W., X. Shuai, M.L. Barnes, R.J. Alliss, R.J. Longman, T. Miura, Q. Chen, A.G. Frazier, R.G. Mudd, L. Cuo, and A.D. Businger. 2014. Evapotranspiration of Hawai‘i. Final report submitted to the U.S. Army Corps of Engineers—Honolulu District, and the Commission on Water Resource Management, State of Hawai‘i.
      </p>
      
      {/* TODO: conditions of use modal */}
      <p className="my-3">
        Complete information can be found in the&nbsp;
        <a
          href="#"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={(e) => {
            e.preventDefault();
            onOpenConditionsOfUse();
          }}
        >
          Conditions of Use.
        </a>
      </p>
    </div>
  );
}
