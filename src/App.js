import GammaStats from "./Gamma";
import Flavanoids from "./Flavanoids";
import data from "./wineData.json";

function App() {
  return (
    <div>
      <Flavanoids data= {data} />
      <GammaStats data= {data} />
    </div>
  );
}

export default App;
