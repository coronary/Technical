import "./App.css";
import "./styles.scss";

/* Components */
import { FlightDataView } from "./components/FlightDataView/FlightDataView";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <FlightDataView />
      <Footer />
    </div>
  );
}

export default App;
