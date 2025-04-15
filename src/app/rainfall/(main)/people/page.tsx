import { PropsWithChildren } from "react";

const Person = ({
  name,
  img,
  children
}: PropsWithChildren<{
  name: string,
  img: string
}>) => (
  <div>
    <h2 className="text-xl font-bold my-3">
      {name}
    </h2>
    <div className="flex">
      <p>
        <img src={img} className="w-[120px] h-[173px] m-4 mt-0 pb-8 float-left" />
        {children}
      </p>
    </div>
  </div>
);

const imgBaseUrl = "/images";

export default function People() {
  return (
    <div className="mt-14 max-w-[62rem] mx-auto">
      <h1 className="text-xl font-bold -mt-5">People</h1>
      <p className="my-3">
        Citation information can be found here:&nbsp;
        <a href="/how-to-cite" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
          How to Cite
        </a>.
      </p>
      <Person name="Thomas Giambelluca" img={`${imgBaseUrl}/thomasgiambelluca_s.jpg`}>
        Dr. Tom Giambelluca is a professor in the Department of Geography at UH Mānoa specializing in climate,
        climate change, and ecohydrology. As the Principal Investigator of the project, he supervised all aspects of
        the work. He also headed the team that produced the original Rainfall Atlas of Hawaiʻi in 1986.
      </Person>
      <Person name="Qi Chen" img={`${imgBaseUrl}/qichen_s.jpg`}>
        Dr. Qi Chen is an assistant professor in GIS, remote sensing, and spatial analysis in the Department of
        Geography at UH Mānoa. Co-Principal Investigator of the project, he developed and implemented the statistical
        framework for mapping rainfall by fusing rainfall gages, radar, PRISM, MM5, and vegetation analysis.
      </Person>
      <Person name="Abby Frazier" img={`${imgBaseUrl}/abbyfrazier_s.jpg`}>
        Abby is a graduate student studying climatology at the University of Hawaiʻi at Mānoa in the Department of
        Geography. She has a B.A. in Geography and a B.S. in Mathematics from the University of Vermont. She developed
        the rainfall database, updated raingage station coordinates, produced final download products, and coordinated
        most aspects of the data compilation and analysis for this project.
      </Person>
      <Person name="Jonathan Price" img={`${imgBaseUrl}/jonathanprice_s.jpg`}>
        Jon Price is an Assistant Professor of Geography at the University of Hawaiʻi Hilo. Jon examines the
        biogeography of native Hawaiian plant species and communities to understand fundamental processes of dispersal,
        evolution, and community assembly in Hawaiʻi’s diverse vegetation landscape. For the Rainfall Atlas, he has
        developed a model quantitatively relating vegetation to climate in order to project annual rainfall in areas
        where climate records are sparse.
      </Person>
      <Person name="Yi-Leng Chen" img={`${imgBaseUrl}/yilengchen_s.jpg`}>
        Yi-Leng Chen is a Professor of Meteorology at
        UH Mānoa, specializing in weather and climate over the Hawaiian Islands and adjacent waters from data analyses
        and numerical modeling. Yi-Leng led the work to develop mean estimated rainfall patterns derived from NEXRAD
        radar rainfall and MM5 mesoscale meteorological model estimates.
      </Person>
      <Person name="Khervin U. Cheng Chua" img={`${imgBaseUrl}/khervinuchengchua_s.jpg`}>
        Khervin is an MSc candidate in the Department of Meteorology at UH Mānoa. His research interests include
        regional climate and weather modeling, air quality, multivariate statistics and trajectory-based analyses, and
        scientific web development and implementation. He performed quality checks and gap-filling for the historical
        high resolution model (MM5) results, and generated maps for monthly rainfall accumulation derived from high
        resolution model archives.
      </Person>
      <Person name="Chuan-Chi (Beth) Tu" img={`${imgBaseUrl}/chuanchibethtu_s.jpg`}>
        Beth is a Ph.D. candidate in the Department of Meteorology at UH Mānoa, specializing in using numerical weather
        model and satellite radar to study orographic effects on heavy rainfall and flooding events. For the Rainfall
        Atlas, she constructed maps of monthly rainfall accumulation derived from the Next Generation Weather Radar
        system (NEXRAD) Weather Surveillance Radar-1988 Doppler (WSR-88D) radars in the State of Hawaiʻi during
        2004-2008.
      </Person>
      <Person name="Hiep Van Nguyen" img={`${imgBaseUrl}/hiepvannguyen_s.jpg`}>
        Hiep is a Ph.D. candidate in the Department of Meteorology at UH Mānoa. His research interests include terrain
        effects on weather and climate over complex terrain areas, high-wind and heavy-rainfall events, regional
        climate, hurricane dynamics, hurricane track and intensity forecasts, and TC initialization for hurricane
        models. He performed long-term high resolution model simulation on rainfall using the Fifth-Generation NCAR /
        Penn State Mesoscale Model (MM5) for the Rainfall Atlas project.
      </Person>
      <Person name="Jon Eischeid" img={`${imgBaseUrl}/joneischeid_s.jpg`}>
        Jon Eischeid is a Senior Research Assistant with the University of Colorado’s Cooperative Institute for Research
        in Environmental Sciences at NOAA’s Earth System Research Laboratory in Boulder, CO. He holds a Master’s degree
        in Geography from the University of Massachusetts at Amherst, and has been with NOAA/CIRES for more than 20
        years. He helped in compiling and quality control of the rainfall database for this project.
      </Person>
      <Person name="Donna Delparte" img={`${imgBaseUrl}/donnadelparte_s.jpg`}>
        Dr. Donna Delparte is an Assistant Professor in the Department of Geography and Environmental Studies at the
        University of Hawaiʻi at Hilo. Her area of research is GIS, remote sensing, terrain analysis and
        geo-visualization. In her role as co-Lead for the EPSCoR Hawaiʻi Cyberinfrastructure team and newly created
        Hawaiʻi Geospatial Data Repository she supervised and aided in the development of the web-based mapping
        application for the Rainfall Atlas.
      </Person>
      <Person name="Michael Best" img={`${imgBaseUrl}/michaelbest_s.jpg`}>
        Michael Best is a software developer for the EPSCoR Hawaiʻi Cyberinfrastructure team at the University of
        Hawaiʻi at Hilo. He has a B.S. in Computer Science from North Carolina Central University in Durham, NC. Michael
        designed and built the Rainfall Atlas web application.
      </Person>
      <Person name="Kohei Miyagi" img={`${imgBaseUrl}/koheimiyagi_s.jpg`}>
        Kohei Miyagi is a cyberinfrastructure technician for the Hawaiʻi Geospatial Data Repository of the EPSCoR
        Hawaiʻi. He has a B.S. in Computer Science from the University of Hawaiʻi at Hilo. He manages web, database, and
        GIS servers that host the Rainfall Atlas of Hawaiʻi.
      </Person>
      <Person name="Pao-Shin Chu" img={`${imgBaseUrl}/pao-shinchu_s.jpg`}>
        Pao-Shin Chu is a professor of Meteorology at the UH-Mānoa with research focusing on climate variability in
        Hawaiʻi and extreme events (e.g., heavy rainfall and tropical cyclones) in a changing climate. He is also the
        Hawaiʻi State Climatologist and runs the Hawaiʻi State Climate Office which provides climate data and
        information to users. During this project he worked with his assistant, Sean Newsome, who compiled, digitized,
        and updated the historical rainfall database in Hawaiʻi.
      </Person>
      <Person name="Kevin Kodama" img={`${imgBaseUrl}/kevinkodama_s.jpg`}>
        Kevin is a Senior Service Hydrologist at the National Weather Service’s Honolulu Forecast Office. He has a B.S.
        in Atmospheric Sciences from the University of Washington and an M.S. in Meteorology from the University of
        Hawaiʻi at Mānoa. Kevin assisted with data collection and the validation of results.
      </Person>
      <Person name="Henry Diaz" img={`${imgBaseUrl}/henrydiaz_s.jpg`}>
        Henry F. Diaz is a Senior Research Scientist with the University of Colorado’s Cooperative Institute for
        Research in Environmental Sciences at NOAA’s Earth System Research Laboratory in Boulder, CO. His research has
        focused on climate variability and climate change and he assisted with the evaluation and some preliminary
        analysis of the rainfall products.
      </Person>
      <Person name="Christopher Daly" img={`${imgBaseUrl}/christopherdaly_s.jpg`}>
        Dr. Christopher Daly is Professor and Director of the PRISM Climate Group at Oregon State University. His
        gridded dataset of long-term mean monthly precipitation for Hawaiʻi was an important source of data for the
        Rainfall Atlas of Hawaiʻi.
      </Person>
      <Person name="Thomas Schroeder" img={`${imgBaseUrl}/thomasschroeder_s.jpg`}>
        Tom Schroeder is a Professor of Meteorology and Director of the Joint Institute for Marine and Atmospheric
        Research. Tom put his extensive expertise to work in drawing the isohyets in the original Rainfall Atlas of
        Hawaiʻi and served as an advisor in the development of the 2011 Atlas.
      </Person>
      <Person name="Michael Nullet" img={`${imgBaseUrl}/michaelnullet_s.jpg`}>
        Mike Nullet is a climate data analysis and network engineer in the Geography Department, University of Hawaiʻi
        at Mānoa. Mike was one of the authors of the original Rainfall Atlas of Hawaiʻi, and assisted with data
        compilation and analysis for the 2011 version.
      </Person>
    </div>
  );
}
