export default function MapImages() {
  return (
    <div className="flex flex-col gap-10 mb-2">
      <p>
        Image files of the color zone rainfall maps as well as the isohyets have been created and are available
        for download as *.TIF files. The user has a choice of inches or millimeters, and each compressed *.zip
        file contains all 12 months plus the annual map. The color maps are available at a statewide extent as
        well as for each county, while the isohyets maps are only available for each island county (Maui Nui
        includes the islands of Maui, Moloka‘i, Lāna‘i and Kaho‘olawe).
      </p>
      <div className="space-y-2">
        <p><strong>Isohyets:</strong></p>
        <div className="flex space-x-3">
          <img
            decoding="async"
            loading="lazy"
            width="277"
            height="215"
            src="/images/downloads/download2_s.jpg"
            alt="Isohyet Images"
          />
          <p>
            These images show the mean monthly rainfall as isohyets, or lines of equal rainfall. Both sets of
            isohyets (inches and mm) were created at appropriate intervals for their units, and therefore are not
            direct conversions of each other, though they are derived from the same data. The labels are included
            where they can fit, which means that not all isohyets are labeled, especially in steep gradient areas.
            Please see the interactive map or download the GIS or Google Earth layers for more information on
            isohyets labels.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p>Files for download:</p>
        <table className="bordered-table">
          <thead>
          <tr>
            <th>Coverage</th>
            <th>Inches</th>
            <th>Millimeters</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Hawai‘i</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiIsohyetTIFs_inches.zip"
              >
                HawaiiIsohyetTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiIsohyetTIFs_mm.zip"
              >
                HawaiiIsohyetTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>Kaua‘i</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiIsohyetTIFs_inches.zip"
              >
                KauaiIsohyetTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiIsohyetTIFs_mm.zip"
              >
                KauaiIsohyetTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>Maui Nui</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiIsohyetTIFs_inches.zip"
              >
                MauiNuiIsohyetTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiIsohyetTIFs_mm.zip"
              >
                MauiNuiIsohyetTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>O‘ahu</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuIsohyetTIFs_inches.zip"
              >
                OahuIsohyetTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuIsohyetTIFs_mm.zip"
              >
                OahuIsohyetTIFs_mm.zip
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="space-y-2">
        <p><strong>Color Maps:</strong></p>
        <div className="flex space-x-3">
          <img
            decoding="async"
            loading="lazy"
            width="277"
            height="215"
            src="/images/downloads/download1_s.jpg"
            alt="Color Map Images"
          />
          <p>
            Unlike the interactive map which shows the rainfall as a continuous color ramp, these images display
            the rainfall in categories. The categories were set based on the natural breaks in the rainfall values
            for each extent, with the minimum and maximum values in the legend corresponding to the minimum and
            maximum values shown in the map extent. The categories were set independently for inches and
            millimeters, so the two sets will differ slightly.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p>Files for download:</p>
        <table className="bordered-table">
          <thead>
          <tr>
            <th>Coverage</th>
            <th>Inches</th>
            <th>Millimeters</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>State</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/StateMapTIFs_inches.zip"
              >
                StateMapTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/StateMapTIFs_mm.zip"
              >
                StateMapTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>Hawai‘i</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiMapTIFs_inches.zip"
              >
                HawaiiMapTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/HawaiiMapTIFs_mm.zip"
              >
                HawaiiMapTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>Kaua‘i</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiMapTIFs_inches.zip"
              >
                KauaiMapTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/KauaiMapTIFs_mm.zip"
              >
                KauaiMapTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>Maui Nui</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiMapTIFs_inches.zip"
              >
                MauiNuiMapTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/MauiNuiMapTIFs_mm.zip"
              >
                MauiNuiMapTIFs_mm.zip
              </a>
            </td>
          </tr>
          <tr>
            <td>O‘ahu</td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuMapTIFs_inches.zip"
              >
                OahuMapTIFs_inches.zip
              </a>
            </td>
            <td>
              <a
                className="link"
                href="https://atlas.uhtapis.org/rainfall/assets/files/MapImages/OahuMapTIFs_mm.zip"
              >
                OahuMapTIFs_mm.zip
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}