export default function GoogleEarthFiles() {
  return (
    <div>
      <p>
        The same files seen in the interactive map have also been converted into *.KML (*.KMZ) files which can be
        viewed in Google Earth. The stations and isohyets (lines of equal rainfall) will display their attribute
        information when an element is clicked on in Google Earth. The color rainfall maps do not contain the
        value information as they do on the interactive site, so the best way to view these in Google Earth is to
        set the transparency to overlay it onto the imagery. Maui Nui includes the islands of Maui, Moloka‘i,
        Lāna‘i and Kaho‘olawe.
      </p>
      <p>&nbsp;</p>
      <img
        className="mx-auto my-4"
        decoding="async"
        loading="lazy"
        src="https://atlas.uhtapis.org/rainfall/assets/images/download4_s.jpg"
        alt="Google Earth"
        width="650"
        height="335"
      />
      <p>&nbsp;</p>
      <img
        className="float-right"
        decoding="async"
        loading="lazy"
        src="https://atlas.uhtapis.org/rainfall/assets/images/download5_s.jpg" alt="Station Legend"
        width="102" height="147"
      />
      <p>&nbsp;</p>
      <p>
        <br />
        The StationsKML.zip file contains two station files: “RFAtlas Stations” refers to the stations used
        to create the final rainfall atlas maps. “Other Stations” refers to all the other stations that have
        operated in Hawai‘i, but for various reasons could not be included in the final analysis. Click on a
        station for more information. The symbols are set automatically for these stations to be the same as on
        the interactive map:
      </p>
      <p>&nbsp;</p>
      <ul className="ml-16 list-disc list-inside">
        <li>
          <a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/StationKMLs.zip"
          >
            StationsKMLs.zip
          </a>
        </li>
      </ul>
      <p>&nbsp;</p>
      <p>The isohyet KMLs are available in inches or millimeters, with
        “Contour” referring to the isohyet label when you click on a line (labels will not be displayed unless you
        click on a line). Both sets of isohyets (inches and mm) were created at appropriate
        intervals for their units, and therefore are not direct conversions of
        each other, though they are derived from the same data.</p>
      <p>&nbsp;</p>
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
              href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/IsohyetsKML_inches.zip"
            >
              IsohyetsKML_inches.zip
            </a>
          </td>
          <td>
            <a
              className="link"
              href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/IsohyetsKML_mm.zip"
            >
              IsohyetsKML_mm.zip
            </a>
          </td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <p>Color Map KMLs are available by island: (use transparency in Google Earth for best viewing, as no legend
        is available at this time for these layers):</p>
      <p>&nbsp;</p>
      <ul className="ml-16 list-disc list-inside">
        <li>
          <a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/HawaiiRainfall_KML.zip"
          >
            HawaiiRainfall_KML.zip
          </a>
        </li>
        <li>
          <a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/OahuRainfall_KML.zip"
          >
            OahuRainfall_KML.zip
          </a>
        </li>
        <li>
          <a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/MauiNuiRainfall_KML.zip"
          >
            MauiNuiRainfall_KML.zip
          </a>
        </li>
        <li>
          <a
            className="link"
            href="https://atlas.uhtapis.org/rainfall/assets/files/KMLFiles/KauaiRainfall_KML.zip"
          >
            KauaiRainfall_KML.zip
          </a>
        </li>
      </ul>
    </div>
  );
}