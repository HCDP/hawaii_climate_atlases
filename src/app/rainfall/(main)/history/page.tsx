export default function History() {
  return (
    <div className="flex flex-col mt-14 max-w-[62rem] mx-auto gap-5 mb-5">
      <h1 className="text-xl font-bold -mt-5">History of Rainfall Mapping in Hawaiʻi</h1>
      <p><em><a className="link" href="/how-to-cite">How to cite this information</a></em></p>
      <p>The earliest known rainfall observations in Hawaiʻi were taken by Dr. Thomas Charles Byde Rooke in 1837 at
        Nuʻuanu Avenue and Beretania Street in Honolulu. By the end of the 19th century, rainfall was being monitored at
        106 stations. That number increased to 422 by 1920. As data accumulated and the number of observation sites
        expanded, various efforts were made to map the spatial patterns of rainfall. The table below lists some of the
        more prominent of those efforts.</p>
      <h2 className="text-xl font-bold">Prior Rainfall Maps of Hawaiʻi</h2>
      <table className="border-black border-t-1 border-b-1 table-fixed w-full text-left">
        <thead>
        <tr className="border-black border-b-1">
          <th>Statistic</th>
          <th>Interval</th>
          <th>Coverage</th>
          <th>Citation</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>Oʻahu</td>
          <td>Voorhees (1929)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>Oʻahu</td>
          <td>Nakamura (1933)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>Major islands</td>
          <td>Feldwisch (1939)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>Maui</td>
          <td>Stearns and Macdonald (1942)</td>
        </tr>
        <tr>
          <td>Median</td>
          <td>Monthly</td>
          <td>Oʻahu</td>
          <td>Halstead and Leopold (1948)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>East Maui</td>
          <td>Leopold (1949)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>Major islands</td>
          <td>Stidd and Leopold (1951)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Monthly, Annual</td>
          <td>Major islands</td>
          <td>Mordy and Price (1955)</td>
        </tr>
        <tr>
          <td>Median</td>
          <td>Monthly, Annual</td>
          <td>Major islands</td>
          <td>Taliaferro (1959)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Annual</td>
          <td>Major islands</td>
          <td>Blumenstock and Price (1967)</td>
        </tr>
        <tr>
          <td>Median</td>
          <td>Annual</td>
          <td>Major islands</td>
          <td>Department of Land and Natural Resources (1973)</td>
        </tr>
        <tr>
          <td>Median</td>
          <td>Annual</td>
          <td>Major islands</td>
          <td>Meisner et al. (1982)</td>
        </tr>
        <tr>
          <td>Mean, Median</td>
          <td>Monthly, Annual</td>
          <td>Major islands</td>
          <td>Giambelluca et al. (1986)</td>
        </tr>
        <tr>
          <td>Mean</td>
          <td>Monthly, Annual</td>
          <td>Major islands</td>
          <td>Daly et al. (2006)</td>
        </tr>
        </tbody>
      </table>
      <p>With each successive analysis, the resulting maps were refined and improved, taking advantage of a growing
        database and better understanding of the processes controlling rainfall. Differences among these maps reflect
        this refinement and improvement, as well as fluctuations in rainfall over time. </p>
      <p>Below are some examples of previous analyses of monthly and annual rainfall. </p>
      <table className="table-fixed">
        <tbody>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="Halstead and Leopold, 1948"
              src="/images/history/leopold_s.jpg"
              alt="Halstead and Leopold, 1948" width="300" height="242"
            />
          </td>
          <td className="w-2/5">Map of median January rainfall for the island of Oʻahu, developed by Halstead and Leopold in 1948. The
            base period of the statistics is 1936–1946.
          </td>
        </tr>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="Mordy and Price, 1955"
              src="/images/history/mordy_s.jpg"
              alt="Mordy and Price, 1955" width="300" height="225"
            />
          </td>
          <td className="w-2/5">Map of mean January rainfall for the island of Oʻahu, developed by Mordy and Price in 1955. No common base
            period was used. Periods of record ranged from 10 to 68 years.
          </td>
        </tr>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="Taliaferro, 1959"
              src="/images/history/taliaferro_s.jpg"
              alt="Taliaferro, 1959" width="300" height="204"
            />
          </td>
          <td className="w-2/5">Map of median January rainfall for the island of Oʻahu, developed by Taliaferro in 1959. The base period
            of the statistics is 1933–1957.
          </td>
        </tr>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="Meisner et al., 1982"
              src="/images/history/meisner_s.jpg"
              alt="Meisner et al., 1982" width="300" height="225"
            />
          </td>
          <td className="w-2/5">Map of median annual rainfall for the island of Oʻahu, developed by Meisner et al. in 1982. The base
            period of the statistics is 1916–1975.
          </td>
        </tr>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="Giambelluca et al., 1986"
              src="/images/history/giambelluca_s.jpg"
              alt="Giambelluca et al., 1986" width="300" height="213"
            />
          </td>
          <td className="w-2/5">Map of mean annual rainfall for the island of Oʻahu from the original Rainfall Atlas of Hawaiʻi developed
            by Giambelluca et al. in 1986. The base period of the statistics is 1916–1983.
          </td>
        </tr>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="PRISM, 2006"
              src="/images/history/prism_s.jpg"
              alt="PRISM, 2006" width="300" height="232"
            />
          </td>
          <td className="w-2/5">Map of mean annual rainfall for the island of Oʻahu, developed by the PRISM Group in 2006. The base period
            of the statistics is 1961–1990.
          </td>
        </tr>
        <tr>
          <td className="w-2/5 text-center">
            <img
              className="inline"
              title="New Rainfall Atlas, 2011"
              src="/images/history/giambelluca2_s.jpg"
              alt="New Rainfall Atlas, 2011" width="300" height="231"
            />
          </td>
          <td className="w-2/5">
            Map of mean annual rainfall for the island of Oʻahu, developed from the new 2011 Rainfall Atlas of
            Hawaiʻi. The base period of the statistics is 1978–2007.
          </td>
        </tr>
        </tbody>
      </table>
      <p>Some key differences can be seen in the methods used for these different analyses. One important issue involves
        the use of raingage measurements taken during different periods of time. Over the years, many gages were set up
        and operated for various numbers of years and subsequently discontinued. Because rainfall can vary significantly
        on time scales of years to decades, the “era” of a particular gage, i.e., the time during which it operated, can
        have a big influence on the estimated mean rainfall. When mapping rainfall, means calculated from different eras
        can produce spurious spatial patterns. This problem has been addressed in various ways. Mordy and Price (1955)
        acknowledged this issue, but decided not to address it. They simply used all the data available for stations
        with 10 years of record or more. Taliaferro (1959) calculated medians for a 25-year base period (1933–1957)
        “based on actual and extrapolated data”. No details were provided on the method of extrapolation. Meisner et al.
        (1982) adjusted rainfall medians to a common 60-year base period (1916–1975) using a statistical technique
        called ridge regression. In the original Rainfall Atlas of Hawaiʻi, Giambelluca et al. (1986) adopted Meisner’s
        approach, using a base period of 1916–1983 for all islands except Molokaʻi, where a 1931–1983 base period was
        used. In the 2011 Rainfall Atlas of Hawaiʻi, each station in the selected network was “gap-filled” using a
        variety of statistical techniques to produce complete or nearly complete records for a 30-yr base period,
        1978–2007.</p>
      <p>Another difference among the previous maps is in the choice of a normal statistic. The average, or mean, used
        in the 2011 Rainfall Atlas of Hawaiʻi, was commonly used in the past. But several maps were done using the
        median, the value for which half the observations were higher and half lower. The mean is more meaningful for
        hydrological purposes, because it is related to the total amount of rainfall over the base period. The mean can
        be strongly influenced by a relatively few extreme values, hence, some prefer the median as a more
        representative measure of the central tendency of rainfall.</p>
      <p>In most prior rainfall analyses done for Hawaiʻi, point rainfall values were analyzed manually by drawing lines
        of equal rainfall (isohyets). In areas with a dense and well-distributed network of stations, the analyst must
        use expert knowledge to resolve apparent conflicts among station values to produce smooth isohyets. Similarly,
        in areas lacking sufficient measurements, expert knowledge is called upon to estimate the patterns based on
        presumed relationships between rainfall and topography or patterns of vegetation. In the 2011 Rainfall Atlas of
        Hawaiʻi manual analysis was not used. Instead, raingage data were supplemented with other predictors, in the
        forms of rainfall maps derived from radar, a dynamical weather model, and a previously done analysis
        incorporating relationships with terrain (PRISM, Daly et al., 2002), and statistical techniques were used to
        merge these different predictors to produce the final maps.&nbsp; Please refer to the <a
          href="methods.html">Methods</a> page or our final report for the details of this procedure.</p>
      <h2 className="text-xl font-bold">References</h2>
      <p>Blumenstock, D.I. and Price, S. 1967. Climate of Hawaii. In Climates of the States, no. 60-51, Climatography of
        the United States, U.S. Department of Commerce.</p>
      <p>Daly, C., Smith, J., Doggett, M., Halbleib, M., and Gibson, W. 2006. High-resolution climate maps for the
        Pacific Basin Islands, 1971-2000. Report submitted to National Park Service Pacific West Regional Office. PRISM
        Group, Oregon State University.&nbsp;<br />http://www.botany.hawaii.edu/basch/uhnpscesu/pdfs/sam/Daly2006AS.pdf
      </p>
      <p>Department of Land and Natural Resources. 1973. Climatological stations in Hawaii. Report R42, Division of
        Water and Land Development, DLNR, State of Hawai‘i. 187 pp.</p>
      <p>Feldwisch, W.F. 1939. Progress report (1939)--Water resources. Territorial Planning Board, Territory
        of&nbsp;Hawaiʻi, Honolulu.</p>
      <p>Giambelluca, T.W., Nullet, M.A., and Schroeder, T.A. 1986. Rainfall Atlas of Hawaiʻi, Report R76, Hawai‘i
        Division of Water and Land Development, Department of Land and Natural Resources, Honolulu. vi + 267
        p.&nbsp;</p>
      <p>Halstead, M.H. and Leopold, L.B. 1948. Monthly median rainfall maps, what the are--how to use them. Report No.
        2, Meteorology Department, Pineapple Research Institute and Hawaiian Sugar Planters&#39; Association. 18 pp.</p>
      <p>Leopold, L.B. 1949. Average annual rainfall of East Maui, T.H. <em>Hawaii Sugar Planters&#39; Record</em> 53(2):
        47-59.</p>
      <p>Meisner, B.N., Schroeder, T.A., and Ramage, C.S. 1982. Median rainfall, State of Hawaii. Circular C88, Division
        of Water and Land Development, Department of Land and Natural Resources, State of&nbsp;Hawaiʻi.</p>
      <p>Mordy, W.A. and Price, S. 1955. Average monthly rainfall maps. Meteorology Department, Pineapple Research
        Institute, and Experiment Station, Hawaiian Sugar Planters&#39; Association.&nbsp;</p>
      <p>Nakamura, W.T. 1933. A study of the variation in annual rainfall of Oahu Island (Hawaiian Islands) based on the
        law of probabilities. <em>Monthly Weather Review</em> 61: 354-360.</p>
      <p>Stearns, H.T. and Macdonald, G.A. 1942. Geology and ground-water resources of the island of Maui,&nbsp;Hawaii.
        Bulletin 7, Hawaii Division of Hydrography. 344 pp.</p>
      <p>Stidd, C.K. and Leopold, L.B. 1951. The geographic distribution of average monthly rainfall, Hawaii. On the
        rainfall of Hawaii, a group of contributions.&nbsp;<em>Meteorological Monographs</em>&nbsp;1(3): 24-33.</p>
      <p>Taliaferro, W.J. 1959. Rainfall of the Hawaiian Islands. Hawaii Water Authority, State of&nbsp;Hawaiʻi,
        Honolulu. 396 pp.</p>
      <p>Voorhees, J.F. 1929. A quantitative study of rainfall of the island of Oahu. App. A, Report of the Honolulu
        Sewer and Water Commission to the Legislature of the Territory of Hawaiʻi, 15th Regular Session.</p>
    </div>
  );
}