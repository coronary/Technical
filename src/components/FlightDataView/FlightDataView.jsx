import React, { useEffect, useState } from "react";

/* Components */
import { EuiSelect, EuiComboBox, EuiBasicTable } from "@elastic/eui";

/* Styles */
import "./_flight-data-view.scss";

/* Services */
import { FlightService } from "../../services/FlightService/FlightService";

/* Constants */
import { menuItems } from "../../constants";
import { tableColumns } from "../../constants";

export const FlightDataView = () => {
  const [flightData, setFlightData] = useState({});
  const [years, setYears] = useState([]);
  const [airports, setAirports] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [mainSelection, setMainSelection] = useState("");
  const [yearSelection, setYearSelection] = useState(0);
  const [airportSelection, setAirportSelection] = useState([]);

  const buildMenuItems = () => {
    let yearsCheck = {};
    let airportCheck = {};
    let yearsItems = [];
    let airportItems = [];
    for (let i = 0; i < flightData.length; i++) {
      const item = flightData[i];
      const { Year } = item.Time;
      const { Code } = item.Airport;
      if (!(Year in yearsCheck)) {
        yearsCheck[Year] = true;
        yearsItems.push({ value: Year, text: Year });
      }
      if (!(Code in airportCheck)) {
        airportCheck[Code] = true;
        airportItems.push({ label: Code });
      }
    }
    setYears(yearsItems);
    setYearSelection(yearsItems[0].value);
    setAirports(airportItems);
    setAirportSelection([airportItems[0]]);
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await FlightService();
      setFlightData(data);
      setMainSelection(menuItems[0].value);
    };
    init();
  }, []);

  useEffect(() => {
    if (Object.keys(flightData).length > 0) buildMenuItems();
  }, [flightData]);

  useEffect(() => {
    let newOptions = [];
    airportSelection.forEach((code) => {
      newOptions.push(calculateRow(code.label));
    });
    setTableData(newOptions);
  }, [yearSelection, mainSelection, airportSelection]);

  const calculateRow = (airport) => {
    const months = {};
    for (let i = 0; i < flightData.length; i++) {
      const { Airport, Time, Statistics } = flightData[i];
      if (Airport.Code === airport && Time.Year === parseInt(yearSelection)) {
        switch (mainSelection) {
          case "num":
            months[Time["Month Name"]] = Statistics.Flights.Total;
            break;
          case "time":
            break;
          case "canceled":
            break;
          case "diverted":
            break;
          case "delayed":
            break;
          case "carrier":
            break;
          case "late":
            break;
          case "security":
            break;
          case "control":
            break;
          default:
            break;
        }
      }
    }
    const vals = Object.values(months);
    const mean = vals.reduce((prev, curr) => prev + curr);
    return { airport, mean: Math.round(mean / vals.length), ...months };
  };

  return (
    <div className="flightData">
      <div className="flightData__controls">
        <p>Show</p>
        <EuiSelect
          options={menuItems}
          value={mainSelection}
          onChange={(e) => setMainSelection(e.target.value)}
        />
        <p>for</p>
        <EuiSelect
          options={years}
          value={yearSelection}
          onChange={(e) => setYearSelection(e.target.value)}
        />
        <p>at</p>
        <EuiComboBox
          selectedOptions={airportSelection}
          options={airports}
          value={airportSelection}
          onChange={(selectedOptions) => setAirportSelection(selectedOptions)}
        />
      </div>

      <EuiBasicTable
        className="flightData__table"
        items={tableData}
        rowHeader="Airport"
        columns={tableColumns}
      />
    </div>
  );
};
