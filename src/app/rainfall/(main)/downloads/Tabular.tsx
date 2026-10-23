export default function Tabular() {
  return (
    <div className="space-y-4">
      <p><b>All station data available for download on our website are <u>monthly</u> totals.</b></p>
      <p>
        For daily station data, <a className="link" href="https://www.nature.com/articles/sdata201812" target="_blank"
                                   rel="noopener">Longman
        et al. 2018</a> have compiled and quality controlled the data from 1990-2014 – available for <a
        href="https://figshare.com/collections/Compilation_of_climate_data_from_heterogeneous_networks_across_the_Hawaiian_Islands/3858208"
        target="_blank" rel="noopener">download here</a>.</p>
      <br />
      <p><b>Added April, 2015: Raingage station data (through 2012):</b></p>
      <p>There are two formats available: </p>
      <p>Processed Original Data: data that have been screened for outliers and inhomogeneities, includes data values
        from all years available at the time of data collection (1837-2013)</p>
      <p>Filled Data 1920-2012: data from 1920-2012 with missing values filled whenever possible (see methods)</p>
      <p>A “Read_Me” tab has been included with each of these files to further explain the contents.</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <td><strong>Excel 2007 Format</strong><br /></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/ProcessedOriginalData2012.xlsx">Processed
            Original Monthly Data 2012</a></td>
        </tr>
        <tr>
          <td><a className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FilledDataset2012.xlsx">Filled
            Monthly
            Dataset, 1920-2012</a><br /></td>
        </tr>
        </tbody>
      </table>
      <p>Note: We have not compiled rain gauge data beyond 2013 (what is available in the “2012” database above). If you
        need more current data, please contact the individual agencies that maintain the gages.</p>
      <p>NCDC: <a className="link" href="http://www.ncdc.noaa.gov/cdo-web/" target="_blank"
                  rel="noopener">http://www.ncdc.noaa.gov/cdo-web/</a></p>
      <p>USGS: <a className="link" href="http://wdr.water.usgs.gov/allsearch.php" target="_blank"
                  rel="noopener">http://wdr.water.usgs.gov/allsearch.php</a> (climatological sites)</p>
      <p>RAWS: <a className="link" href="http://www.raws.dri.edu/wraws/hiF.html" target="_blank"
                  rel="noopener">http://www.raws.dri.edu/wraws/hiF.html</a></p>
      <p>SCAN: <a className="link" href="http://www.wcc.nrcs.usda.gov/scan/index.html" target="_blank"
                  rel="noopener">http://www.wcc.nrcs.usda.gov/scan/index.html</a></p>
      <p>WRCC (should be the same stations from NCDC): <a className="link"
                                                          href="http://www.wrcc.dri.edu/summary/Climsmhi.html"
                                                          target="_blank"
                                                          rel="noopener">http://www.wrcc.dri.edu/summary/Climsmhi.html</a>
      </p>
      <p>Hydronet: <a className="link" href="https://www.weather.gov/hfo/hydronet" target="_blank"
                      rel="noopener">https://www.weather.gov/hfo/hydronet</a></p>
      <p>HaleNet: <a className="link"
                     href="https://sites.google.com/a/hawaii.edu/ecohydrology_lab/currentrecent-research/halenet"
                     target="_blank"
                     rel="noopener">https://sites.google.com/a/hawaii.edu/ecohydrology_lab/currentrecent-research/halenet</a>.
      </p>
      <p>Hawai‘i State Climatologist – paper records of rain gauge data are stored in the State Climatologist’s
        office: <a className="link" href="http://www.soest.hawaii.edu/MET/Hsco/" target="_blank"
                   rel="noopener">http://www.soest.hawaii.edu/MET/Hsco/</a></p>
      <p>&nbsp;</p>
      <p><b>Original Rainfall Atlas Products (data end in 2007):</b></p>
      <p>Raingage station data are available in *.csv (comma separated values) format as well as Microsoft Excel *.xlsx
        format.&nbsp; The mean monthly data are available only for the stations used in the Rainfall Atlas (RFAtlas
        Stations).&nbsp; The station information for all other stations is available as well (referred to as “Other
        Stations”).&nbsp; The monthly data are available in three different formats: Processed original data (data that
        have been screened for outliers and inhomogeneities), Filled Dataset (processed original data plus filled data
        from 1920-2007, used to create the Rainfall Atlas means), and Raw Original Monthly Data (the original data
        before removing inhomogeneities and other suspicious records).&nbsp; All data files contain mm and inches.</p>
      <p>An “About” tab has been included with each of these files to further explain the contents.&nbsp; For details
        about the processing or gap filling, please read the final report, available for download below the tabular
        files.</p>
      <p>&nbsp;</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <td><strong>Excel 2007 Format</strong><br /></td>
          <td><strong>CSV Format</strong></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used.xlsx">Mean Rainfall
            Data – RFAtlas Stations</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStationData_Used_csv.csv">Mean
            Rainfall Data – RFAtlas Stations</a></td>
        </tr>
        <tr>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed.xlsx">Station
            Information – Other Stations</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FinalStations_NotUsed_csv.csv">Station
            Information – Other Stations</a></td>
        </tr>
        <tr>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/ProcessedOriginalData.xlsx">Processed
            Original Monthly Data</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/ProcessedOriginalData_csv.zip">Processed
            Original Monthly Data</a></td>
        </tr>
        <tr>
          <td><a className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FilledDataset.xlsx">Filled
            Monthly
            Dataset, 1920-2007</a><br /></td>
          <td><a className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/FilledDataset_csv.zip">Filled
            Monthly
            Dataset, 1920-2007</a><br /></td>
        </tr>
        <tr>
          <td><a className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/RawOriginalData.xlsx">Raw
            Original
            Monthly Data</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/Tabular/RawOriginalData_csv.zip">Raw Original
            Monthly Data</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}