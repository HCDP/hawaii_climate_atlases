export default function MonthYearMaps() {
  return (
    <div className="space-y-4">
      <p>*NEW* as of August 7, 2015</p>
      <p>
        Month-year rainfall maps for the State of Hawai‘i were created from January 1920 to December 2012 as a spin-off
        project from the original Rainfall Atlas of Hawai‘i. These maps can be downloaded below in ESRI grid format at
        250 m resolution. The rainfall maps are available in either inches or millimeters, and each compressed *.rar
        file contains monthly and annual maps for every year (1920-2012). In addition to rainfall maps, we have also
        generated anomaly maps for each month-year, relative to the 1978-2007 (Rainfall Atlas) mean. The anomalies are
        calculated by dividing the monthly rainfall map by the monthly mean map (January 1920 Anomaly = January 1920
        Rainfall / January Mean Rainfall). Units for anomaly maps are dimensionless. For complete methods, see citation
        below.
      </p>
      <p>Please use the following citation for these maps:</p>
      <p></p>
      <p className="px-8"><b>Frazier, A. G., Giambelluca, T. W., Diaz, H. F. and Needham, H. L. (2016), Comparison of
        geostatistical approaches to spatially interpolate month-year rainfall for the Hawaiian Islands. <i>Int. J.
          Climatol.</i>, 36(3), 1459-1470. doi: 10.1002/joc.4437</b></p>
      <p>The link to the full article is <a
        className="link" href="http://onlinelibrary.wiley.com/doi/10.1002/joc.4437/abstract"
        target="_blank" rel="noopener">here</a>.</p>
      <p>ESRI Grid Format:</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <th>Coverage (File Size)</th>
          <th>Inches</th>
          <th>Millimeters</th>
          <th>Anomaly</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>State (1.1 GB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_State_in_1920_2012.rar">State_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_State_mm_1920_2012.rar">State_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_State_1920_2012.rar">State_AnomGrids_1920_2012</a>
          </td>
        </tr>
        <tr>
          <td>Hawai‘i (650 MB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Bi_in_1920_2012.rar">Hawaii_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Bi_mm_1920_2012.rar">Hawaii_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_Bi_1920_2012.rar">Hawaii_AnomGrids_1920_2012</a>
          </td>
        </tr>
        <tr>
          <td>Kaua‘i (110 MB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Ka_in_1920_2012.rar">Kauai_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Ka_mm_1920_2012.rar">Kauai_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_Ka_1920_2012.rar">Kauai_AnomGrids_1920_2012</a>
          </td>
        </tr>
        <tr>
          <td>O‘ahu (120 MB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Oa_in_1920_2012.rar">Oahu_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Oa_mm_1920_2012.rar">Oahu_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_Oa_1920_2012.rar">Oahu_AnomGrids_1920_2012</a>
          </td>
        </tr>
        <tr>
          <td>Maui (155 MB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Ma_in_1920_2012.rar">Maui_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Ma_mm_1920_2012.rar">Maui_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_Ma_1920_2012.rar">Maui_AnomGrids_1920_2012</a>
          </td>
        </tr>
        <tr>
          <td>Lāna‘i (28 MB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_La_in_1920_2012.rar">Lanai_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_La_mm_1920_2012.rar">Lanai_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_La_1920_2012.rar">Lanai_AnomGrids_1920_2012</a>
          </td>
        </tr>
        <tr>
          <td>Moloka‘i (50 MB)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Mo_in_1920_2012.rar">Molokai_RFGrids_1920_2012_in</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/RFMonthYr_Rasters_Mo_mm_1920_2012.rar">Molokai_RFGrids_1920_2012_mm</a>
          </td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/AnomMonthYr_Rasters_Mo_1920_2012.rar">Molokai_AnomGrids_1920_2012</a>
          </td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p>*NEW* as of December 11, 2015</p>
      <p>Interactive Map Links (hosted by the PICCC Conservation Planning Atlas):</p>
      <p><a
        className="link" href="http://piccc.databasin.org/maps/e558f9d79f4e42018f5ab25b798d5ad6" target="_blank"
        rel="noopener">Annual
        Maps 1920-2012</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/52263afac70e484b94c43e29eb260bb8" target="_blank"
          rel="noopener">Month-Year
          Maps 1920-1929</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/ef4656c48e1b4acdbf9f5206d54390ed" target="_blank"
          rel="noopener">Month-Year
          Maps 1930-1939</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/3931997423674c75a89c485c546e83b8" target="_blank"
          rel="noopener">Month-Year
          Maps 1940-1949</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/1aab93ee0dd24d3781321b337947b676" target="_blank"
          rel="noopener">Month-Year
          Maps 1950-1959</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/7e3afa62bc7f4f618ed5d386a94881d9" target="_blank"
          rel="noopener">Month-Year
          Maps 1960-1969</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/a645148d003b4eb5922ab2308945dc0b" target="_blank"
          rel="noopener">Month-Year
          Maps 1970-1979</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/27e11cdeb8394cfa9b7e5f43196fc5cb" target="_blank"
          rel="noopener">Month-Year
          Maps 1980-1989</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/684a26c2cf7c415fb2d3f6c32ddf84c3" target="_blank"
          rel="noopener">Month-Year
          Maps 1990-1999</a><br />
        <a
          className="link" href="http://piccc.databasin.org/maps/045168561e1f4f59a8c0b1c72c98f639" target="_blank"
          rel="noopener">Month-Year
          Maps 2000-2012</a></p>
      <p>&nbsp;</p>
      <p>From the month-year maps we have generated Statewide and Island average <b>monthly time series</b>. Each index
        is the average of all map pixels for that month-year. These are available for download in Microsoft Excel
        (*.xlsx) and CSV (*.csv) formats. Each file contains the average rainfall values in millimeters and inches. </p>
      <p>Average time series derived from month-year maps:</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <td><strong>Excel 2007 Format</strong><br /></td>
          <td><strong>CSV Format</strong></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/State_MonthlyRainfallIndex_1920_2012.xlsx">State
            – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/State_MonthlyRFIndex_1920_2012_CSV.zip">State
            – Monthly Rainfall Index</a></td>
        </tr>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Bi_MonthlyRainfallIndex_1920_2012.xlsx">Hawaii
            Island – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Bi_MonthlyRFIndex_1920_2012_CSV.zip">Hawaii
            Island – Monthly Rainfall Index</a></td>
        </tr>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Ka_MonthlyRainfallIndex_1920_2012.xlsx">Kauai
            – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Ka_MonthlyRFIndex_1920_2012_CSV.zip">Kauai
            – Monthly Rainfall Index</a></td>
        </tr>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Oa_MonthlyRainfallIndex_1920_2012.xlsx">Oahu
            – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Oa_MonthlyRFIndex_1920_2012_CSV.zip">Oahu
            – Monthly Rainfall Index</a></td>
        </tr>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Ma_MonthlyRainfallIndex_1920_2012.xlsx">Maui
            – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Ma_MonthlyRFIndex_1920_2012_CSV.zip">Maui
            – Monthly Rainfall Index</a></td>
        </tr>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/La_MonthlyRainfallIndex_1920_2012.xlsx">Lanai
            – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/La_MonthlyRFIndex_1920_2012_CSV.zip">Lanai
            – Monthly Rainfall Index</a></td>
        </tr>
        <tr>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Mo_MonthlyRainfallIndex_1920_2012.xlsx">Molokai
            – Monthly Rainfall Index</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/MonthYrMaps/Mo_MonthlyRFIndex_1920_2012_CSV.zip">Molokai
            – Monthly Rainfall Index</a></td>
        </tr>
        </tbody>
      </table>
      <p>Again, please use the following citation for these rainfall indices:</p>
      <p></p>
      <p className="px-8">Frazier, A. G., Giambelluca, T. W., Diaz, H. F. and Needham, H. L. (2016), Comparison
        of geostatistical approaches to spatially interpolate month-year rainfall for the Hawaiian Islands. <i>Int. J.
          Climatol.</i>, 36(3), 1459-1470. doi: 10.1002/joc.4437</p>
    </div>
  );
}