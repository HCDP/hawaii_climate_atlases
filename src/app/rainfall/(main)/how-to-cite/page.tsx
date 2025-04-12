export default function HowToCite() {
  return (
    <div className="mt-14 -mb-4 max-w-[62rem] mx-auto">
      <h1 className="text-xl font-bold -mt-5">How do I cite material from this website?</h1>
      <p className="my-3">
        Please cite any products used from this website (including screen shots, copied data, saved graphs, downloaded
        products, and text) as follows:
      </p>
      <p className="ml-8 my-3">
        Giambelluca, T.W., Q. Chen, A.G. Frazier, J.P. Price, Y.-L. Chen, P.-S. Chu, J.K. Eischeid, and D.M. Delparte,
        2013: Online Rainfall Atlas of Hawai‘i. <i>Bull. Amer. Meteor. Soc.</i> 94, 313-316, doi:
        10.1175/BAMS-D-11-00228.1.
      </p>
      <p className="my-3">
        For <b>Month-Year Rainfall Maps (1920-2012)</b>, added in 2015, please use the following citation:
      </p>
      <p className="ml-8 my-3">
        Frazier, A. G., Giambelluca, T. W., Diaz, H. F. and Needham, H. L. (2016), Comparison of geostatistical
        approaches to spatially interpolate month-year rainfall for the Hawaiian Islands. <i>Int. J. Climatol.</i>,
        36(3), 1459-1470. doi: 10.1002/joc.4437
      </p>
      <p className="my-3">
        For <b>Rainfall Trend Maps</b>, added in 2018, please use the following citation:
      </p>
      <p className="ml-8 my-3">
        Frazier, A. G., and Giambelluca, T. W. (2017), Spatial trend analysis of Hawaiian rainfall from 1920 to 2012.
        <i>Int. J. Climatol.</i>, 37(5), 2522–2531. doi: 10.1002/joc.4862
      </p>
      {/* TODO: conditions of use modal */}
      <p className="my-3">Complete information can be found in the <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Conditions of Use.</a></p>
    </div>
  );
}
