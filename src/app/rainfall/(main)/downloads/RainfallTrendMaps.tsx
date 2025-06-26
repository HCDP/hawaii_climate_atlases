export default function RainfallTrendMaps() {
  return (
    <div className="space-y-4">
      <p>*NEW* as of October 10, 2018</p>
      <p>Month-year rainfall maps for the State of Hawai‘i (see data tab above) were used to calculate rainfall trends
        from 1920 to 2012, and for the most recent 30-year period available, 1983-2012. Wet season (November-April), Dry
        season (May-October), and Annual trends were calculated at each 250 m pixel across the state and mapped to
        produce spatially continuous trend maps. Statistically significant trends (p&lt;0.05) are indicated with black
        hatching. Units are percent per decade (relative to the Rainfall Atlas 1978-2007 means). Trend maps can be
        downloaded as JPEG images below for each island. For complete methods, see citation below.</p>
      <p>Please use the following citation for these rainfall trend maps:</p>
      <p></p>
      <p className="mx-8"><strong>Frazier, A. G., and Giambelluca, T. W. (2017), Spatial trend analysis of
        Hawaiian rainfall from 1920 to 2012. <i>Int. J. Climatol.</i>, 37(5), 2522-2531. doi: 10.1002/joc.4862</strong>
      </p>
      <p>The link to the full article is <a className="link"
                                            href="http://onlinelibrary.wiley.com/doi/10.1002/joc.4862/abstract"
                                            target="_blank" rel="noopener">here</a>.</p>
      <p>&nbsp;</p>
      <p><strong>JPEG Images Statewide:</strong></p>
      <div className="flex space-x-8">
        <img
          decoding="async"
          loading="lazy"
          src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_Ann1.jpg"
          alt="Annual State Trends 1920-2012" width="277" height="215"
        />
        <img
          decoding="async"
          loading="lazy"
          src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_Ann1.jpg"
          alt="Annual State Trends 1983-2012" width="277" height="215"
        />
      </div>
      <p>&nbsp;</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <th>Spatial Coverage &amp; Season</th>
          <th>1920-2012 Trends</th>
          <th>1983-2012 Trends</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>State: Annual Trends</td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_Ann1.jpg"
                 target="_blank" rel="noopener">State Annual Trends, 1920-2012</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_Ann1.jpg"
                 target="_blank" rel="noopener">State Annual Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>State: Wet Season Trends</td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_NovApr1.jpg"
                 target="_blank" rel="noopener">State Wet Season Trends, 1920-2012</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_NovApr1.jpg"
                 target="_blank" rel="noopener">State Wet Season Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>State: Dry Season Trends</td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_MayOct1.jpg"
                 target="_blank" rel="noopener">State Dry Season Trends, 1920-2012</a></td>
          <td><a className="link"
                 href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_MayOct1.jpg"
                 target="_blank" rel="noopener">State Dry Season Trends, 1983-2012</a></td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p><strong>JPEG Images Statewide (panels):</strong></p>
      <div className="flex space-x-8">
        <img
          decoding="async"
          loading="lazy"
          src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_Ann2.jpg"
          alt="Annual State (panel) Trends 1920-2012" width="315" height="215"
        />
        <img
          decoding="async"
          loading="lazy"
          src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_Ann2.jpg"
          alt="Annual State (panel) Trends 1983-2012" width="315" height="215"
        />
      </div>
      <p>&nbsp;</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <th>Spatial Coverage &amp; Season</th>
          <th>1920-2012 Trends</th>
          <th>1983-2012 Trends</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>State (panels): Annual Trends</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_Ann2.jpg"
            target="_blank" rel="noopener">State Annual Trends, 1920-2012</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_Ann2.jpg"
            target="_blank" rel="noopener">State Annual Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>State (panels): Wet Season Trends</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_NovApr2.jpg"
            target="_blank" rel="noopener">State Wet Season Trends, 1920-2012</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_NovApr2.jpg"
            target="_blank" rel="noopener">State Wet Season Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>State (panels): Dry Season Trends</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1920_2012_MayOct2.jpg"
            target="_blank" rel="noopener">State Dry Season Trends, 1920-2012</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/State_RFTrends_1983_2012_MayOct2.jpg"
            target="_blank" rel="noopener">State Dry Season Trends, 1983-2012</a></td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p><strong>JPEG Images by Island (Annual, Wet Season, Dry Season):</strong></p>
      <div className="flex space-x-8">
        <img
          decoding="async"
          loading="lazy"
          src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ma_RFTrends_1920_2012_3seas.jpg"
          alt="Maui Trends 1920-2012" width="396" height="180"
        />
        <img
          decoding="async"
          loading="lazy"
          src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ma_RFTrends_1983_2012_3seas.jpg"
          alt="Maui Trends 1983-2012" width="396" height="180"
        />
      </div>
      {/*<p style="clear: left; margin-top: 1em;">&nbsp;</p>*/}
      <p>&nbsp;</p>
      <table className="bordered-table">
        <thead>
        <tr>
          <th>Spatial Coverage</th>
          <th>1920-2012 Trends</th>
          <th>1983-2012 Trends</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Hawai‘i Island</td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ha_RFTrends_1920_2012_3seas.jpg"
                 target="_blank" rel="noopener">Hawai‘i Island Seasonal Rainfall Trends, 1920-2012</a></td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ha_RFTrends_1983_2012_3seas.jpg"
                 target="_blank" rel="noopener">Hawai‘i Island Seasonal Rainfall Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>Kaua‘i</td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ka_RFTrends_1920_2012_3seas.jpg"
                 target="_blank" rel="noopener">Kaua‘i Seasonal Rainfall Trends, 1920-2012</a></td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ka_RFTrends_1983_2012_3seas.jpg"
                 target="_blank" rel="noopener">Kaua‘i Island Seasonal Rainfall Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>O‘ahu</td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Oa_RFTrends_1920_2012_3seas.jpg"
                 target="_blank" rel="noopener">O‘ahu Seasonal Rainfall Trends, 1920-2012</a></td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Oa_RFTrends_1983_2012_3seas.jpg"
                 target="_blank" rel="noopener">O‘ahu Island Seasonal Rainfall Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>Maui</td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ma_RFTrends_1920_2012_3seas.jpg"
                 target="_blank" rel="noopener">Maui Seasonal Rainfall Trends, 1920-2012</a></td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/Ma_RFTrends_1983_2012_3seas.jpg"
                 target="_blank" rel="noopener">Maui Island Seasonal Rainfall Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>Lāna‘i &amp; Moloka‘i</td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/MoLa_RFTrends_1920_2012_3seas.jpg"
                 target="_blank" rel="noopener">Moloka‘i and Lāna‘i Seasonal Rainfall Trends, 1920-2012</a></td>
          <td><a
            className="link" href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/MoLa_RFTrends_1983_2012_3seas.jpg"
                 target="_blank" rel="noopener">Moloka‘i and Lāna‘i Seasonal Rainfall Trends, 1983-2012</a></td>
        </tr>
        <tr>
          <td>Maui Nui (Maui, Moloka‘i, Lāna‘i, and Kaho‘olawe)</td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/MaNui_RFTrends_1920_2012_3seas.jpg"
            target="_blank" rel="noopener">Maui Nui Seasonal Rainfall Trends, 1920-2012</a></td>
          <td><a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/MaNui_RFTrends_1983_2012_3seas.jpg"
            target="_blank" rel="noopener">Maui Nui Island Seasonal Rainfall Trends, 1983-2012</a></td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p>Mean 1920–2012 trends for each island and season in percent per decade based on the 1978–2007 mean, and mm per
        decade:</p>
      <img
        decoding="async"
        loading="lazy"
              src="https://atlas.uhtapis.org/rainfall/assets/files/TrendMapImages/FrazierGiambelluca2017_Table2.jpg"
              alt="Mean 1920–2012 trends for each island and season" width="904" height="350" />
      <p>&nbsp;</p>
      <p>Again, please use the following citation for these rainfall trend maps:</p>
      <p></p>
      <p className="mx-8">Frazier, A. G., and Giambelluca, T. W. (2017), Spatial trend analysis of Hawaiian
        rainfall from 1920 to 2012. <i>Int. J. Climatol.</i>, 37(5), 2522-2531. doi: 10.1002/joc.4862</p>
    </div>
  );
}