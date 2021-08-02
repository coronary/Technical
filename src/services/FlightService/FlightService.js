import axios from "axios";

export const FlightService = async () => {
  return await axios.get(
    "https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json"
  );
};
