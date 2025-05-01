export default function Methods() {
  return (
    <div className="mt-14 max-w-[62rem] mx-auto">
      <h1 className="text-xl font-bold -mt-5 mb-3">How the Rainfall Atlas of Hawaiʻi Was Made</h1>
      <a href="/how-to-cite" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 italic">
        How to cite this information
      </a>
      <p className="my-3 mb-4">
        The original Rainfall Atlas of Hawaiʻi (Giambelluca et al., 1986) was developed from rainfall observations at more than 1200 sites 
        in Hawaiʻi, with means and medians adjusted to a common base period, and with isohyets (lines of equal rainfall) drawn manually to 
        represent spatial patterns. This method utilized all the available raingage data and used expert knowledge to go from point values 
        to spatial patterns. Despite the high number of raingages, large areas had no rainfall measurements and many still do not today. 
        These areas are generally in remote, mountainous, wet forests, which are difficult to access for measurement. However, these areas 
        are often among the most important in terms of water resources planning and management and ecological protection.
      </p>
      <div className="border border-black p-[2px] float-right ml-4 mr-5">
        <div className="border border-black w-[450px] px-6 py-4 text-center">
          <h2 className="text-xl font-bold pb-4">
            Why is the mapped mean rainfall at the location of a station different from the station mean?
          </h2>
          <p>
            In producing the mean monthly and annual rainfall maps, we relied heavily on the raingage data as the primary source of 
            information. However, we also used other sources, including radar rainfall estimates, MM5 model rainfall estimates, and the 
            PRISM rainfall map. We also interpolated the raingage data in a way that prevented sharp discontinuities. As a result, the 
            mapped value can, and usually does, differ from the station value. This reflects the best estimate of the mean for the 
            location incorporating all available evidence.
          </p>
        </div>
      </div>
      <p className="mt-3">
        In the new Rainfall Atlas, raingage data and expert knowledge have been supplemented with other predictors, including rainfall 
        estimates derived from the PRISM rainfall analysis (Daly et al., 2006), NEXRAD radar rainfall observations, MM5 mesoscale meteorological 
        model simulations, and patterns of vegetation. We used a variety of innovative techniques to evaluate and merge these different 
        estimates of rainfall to produce the best estimates of mean rainfall and its uncertainty at any given location. First, vegetation 
        patterns were used to make estimates of rainfall at points where no rainfall measurements were available, thus adding “virtual raingage 
        stations” to the rainfall database. Kriging (a technique for interpolating from irregularly located point values to a regular grid), 
        PRISM, radar, and MM5 (predictor data sets) each provided estimated mean rainfall maps for each month. These maps were tested by comparing 
        them against rainfall at measurement sites and the virtual raingage sites. This comparison allowed us to adjust (calibrate) the PRISM, 
        radar, and MM5 predictor data sets and to assess how closely they matched the rainfall measurements after being adjusted. How well (or 
        poorly) the predictors matched the measurements is expressed in terms of the uncertainty. The Kriging method provides an uncertainty map 
        for the interpolated rainfall observations. The lower the uncertainty, the better the predictor. In merging the different maps, the 
        uncertainty of each predictor was used to determine its “weight”, with high weights for lower uncertainty and vice versa. In many cases, 
        one or more of the predictor data sets failed to improve the final estimate, and was therefore not used. By giving the greatest weight 
        to the least uncertain predictors, we obtained the best estimate of the mean at each location. In the process, we were also able to assess 
        the uncertainty of the merged estimate. Below are sample maps showing the estimated rainfall patterns and corresponding maps of uncertainty 
        derived from each of the predictor data sets. In this case, incorporating the radar estimate did not improve the final map, and was not 
        used.
      </p>
      <table className="justify-self-center mt-5 mb-5">
        <tbody>
          <tr>
            <td>
              <img src="/images/methods/kriging_estimate.png" className="w-[350px] h-[271] float-right" />
            </td>
            <td>
              <img src="/images/methods/kriging_variance.png" className="w-[350px] h-[271] float-right" /> 
            </td>
          </tr>
          <tr>
            <td>
              <img src="/images/methods/prism_estimate.png" className="w-[350px] h-[271] float-right" />
            </td>
            <td>
              <img src="/images/methods/prism_variance.png" className="w-[350px] h-[271] float-right" /> 
            </td>
          </tr>
          <tr>
            <td>
              <img src="/images/methods/radar_estimate.png" className="w-[350px] h-[271] float-right" />
            </td>
            <td>
              <img src="/images/methods/radar_variance.png" className="w-[350px] h-[271] float-right" /> 
            </td>
          </tr>
          <tr>
            <td>
              <img src="/images/methods/mm5_estimate.png" className="w-[350px] h-[271] float-right" />
            </td>
            <td>
              <img src="/images/methods/mm5_variance.png" className="w-[350px] h-[271] float-right" /> 
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3">
        The maps above show the distribution of estimated mean October rainfall (left column) and the corresponding variance (uncertainty) 
        distribution (right column) for Oʻahu for each of the four predictors.
      </p>

      <h1 className="text-xl font-bold mt-3">Hawaiʻi Rainfall Network</h1>
      <p className="mt-3">
        Raingage measurements form the basis of our analysis of the spatial patterns of rainfall. Because of the importance of rainfall information 
        to agriculture, water supply, flood hazard, ecosystem health, and other interests, and because of the relative ease of measurement, rainfall 
        has been measured in Hawaiʻi at over 2,000 sites (at least 2,188 stations on record). Rainfall record lengths vary at each station from a 
        few months to many decades, and the majority of stations are eventually discontinued. The types of gages and the methods of recording are 
        numerous, with manually read daily raingages the most common overall.
      </p>    
      <img src="/images/methods/rainfall_chart.png" className="w-[575px] float-right" />
      <p className="mt-4">
        The monthly rainfall database that we compiled for the 2011 Rainfall Atlas of Hawaiʻi includes 1067 stations, with 517,017 station
        -months (43,085 station-years) of data over the period 1874-2007. These stations on average had 485 months of data (40 years of data) 
        throughout that period, with the longest running station spanning 1426 months (119 years).  The number of stations operating at any 
        given time increased during the 19th and early 20th centuries, reaching a peak of 1030 stations in 1968. After that, the number of 
        active stations declined, and now includes only 340 stations. This trend is linked to the growth and decline of plantation agriculture 
        in Hawaiʻi. Pineapple and sugarcane cultivation in Hawaiʻi were carefully managed with much attention given to relevant weather 
        observations. Sugarcane, in particular, depended on irrigation in most areas. Plantations and affiliated irrigation companies
        throughout the islands, therefore, maintained a large network of raingages. Most of these stations were discontinued over the past 
        30 years.
      </p>
      <p className="mt-4">
        Plantation weather records, including information on the geographical coordinates, elevation, and observer of each station, were 
        maintained by the Pineapple Research Institute (PRI) and the Hawaiʻi Sugar Planters’ Association (HSPA). Eventually, the Hawaiʻi 
        Department of Land and Natural Resources (DLNR), Division of Water and Land Development (DOWALD), predecessor of the Hawaiʻi Commission 
        on Water Resource Management, hosted the Office of the State Climatologist, where weather records from all sources were archived and 
        processed. DOWALD maintained a set of maps on which all active and discontinued weather stations were plotted. In 1973, DLNR published 
        a report with station information and maps of all station locations (Department of Land and Natural Resources. 1973. Climatological 
        stations in Hawaii. Report R42, Division of Water and Land Development, DLNR, State of Hawai‘i. 187 pp.). This report remains an 
        important resource today. Over time, a change in the map datum used for Hawaiʻi, typographical errors, and a lack of precision in the 
        recorded station coordinates resulted many errors in the station coordinates. In developing maps of rainfall patterns, it is crucial 
        to know the station locations with accuracy and precision. As part of the 2011 Rainfall Atlas of Hawaiʻi project, we made an effort to 
        improve estimates of station locations, and to estimate the level of uncertainty in the location of each station. To do this, we corrected 
        for the datum shift, looked for and fixed as many typographical errors as possible, and relied heavily on DLNR Report R42 to find the 
        most likely historical locations of hundreds of discontinued stations. Our estimates of station locations are available for&nbsp; 
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/downloads">download</a>.
        Note that while high precision coordinates for the HydroNet stations were used in our analysis, we provide only low precision for 
        these stations at the request of NOAA.
      </p>

      <h1 className="text-xl font-bold mt-3">Hawaiʻi Monthly Rainfall Database</h1>
      <p className="mt-3">
        The basis of all rainfall analyses is the database of raingage measurements. The first task in developing the 2011 Rainfall Atlas of 
        Hawaiʻi was to gather all available rainfall data for the State of Hawaiʻi.      
      </p>

      <h1 className="text-xl font-bold mt-3">Data Sources</h1>
      <p className="mt-3">
        The real sources of raingage data are the observers who meticulously measured and recorded rainfall amounts over the past 170 years. 
        Our proximate sources, however, were several existing datasets. The first step in developing the monthly rainfall database was to 
        locate and compile all of the different Hawaiʻi rainfall datasets. The largest was the State rainfall dataset, which has been maintained 
        by the Hawaiʻi Department of Land and Natural Resources and the Office of the State Climatologist. The original paper reporting sheets 
        are archived in the State Climatologist’s office in the Meteorology Department, University of Hawaiʻi at Mānoa. This dataset is comprised 
        of rainfall measurements collected by various agencies and individuals since the mid-1800s. Rainfall amounts were recorded by hand on a 
        standard form, and carbon copies were mailed to several locations, including the Office of the State Climatologist. Some of these records 
        were eventually entered into digital databases.
      </p>
      <div className="border border-black p-[2px] float-left ml-2 mr-5 mt-5">
        <div className="border border-black w-[450px] px-6 py-4 text-center">
          <h2 className="text-xl font-bold pb-4">
            Why didn&#39;t we use all of the raingage stations?
          </h2>
          <p>
            We started the analysis by assembling all the rainfall data we could find for Hawai‘i. We attempted to fill gaps for as many stations 
            as possible. We tested the estimates used to fill the gaps, and also tested the data for homogeneity. During the mapping process for a 
            given month, some station means were found to be unreasonable in comparison with the means of nearby stations. As a result of these 
            procedures, many stations were rejected because of their short or spotty records, our inability to gap fill them satisfactorily, or 
            because of evidence of poor or inconsistent data quality. 
          </p>
        </div>
      </div>
      <p className="mt-3">
        The next largest source of rainfall data was from the National Climatic Data Center (NCDC). We obtained both the monthly and daily datasets 
        for the islands. Records for most of this dataset were derived from a portion of the same original paper records as the State dataset. We 
        summed the daily values into monthly totals. When we compared the NCDC daily, NCDC monthly, the State digital dataset, and the original paper 
        records, the NCDC monthly values were usually found to match the State digital and paper values, and the daily values often were not. Therefore, 
        the NCDC daily dataset was deemed unreliable and not used in our analysis.
      </p>
      <p className="mt-3">
        Another contributor of rainfall data was the U.S. Geological Survey (USGS). The data for Hawaiʻi were downloaded from the USGS website in daily format, 
        and converted to monthly totals.
      </p>
      <p className="mt-3">
        A number of smaller raingage networks were also included in the dataset. Most of these stations did not begin operating until the 1980s or later, 
        but they were very important additions to the dataset because of their locations and high data quality. One of these networks, HydroNet, is run 
        by the National Weather Service. Another important small network, RAWS (Remote Automated Weather Stations), is operated by the National 
        Interagency Fire Center (NIFC), with the data posted by the Western Regional Climate Center (WRCC). The HaleNet dataset, derived from a 
        network of climate stations on Haleakalā, Maui was included. Data from SCAN (Soil Climate Analysis Network, a network run by the US Department of 
        Agriculture (USDA) Natural Resources Conservation Service (NRCS) National Water and Climate Center) on the Island of Hawai’i, were available, but 
        were not incorporated because of the brevity of their data records. Most of these stations were established in 2005, and therefore had only three 
        years of data in the 30-year base period used to calculate means for the 2011 Rainfall Atlas of Hawaiʻi.
      </p>

      <h1 className="text-xl font-bold mt-3">State Key Numbers</h1>
      <p className="mt-3">
        The State Key Number (SKN) system was devised many decades ago as a system of unique identification numbers for all weather stations in 
        Hawaiʻi. Numbering is organized by island with these ranges:
      </p>

      <table className="justify-self-center mt-3">
        <tbody>
          <tr>
            <th>
              <strong>Hawai‘i:</strong>
            </th>
            <td className="text-center">1.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">223.00</td>
          </tr>
          <tr>
            <th>
              <strong>Maui:</strong>
            </th>
            <td className="text-center">248.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">497.00</td>
          </tr>
          <tr>
            <th>
              <strong>Kaho‘olawe:</strong>
            </th>
            <td className="text-center">499.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">499.99</td>
          </tr>
          <tr>
            <th>
              <strong>Moloka‘i:</strong>
            </th>
            <td className="text-center">500.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">599.00</td>
          </tr>
          <tr>
            <th>
              <strong>Lāna‘i:</strong>
            </th>
            <td className="text-center">650.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">696.00</td>
          </tr>
          <tr>
            <th>
              <strong>O‘ahu:</strong>
            </th>
            <td className="text-center">700.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">914.00</td>
          </tr>
          <tr>
            <th>
              <strong>Kaua‘i:</strong>
            </th>
            <td className="text-center">925.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td>1147.00</td>
          </tr>
          <tr>
            <th>
              <strong>Ni‘ihau:</strong>
            </th>
            <td className="text-center">1150.00</td>
            <td><p>&nbsp;&nbsp;–&nbsp;&nbsp;</p></td>
            <td className="text-center">1150.99</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3">
        The numbers tend to be clustered by location, and related or closely located gages often have a decimal added that follows this order: 830.00, 830.10, 830.20, 830.30… 
        830.90, 830.11, 830.12…
      </p>
      <p className="mt-3">
        All of the stations from the State, NCDC, and USGS databases had already been assigned State Key Numbers, although NCDC uses its own numbering system and does 
        not use the State Key Number to identify stations. Stations from the smaller networks had not yet been assigned SKNs. All stations without a SKN were plotted along 
        with the existing stations, and the ranges of its neighbors were recorded to find an appropriate new (unused) number. We then recommended new SKNs to the State 
        Climatologist, which were approved.
      </p>

      <h1 className="text-xl font-bold mt-3">Gap-Filling</h1>
      <p className="mt-3">
        Over the years, many gages were set up and operated for various numbers of years and subsequently discontinued. Because rainfall can vary significantly on time scales 
        of years to decades, the “era” of a particular gage, i.e. the time during which it operated, can have a big influence on the estimated mean rainfall. When mapping rainfall, 
        means calculated from different eras can produce spurious spatial patterns. This problem has been addressed in previous efforts to map Hawaiʻi rainfall by using various methods 
        to estimated statistics for a common base period.
      </p>
      <p className="mt-3">
        In the 2011 Rainfall Atlas of Hawaiʻi, we chose to fill gaps in the records of as many raingages as possible. Being able to fill the gaps in the data record allows us to compute 
        base period means for a much larger number of stations, thereby improving the spatial coverage. The figure below illustrates the potential to improve the spatial coverage of point 
        rainfall estimates by gap-filling the records of stations that operated before or after the period of interest.
      </p>
      <table className="justify-self-center mt-5 mb-5">
        <tbody>
          <tr>
            <td>
              <img src="/images/methods/raingage_stations.png" className="w-[303px] h-[327] float-right mr-16" />
            </td>
            <td>
              <img src="/images/methods/all_stations.png" className="w-[303px] h-[327] float-right" /> 
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3">
        The map on the left shows the raingage the stations on the island of Hawaiʻi that reported data in 1980, while the map on the right shows all of the stations that ever 
        recorded data on the island of Hawaiʻi.
      </p>
      <p className="mt-3">
        We used a variety of methods to fill gaps. In general, statistical relationships between rainfall at nearby stations are established during periods when stations had 
        concurrent data. Subsequently, these relationships can be used to estimate rainfall at one station (with missing records) based on active station(s). Details of this approach 
        can be found in the project final report.
      </p>

      <h1 className="text-xl font-bold mt-3">Base Period Selection</h1>
      <p className="mt-3">
        Before calculating station monthly and annual mean rainfall, it was necessary to decide upon a common base period for averaging the records. In previous Hawaiʻi 
        rainfall analyses, a number of different averaging periods were used. The original Rainfall Atlas of Hawaiʻi used the period 1916–1983 (68 years) for all islands except 
        Molokaʻi, where 1931–1983 (53 years) was used. The length of the averaging period is the first question. Using a long period does a better job of averaging out the 
        effects of slowly changing natural cycles, such as the Pacific Decadal Oscillation (PDO). On the other hand, because we are experiencing a long-term downward trend in 
        rainfall, using a shorter averaging period may be better for characterizing the current and near future situation. The National Ocean and Atmospheric Administration 
        (NOAA) uses a standard 30-year averaging period, with statistics updated at the end of each decade. Considering all these issues, and giving more weight to the recognition 
        of the long-term trend in rainfall, we opted for a 30-year averaging period. We chose to use 1978–2007, which was the most recent 30-year period for which a high 
        percentage of data for active stations were available as of the start of the project. We acknowledge that for most of this period, the PDO was in its positive phase, 
        which is generally associated with lower rainfall.
      </p>

      <h1 className="text-xl font-bold mt-3">What Do We Mean by Uncertainty?</h1>
      <p className="mt-3">
        The station means and maps of mean monthly and annual rainfall represent our best estimates for the 30-year base period 1978–2007. However, for many reasons, it is not 
        possible to determine the exact value of mean rainfall for any location, even at the stations. In recognition of that, we provide estimates of the uncertainty in our estimates 
        of station means and mapped means.
      </p>
      <p className="mt-3">
        The uncertainty value that we provide can be interpreted as a plus-or-minus range around the estimated mean. While we cannot say exactly what the mean is, we are confident 
        that it lies within that range. For example, mean annual rainfall for the US Geological Survey’s Moanalua station (State Key Number 772.3) has an estimated mean annual 
        rainfall of 3317 mm (130.6 inches) and an uncertainty of 128 mm (5.0 inches). That means the true mean annual rainfall for the base period is likely to be between 3189 
        and 3445 mm (125.6 and 135.6 inches). The uncertainty statistic we use is in the form of a standard deviation. If we assume the sample of possible estimated means has a 
        normal (“bell-shaped”) distribution, then the likelihood of the true value being within ±1 standard deviations from the mean is about 68%.
      </p>
      <p className="mt-3">
        Many different things influence the level of uncertainty. In the case of the station means, we considered three sources of uncertainty. The first is the number of values used 
        to calculate the 30-year mean. We included stations with up to three missing values within the 30-year base period. But, we realize that the more missing values we have 
        the more uncertain the resulting mean is. For each station with less than 30 years of data, we calculated the added uncertainty of each missing value and multiplied it by the 
        number of missing values. The second source of uncertainty is related to the gap-filling process. Wherever possible, we made estimates of monthly rainfall to fill gaps in 
        the records of stations. This was used to fill gaps within the period of record, such as when a gage was malfunctioning, and to fill periods before and/or after the gage 
        operated. As a result, the 1978–2007 mean for a given station could have anywhere from 0 to 30 estimated (as opposed to measured) values. Gap-filling is essential for producing 
        means that pertain to a common base period, and allows us to use a much larger number of stations than we would otherwise. But, obviously, an estimated monthly rainfall total 
        is more uncertain than a measured one. We used calculated estimated values at all stations for all months, even those with measurements. This was done to allow us to compare 
        the estimates with measurements. This gave us a measure of the uncertainty of the estimates at each station. This value was then multiplied by the number of estimated values 
        to get the uncertainty resulting from gap filling. The third source of error was related to the station locations. In compiling the data set used in this analysis, we found that 
        many errors existed in the published locations. Poor precision, conflicting information about station coordinates, use of an obsolete map datum, typos, and other problems led 
        to many stations being out of place on our maps. Some were even well out in the ocean. We worked hard to eliminate these problems, but were still unsure about the locations 
        of stations, especially ones that had been long discontinued. Imprecision in the station location amounts to an uncertainty in the rainfall. Consider that in some areas, the 
        rainfall gradient is so steep, a station misplaced by only 1 km (0.6 miles) could misrepresent actual mean rainfall by 1500 mm (59 inches). Using our estimated uncertainty in 
        the location of each station, we used the local rainfall gradient to convert that into the resulting uncertainty in rainfall. The uncertainties from these three sources were 
        combined to give the total uncertainty in each station mean.
      </p>
      <p className="float-right ml-4">
          <img src="/images/methods/rainfall_map.png" className="w-[390px] mt-4" />
          <img src="/images/methods/uncertainty_map.png" className="w-[390px] mt-8" />
      </p>
      <p className="mt-3">
        Uncertainty in mapped rainfall results from the combined uncertainty in all of the predictors used to produce the map. The most important predictor was the map of interpolated 
        station values, derived using a technique known as Kriging. The Kriging analysis also produces an interpolation uncertainty map. In general, interpolation uncertainty is low 
        near stations and increases as the distance to the nearest station increases. In other words, uncertainty is greatest where there are no nearby stations. The spatial patterns 
        of uncertainty in radar-estimated rainfall, the weather-model-estimated rainfall, and rainfall taken from the PRISM analysis, were estimated by comparing the mapped values 
        with station values. When merging the predictor maps to get the final estimate at each location, the uncertainties in the predictors were also combined to get a map of total 
        uncertainty at each location.
      </p>
      <p className="mt-3">
        At right is the map of mean annual rainfall (top) and the corresponding uncertainty map (bottom), from the interactive map tool on this web site. The rainfall map shows the 
        high rainfall area (blue) along the windward slopes of Mauna Kea and Mauna Loa above Hilo, the local rainfall peaks (yellow and blue) on windward Kohala, near Pāhala in Kaʻu 
        District along the southeastern flank of Mauna Loa, and along the slopes above the Kona coast. Dry areas (orange to red) are seen at the Mauna Kea and Mauna Loa summits and 
        along the leeward coasts. The uncertainty map shows the uncertainty, expressed as a standard deviation, tends to be higher (darker) in the high rainfall areas. However, estimated 
        rainfall is most uncertain along the southwest rift of Mauna Loa. This suggests that the available raingage data coverage is sparse and the quality of the predictor sets is lower 
        in that area than other areas. One should take the level of uncertainty into consideration when making any use of the mapped rainfall estimates.
      </p>
      
      <h1 className="text-xl font-bold mt-3">References</h1>
      {/* Squish text in a div to right-align with citations above */}
      <div className="max-w-[38rem] mb-5">
        <p className="mt-3">
          Daly, C., Smith, J., Doggett, M., Halbleib, M., and Gibson, W. 2006. High-resolution climate maps for the Pacific Basin Islands, 1971-2000. Report submitted to National Park 
          Service Pacific West Regional Office. PRISM Group, Oregon State University. 
        </p>
        <a href="http://www.botany.hawaii.edu/basch/uhnpscesu/pdfs/sam/Daly2006AS.pdf" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            http://www.botany.hawaii.edu/basch/uhnpscesu/pdfs/sam/Daly2006AS.pdf
        </a>
        <p className="mt-3">
          Department of Land and Natural Resources. 1973. Climatological stations in Hawaii. Report R42, Division of Water and Land Development, DLNR, State of Hawai‘i. 187 pp.
        </p>
        <p className="mt-3">
          Giambelluca, T.W., Nullet, M.A., and Schroeder, T.A. 1986. Rainfall Atlas of Hawai‘i, Report R76, Hawai‘i Division of Water and Land Development, Department of Land and Natural 
          Resources, Honolulu. vi + 267 pp. 
        </p>
        <a href="https://files.hawaii.gov/dlnr/cwrm/publishedreports/R76_Rainfall.pdf" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
          https://files.hawaii.gov/dlnr/cwrm/publishedreports/R76_Rainfall.pdf
        </a>
      </div>
    </div>
  );
}
