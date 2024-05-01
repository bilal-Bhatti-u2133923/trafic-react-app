import "./App.css";
import NavBar from "./components/NavBar";
import TrafficCard from "./components/TrafficCard";
import GameCard from "./components/gameCard";


const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-row items-center align-middle justify-center  h-full w-full">
        <TrafficCard />
        <GameCard />
      </div>
    </div>
  );
};

export default App;
