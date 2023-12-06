import "./App.css";
import { Frame } from "./components/Frame/Frame";

// TODO:
// repo title croped on 2 lines
// in some cases the frame overlap... find case and solve it
// if search term is changed, close all cards

function App() {
  return (
    <div className="App">
      <Frame title="Frame 1" />
      <Frame title="Frame 2" />
      <Frame title="Frame 3" />
      <Frame title="Frame 4" />
    </div>
  );
}

export default App;
