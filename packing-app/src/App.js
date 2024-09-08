import React, { useState } from 'react';
import './App.css';

function App() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [objectHeight, setObjectHeight] = useState(0);
  const [objectWidth, setObjectWidth] = useState(0);
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Insira as informações sobre o Container</h1>

        <div>
          <label>
            Altura do Container:
            <input
              type="number"
              value={containerHeight}
              onChange={(e) => setContainerHeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label>
            Largura do Container:
            <input
              type="number"
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label>
            Altura do Objeto:
            <input
              type="number"
              value={objectHeight}
              onChange={(e) => setObjectHeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label>
            Largura do Objeto:
            <input
              type="number"
              value={objectWidth}
              onChange={(e) => setObjectWidth(Number(e.target.value))}
            />
          </label>
        </div>

        <button onClick={''}>Calcular</button>

        
      </header>
    </div>
  );
}

export default App;

