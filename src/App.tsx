import "./App.css";
import { Frame } from "./components/Frame/Frame";

function App() {
  return (
    <div className="App" data-testid="app">
      <Frame title="Frame 1" />
      <Frame title="Frame 2" />
      <Frame title="Frame 3" />
      <Frame title="Frame 4" />
    </div>
  );
}

export default App;
