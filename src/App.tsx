import { useState } from "react";
import "./App.css";
import { Button } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App mt-[80px]">
      <Button>MAFANA TEAM</Button>
    </div>
  );
}

export default App;
